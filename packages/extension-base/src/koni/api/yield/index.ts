// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { TransactionError } from '@subwallet/extension-base/background/errors/TransactionError';
import { ChainStakingMetadata, ExtrinsicType, OptimalYieldPath, OptimalYieldPathParams, RequestBondingSubmit, RequestStakePoolingBonding, StakingType, SubmitBifrostLiquidStaking, SubmitJoinNativeStaking, SubmitJoinNominationPool, SubmitYieldStep, YieldAssetExpectedEarning, YieldCompoundingPeriod, YieldPoolInfo, YieldPoolType, YieldPositionInfo } from '@subwallet/extension-base/background/KoniTypes';
import { validatePoolBondingCondition, validateRelayBondingCondition } from '@subwallet/extension-base/koni/api/staking/bonding/relayChain';
import { generatePathForAcalaLiquidStaking, subscribeAcalaLiquidStakingStats, validateProcessForAcalaLiquidStaking } from '@subwallet/extension-base/koni/api/yield/acalaLiquidStaking';
import { generatePathForBifrostLiquidStaking, getBifrostLiquidStakingExtrinsic, subscribeBifrostLiquidStakingStats } from '@subwallet/extension-base/koni/api/yield/bifrostLiquidStaking';
import { YIELD_POOLS_INFO } from '@subwallet/extension-base/koni/api/yield/data';
import { generatePathForInterlayLending, subscribeInterlayLendingStats } from '@subwallet/extension-base/koni/api/yield/interlayLending';
import { generatePathForNativeStaking, getNativeStakingBondExtrinsic, getNativeStakingPosition, getNominationPoolJoinExtrinsic, getNominationPoolPosition, subscribeNativeStakingYieldStats } from '@subwallet/extension-base/koni/api/yield/nativeStaking';
import { SubstrateApi } from '@subwallet/extension-base/services/chain-service/handler/SubstrateApi';
import { _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';

import { SubmittableExtrinsic } from '@polkadot/api/types';

// only apply for DOT right now, will need to scale up

export function subscribeYieldPoolStats (substrateApiMap: Record<string, _SubstrateApi>, chainInfoMap: Record<string, _ChainInfo>, assetInfoMap: Record<string, _ChainAsset>, callback: (rs: YieldPoolInfo) => void) {
  const unsubList: VoidFunction[] = [];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  Object.values(YIELD_POOLS_INFO).forEach(async (poolInfo) => {
    if (!substrateApiMap[poolInfo.chain]) {
      return;
    }

    const substrateApi = await substrateApiMap[poolInfo.chain].isReady;
    const chainInfo = chainInfoMap[poolInfo.chain];

    if (YieldPoolType.NATIVE_STAKING === poolInfo.type) {
      const unsub = subscribeNativeStakingYieldStats(poolInfo, substrateApi, chainInfo, callback);

      // @ts-ignore
      unsubList.push(unsub);
    } else if (poolInfo.slug === 'DOT___bifrost_liquid_staking') {
      const unsub = subscribeBifrostLiquidStakingStats(poolInfo, assetInfoMap, callback);

      // @ts-ignore
      unsubList.push(unsub);
    } else if (poolInfo.slug === 'DOT___acala_liquid_staking') {
      const unsub = await subscribeAcalaLiquidStakingStats(substrateApi, chainInfoMap, poolInfo, callback);

      unsubList.push(unsub);
    } else if (poolInfo.slug === 'DOT___interlay_lending') {
      const unsub = subscribeInterlayLendingStats(poolInfo, callback);

      unsubList.push(unsub);
    }
  });

  return () => {
    unsubList.forEach((unsub) => {
      unsub && unsub();
    });
  };
}

export function subscribeYieldPosition (substrateApiMap: Record<string, SubstrateApi>, addresses: string[], chainInfoMap: Record<string, _ChainInfo>, callback: (rs: YieldPositionInfo) => void) {
  const unsubList: VoidFunction[] = [];

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  Object.values(YIELD_POOLS_INFO).forEach(async (poolInfo) => {
    if (!substrateApiMap[poolInfo.chain]) {
      return;
    }

    const substrateApi = await substrateApiMap[poolInfo.chain].isReady;
    const chainInfo = chainInfoMap[poolInfo.chain];

    if (poolInfo.type === YieldPoolType.NATIVE_STAKING) {
      const unsub = await getNativeStakingPosition(substrateApi, addresses, chainInfo, poolInfo, callback);

      unsubList.push(unsub);
    } else if (poolInfo.type === YieldPoolType.NOMINATION_POOL) {
      const unsub = await getNominationPoolPosition(substrateApi, addresses, chainInfo, poolInfo, callback);

      unsubList.push(unsub);
    }
  });

  return () => {
    unsubList.forEach((unsub) => {
      unsub && unsub();
    });
  };
}

export function calculateReward (apr: number, amount = 0, compoundingPeriod = YieldCompoundingPeriod.YEARLY): YieldAssetExpectedEarning {
  if (!apr) {
    return {};
  }

  const periodApr = apr / 365 * compoundingPeriod; // APR is always annually
  const earningRatio = (periodApr / 100) / compoundingPeriod;

  const periodApy = (1 + earningRatio) ** compoundingPeriod - 1;

  const reward = periodApy * amount;

  return {
    apy: periodApy,
    rewardInToken: reward
  };
}

export async function generateNaiveOptimalPath (params: OptimalYieldPathParams): Promise<OptimalYieldPath> {
  // 1. assume inputs are already validated
  // 2. generate paths based on amount only, not taking fee into account
  // 3. fees are calculated in the worst possible situation
  // 4. fees are calculated for the whole process, either user can pay all or nothing

  if (params.poolInfo.slug === 'DOT___bifrost_liquid_staking') {
    return generatePathForBifrostLiquidStaking(params);
  } else if (params.poolInfo.slug === 'DOT___acala_liquid_staking') {
    return generatePathForAcalaLiquidStaking(params);
  } else if (params.poolInfo.slug === 'DOT___interlay_lending') {
    return generatePathForInterlayLending(params);
  }

  return generatePathForNativeStaking(params);
}

// TODO: calculate token portion
// TODO: compare to ED
// TODO: compare to minAmount
// TODO: simulate the whole process, compare to fee (step by step)
export function validateYieldProcess (address: string, params: OptimalYieldPathParams, path: OptimalYieldPath, data: SubmitYieldStep): TransactionError[] {
  const poolInfo = params.poolInfo;
  const chainInfo = params.chainInfoMap[poolInfo.chain];

  if (['DOT___bifrost_liquid_staking', 'DOT___acala_liquid_staking'].includes(params.poolInfo.slug)) {
    return validateProcessForAcalaLiquidStaking(params, path);
  } else if (params.poolInfo.type === YieldPoolType.NOMINATION_POOL) {
    const inputData = data as SubmitJoinNominationPool;

    return validatePoolBondingCondition(chainInfo, inputData.amount, inputData.selectedPool, address, poolInfo.metadata as ChainStakingMetadata, inputData.nominatorMetadata);
  }

  const inputData = data as SubmitJoinNativeStaking;

  return validateRelayBondingCondition(chainInfo, inputData.amount, inputData.selectedValidators, address, poolInfo.metadata as ChainStakingMetadata, inputData.nominatorMetadata);
}

export function validateYieldRedeem (address: string, poolInfo: YieldPoolInfo, amount: string): TransactionError[] {
  return [];
}

export async function handleYieldStep (address: string, yieldPoolInfo: YieldPoolInfo, params: OptimalYieldPathParams, data: SubmitYieldStep, path: OptimalYieldPath, currentStep: number): Promise<[ExtrinsicType, SubmittableExtrinsic<'promise'>]> {
  if (yieldPoolInfo.type === YieldPoolType.NATIVE_STAKING) {
    const extrinsic = await getNativeStakingBondExtrinsic(address, params, data as SubmitJoinNativeStaking);

    return [ExtrinsicType.STAKING_BOND, extrinsic];
  } else if (yieldPoolInfo.slug === 'DOT___bifrost_liquid_staking') {
    return getBifrostLiquidStakingExtrinsic(address, params, path, currentStep, data as SubmitBifrostLiquidStaking);
  }

  const extrinsic = await getNominationPoolJoinExtrinsic(address, params, data as SubmitJoinNominationPool);

  return [ExtrinsicType.STAKING_JOIN_POOL, extrinsic];
}

export function convertYieldTxData (address: string, poolInfo: YieldPoolInfo, data: SubmitYieldStep): any {
  if (poolInfo.type === YieldPoolType.NOMINATION_POOL) {
    const inputData = data as SubmitJoinNominationPool;

    return {
      nominatorMetadata: inputData.nominatorMetadata,
      chain: poolInfo.chain,
      selectedPool: inputData.selectedPool,
      amount: inputData.amount,
      address
    } as RequestStakePoolingBonding;
  }

  const inputData = data as SubmitJoinNativeStaking;

  return {
    chain: poolInfo.chain,
    type: StakingType.NOMINATED,
    nominatorMetadata: inputData.nominatorMetadata, // undefined if user has no stake
    amount: inputData.amount,
    address,
    selectedValidators: inputData.selectedValidators
  } as RequestBondingSubmit;
}

export async function handleYieldRedeem (poolInfo: YieldPoolInfo, address: string, amount: string) {
  if (poolInfo.slug === '')
}
