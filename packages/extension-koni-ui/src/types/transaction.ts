// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StakingType } from '@subwallet/extension-base/background/KoniTypes';

export interface TransactionFormBaseProps {
  from: string;
  chain: string;
  asset: string;
}

export interface SendNftParams extends TransactionFormBaseProps {
  collectionId: string;
  itemId: string;
  to: string;
}

export interface StakeParams extends TransactionFormBaseProps {
  value: string;
  nominate: string;
  pool: string;
  type: StakingType;
  defaultChain: string;
  defaultType: StakingType | 'all';
}
