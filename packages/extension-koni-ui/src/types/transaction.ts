// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface TransactionFormBaseProps {
  from: string;
  chain: string;
  asset: string;
}

export interface SendNftParam extends TransactionFormBaseProps {
  collectionId: string;
  itemId: string;
  to: string;
}
