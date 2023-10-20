// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { COMMON_CHAIN_SLUGS } from '@subwallet/chain-list';
import { _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { ExtrinsicType, OptimalYieldPath, OptimalYieldPathParams, RequestCrossChainTransfer, RequestYieldStepSubmit, SubmitYieldStepData, TokenBalanceRaw, YieldPoolInfo, YieldPositionInfo, YieldPositionStats, YieldStepType } from '@subwallet/extension-base/background/KoniTypes';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-base/constants';
import { createXcmExtrinsic } from '@subwallet/extension-base/koni/api/xcm';
import {
  ACALA_EUPHRATES_ABI,
  convertDerivativeToOriginToken,
  YIELD_POOL_STAT_REFRESH_INTERVAL
} from '@subwallet/extension-base/koni/api/yield/helper/utils';
import { HandleYieldStepData } from '@subwallet/extension-base/koni/api/yield/index';
import { _ERC20_ABI } from '@subwallet/extension-base/services/chain-service/helper';
import { _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { _getChainNativeTokenSlug, _getTokenOnChainInfo } from '@subwallet/extension-base/services/chain-service/utils';
import { sumBN } from '@subwallet/extension-base/utils';
import fetch from 'cross-fetch';
import Contract from 'web3-eth-contract';

import { SubmittableExtrinsic } from '@polkadot/api/types';
import { BN, hexToBn } from '@polkadot/util';

// const YEAR = 365 * 24 * 60 * 60 * 1000;

const GRAPHQL_API = 'https://api.polkawallet.io/acala-liquid-staking-subql';
const EXCHANGE_RATE_REQUEST = 'query { dailySummaries(first:30, orderBy:TIMESTAMP_DESC) {nodes { exchangeRate timestamp }}}';

interface EvmRuntimeResponse {
  ok: {
    exist_reason: Record<string, string>,
    logs: any[],
    used_gas: string,
    used_storage: string,
    value: unknown
  }
}

interface AcalaLiquidStakingMeta {
  data: {
    dailySummaries: {
      nodes: AcalaLiquidStakingMetaItem[]
    }
  }
}

interface AcalaLiquidStakingMetaItem {
  exchangeRate: string,
  timestamp: string
}

interface AcalaFarmStatResponse {
  result: AcalaFarmStat[]
}

interface AcalaFarmStat {
  timestamp: string,
  blockNumber: number,
  poolId: string,
  totalShares: string,
  tvl: number,
  apr: number
}

const DEFAULT_GAS_PRICE = 100004697165;
const DEFAULT_GAS_LIMIT = 100800;

export const LDOT_EVM_CONTRACT_ADDRESS = '0x0000000000000000000100000000000000000003';
export const ACALA_EVM_LIQUID_STAKING_CONTRACT_ADDRESS = '0x7Fe92EC600F15cD25253b421bc151c51b0276b7D';

export function subscribeAcalaLiquidStakingStats (chainApi: _SubstrateApi, chainInfoMap: Record<string, _ChainInfo>, poolInfo: YieldPoolInfo, callback: (rs: YieldPoolInfo) => void) {
  async function getPoolStat () {
    const substrateApi = await chainApi.isReady;

    const stakingMetaPromise = new Promise(function (resolve) {
      fetch(GRAPHQL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: EXCHANGE_RATE_REQUEST
        })
      }).then((res) => {
        resolve(res.json());
      }).catch(console.error);
    });

    const [_toBondPool, _totalStakingBonded, _stakingMeta] = await Promise.all([
      substrateApi.api.query.homa.toBondPool(),
      substrateApi.api.query.homa.totalStakingBonded(),
      stakingMetaPromise
    ]);

    const stakingMeta = _stakingMeta as AcalaLiquidStakingMeta;
    const stakingMetaList = stakingMeta.data.dailySummaries.nodes;
    const latestExchangeRate = parseInt(stakingMetaList[0].exchangeRate);
    const decimals = 10 ** 10;

    const endingBalance = parseInt(stakingMetaList[0].exchangeRate);
    const beginBalance = parseInt(stakingMetaList[29].exchangeRate);

    const diff = endingBalance / beginBalance;
    const apy = diff ** (365 / 30) - 1;

    const toBondPool = new BN(_toBondPool.toString());
    const totalStakingBonded = new BN(_totalStakingBonded.toString());

    // eslint-disable-next-line node/no-callback-literal
    callback({
      ...poolInfo,
      stats: {
        assetEarning: [
          {
            slug: poolInfo.rewardAssets[0],
            apy: apy * 100,
            exchangeRate: latestExchangeRate / decimals
          }
        ],
        maxCandidatePerFarmer: 1,
        maxWithdrawalRequestPerFarmer: 1,
        minJoinPool: '50000000000',
        minWithdrawal: '50000000000',
        totalApy: apy * 100,
        tvl: totalStakingBonded.add(toBondPool).toString()
      }
    });
  }

  function getStatInterval () {
    getPoolStat().catch(console.error);
  }

  getStatInterval();

  const interval = setInterval(getStatInterval, YIELD_POOL_STAT_REFRESH_INTERVAL);

  return () => {
    clearInterval(interval);
  };
}

