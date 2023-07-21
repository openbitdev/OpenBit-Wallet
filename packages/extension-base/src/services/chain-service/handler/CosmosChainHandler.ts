// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AbstractChainHandler } from '@subwallet/extension-base/services/chain-service/handler/AbstractChainHandler';
import { _ChainBaseApi } from '@subwallet/extension-base/services/chain-service/types';
import { _ApiOptions } from '@subwallet/extension-base/services/chain-service/handler/types';
import { CosmosApi } from '@subwallet/extension-base/services/chain-service/handler/CosmosApi';

export class CosmosChainHandler extends AbstractChainHandler {
  private cosmosApiMap: Record<string, CosmosApi> = {};

  getApiByChain (chain: string): _ChainBaseApi | undefined {
    return this.cosmosApiMap[chain];
  }

  initApi (chainSlug: string, apiUrl: string, { cosmosChainInfo, onUpdateStatus }: Omit<_ApiOptions, 'metadata'>): Promise<_ChainBaseApi> {
    const existed = this.getApiByChain(chainSlug);

    if (existed) {
      existed.connect();

      if (apiUrl !== existed.apiUrl) {
        existed.updateApiUrl(apiUrl).catch(console.error);
      }

      return existed;
    }

    const api = CosmosApi.create(chainSlug, apiUrl, cosmosChainInfo);

    return Promise.resolve(undefined);
  }

  recoverApi (chainSlug: string): void {
  }

  sleep (): Promise<void> {
    return Promise.resolve(undefined);
  }

  wakeUp (): Promise<void> {
    return Promise.resolve(undefined);
  }

}
