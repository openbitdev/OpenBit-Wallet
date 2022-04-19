// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountJson } from '@koniverse/extension-base/background/types';
import { NftItem, TransactionHistoryItemType } from '@koniverse/extension-koni-base/background/types';

export type CurrentAccountType = {
  account?: AccountJson | null;
}

export type TransactionHistoryReducerType = {
  historyMap: Record<string, TransactionHistoryItemType[]>
}

export type TransferNftParams = {
  nftItem: NftItem;
  collectionImage?: string;
  collectionId: string;
}
