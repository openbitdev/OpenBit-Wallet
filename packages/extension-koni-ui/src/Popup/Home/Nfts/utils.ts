// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinBalanceMetadata, NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { AccountProxy } from '@subwallet/extension-base/background/types';
import { BalanceInfo } from '@subwallet/extension-base/types';

export interface INftCollectionDetail {
  collectionInfo: NftCollection,
  nftList: NftItem[]
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

  if (collectionId === 'INSCRIPTION') {
    for (const account of accountProxy.accounts) {
      if (account.type !== 'bitcoin-86') {
        continue;
      }

      const totalInscription = getTotalInscriptions(account.address, balanceMap);

      if (totalInscription) {
        return totalInscription;
      }
    }
  } else if (collectionId === 'INSCRIPTION_TESTNET') {
    for (const account of accountProxy.accounts) {
      if (account.type !== 'bittest-86') {
        continue;
      }

      const totalInscription = getTotalInscriptions(account.address, balanceMap, true);

      if (totalInscription) {
        return totalInscription;
      }
    }
  }

  return itemsLength;
}