export function subscribeAcalaLcDOTLiquidStakingStats (chainApi: _SubstrateApi, chainInfoMap: Record<string, _ChainInfo>, poolInfo: YieldPoolInfo, callback: (rs: YieldPoolInfo) => void) {
  async function getPoolStat () {
    const substrateApi = await chainApi.isReady;

    const stakingMetaPromise = new Promise(function (resolve) {
      fetch(GRAPHQL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: EXCHANGE_RATE_REQUEST
        })
      }).then((res) => {
        resolve(res.json());
      }).catch(console.error);
    });

    // const farmStatPromise = new Promise(function (resolve) {
    //   fetch('https://farm.acala.network/api/apr/0', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }).then((res) => {
    //     resolve(res.json());
    //   }).catch(console.error);
    // });

    const [_toBondPool, _totalStakingBonded, _stakingMeta] = await Promise.all([
      substrateApi.api.query.homa.toBondPool(),
      substrateApi.api.query.homa.totalStakingBonded(),
      stakingMetaPromise
      // farmStatPromise
    ]);

    const stakingMeta = _stakingMeta as AcalaLiquidStakingMeta;
    const stakingMetaList = stakingMeta.data.dailySummaries.nodes;
    const latestExchangeRate = parseInt(stakingMetaList[0].exchangeRate);
    const decimals = 10 ** 10;

    const endingBalance = parseInt(stakingMetaList[0].exchangeRate);
    const beginBalance = parseInt(stakingMetaList[29].exchangeRate);

    const diff = endingBalance / beginBalance;
    const apy = diff ** (365 / 30) - 1;

    const toBondPool = new BN(_toBondPool.toString());
    const totalStakingBonded = new BN(_totalStakingBonded.toString());

    // const farmStat = _farmStat as AcalaFarmStatResponse;
    // const farmStatList = farmStat.result;

    // let avgApr = 0;

    // for (const farmStatItem of farmStatList) {
    //   avgApr += farmStatItem.apr;
    // }
    //
    // avgApr = avgApr / farmStatList.length;

    // TODO: try https://farm.acala.network/api/apr/0

    // eslint-disable-next-line node/no-callback-literal
    callback({
      ...poolInfo,
      stats: {
        assetEarning: [
          {
            slug: poolInfo.rewardAssets[0],
            apy: apy * 100,
            exchangeRate: latestExchangeRate / decimals
          },
          {
            slug: poolInfo.rewardAssets[1],
            apy: 202.6
          }
        ],
        maxCandidatePerFarmer: 1,
        maxWithdrawalRequestPerFarmer: 1,
        minJoinPool: '50000000000',
        minWithdrawal: '50000000000',
        totalApy: apy + 202.6,
        tvl: totalStakingBonded.add(toBondPool).toString()
      }
    });
  }

  function getStatInterval () {
    getPoolStat().catch(console.error);
  }

  getStatInterval();

  const interval = setInterval(getStatInterval, YIELD_POOL_STAT_REFRESH_INTERVAL);

  return () => {
    clearInterval(interval);
  };
}

