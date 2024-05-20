// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Brc20Metadata } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { HiroService } from '@subwallet/extension-base/services/hiro-service';

export async function getBrc20Metadata (ticker: string) {
  const hiroService = HiroService.getInstance();
  const defaultMetadata = {
    ticker: '',
    decimals: 0
  } as Brc20Metadata;

  try {
    const response = await hiroService.getBRC20Metadata(ticker);
    const rs = response.results;

    if (rs.length !== 0) {
      for (const brc20 of rs) { // the API response all brc-20 start with ticker instead of exactly equal to ticker
        if (brc20.ticker === ticker) {
          return {
            ticker,
            decimals: brc20.decimals
          } as Brc20Metadata;
        }
      }
    }

    return defaultMetadata;
  } catch (error) {
    console.log(`Error on request brc20 metadata with ticker ${ticker}`);

    return defaultMetadata;
  }
}
