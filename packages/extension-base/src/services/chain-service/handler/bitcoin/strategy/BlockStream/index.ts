// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest, postRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';
import { BitcoinFeeInfo, UtxoResponseItem } from '@subwallet/extension-base/types';
import EventEmitter from 'eventemitter3';

import { BitcoinApiStrategy, BitcoinTransactionEventMap } from '../../strategy/types';
import { BitcoinAddressSummaryInfo, BitcoinTransferItem, BlockStreamFeeEstimates, BlockStreamTransactionStatus, BlockStreamUtxo } from './types';

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
        throw new SWError('BlockStreamRequestStrategy.getAddressSummaryInfo', await rs.text());
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
        throw new SWError('BlockStreamRequestStrategy.getAddressTransaction', await rs.text());
      }

      return (await rs.json()) as BitcoinTransferItem[];
    }, 1);
  }

  getTransactionStatus (txHash: string): Promise<boolean> {
    return this.addRequest(async () => {
      const rs = await getRequest(this.getUrl(`/tx/${txHash}/status`));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getTransactionStatus', await rs.text());
      }

      const result = (await rs.json()) as BlockStreamTransactionStatus;

      return result.confirmed;
    }, 1);
  }

  getFeeRate (): Promise<BitcoinFeeInfo> {
    return this.addRequest<BitcoinFeeInfo>(async (): Promise<BitcoinFeeInfo> => {
      const rs = await getRequest(this.getUrl('/fee-estimates'));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getFeeRate', await rs.text());
      }

      const result = (await rs.json()) as BlockStreamFeeEstimates;

      return {
        type: 'bitcoin',
        busyNetwork: false,
        options: {
          slow: { feeRate: result['3'] },
          average: { feeRate: result['2'] },
          fast: { feeRate: result['1'] },
          default: 'slow'
        }
      };
    }, 0);
  }

  getUtxos (address: string): Promise<UtxoResponseItem[]> {
    return this.addRequest<UtxoResponseItem[]>(async (): Promise<UtxoResponseItem[]> => {
      const rs = await getRequest(this.getUrl(`/address/${address}/utxo`));

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getUtxos', await rs.text());
      }

      return (await rs.json()) as BlockStreamUtxo[];
    }, 0);
  }

  sendRawTransaction (rawTransaction: string) {
    const eventEmitter = new EventEmitter<BitcoinTransactionEventMap>();

    this.addRequest<string>(async (): Promise<string> => {
      const rs = await postRequest(this.getUrl('/tx'), rawTransaction, { 'Content-Type': 'text/plain' });

      if (rs.status !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getAddressTransaction', await rs.text());
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
        }, 1000);
      })
      .catch((error: Error) => {
        eventEmitter.emit('error', error.message);
      })
    ;

    return eventEmitter;
  }
}
