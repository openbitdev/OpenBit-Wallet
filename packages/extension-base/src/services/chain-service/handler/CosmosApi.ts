// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StargateClient } from '@cosmjs/stargate';
import { Tendermint34Client, TendermintClient } from '@cosmjs/tendermint-rpc';
import { _CosmosInfo } from '@subwallet/chain-list/types';
import { _CosmosApi } from '@subwallet/extension-base/services/chain-service/types';
import { BehaviorSubject } from 'rxjs';

export class CosmosApi implements _CosmosApi {
  api: StargateClient;
  apiUrl: string;
  chainSlug: string;

  tendermintClient: TendermintClient;
  restEndpoint: string;

  isApiConnected: boolean;
  isApiReady: boolean;
  isApiReadyOnce: boolean;

  intervalCheckApi: NodeJS.Timer;
  public readonly isApiConnectedSubject = new BehaviorSubject(false);

  static async create (chainSlug: string, apiProvider: string, cosmosChainInfo: _CosmosInfo): Promise<CosmosApi> {
    const tendermint = await Tendermint34Client.connect(apiProvider);
    const stargateClient = await StargateClient.create(tendermint);

    return new CosmosApi(chainSlug, apiProvider, cosmosChainInfo, stargateClient, tendermint);
  }

  protected constructor (chainSlug: string, apiProvider: string, cosmosChainInfo: _CosmosInfo, api: StargateClient, tendermint: TendermintClient) {
    this.chainSlug = chainSlug;
    this.apiUrl = apiProvider;
    this.restEndpoint = cosmosChainInfo.rest;
    this.api = api;
    this.tendermintClient = tendermint;

    this.intervalCheckApi = this.createIntervalCheckApi();

    // TODO: need to research Stargate package
    this.isApiConnected = true;
    this.isApiReady = true;
    this.isApiReadyOnce = true;
  }

  createIntervalCheckApi () {
    this.intervalCheckApi && clearInterval(this.intervalCheckApi);

    return setInterval(() => {
      this.tendermintClient.status()
        .then((status) => {
          if (status.syncInfo.catchingUp) { // TODO: there might be a better way
            this.onConnect();
          }
        }).catch(() => {
          this.onDisconnect();
        });
    }, 10000);
  }

  connect (): void {
  }

  destroy (): Promise<void> {
    return Promise.resolve(undefined);
  }

  disconnect (): Promise<void> {
    return Promise.resolve(undefined);
  }

  recoverConnect (): Promise<void> {
    return Promise.resolve(undefined);
  }

  updateApiUrl (apiUrl: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  onConnect () {

  }

  onDisconnect () {

  }
}
