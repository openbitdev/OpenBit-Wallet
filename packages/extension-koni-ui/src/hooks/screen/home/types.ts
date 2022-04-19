// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CrowdloanParaState, StakingItem, StakingRewardItem } from '@koniverse/extension-koni-base/background/types';
import { _NftCollection } from '@koniverse/extension-koni-ui/Popup/Home/Nfts/types';
import { BalanceValueType } from '@koniverse/extension-koni-ui/util';
import { BalanceInfo } from '@koniverse/extension-koni-ui/util/types';
import BigN from 'bignumber.js';

export type CrowdloanContributeValueType = {
  paraState?: CrowdloanParaState;
  contribute: BalanceValueType;
}

export type AccountBalanceType = {
  totalBalanceValue: BigN;
  networkBalanceMaps: Record<string, BalanceInfo>;
  crowdloanContributeMap: Record<string, CrowdloanContributeValueType>;
}

export type NftType = {
  nftList: _NftCollection[];
  totalItems: number;
  totalCollection: number;
  loading: boolean;
}

export type StakingDataType = {
  staking: StakingItem;
  reward: StakingRewardItem;
}

export type StakingType = {
  loading: boolean;
  data: StakingDataType[];
  priceMap: Record<string, number>;
}
