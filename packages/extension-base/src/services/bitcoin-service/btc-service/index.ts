// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { AccountBalances, AccountTransaction, BTCRequest, BTCResponse } from '@subwallet/extension-base/services/bitcoin-service/btc-service/types';
import fetch from 'cross-fetch';

import { BTC_API_CHAIN_MAP } from './btc-chain-map';

export class BTCService {
  private limitRate = 1; // limit per interval check
  private intervalCheck = 1000; // interval check in ms
  private maxRetry = 9; // interval check in ms
  private requestMap: Record<number, BTCRequest<any>> = {};
  private nextId = 0;
  private isRunning = false;
  private getId () {
    return this.nextId++;
  }

  private btcChainMap: Record<string, string>;

  constructor (options?: {limitRate?: number, intervalCheck?: number, maxRetry?: number}) {
    this.btcChainMap = BTC_API_CHAIN_MAP;
    this.limitRate = options?.limitRate || this.limitRate;
    this.intervalCheck = options?.intervalCheck || this.intervalCheck;
    this.maxRetry = options?.maxRetry || this.maxRetry;
  }

  private getApiUrl (chain: string, path: string) {
    const btcScanChain = this.btcChainMap[chain];

    if (!btcScanChain) {
      throw new SWError('NOT_SUPPORTED', 'Chain is not supported');
    }

    return `https://blockstream.info/${btcScanChain}/api/${path}`;
  }

  private getRequest (url: string) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // @ts-ignore
  private postRequest (url: string, body: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  public addRequest<T> (run: BTCRequest<T>['run']) {
    const newId = this.getId();

    return new Promise<T>((resolve, reject) => {
      this.requestMap[newId] = {
        id: newId,
        status: 'pending',
        retry: -1,
        run,
        resolve,
        reject
      };

      if (!this.isRunning) {
        this.process();
      }
    });
  }

  private process () {
    this.isRunning = true;
    const maxRetry = this.maxRetry;

    const interval = setInterval(() => {
      const remainingRequests = Object.values(this.requestMap);

      if (remainingRequests.length === 0) {
        this.isRunning = false;
        clearInterval(interval);

        return;
      }

      // Get first this.limit requests base on id
      const requests = remainingRequests
        .filter((request) => request.status !== 'running')
        .sort((a, b) => a.id - b.id)
        .slice(0, this.limitRate);

      // Start requests
      requests.forEach((request) => {
        request.status = 'running';
        request.run().then((rs) => {
          request.resolve(rs);
        }).catch((e) => {
          if (request.retry < maxRetry) {
            request.status = 'pending';
            request.retry++;
          } else {
            // Reject request
            request.reject(new SWError('MAX_RETRY', String(e)));
          }
        });
      });
    }, this.intervalCheck);
  }

  public checkSupportedSubscanChain (chain: string): boolean {
    return !!this.btcChainMap[chain];
  }

  public setSubscanChainMap (btcChainMap: Record<string, string>) {
    this.btcChainMap = btcChainMap;
  }

  public getAddressUTXO (chain: string, address: string): Promise<AccountBalances[]> {
    return this.addRequest(async () => {
      const url = `${this.getApiUrl(chain, `/address/${address}/utxo`)}`;
      const rs = await this.getRequest(url);

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressUTXO', await rs.text());
      }

      const jsonData = (await rs.json()) as BTCResponse<AccountBalances[]>;

      return jsonData.data;
    });
  }

  public getAddressTransaction (chain: string, address: string): Promise<AccountTransaction[]> {
    return this.addRequest(async () => {
      const url = `${this.getApiUrl(chain, `/address/${address}/txs`)}`;
      const rs = await this.getRequest(url);

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressUTXO', await rs.text());
      }

      const jsonData = (await rs.json()) as BTCResponse<AccountTransaction[]>;

      return jsonData.data;
    });
  }
}
