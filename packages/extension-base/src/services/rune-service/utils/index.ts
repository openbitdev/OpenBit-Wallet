// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RunesCollectionInfo, RunesCollectionInfoResponse } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { RunesService } from '@subwallet/extension-base/services/rune-service';

export async function getAllCollectionRunes () {
  const runesCollectionFullList: RunesCollectionInfo[] = [];
  const pageSize = 15000;
  let offset = 0;

  const runeService = RunesService.getInstance();

  try {
    while (true) {
      const response = await runeService.getRuneCollectionsByBatch({
        limit: String(pageSize),
        offset: String(offset)
      }) as unknown as RunesCollectionInfoResponse;

      let runes: RunesCollectionInfo[] = [];

      if (response.statusCode === 200) {
        runes = response.data.runes;
      } else {
        console.log(`Error on request batch rune collection information with pageSize ${pageSize} and offset ${offset}`);
        break;
      }

      if (runes.length !== 0) {
        runesCollectionFullList.push(...runes);
        offset += pageSize;
      } else {
        break;
      }
    }

    return runesCollectionFullList;
  } catch (error) {
    console.error('Failed to get rune collections', error);
    throw error;
  }
}

export async function getRuneMetadata (runeid: string) {
  const runeService = RunesService.getInstance();

  try {
    return await runeService.getRuneMetadata(runeid);
  } catch (error) {
    console.error(`Failed to get rune ${runeid} metadata`, error);
    throw error;
  }
}
