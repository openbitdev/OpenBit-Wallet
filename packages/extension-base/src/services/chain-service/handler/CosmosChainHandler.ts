// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AbstractChainHandler } from '@subwallet/extension-base/services/chain-service/handler/AbstractChainHandler';
import { _ChainBaseApi } from '@subwallet/extension-base/services/chain-service/types';
import { _ApiOptions } from '@subwallet/extension-base/services/chain-service/handler/types';
import { CosmosApi } from '@subwallet/extension-base/services/chain-service/handler/CosmosApi';
import { _CosmosInfo } from '@subwallet/chain-list/types';

export class CosmosChainHandler extends AbstractChainHandler {
  private cosmosApiMap: Record<string, CosmosApi> = {};

  getApiByChain (chain: string): _ChainBaseApi | undefined {
    return this.cosmosApiMap[chain];
  }

  initApi (chainSlug: string, apiUrl: string, { cosmosChainInfo }: Omit<_ApiOptions, 'metadata'>): Promise<_ChainBaseApi> {
    const existed = this.getApiByChain(chainSlug);

    if (existed) {
      existed.connect();

      if (apiUrl !== existed.apiUrl) {
        existed.updateApiUrl(apiUrl).catch(console.error);
      }

      return Promise.resolve(existed);
    }

    const api = CosmosApi.create(chainSlug, apiUrl, cosmosChainInfo as _CosmosInfo);

    return Promise.resolve(api);
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
