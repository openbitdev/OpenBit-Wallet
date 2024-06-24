// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Brc20Metadata, Inscription, InscriptionFetchedData } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { HiroService } from '@subwallet/extension-base/services/hiro-service';

// todo: handle inscription testnet
export async function getBrc20Metadata (isTestnet = false, ticker: string) {
  const hiroService = HiroService.getInstance(isTestnet);
  const defaultMetadata = {
    ticker: '',
    decimals: 0
  } as Brc20Metadata;

  try {
    const response = await hiroService.getBRC20Metadata(ticker);
    const rs = response?.token;

    if (rs) {
      return {
        ticker: rs.ticker,
        decimals: rs.decimals
      } as Brc20Metadata;
    }

    return defaultMetadata;
  } catch (error) {
    console.log(`Error on request brc20 metadata with ticker ${ticker}`);

    return defaultMetadata;
  }
}

export async function getInscriptionContent (inscriptionId: string) {
  const hiroService = HiroService.getInstance();

  try {
    return await hiroService.getInscriptionContent(inscriptionId);
  } catch (error) {
    console.log(`Error on request inscription ${inscriptionId} content`);

    return {};
  }
}

// todo: handle large inscriptions
export async function getAddressInscriptions (address: string, isCompress = true) {
  const inscriptionsFullList: Inscription[] = [];
  const pageSize = 60;
  let offset = 0;

  const hiroService = HiroService.getInstance();

  try {
    while (true) {
      const response = await hiroService.getAddressInscriptionsInfo({
        limit: String(pageSize),
        offset: String(offset),
        address: String(address)
      }) as unknown as InscriptionFetchedData;

      const inscriptions = response.results;

      if (inscriptions.length !== 0 && !(isCompress && offset >= 360)) {
        inscriptionsFullList.push(...inscriptions);
        offset += pageSize;
      } else {
        break;
      }
    }

    return inscriptionsFullList;
  } catch (error) {
    console.error(`Failed to get ${address} inscriptions`, error);
    throw error;
  }
}

export function getPreviewUrl (inscriptionId: string) {
  const hiroService = HiroService.getInstance();

  try {
    return hiroService.getPreviewUrl(inscriptionId);
  } catch (error) {
    console.error(`Failed to get inscription ${inscriptionId} preview url`, error);
    throw error;
  }
}

export function isValidBrc20Ticker (ticker: string) {
  const bytesLength = getByteLength(ticker);

  return bytesLength === 4 || bytesLength === 5;
}

function getByteLength (str: string): number {
  const encoder = new TextEncoder();
  const encodedStr = encoder.encode(str);

  // Return the length of the encoded array, which represents the number of bytes
  return encodedStr.length;
}
