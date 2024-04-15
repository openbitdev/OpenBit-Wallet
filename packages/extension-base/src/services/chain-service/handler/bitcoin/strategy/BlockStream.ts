// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { BitcoinAddressSummaryInfo, BitcoinTransferItem, Rune, RunesResponse } from '@subwallet/extension-base/services/bitcoin-service/types';
import { BitcoinApiStrategy, BitcoinTransactionEventMap } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/types';
import { RunesService } from '@subwallet/extension-base/services/rune-service/index.tx';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';
import EventEmitter from 'eventemitter3';

export class BlockStreamRequestStrategy extends BaseApiRequestStrategy implements BitcoinApiStrategy {
  private readonly baseUrl: string;

  constructor (url: string) {
    const context = new BaseApiRequestContext();

    super(context);

    this.baseUrl = url;
  }

  isRateLimited (): boolean {
    return false;
  }

  getUrl (path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  getAddressSummaryInfo (address: string): Promise<BitcoinAddressSummaryInfo> {
    return this.addRequest(async () => {
      const rs = await getRequest(this.getUrl(`/address/${address}`));

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressSummaryInfo', await rs.text());
      }

      return (await rs.json()) as BitcoinAddressSummaryInfo;
    }, 0);
  }

  getAddressTransaction (address: string, limit = 100): Promise<BitcoinTransferItem[]> {
    return this.addRequest(async () => {
      const rs = await getRequest(this.getUrl(`/address/${address}/txs`), {
        limit: `${limit}`
      });

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressTransaction', await rs.text());
      }

      return (await rs.json()) as BitcoinTransferItem[];
    }, 1);
  }

  sendRawTransaction (rawTransaction: string) {
    const eventEmitter = new EventEmitter<BitcoinTransactionEventMap>();

    return eventEmitter;
  }

  async getRunes (address: string) {
    const runesFullList: Rune[] = [];
    const pageSize = 10;
    let offset = 0;

    const runeService = RunesService.getInstance();

    try {
      while (true) {
        const response = await runeService.getAddressRunesInfo(address, {
          limit: String(pageSize),
          offset: String(offset)
        }) as unknown as RunesResponse;

        let runes: Rune[] = [];

        if (response.statusCode === 200) {
          runes = response.data.runes;
        } else {
          console.log(`Error on request runes data for address ${address}`);
          break;
        }

        if (runes.length !== 0) {
          runesFullList.push(...runes);
          offset += pageSize;
        } else {
          break;
        }
      }

      return runesFullList;
    } catch (error) {
      console.error(`Failed to get ${address} balances`, error);
      throw error;
    }
  }
}
