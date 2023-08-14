// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtrinsicType, StakingType } from '@subwallet/extension-base/background/KoniTypes';
import { detectTranslate } from '@subwallet/extension-base/utils';
import { SendNftParams, StakeParams } from '@subwallet/extension-koni-ui/types';

import { ALL_KEY } from './common';

export const TRANSACTION_TITLE_MAP: Record<ExtrinsicType, string> = {
  [ExtrinsicType.TRANSFER_BALANCE]: detectTranslate('Transfer'),
  [ExtrinsicType.TRANSFER_XCM]: detectTranslate('Transfer'),
  [ExtrinsicType.TRANSFER_TOKEN]: detectTranslate('Transfer'),
  [ExtrinsicType.SEND_NFT]: detectTranslate('Transfer NFT'),
  [ExtrinsicType.CROWDLOAN]: detectTranslate('Crowdloan'),
  [ExtrinsicType.STAKING_JOIN_POOL]: detectTranslate('Add to bond'),
  [ExtrinsicType.STAKING_BOND]: detectTranslate('Add to bond'),
  [ExtrinsicType.STAKING_LEAVE_POOL]: detectTranslate('Unbond'),
  [ExtrinsicType.STAKING_UNBOND]: detectTranslate('Unbond'),
  [ExtrinsicType.STAKING_WITHDRAW]: detectTranslate('Withdraw'),
  [ExtrinsicType.STAKING_POOL_WITHDRAW]: detectTranslate('Withdraw'),
  [ExtrinsicType.STAKING_LEAVE_POOL]: detectTranslate('Unbond'),
  [ExtrinsicType.STAKING_CANCEL_UNSTAKE]: detectTranslate('Cancel unstake'),
  [ExtrinsicType.STAKING_CLAIM_REWARD]: detectTranslate('Claim rewards'),
  [ExtrinsicType.STAKING_COMPOUNDING]: detectTranslate('Compound'),
  [ExtrinsicType.STAKING_CANCEL_COMPOUNDING]: detectTranslate('Cancel compound'),
  [ExtrinsicType.EVM_EXECUTE]: detectTranslate('Execute'),
  [ExtrinsicType.UNKNOWN]: detectTranslate('Unknown')
};

export const ALL_STAKING_ACTIONS: ExtrinsicType[] = [
  ExtrinsicType.STAKING_JOIN_POOL,
  ExtrinsicType.STAKING_BOND,
  ExtrinsicType.STAKING_LEAVE_POOL,
  ExtrinsicType.STAKING_UNBOND,
  ExtrinsicType.STAKING_WITHDRAW,
  ExtrinsicType.STAKING_POOL_WITHDRAW,
  ExtrinsicType.STAKING_LEAVE_POOL,
  ExtrinsicType.STAKING_CANCEL_UNSTAKE,
  ExtrinsicType.STAKING_CLAIM_REWARD,
  ExtrinsicType.STAKING_COMPOUNDING,
  ExtrinsicType.STAKING_CANCEL_COMPOUNDING
];

export const DEFAULT_NFT_PARAMS: SendNftParams = {
  asset: '',
  chain: '',
  collectionId: '',
  from: '',
  to: '',
  itemId: ''
};

export const DEFAULT_STAKE_PARAMS: StakeParams = {
  asset: '',
  chain: '',
  defaultChain: ALL_KEY,
  defaultType: ALL_KEY,
  from: '',
  nominate: '',
  pool: '',
  type: '' as StakingType,
  value: ''
};