export function getAcalaLiquidStakingPosition (substrateApi: _SubstrateApi, useAddresses: string[], chainInfo: _ChainInfo, poolInfo: YieldPoolInfo, assetInfoMap: Record<string, _ChainAsset>, positionCallback: (rs: YieldPositionInfo) => void) {
  // @ts-ignore
  const derivativeTokenSlug = poolInfo.derivativeAssets[0];
  const derivativeTokenInfo = assetInfoMap[derivativeTokenSlug];

  return substrateApi.api.query.tokens.accounts.multi(useAddresses.map((address) => [address, _getTokenOnChainInfo(derivativeTokenInfo)]), (_balances) => {
    const balances = _balances as unknown as TokenBalanceRaw[];

    const totalBalance = sumBN(balances.map((b) => (b.free || new BN(0))));

    positionCallback({
      slug: poolInfo.slug,
      chain: chainInfo.slug,
      address: useAddresses.length > 1 ? ALL_ACCOUNT_KEY : useAddresses[0], // TODO
      balance: [
        {
          slug: derivativeTokenSlug, // token slug
          totalBalance: totalBalance.toString(),
          activeBalance: totalBalance.toString()
        }
      ],

      metadata: {
        rewards: []
      } as YieldPositionStats
    } as YieldPositionInfo);
  });
}

export function getAcalaLcDOTLiquidStakingPosition (substrateApi: _SubstrateApi, useAddresses: string[], chainInfo: _ChainInfo, poolInfo: YieldPoolInfo, assetInfoMap: Record<string, _ChainAsset>, positionCallback: (rs: YieldPositionInfo) => void) {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const lcDOTContract = new Contract(_ERC20_ABI, LDOT_EVM_CONTRACT_ADDRESS);
  // @ts-ignore
  const derivativeTokenSlug = poolInfo.derivativeAssets[0];

  async function fetchBalance () {
    const address = '0xcaaCB40CC7Dba12ce66DCfB53Eb57731DB7b7Ff1';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const encodedData = lcDOTContract.methods.balanceOf(address).encodeABI();

    const chainApi = await substrateApi.isReady;

    const _resp = await chainApi.api.call.evmRuntimeRPCApi.call(
      address,
      LDOT_EVM_CONTRACT_ADDRESS,
      encodedData,
      0,
      1000000,
      0,
      [],
      true
    );

    const resp = _resp.toPrimitive() as unknown as EvmRuntimeResponse;
    const balanceString = resp.ok.value as string;

    const balance = hexToBn(balanceString);

    positionCallback({
      slug: poolInfo.slug,
      chain: chainInfo.slug,
      address: useAddresses.length > 1 ? ALL_ACCOUNT_KEY : useAddresses[0], // TODO
      balance: [
        {
          slug: derivativeTokenSlug, // token slug
          totalBalance: balance.toString(),
          activeBalance: balance.toString()
        }
      ],

      metadata: {
        rewards: []
      } as YieldPositionStats
    } as YieldPositionInfo);
  }

  function fetchBalanceInterval () {
    fetchBalance().catch(console.error);
  }

  fetchBalanceInterval();

  const interval = setInterval(fetchBalanceInterval, 30000);

  return () => {
    clearInterval(interval);
  };
}

