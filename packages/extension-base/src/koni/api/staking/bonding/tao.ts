// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { ChainStakingMetadata, NominationInfo, NominatorMetadata, StakingStatus, StakingType, ValidatorInfo } from '@subwallet/extension-base/background/KoniTypes';
import { getStakingStatusByNominations, ParachainStakingStakeOption } from '@subwallet/extension-base/koni/api/staking/bonding/utils';
import { _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import fetch from 'cross-fetch';

import { Codec } from '@polkadot/types/types';
import { BN, BN_ZERO } from '@polkadot/util';

// interface DelegateInfo {
//   address: {
//     name: string,
//     url: string,
//     description: string,
//       signature: string
//     }
//   }

// for test
const testnetDelegate = {
  // '5GHczYXpzd5xmNwjxWs63hw9DannNBGDp6tG6aPmsqP5WiwM': {
  //   name: 'Vune',
  //   url: 'https://fairchild.dev',
  //   description: 'Vune is a dev at Opentensor and a BSc CS student at UofT.',
  //   signature: '2a639f931c61abfc3172db594c986c35f1cc8441970582b9c3b1f0506d518a182a2fe570832f02f86014320f1526189917bfbccf7081622652d12e16e9b1768b'
  // },
  '5Fjp4r8cvWexkWUVb756LkopTVjmzXHBT4unpDN6SzwmQq8E': {
    name: 'TaoPolishNode',
    url: 'https://taonode.io',
    description: 'This node is a collective effort of the polish community. We are engaged in evangelizing the project, educating and sharing the knowledge.',
    signature: '1ca20d4e99a48f400dd9cd4aeca8447da6ab1979e480a1dafddfc52e45e215177c7cdde85f5d042d59a5b1169981afa8d1ae28328e2fc5ce57c3d748c8d09d81'
  },
  // '5D1rWnzozRX68ZqKTPXZAFWTJ8hHpox283yWFmsdNjxhRCdB': {
  //   name: 'RoundTable21',
  //   url: 'https://roundtable21.com',
  //   description: 'RoundTable21 is an International, multi-disciplinary team of consultants and advisors partnering alongside leading blockchain startups to offer guidance, expertise, investment and hands-on assistance in every aspect of development.',
  //   signature: '107638b8edde8f918f7faa2cd1f91b454c13094ed5955d6a409f6e0662f8427075516273728a53923839a5428079151ea0844b5f755362364f04735463dff583'
  // },
  '5DG4VHT3gKZDEQ3Tx4oVPpejaz64FeDtNPhbAYTLFBmygHUW': {
    name: 'WaveTensor',
    url: 'https://twitter.com/wavetensor',
    description: 'A new Wave is coming, join the AI revolution on top of Bittensor by staking with us.',
    signature: '5e072b4752ccbdd4ca3298f336284dfdab347dd133850f4d2f9873e7ea59bd2a8f201732842ec79d2bab3abaf133a06b6bd992940389e42d57802c9b8f855889'
  }
};

const fetchDelegates = async () => {
  return new Promise(function (resolve) {
    fetch('https://raw.githubusercontent.com/opentensor/bittensor-delegates/main/public/delegates.json', { // Todo: check if this is exactly active validator list info or not
      method: 'GET'
    }).then((resp) => {
      resolve(resp.json());
    }).catch(console.error);
  });
};

const fetchStakingInfo = async (): Promise<Array<Record<string, string>>> => {
  return new Promise(function (resolve) {
    fetch('https://taostats.io/data.json', {
      method: 'GET'
    }).then((resp) => {
      resolve(resp.json());
    }).catch(console.error);
  });
};

export async function subscribeTaoStakingMetadata (chain: string, substrateApi: _SubstrateApi, callback: (chain: string, rs: ChainStakingMetadata) => void) {
  // _TODO: optimize case subscribe an API in a subscription -> Rxjs or fetch interval
  return substrateApi.api.query.subtensorModule.networkImmunityPeriod(async (_iPeriod: Codec) => {
    const iPeriod = parseInt(_iPeriod.toString());

    const _expectedReturn = (await fetchStakingInfo())[0];
    const expectedReturn = _expectedReturn.staking_apy as unknown as number;

    // Note for reviewer: This staking different on Staking metadata structure, should we create another interface like TaoStakingMetadata (do not have era, unlocking infor, etc.)?
    callback(chain, {
      chain,
      type: StakingType.NOMINATED,
      era: iPeriod,
      minStake: '0',
      maxValidatorPerNominator: 999,
      maxWithdrawalRequestPerValidator: 1,
      allowCancelUnstaking: false,
      expectedReturn,
      unstakingPeriod: 0
    });
  });
}

export function subscribeTaoDelegatorMetadata (chainInfo: _ChainInfo, address: string, substrateApi: _SubstrateApi, delegatorState: ParachainStakingStakeOption[]) {
  console.log('a');
  const nominationList: NominationInfo[] = [];
  let allActiveStake = BN_ZERO;

  for (let i = 0; i < delegatorState.length; i++) {
    const delegate = delegatorState[i];

    const activeStake = delegate.amount.toString();
    const bnActiveStake = new BN(activeStake);

    if (bnActiveStake.gt(BN_ZERO)) {
      const delegationStatus = StakingStatus.EARNING_REWARD;

      allActiveStake = allActiveStake.add(bnActiveStake);

      nominationList.push({
        status: delegationStatus,
        chain: chainInfo.slug,
        validatorAddress: delegate.owner,
        activeStake: activeStake,
        validatorMinStake: '0'
      });
    }
  }

  const stakingStatus = getStakingStatusByNominations(allActiveStake, nominationList);

  return {
    chain: chainInfo.slug,
    type: StakingType.NOMINATED,
    status: stakingStatus,
    address: address,
    activeStake: allActiveStake.toString(),
    nominations: nominationList,
    unstakings: []
  } as NominatorMetadata;
}

export async function getTaoDelegateInfo (chain: string, substrateApi: _SubstrateApi): Promise<ValidatorInfo[]> {
  // const chainApi = await substrateApi.isReady;

  const allDelegatesInfo: ValidatorInfo[] = [];
  // for test
  let _allDelegates;

  if (chain === 'bittensor_testnet') {
    _allDelegates = testnetDelegate;
  } else {
    const allDelegatesPromise = fetchDelegates();

    _allDelegates = await allDelegatesPromise;
  }

  const allDelegates = _allDelegates as Record<string, Record<string, string>>;
  const allDelegateAddresses: string[] = Object.keys(allDelegates);

  for (const address of allDelegateAddresses) {
    const name = allDelegates[address].name;
    // todo: remove these info because not use
    // const url = allDelegates[address].url;
    // const description = allDelegates[address].description;
    // const signature = allDelegates[address].signature;

    allDelegatesInfo.push({
      address: address,
      chain: chain,

      totalStake: '0',
      ownStake: '0',
      otherStake: '0',

      minBond: '0',
      nominatorCount: 0,
      commission: 0,

      blocked: false,
      isVerified: false,

      identity: name,
      isCrowded: false
    });
  }

  return allDelegatesInfo;
}

export async function getTaoBondingExtrinsic (substrateApi: _SubstrateApi, amount: string, selectedValidatorInfo: ValidatorInfo) {
  const chainApi = await substrateApi.isReady;
  const bnAmount = new BN(amount);
  const hotkey = selectedValidatorInfo.address;

  // for test
  // 5Fjp4r8cvWexkWUVb756LkopTVjmzXHBT4unpDN6SzwmQq8E
  // 5DG4VHT3gKZDEQ3Tx4oVPpejaz64FeDtNPhbAYTLFBmygHUW
  return chainApi.api.tx.subtensorModule.addStake(hotkey, bnAmount);
}

export async function getTaoUnbondingExtrinsic (substrateApi: _SubstrateApi, amount: string, hotkey: string) {
  const chainApi = await substrateApi.isReady;
  const bnAmount = new BN(amount);

  return chainApi.api.tx.subtensorModule.removeStake(hotkey, bnAmount);
}
