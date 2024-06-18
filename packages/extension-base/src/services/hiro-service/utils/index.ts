// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Brc20Metadata, InscriptionFetchedData } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { HiroService } from '@subwallet/extension-base/services/hiro-service';

// todo: handle inscription testnet
export async function getBrc20Metadata (ticker: string) {
  const hiroService = HiroService.getInstance();
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
export async function getAddressInscriptions (address: string, offset = 0, limit = 25) {
  const hiroService = HiroService.getInstance();

  try {
    const response = await hiroService.getAddressInscriptionsInfo({
      limit: String(limit),
      offset: String(offset),
      address: String(address)
    }) as unknown as InscriptionFetchedData;

    return response.results;
  } catch (error) {
    console.error(`Failed to get ${address} inscriptions with offset ${offset} and limit ${limit}`, error);
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
