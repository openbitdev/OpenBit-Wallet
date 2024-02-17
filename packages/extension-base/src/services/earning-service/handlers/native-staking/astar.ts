// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { TransactionError } from '@subwallet/extension-base/background/errors/TransactionError';
import { APIItemState, BasicTxErrorType, ExtrinsicType, NominationInfo, UnstakingInfo } from '@subwallet/extension-base/background/KoniTypes';
import { getEarningStatusByNominations } from '@subwallet/extension-base/koni/api/staking/bonding/utils';
import { _EXPECTED_BLOCK_TIME, _STAKING_ERA_LENGTH_MAP } from '@subwallet/extension-base/services/chain-service/constants';
import { _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { BaseYieldPositionInfo, EarningRewardItem, EarningStatus, NativeYieldPoolInfo, PalletDappsStakingAccountLedger, PalletDappsStakingDappInfo, PalletDappStakingAccountLedger, StakeCancelWithdrawalParams, SubmitJoinNativeStaking, TransactionData, UnstakingStatus, ValidatorInfo, YieldPoolInfo, YieldPoolMethodInfo, YieldPositionInfo, YieldStepBaseInfo, YieldStepType, YieldTokenBaseInfo } from '@subwallet/extension-base/types';
import { balanceFormatter, formatNumber, isUrl, parseRawNumber, reformatAddress } from '@subwallet/extension-base/utils';
import fetch from 'cross-fetch';

import { UnsubscribePromise } from '@polkadot/api-base/types/base';
import { Codec } from '@polkadot/types/types';
import { BN, BN_ZERO } from '@polkadot/util';
import { isEthereumAddress } from '@polkadot/util-crypto';

import BaseParaNativeStakingPoolHandler from './base-para';

interface CurrentEraInfo {
  totalLocked: string,
  unlocking: string,
  currentStakeAmount: StakeInfo,
  nextStakeAmount: StakeInfo
}

interface StakeInfo {
  voting: string,
  buildAndEarn: string,
  era: number,
  period: number
}

interface DAppInfo {
  owner: string;
  id: number;
  rewardBeneficiary: any;
}

const convertAddress = (address: string) => {
  return isEthereumAddress(address) ? address.toLowerCase() : address;
};

export function getAstarWithdrawable (yieldPosition: YieldPositionInfo): UnstakingInfo | undefined {
  const unstakingInfo: UnstakingInfo = {
    chain: yieldPosition.chain,
    status: UnstakingStatus.CLAIMABLE,
    claimable: '0',
    waitingTime: 0
  };

  let bnWithdrawable = BN_ZERO;

  for (const unstaking of yieldPosition.unstakings) {
    if (unstaking.status === UnstakingStatus.CLAIMABLE) {
      bnWithdrawable = bnWithdrawable.add(new BN(unstaking.claimable));
    }
  }

  if (bnWithdrawable.gt(BN_ZERO)) {
    unstakingInfo.claimable = bnWithdrawable.toString();

    return unstakingInfo;
  } else {
    return undefined;
  }
}

export default class AstarNativeStakingPoolHandler extends BaseParaNativeStakingPoolHandler {
  protected override readonly availableMethod: YieldPoolMethodInfo = {
    join: true,
    defaultUnstake: true,
    fastUnstake: false,
    cancelUnstake: false,
    withdraw: true,
    claimReward: true
  };

  /* Subscribe pool info */

  async subscribePoolInfo (callback: (data: YieldPoolInfo) => void): Promise<VoidFunction> {
    let cancel = false;
    const nativeToken = this.nativeToken;

    const defaultCallback = async () => {
      const data: NativeYieldPoolInfo = {
        ...this.baseInfo,
        type: this.type,
        metadata: {
          ...this.metadataInfo,
          description: this.getDescription()
        }
      };

      const poolInfo = await this.getPoolInfo();

      !poolInfo && callback(data);
    };

    if (!this.isActive) {
      await defaultCallback();

      return () => {
        cancel = true;
      };
    }

    await defaultCallback();

    const apyPromise = new Promise((resolve) => {
      fetch(`https://api.astar.network/api/v1/${this.chain}/dapps-staking/apy`, {
        method: 'GET'
      }).then((resp) => {
        resolve(resp.json());
      }).catch((e) => {
        console.error(e);
        resolve(null);
      });
    });

    const timeout = new Promise((resolve) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        resolve(null);
      }, 8000);
    });

    const apyRacePromise = Promise.race([
      timeout,
      apyPromise
    ]); // need race because API often timeout

    const substrateApi = await this.substrateApi.isReady;

    let apyInfo: null | number;

    try {
      apyInfo = (await apyRacePromise) as number | null;
    } catch (e) {
      apyInfo = null;
    }

    const unsub = await (substrateApi.api.query.dappStaking.currentEraInfo((_currentEra: CurrentEraInfo) => {
      if (cancel) {
        unsub();

        return;
      }

      const era = _currentEra.currentStakeAmount.era.toString();
      const minDelegatorStake = substrateApi.api.consts.dappStaking.minimumStakeAmount.toString();
      const unstakingDelay = substrateApi.api.consts.dappStaking.unlockingPeriod.toString();
      const maxUnlockingChunks = substrateApi.api.consts.dappStaking.maxUnlockingChunks.toPrimitive() as number;

      const eraTime = _STAKING_ERA_LENGTH_MAP[this.chain] || _STAKING_ERA_LENGTH_MAP.default; // in hours
      const unstakingPeriod = parseInt(unstakingDelay) * eraTime;
      const minToHuman = formatNumber(minDelegatorStake, nativeToken.decimals || 0, balanceFormatter);

      const data: NativeYieldPoolInfo = {
        ...this.baseInfo,
        type: this.type,
        metadata: {
          ...this.metadataInfo,
          description: this.getDescription(minToHuman)
        },
        statistic: {
          assetEarning: [
            {
              slug: this.nativeToken.slug,
              apy: apyInfo !== null ? apyInfo : undefined
            }
          ],
          maxCandidatePerFarmer: 100, // temporary fix for Astar, there's no limit for now
          maxWithdrawalRequestPerFarmer: maxUnlockingChunks, // by default
          earningThreshold: {
            join: minDelegatorStake,
            defaultUnstake: '0',
            fastUnstake: '0'
          },
          farmerCount: 0, // TODO recheck
          era: parseInt(era),
          eraTime,
          tvl: undefined, // TODO recheck
          totalApy: apyInfo !== null ? apyInfo : undefined, // TODO recheck
          unstakingPeriod
        }
      };

      callback(data);
    }) as unknown as UnsubscribePromise);

    return () => {
      cancel = true;
      unsub();
    };
  }

  /* Subscribe pool info */

  /* Subscribe pool position */

  async parseNominatorMetadata (chainInfo: _ChainInfo, address: string, substrateApi: _SubstrateApi, ledger: PalletDappStakingAccountLedger): Promise<Omit<YieldPositionInfo, keyof BaseYieldPositionInfo>> {
    const nominationList: NominationInfo[] = [];
    const unstakingList: UnstakingInfo[] = [];

    const allDappsReq = new Promise((resolve) => {
      fetch(`https://api.astar.network/api/v1/${chainInfo.slug}/dapps-staking/dapps`, {
        method: 'GET'
      }).then((resp) => {
        resolve(resp.json());
      }).catch(console.error);
    });

    const [_allDapps, _currentBlockNumber, _stakerInfo] = await Promise.all([
      allDappsReq,
      substrateApi.api.query.system.number(),
      substrateApi.api.query.dappStaking.stakerInfo.entries(address)
    ]);

    const blockNumber = parseInt(_currentBlockNumber.toString());
    const minDelegatorStake = substrateApi.api.consts.dappStaking.minimumStakeAmount.toString();
    const allDapps = _allDapps as PalletDappsStakingDappInfo[];

    let bnTotalActiveStake = BN_ZERO;

    if (_stakerInfo.length > 0) {
      const dAppInfoMap: Record<string, PalletDappsStakingDappInfo> = {};

      allDapps.forEach((dappInfo) => {
        dAppInfoMap[convertAddress(dappInfo.address)] = dappInfo;
      });

      for (const item of _stakerInfo) {
        const data = item[0].toHuman() as unknown as any[];
        const stakedDapp = data[1] as Record<string, string>;
        const stakeData = item[1].toPrimitive() as unknown as Record<string, Record<string, StakeInfo>>;
        const stakeInfo = stakeData.staked;

        const voting = new BN(stakeInfo?.voting?.toString() || '0');
        const buildAndEarn = new BN(stakeInfo?.buildAndEarn?.toString() || '0');
        const bnCurrentStake = voting.add(buildAndEarn) || BN_ZERO;

        const _dappAddress = stakedDapp.Evm ? stakedDapp.Evm.toLowerCase() : stakedDapp.Wasm;
        const dappAddress = convertAddress(_dappAddress);

        if (bnCurrentStake.gt(BN_ZERO)) { // [info] current stake now only can be 0 or gte minDelegatorStake
          const dappStakingStatus = bnCurrentStake.gt(BN_ZERO) && bnCurrentStake.gte(new BN(minDelegatorStake)) ? EarningStatus.EARNING_REWARD : EarningStatus.NOT_EARNING;

          bnTotalActiveStake = bnTotalActiveStake.add(bnCurrentStake);
          const dappInfo = dAppInfoMap[dappAddress];

          nominationList.push({
            status: dappStakingStatus,
            chain: chainInfo.slug,
            validatorAddress: dappAddress,
            activeStake: bnCurrentStake.toString(),
            validatorMinStake: '0',
            validatorIdentity: dappInfo?.name,
            hasUnstaking: false // cannot get unstaking info by dapp
          });
        }
      }
    }

    const unlockingChunks = ledger.unlocking;

    if (unlockingChunks.length > 0) {
      for (const unlockingChunk of unlockingChunks) {
        const isClaimable = unlockingChunk.unlockBlock - blockNumber <= 0;
        const remainingBlock = unlockingChunk.unlockBlock - blockNumber;
        const waitingTime = remainingBlock * _EXPECTED_BLOCK_TIME[chainInfo.slug] / 60 / 60; // TODO: must re-check

        unstakingList.push({
          chain: chainInfo.slug,
          status: isClaimable ? UnstakingStatus.CLAIMABLE : UnstakingStatus.UNLOCKING,
          claimable: unlockingChunk.amount.toString(),
          waitingTime
        });
      }
    }

    if (nominationList.length === 0 && unstakingList.length === 0) {
      return {
        balanceToken: this.nativeToken.slug,
        totalStake: '0',
        unstakeBalance: '0',
        status: EarningStatus.NOT_STAKING,
        isBondedBefore: false,
        activeStake: '0',
        nominations: [],
        unstakings: []
      };
    }

    const stakingStatus = getEarningStatusByNominations(bnTotalActiveStake, nominationList);
    const activeStake = bnTotalActiveStake.toString();
    const unstakeBalance = unstakingList.reduce((old, currentValue) => {
      return old.add(new BN(currentValue.claimable));
    }, BN_ZERO);

    const totalStake = unstakeBalance.add(bnTotalActiveStake);

    return {
      status: stakingStatus,
      balanceToken: this.nativeToken.slug,
      totalStake: totalStake.toString(),
      activeStake: activeStake,
      unstakeBalance: unstakeBalance.toString(),
      isBondedBefore: totalStake.gt(BN_ZERO),
      nominations: nominationList,
      unstakings: unstakingList
    };
  }

  async subscribePoolPosition (useAddresses: string[], resultCallback: (rs: YieldPositionInfo) => void): Promise<VoidFunction> {
    let cancel = false;
    const substrateApi = await this.substrateApi.isReady;
    const defaultInfo = this.baseInfo;
    const chainInfo = this.chainInfo;

    const unsub = await substrateApi.api.query.dappStaking.ledger.multi(useAddresses, async (ledgers: Codec[]) => {
      if (cancel) {
        unsub();

        return;
      }

      if (ledgers) {
        await Promise.all(ledgers.map(async (_ledger, i) => {
          const owner = reformatAddress(useAddresses[i], 42);

          const ledger = _ledger.toPrimitive() as unknown as PalletDappStakingAccountLedger;

          if (ledger) {
            const nominatorMetadata = await this.parseNominatorMetadata(chainInfo, owner, substrateApi, ledger);

            resultCallback({
              ...defaultInfo,
              ...nominatorMetadata,
              address: owner,
              type: this.type
            });
          } else {
            resultCallback({
              ...defaultInfo,
              type: this.type,
              address: owner,
              balanceToken: this.nativeToken.slug,
              totalStake: '0',
              activeStake: '0',
              unstakeBalance: '0',
              isBondedBefore: false,
              status: EarningStatus.NOT_STAKING,
              nominations: [],
              unstakings: []
            });
          }
        }));
      }
    });

    return () => {
      cancel = true;
      unsub();
    };
  }

  /* Subscribe pool position */

  /* Get pool reward */

  override async getPoolReward (useAddresses: string[], callBack: (rs: EarningRewardItem) => void): Promise<VoidFunction> {
    let cancel = false;
    const substrateApi = this.substrateApi;

    await substrateApi.isReady;

    for (const address of useAddresses) {
      if (!cancel) {
        const _unclaimedReward = await substrateApi.api.tx.dappStaking.claimUnlocked();

        console.log(_unclaimedReward.toPrimitive());

        if (_unclaimedReward) {
          callBack({
            ...this.baseInfo,
            address: address,
            type: this.type,
            unclaimedReward: _unclaimedReward.toString(),
            state: APIItemState.READY
          });
        }
      }
    }

    return () => {
      cancel = false;
    };
  }

  /* Get pool reward */

  /* Get pool targets */

  async getPoolTargets (): Promise<ValidatorInfo[]> {
    const chainApi = await this.substrateApi.isReady;
    // const rawMaxStakerPerContract = (chainApi.api.consts.dappsStaking.maxNumberOfStakersPerContract).toHuman() as string;

    const allDappsInfo: ValidatorInfo[] = [];
    // const maxStakerPerContract = parseRawNumber(rawMaxStakerPerContract);

    const allDappsReq = new Promise((resolve) => {
      fetch(`https://api.astar.network/api/v1/${this.chain}/dapps-staking/dapps`, {
        method: 'GET'
      }).then((resp) => {
        resolve(resp.json());
      }).catch(console.error);
    });

    const [_era, _allDapps] = await Promise.all([
      chainApi.api.query.dappStaking.currentEraInfo() as unknown as Promise<CurrentEraInfo>,
      allDappsReq
    ]);

    const era = parseRawNumber(_era.currentStakeAmount.era.toString());
    const allDapps = _allDapps as Record<string, any>[];

    await Promise.all(allDapps.map(async (dapp) => {
      const dappName = dapp.name as string;
      const dappAddress = dapp.address as string;
      const dappIcon = isUrl(dapp.iconUrl as string) ? dapp.iconUrl as string : undefined;
      const contractParam = isEthereumAddress(dappAddress) ? { Evm: dappAddress } : { Wasm: dappAddress };

      const _integratedInfo = await chainApi.api.query.dappStaking.integratedDApps(contractParam);
      const integratedInfo = _integratedInfo.toPrimitive() as unknown as DAppInfo;

      let totalStake = '0';
      const stakerCount = 0;

      if (integratedInfo) {
        const _contractInfo = await chainApi.api.query.dappStaking.contractStake(integratedInfo.id);
        const contractInfo = _contractInfo.toPrimitive() as unknown as Record<string, StakeInfo>;

        if (contractInfo !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          totalStake = contractInfo.staked.voting.toString();
          // stakerCount = contractInfo.numberOfStakers as number;
        }
      }

      allDappsInfo.push({
        commission: 0,
        expectedReturn: 0,
        address: convertAddress(dappAddress),
        totalStake: totalStake,
        ownStake: '0',
        otherStake: totalStake.toString(),
        nominatorCount: stakerCount,
        blocked: false,
        isVerified: false,
        minBond: '0',
        icon: dappIcon,
        identity: dappName,
        chain: this.chain,
        isCrowded: false // temporary set to false because unlimited
      });
    }));

    return allDappsInfo;
  }

  /* Get pool targets */

  /* Join pool action */

  override get defaultSubmitStep (): YieldStepBaseInfo {
    return [
      {
        name: 'Nominate dApps',
        type: YieldStepType.NOMINATE
      },
      {
        slug: this.nativeToken.slug,
        amount: '0'
      }
    ];
  }

  async createJoinExtrinsic (data: SubmitJoinNativeStaking, positionInfo?: YieldPositionInfo, bondDest = 'Staked'): Promise<[TransactionData, YieldTokenBaseInfo]> {
    const { amount, selectedValidators: targetValidators } = data;
    const chainApi = await this.substrateApi.isReady;
    const binaryAmount = new BN(amount);
    const dappInfo = targetValidators[0];

    const dappParam = isEthereumAddress(dappInfo.address) ? { Evm: dappInfo.address } : { Wasm: dappInfo.address };
    const extrinsic = chainApi.api.tx.dappsStaking.bondAndStake(dappParam, binaryAmount);
    const tokenSlug = this.nativeToken.slug;
    // const feeInfo = await extrinsic.paymentInfo(address);
    // const fee = feeInfo.toPrimitive() as unknown as RuntimeDispatchInfo;

    // Not use the fee to validate and to display on UI
    return [extrinsic, { slug: tokenSlug, amount: '0' }];
  }

  /* Join pool action */

  /* Leave pool action */

  async handleYieldUnstake (amount: string, address: string, selectedTarget?: string): Promise<[ExtrinsicType, TransactionData]> {
    const chainApi = await this.substrateApi.isReady;
    const binaryAmount = new BN(amount);

    if (!selectedTarget) {
      return Promise.reject(new TransactionError(BasicTxErrorType.INVALID_PARAMS));
    }

    const dappParam = isEthereumAddress(selectedTarget) ? { Evm: selectedTarget } : { Wasm: selectedTarget };

    const extrinsic = chainApi.api.tx.dappsStaking.unbondAndUnstake(dappParam, binaryAmount);

    return [ExtrinsicType.STAKING_LEAVE_POOL, extrinsic];
  }

  /* Leave pool action */

  /* Other action */

  override async handleYieldCancelUnstake (params: StakeCancelWithdrawalParams): Promise<TransactionData> {
    return Promise.reject(new TransactionError(BasicTxErrorType.UNSUPPORTED));
  }

  async handleYieldWithdraw (address: string, unstakingInfo: UnstakingInfo): Promise<TransactionData> {
    const chainApi = await this.substrateApi.isReady;

    return chainApi.api.tx.dappsStaking.withdrawUnbonded();
  }

  override async handleYieldClaimReward (address: string, bondReward?: boolean) {
    const apiPromise = await this.substrateApi.isReady;

    return apiPromise.api.tx.dappStaking.claimUnlocked();
  }

  /* Other actions */
}
