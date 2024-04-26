// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { BitcoinAddressSummaryInfo, BlockStreamBlock, BlockStreamFeeEstimates, BlockStreamTransactionStatus, BlockStreamUtxo, RunesInfoByAddress, RunesInfoByAddressResponse } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { BitcoinApiStrategy, BitcoinTransactionEventMap } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/types';
import { RunesService } from '@subwallet/extension-base/services/rune-service';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest, postRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';
import { BitcoinFeeInfo, BitcoinTx, UtxoResponseItem } from '@subwallet/extension-base/types';
import EventEmitter from 'eventemitter3';

export class BlockStreamRequestStrategy extends BaseApiRequestStrategy implements BitcoinApiStrategy {
  private readonly baseUrl: string;
  private timePerBlock = 0; // in milliseconds

  constructor (url: string) {
    const context = new BaseApiRequestContext();

    super(context);

    this.baseUrl = url;

    this.getBlockTime()
      .then((rs) => {
        this.timePerBlock = rs;
      })
      .catch(() => {
        this.timePerBlock = (url.includes('testnet') ? 5 * 60 : 10 * 60) * 1000;
      });
  }

  isRateLimited (): boolean {
    return false;
  }

  getUrl (path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  getBlockTime (): Promise<number> {
    return this.addRequest<number>(async () => {
      const rs = await getRequest(this.getUrl('blocks'));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getBlockTime', await rs.text());
      }

      const blocks = (await rs.json()) as BlockStreamBlock[];
      const lenght = blocks.length;
      const time = (blocks[0].timestamp - blocks[lenght - 1].timestamp) * 1000;

      return time / lenght;
    }, 0);
  }

  getAddressSummaryInfo (address: string): Promise<BitcoinAddressSummaryInfo> {
    return this.addRequest(async () => {
      const rs = await getRequest(this.getUrl(`address/${address}`));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getAddressSummaryInfo', await rs.text());
      }

      return (await rs.json()) as BitcoinAddressSummaryInfo;
    }, 0);
  }

  getAddressTransaction (address: string, limit = 100): Promise<BitcoinTx[]> {
    return this.addRequest(async () => {
      const rs = await getRequest(this.getUrl(`address/${address}/txs`), {
        limit: `${limit}`
      });

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getAddressTransaction', await rs.text());
      }

      return (await rs.json()) as BitcoinTx[];
    }, 1);
  }

  getTransactionStatus (txHash: string): Promise<boolean> {
    return this.addRequest(async () => {
      const rs = await getRequest(this.getUrl(`tx/${txHash}/status`));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getTransactionStatus', await rs.text());
      }

      const result = (await rs.json()) as BlockStreamTransactionStatus;

      return result.confirmed;
    }, 1);
  }

  getFeeRate (): Promise<BitcoinFeeInfo> {
    return this.addRequest<BitcoinFeeInfo>(async (): Promise<BitcoinFeeInfo> => {
      const rs = await getRequest(this.getUrl('fee-estimates'));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getFeeRate', await rs.text());
      }

      const result = (await rs.json()) as BlockStreamFeeEstimates;

      return {
        type: 'bitcoin',
        busyNetwork: false,
        options: {
          slow: { feeRate: Math.ceil(result['25']), time: this.timePerBlock * 25 },
          average: { feeRate: Math.ceil(result['10']), time: this.timePerBlock * 10 },
          fast: { feeRate: Math.ceil(result['1']), time: this.timePerBlock * 1 },
          default: 'slow'
        }
      };
    }, 0);
  }

  getUtxos (address: string): Promise<UtxoResponseItem[]> {
    return this.addRequest<UtxoResponseItem[]>(async (): Promise<UtxoResponseItem[]> => {
      const rs = await getRequest(this.getUrl(`address/${address}/utxo`));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getUtxos', await rs.text());
      }

      return (await rs.json()) as BlockStreamUtxo[];
    }, 0);
  }

  sendRawTransaction (rawTransaction: string) {
    const eventEmitter = new EventEmitter<BitcoinTransactionEventMap>();

    this.addRequest<string>(async (): Promise<string> => {
      const rs = await postRequest(this.getUrl('tx'), rawTransaction, { 'Content-Type': 'text/plain' }, false);

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.sendRawTransaction', await rs.text());
      }

      return await rs.text();
    }, 0)
      .then((value) => {
        eventEmitter.emit('extrinsicHash', value);

        // Check transaction status
        const interval = setInterval(() => {
          this.getTransactionStatus(value)
            .then((confirmed) => {
              if (confirmed) {
                clearInterval(interval);
                eventEmitter.emit('success');
              }
            })
            .catch(console.error);
        }, 30000);
      })
      .catch((error: Error) => {
        eventEmitter.emit('error', error.message);
      })
    ;

    return eventEmitter;
  }

  async getRunes (address: string) {
    const runesFullList: RunesInfoByAddress[] = [];
    const pageSize = 10;
    let offset = 0;

    const runeService = RunesService.getInstance();

    try {
      while (true) {
        const response = await runeService.getAddressRunesInfo(address, {
          limit: String(pageSize),
          offset: String(offset)
        }) as unknown as RunesInfoByAddressResponse;

        let runes: RunesInfoByAddress[] = [];

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

  getTxHex (txHash: string): Promise<string> {
    return this.addRequest<string>(async (): Promise<string> => {
      const rs = await getRequest(this.getUrl(`tx/${txHash}/hex`));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getTxHex', await rs.text());
      }

      return await rs.text();
    }, 0);
  }
}
