// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinBalanceMetadata, NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { AccountProxy } from '@subwallet/extension-base/background/types';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-base/constants';
import { ORDINAL_COLLECTION_INFO, ORDINAL_COLLECTION_INFO_TEST } from '@subwallet/extension-base/koni/api/nft/inscription';
import { BalanceInfo } from '@subwallet/extension-base/types';

export interface INftCollectionDetail {
  collectionInfo: NftCollection
}

export interface INftItemDetail {
  collectionInfo: NftCollection,
  nftItem: NftItem
}
export enum ContentType {
  Audio = 'audio',
  TextHTML = 'text/html',
  ImageSVG = 'image/svg',
  ImageGIF = 'image/gif',
  Video = 'video',
  Image = 'image',
  AppJson = 'application/json'
}
interface NftItemProperties {
  [key: string]: unknown;
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
  if (!accountProxy || ![ORDINAL_COLLECTION_INFO.collectionId, ORDINAL_COLLECTION_INFO_TEST.collectionId].includes(collectionId)) {
    return itemsLength;
  }

  const isTestnet = collectionId === ORDINAL_COLLECTION_INFO_TEST.collectionId;

  if (accountProxy.proxyId === ALL_ACCOUNT_KEY) {
    const totalInscription = getTotalInscriptions(ALL_ACCOUNT_KEY, balanceMap, isTestnet);

    if (totalInscription) {
      return totalInscription;
    }
  } else {
    const targetAccountType = isTestnet ? 'bittest-86' : 'bitcoin-86';

    for (const account of accountProxy.accounts) {
      if (account.type !== targetAccountType) {
        continue;
      }

      const totalInscription = getTotalInscriptions(account.address, balanceMap, isTestnet);

      if (totalInscription) {
        return totalInscription;
      }
    }
  }

  return itemsLength;
}

export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);

    return true;
  } catch {
    return false;
  }
};

export const getContentType = (nftItemProperties: NftItemProperties | null | undefined): string => {
  if (nftItemProperties) {
    const contentTypeEntry = Object.entries(nftItemProperties).find(([attName]) => attName === 'content_type');

    if (contentTypeEntry) {
      const { value: attValue } = contentTypeEntry[1] as Record<string, string>;

      return attValue;
    }
  }

  return '';
};

export const determineContentType = (contentType: string): ContentType | undefined => {
  if (contentType.includes(ContentType.Audio)) {
    return ContentType.Audio;
  }

  if (contentType.includes(ContentType.TextHTML)) {
    return ContentType.TextHTML;
  }

  if (contentType.includes(ContentType.ImageSVG)) {
    return ContentType.ImageSVG;
  }

  if (contentType.includes(ContentType.ImageGIF)) {
    return ContentType.ImageGIF;
  }

  if (contentType.includes(ContentType.Video)) {
    return ContentType.Video;
  }

  if (contentType.includes(ContentType.Image)) {
    return ContentType.Image;
  }

  if (contentType.includes(ContentType.AppJson)) {
    return ContentType.AppJson;
  }

  return undefined;
};
