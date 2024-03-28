// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { AccountBalances, BTCRequest, BTCResponse, TransferItemBitcoin } from '@subwallet/extension-base/services/bitcoin-service/btc-service/types';
import fetch from 'cross-fetch';

export class BitcoinService {
  private limitRate = 1; // limit per interval check
  private intervalCheck = 1000; // interval check in ms
  private maxRetry = 9; // interval check in ms
  private requestMap: Record<number, BTCRequest<any>> = {};
  private nextId = 0;
  private isRunning = false;
  private getId () {
    return this.nextId++;
  }

  constructor (options?: {limitRate?: number, intervalCheck?: number, maxRetry?: number}) {
    this.limitRate = options?.limitRate || this.limitRate;
    this.intervalCheck = options?.intervalCheck || this.intervalCheck;
    this.maxRetry = options?.maxRetry || this.maxRetry;
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

  getRequest (baseUrl: string, urlPath: string, params?: Record<string, string>, headers?: Record<string, string>) {
    const queryString = params
      ? Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')
      : '';

    const url = `${baseUrl}/${urlPath}?${queryString}`;

    return fetch(url, {
      method: 'GET',
      headers: headers || {
        'Content-Type': 'application/json'
      }
    });
  }

  postRequest (baseUrl: string, urlPath: string, body?: BodyInit, headers?: Record<string, string>) {
    const url = `${baseUrl}/${urlPath}`;

    return fetch(url, {
      method: 'POST',
      headers: headers || {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }

  public getAddressUTXO (baseUrl: string, address: string): Promise<AccountBalances[]> {
    return this.addRequest(async () => {
      const rs = await this.getRequest(baseUrl, `/address/${address}/utxo`);

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressUTXO', await rs.text());
      }

      const jsonData = (await rs.json()) as BTCResponse<AccountBalances[]>;

      return jsonData.data;
    });
  }

  public getAddressTransaction (baseUrl: string, address: string, limit = 100): Promise<TransferItemBitcoin[]> {
    return this.addRequest(async () => {
      const rs = await this.getRequest(baseUrl, `/address/${address}/txs`, {
        limit: `${limit}`
      });

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressTransaction', await rs.text());
      }

      return (await rs.json()) as TransferItemBitcoin[];
    });
  }
}