export async function getAcalaLiquidStakingExtrinsic (address: string, params: OptimalYieldPathParams, path: OptimalYieldPath, currentStep: number, requestData: RequestYieldStepSubmit): Promise<HandleYieldStepData> {
  const inputData = requestData.data as SubmitYieldStepData;

  if (path.steps[currentStep].type === YieldStepType.XCM) {
    const destinationTokenSlug = params.poolInfo.inputAssets[0];
    const originChainInfo = params.chainInfoMap[COMMON_CHAIN_SLUGS.POLKADOT];
    const originTokenSlug = _getChainNativeTokenSlug(originChainInfo);
    const originTokenInfo = params.assetInfoMap[originTokenSlug];
    const destinationTokenInfo = params.assetInfoMap[destinationTokenSlug];
    const substrateApi = params.substrateApiMap[originChainInfo.slug];

    const xcmFee = path.totalFee[currentStep].amount || '0';
    const bnXcmFee = new BN(xcmFee);
    const bnAmount = new BN(inputData.amount);

    const bnTotalAmount = bnAmount.add(bnXcmFee);

    const extrinsic = await createXcmExtrinsic({
      chainInfoMap: params.chainInfoMap,
      destinationTokenInfo,
      originTokenInfo,
      recipient: address,
      sendingValue: bnTotalAmount.toString(),
      substrateApi
    });

    const xcmData: RequestCrossChainTransfer = {
      originNetworkKey: originChainInfo.slug,
      destinationNetworkKey: destinationTokenInfo.originChain,
      from: address,
      to: address,
      value: bnTotalAmount.toString(),
      tokenSlug: originTokenSlug,
      showExtraWarning: true
    };

    return {
      txChain: originChainInfo.slug,
      extrinsicType: ExtrinsicType.TRANSFER_XCM,
      extrinsic,
      txData: xcmData,
      transferNativeAmount: bnTotalAmount.toString()
    };
  }

  const substrateApi = await params.substrateApiMap[params.poolInfo.chain].isReady;
  const extrinsic = substrateApi.api.tx.homa.mint(inputData.amount);

  return {
    txChain: params.poolInfo.chain,
    extrinsicType: ExtrinsicType.MINT_LDOT,
    extrinsic,
    txData: requestData,
    transferNativeAmount: '0'
  };
}

export async function getAcalaLcDOTLiquidStakingExtrinsic (address: string, params: OptimalYieldPathParams, path: OptimalYieldPath, currentStep: number, requestData: RequestYieldStepSubmit) {
  const inputData = requestData.data as SubmitYieldStepData;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const euphratesContract = new Contract(ACALA_EUPHRATES_ABI, ACALA_EVM_LIQUID_STAKING_CONTRACT_ADDRESS);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const encodedData = euphratesContract.methods.stake(0, parseInt(inputData.amount)).encodeABI();

  const substrateApi = await params.substrateApiMap[params.poolInfo.chain].isReady;
  const extrinsic = substrateApi.api.tx.evm.ethCallV2(
    {
      Call: ACALA_EVM_LIQUID_STAKING_CONTRACT_ADDRESS
    },
    encodedData,
    0,
    DEFAULT_GAS_PRICE,
    DEFAULT_GAS_LIMIT
  );

  console.log('extrinsic', extrinsic.toHex());

  return {
    txChain: params.poolInfo.chain,
    extrinsicType: ExtrinsicType.MINT_LDOT,
    extrinsic,
    txData: requestData,
    transferNativeAmount: '0'
  };
}

export async function getAcalaLiquidStakingRedeem (params: OptimalYieldPathParams, amount: string): Promise<[ExtrinsicType, SubmittableExtrinsic<'promise'>]> {
  const substrateApi = await params.substrateApiMap[params.poolInfo.chain].isReady;

  const derivativeTokenSlug = params.poolInfo.derivativeAssets?.[0] || '';
  const originTokenSlug = params.poolInfo.inputAssets[0] || '';

  const derivativeTokenInfo = params.assetInfoMap[derivativeTokenSlug];
  const originTokenInfo = params.assetInfoMap[originTokenSlug];

  const formattedMinAmount = convertDerivativeToOriginToken(amount, params.poolInfo, derivativeTokenInfo, originTokenInfo);

  const extrinsic = substrateApi.api.tx.aggregatedDex.swapWithExactSupply(
    // Swap path
    [
      {
        Taiga: [
          0, /* pool id */
          1, /* supply asset */
          0 /* target asset */
        ]
      }
    ],
    // Supply amount
    amount,
    // Min target amount
    formattedMinAmount // should always set a min target to prevent unexpected result
  );

  return [ExtrinsicType.REDEEM_LDOT, extrinsic];
}
