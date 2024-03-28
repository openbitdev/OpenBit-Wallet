// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/types-augment';

import { _ApiOptions } from '@subwallet/extension-base/services/chain-service/handler/types';
import { _BitcoinApi, _ChainConnectionStatus, BitcoinApiProxy } from '@subwallet/extension-base/services/chain-service/types';
import { createPromiseHandler, PromiseHandler } from '@subwallet/extension-base/utils/promise';
import fetch from 'cross-fetch';
import { BehaviorSubject } from 'rxjs';

class BitcoinApiProxyImp implements BitcoinApiProxy {
  private baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setBaseUrl (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getRequest (urlPath: string, params?: Record<string, string>, headers?: Record<string, string>) {
    const queryString = params
      ? Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')
      : '';

    const url = `${this.baseUrl}/${urlPath}?${queryString}`;

    return fetch(url, {
      method: 'GET',
      headers: headers || {
        'Content-Type': 'application/json'
      }
    });
  }

  postRequest (urlPath: string, body?: BodyInit, headers?: Record<string, string>) {
    const url = `${this.baseUrl}/${urlPath}`;

    return fetch(url, {
      method: 'POST',
      headers: headers || {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });
  }
}

export class BitcoinApi implements _BitcoinApi {
  chainSlug: string;
  api: BitcoinApiProxy;
  apiUrl: string;
  apiError?: string;
  apiRetry = 0;
  public readonly isApiConnectedSubject = new BehaviorSubject(false);
  public readonly connectionStatusSubject = new BehaviorSubject(_ChainConnectionStatus.DISCONNECTED);
  isApiReady = false;
  isApiReadyOnce = false;
  isReadyHandler: PromiseHandler<_BitcoinApi>;

  providerName: string;

  get isApiConnected (): boolean {
    return this.isApiConnectedSubject.getValue();
  }

  get connectionStatus (): _ChainConnectionStatus {
    return this.connectionStatusSubject.getValue();
  }

  private updateConnectionStatus (status: _ChainConnectionStatus): void {
    const isConnected = status === _ChainConnectionStatus.CONNECTED;

    if (isConnected !== this.isApiConnectedSubject.value) {
      this.isApiConnectedSubject.next(isConnected);
    }

    if (status !== this.connectionStatusSubject.value) {
      this.connectionStatusSubject.next(status);
    }
  }

  get isReady (): Promise<_BitcoinApi> {
    return this.isReadyHandler.promise;
  }

  async updateApiUrl (apiUrl: string) {
    this.apiUrl = apiUrl;
    this.api.setBaseUrl(apiUrl);

    await this.disconnect();
    this.connect();
  }

  async recoverConnect () {
    await this.isReadyHandler.promise;
  }

  constructor (chainSlug: string, apiUrl: string, { providerName }: _ApiOptions = {}) {
    this.chainSlug = chainSlug;
    this.apiUrl = apiUrl;
    this.providerName = providerName || 'unknown';
    this.api = new BitcoinApiProxyImp(apiUrl);
    this.isReadyHandler = createPromiseHandler<_BitcoinApi>();
    this.connect();
  }

  connect (): void {
    this.updateConnectionStatus(_ChainConnectionStatus.CONNECTING);

    this.onConnect();
  }

  async disconnect () {
    this.onDisconnect();

    this.updateConnectionStatus(_ChainConnectionStatus.DISCONNECTED);

    return Promise.resolve();
  }

  destroy () {
    return this.disconnect();
  }

  onConnect (): void {
    if (!this.isApiConnected) {
      console.log(`Connected to ${this.chainSlug} at ${this.apiUrl}`);
      this.isApiReady = true;

      if (this.isApiReadyOnce) {
        this.isReadyHandler.resolve(this);
      }
    }

    this.updateConnectionStatus(_ChainConnectionStatus.CONNECTED);
  }

  onDisconnect (): void {
    this.updateConnectionStatus(_ChainConnectionStatus.DISCONNECTED);

    if (this.isApiConnected) {
      console.warn(`Disconnected from ${this.chainSlug} of ${this.apiUrl}`);
      this.isApiReady = false;
      this.isReadyHandler = createPromiseHandler<_BitcoinApi>();
    }
  }
}
