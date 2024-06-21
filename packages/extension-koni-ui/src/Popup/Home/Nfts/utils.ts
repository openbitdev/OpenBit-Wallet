// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinBalanceMetadata, NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { AccountProxy } from '@subwallet/extension-base/background/types';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-base/constants';
import { ORDINAL_COLLECTION_INFO } from '@subwallet/extension-base/koni/api/nft/inscription';
import { BalanceInfo } from '@subwallet/extension-base/types';

export interface INftCollectionDetail {
  collectionInfo: NftCollection
}

export interface INftItemDetail {
  collectionInfo: NftCollection,
  nftItem: NftItem
}

// might set perPage based on screen height
export const NFT_PER_PAGE = 4;

function getTotalInscriptions (address: string, balanceMap: Record<string, BalanceInfo>, isTestnet = false): number | undefined {
  if (!isTestnet) {
    return (balanceMap[address]?.['bitcoin-NATIVE-BTC']?.metadata as BitcoinBalanceMetadata)?.inscriptionCount;
  }

  return (balanceMap[address]?.['bitcoinTestnet-NATIVE-BTC']?.metadata as BitcoinBalanceMetadata)?.inscriptionCount;
}

export function getTotalCollectionItems (
  collectionId: string,
  accountProxy: AccountProxy | null,
  balanceMap: Record<string, BalanceInfo>,
  itemsLength: number
): number {
  if (!accountProxy) {
    return itemsLength;
  }

  const isAllAccount = accountProxy.proxyId === ALL_ACCOUNT_KEY;
  const isTestnet = collectionId !== ORDINAL_COLLECTION_INFO.collectionId;
  const accountType = isTestnet ? 'bittest-86' : 'bitcoin-86';

  if (isAllAccount) {
    const totalInscription = getTotalInscriptions(ALL_ACCOUNT_KEY, balanceMap, isTestnet);

    if (totalInscription) {
      return totalInscription;
    }
  }

  for (const account of accountProxy.accounts) {
    if (account.type !== accountType) {
      continue;
    }

    const totalInscription = getTotalInscriptions(account.address, balanceMap, isTestnet);

    if (totalInscription) {
      return totalInscription;
    }
  }

  return itemsLength;
}
