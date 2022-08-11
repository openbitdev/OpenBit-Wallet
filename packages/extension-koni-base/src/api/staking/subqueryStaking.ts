// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { APIItemState, StakingRewardItem, StakingRewardJson } from '@subwallet/extension-base/background/KoniTypes';
import { PREDEFINED_NETWORKS } from '@subwallet/extension-koni-base/api/predefinedNetworks';
import { SUBQUERY_ENDPOINTS, SUPPORTED_STAKING_CHAINS } from '@subwallet/extension-koni-base/api/staking/config';
import { reformatAddress, toUnit } from '@subwallet/extension-koni-base/utils';

interface StakingResponseItem {
  id: string,
  amount: string
}

const getSubqueryStakingReward = async (accounts: string[], chain: string): Promise<StakingRewardItem> => {
  const amounts = await Promise.all(accounts.map(async (account) => {
    const parsedAccount = reformatAddress(account, PREDEFINED_NETWORKS[chain].ss58Format);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resp = await fetch(SUBQUERY_ENDPOINTS[chain], {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
        query {
          accumulatedRewards (filter: {id: {equalTo: "${parsedAccount}"}}) {
            nodes {
              id
              amount
            }
          }
        }
      `
      })
    }).then((res) => res.json());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const respData = resp.data as Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const rewardList = respData.accumulatedRewards.nodes as StakingResponseItem[];

    if (rewardList.length > 0) {
      return parseFloat(rewardList[0].amount);
    }

    return 0;
  }));

  let parsedAmount = 0;

  for (const amount of amounts) {
    parsedAmount += amount;
  }

  // @ts-ignore
  parsedAmount = toUnit(parsedAmount, PREDEFINED_NETWORKS[chain].decimals);

  return {
    name: PREDEFINED_NETWORKS[chain].chain,
    chainId: chain,
    totalReward: parsedAmount.toString(),
    state: APIItemState.READY
  } as StakingRewardItem;
};

export const getAllSubqueryStakingReward = async (accounts: string[]): Promise<StakingRewardJson> => {
  let rewardList: StakingRewardItem[] = [];

  const rewardItems = await Promise.all(SUPPORTED_STAKING_CHAINS.map(async (chain) => {
    return await getSubqueryStakingReward(accounts, chain);
  }));

  rewardList = rewardList.concat(rewardItems);

  return {
    details: rewardList
  } as StakingRewardJson;
};
