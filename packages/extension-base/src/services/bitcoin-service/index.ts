// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { AccountBalances, BTCRequest, BTCResponse, TransfersListResponse } from '@subwallet/extension-base/services/bitcoin-service/btc-service/types';
import { BitcoinApiProxy } from '@subwallet/extension-base/services/chain-service/types';

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

  public getAddressUTXO (getRequest: BitcoinApiProxy['getRequest'], address: string): Promise<AccountBalances[]> {
    return this.addRequest(async () => {
      const rs = await getRequest(`/address/${address}/utxo`);

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressUTXO', await rs.text());
      }

      const jsonData = (await rs.json()) as BTCResponse<AccountBalances[]>;

      return jsonData.data;
    });
  }

  public getAddressTransaction (getRequest: BitcoinApiProxy['getRequest'], address: string): Promise<TransfersListResponse[]> {
    return this.addRequest(async () => {
      const rs = await getRequest(`/address/${address}/txs`);

      if (rs.status !== 200) {
        throw new SWError('BTCScanService.getAddressUTXO', await rs.text());
      }

      const jsonData = (await rs.json()) as BTCResponse<TransfersListResponse[]>;

      return jsonData.data;
    });
  }
}
