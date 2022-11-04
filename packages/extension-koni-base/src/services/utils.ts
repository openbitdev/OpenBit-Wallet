// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceItem } from '@subwallet/extension-base/background/KoniTypes';

export enum PouchDBDataType {
  BALANCE = 'balance',
  NFT = 'nft',
  NFT_COLLECTION = 'nftCollection'
}

export interface _BalanceItem extends BalanceItem {
  _id: string;
  _type: PouchDBDataType
}
