// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { _BEAR_TOKEN } from '@subwallet/extension-base/services/chain-service/constants';
import { BitcoinAddressSummaryInfo, BlockStreamBlock, BlockStreamFeeEstimates, BlockStreamTransactionDetail, BlockStreamTransactionStatus, BlockStreamUtxo, Brc20BalanceItem, Inscription, InscriptionFetchedData, RunesInfoByAddress, RunesInfoByAddressResponse, RuneTxs, RuneTxsResponse } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { BitcoinApiStrategy, BitcoinTransactionEventMap } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/types';
import { OBResponse } from '@subwallet/extension-base/services/chain-service/types';
import { HiroService } from '@subwallet/extension-base/services/hiro-service';
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

  private headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${_BEAR_TOKEN}`
  };

  isRateLimited (): boolean {
    return false;
  }

  getUrl (path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  getBlockTime (): Promise<number> {
    return this.addRequest<number>(async () => {
      const _rs = await getRequest(this.getUrl('blocks'), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<BlockStreamBlock[]>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getBlockTime', rs.message);
      }

      const blocks = rs.result;
      const length = blocks.length;
      const sortedBlocks = blocks.sort((a, b) => b.timestamp - a.timestamp);
      const time = (sortedBlocks[0].timestamp - sortedBlocks[length - 1].timestamp) * 1000;

      return time / length;
    }, 0);
  }

  getAddressSummaryInfo (address: string): Promise<BitcoinAddressSummaryInfo> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(`address/${address}`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<BitcoinAddressSummaryInfo>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getAddressSummaryInfo', rs.message);
      }

      return rs.result;
    }, 0);
  }

  getAddressTransaction (address: string, limit = 100): Promise<BitcoinTx[]> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(`address/${address}/txs`), { limit: `${limit}` }, this.headers);
      const rs = await _rs.json() as OBResponse<BitcoinTx[]>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getAddressTransaction', rs.message);
      }

      return rs.result;
    }, 1);
  }

  getTransactionStatus (txHash: string): Promise<BlockStreamTransactionStatus> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(`tx/${txHash}/status`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<BlockStreamTransactionStatus>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getTransactionStatus', rs.message);
      }

      return rs.result;
    }, 1);
  }

  getTransactionDetail (txHash: string): Promise<BlockStreamTransactionDetail> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(`tx/${txHash}`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<BlockStreamTransactionDetail>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getTransactionDetail', rs.message);
      }

      return rs.result;
    }, 1);
  }

  getFeeRate (): Promise<BitcoinFeeInfo> {
    return this.addRequest<BitcoinFeeInfo>(async (): Promise<BitcoinFeeInfo> => {
      const _rs = await getRequest(this.getUrl('fee-estimates'), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<BlockStreamFeeEstimates>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getFeeRate', rs.message);
      }

      const result = rs.result;

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
      const _rs = await getRequest(this.getUrl(`address/${address}/utxo`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<BlockStreamUtxo[]>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getUtxos', rs.message);
      }

      return rs.result;
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
            .then((transactionStatus) => {
              if (transactionStatus.confirmed) {
                clearInterval(interval);
                eventEmitter.emit('success', transactionStatus);
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

  async getRuneTxsUtxos (address: string) {
    const txsFullList: RuneTxs[] = [];
    const pageSize = 10;
    let offset = 0;

    const runeService = RunesService.getInstance();

    try {
      while (true) {
        const response = await runeService.getAddressRuneTxs(address, {
          limit: String(pageSize),
          offset: String(offset)
        }) as unknown as RuneTxsResponse;

        let runesTxs: RuneTxs[] = [];

        if (response.statusCode === 200) {
          runesTxs = response.data.transactions;
        } else {
          console.log(`Error on request rune transactions for address ${address}`);
          break;
        }

        if (runesTxs.length !== 0) {
          txsFullList.push(...runesTxs);
          offset += pageSize;
        } else {
          break;
        }
      }

      return txsFullList;
    } catch (error) {
      console.error(`Failed to get ${address} transactions`, error);
      throw error;
    }
  }

  async getRuneUtxos (address: string) {
    const runeService = RunesService.getInstance();

    try {
      const responseRuneUtxos = await runeService.getAddressRuneUtxos(address);

      return responseRuneUtxos.utxo;
    } catch (error) {
      console.error(`Failed to get ${address} rune utxos`, error);
      throw error;
    }
  }

  async getAddressBRC20FreeLockedBalance (address: string, ticker: string): Promise<Brc20BalanceItem> {
    const hiroService = HiroService.getInstance();

    try {
      const response = await hiroService.getAddressBRC20BalanceInfo(address, {
        ticker: String(ticker)
      });

      const balanceInfo = response?.results[0];

      if (balanceInfo) {
        const rawFree = balanceInfo.transferrable_balance;
        const rawLocked = balanceInfo.available_balance;

        return {
          free: rawFree.replace('.', ''),
          locked: rawLocked.replace('.', '')
        } as Brc20BalanceItem;
      }
    } catch (error) {
      console.error(`Failed to get ${address} BRC20 balance for ticker ${ticker}`, error);
    }

    return {
      free: '0',
      locked: '0'
    } as Brc20BalanceItem;
  }

  async getAddressInscriptions (address: string) {
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

        if (inscriptions.length !== 0) {
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

  getTxHex (txHash: string): Promise<string> {
    return this.addRequest<string>(async (): Promise<string> => {
      const _rs = await getRequest(this.getUrl(`tx/${txHash}/hex`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<string>;

      if (rs.status_code !== 200) {
        throw new SWError('BlockStreamRequestStrategy.getTxHex', rs.message);
      }

      return rs.result;
    }, 0);
  }
}
