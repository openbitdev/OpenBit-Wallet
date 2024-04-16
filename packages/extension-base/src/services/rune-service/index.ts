// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { RuneInfoByAddress, RunesCollectionInfo } from '@subwallet/extension-base/services/bitcoin-service/types';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';

const RUNE_ALPHA_ENDPOINT = 'https://api2.runealpha.xyz';

export class RunesService extends BaseApiRequestStrategy {
  private constructor () {
    const context = new BaseApiRequestContext();

    super(context);
  }

  isRateLimited (): boolean {
    return false;
  }

  getUrl (isTestnet: boolean, path: string): string {
    if (!isTestnet) {
      return `${RUNE_ALPHA_ENDPOINT}/${path}`;
    } else {
      // todo: update testnet url
      return '';
    }
  }

  getAddressRunesInfo (address: string, params: Record<string, string>, isTestnet = false): Promise<RuneInfoByAddress> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, `address/${address}/runes`);
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        // todo: update error
        throw new SWError('RuneScanService.getAddressRunesInfo', await rs.text());
      }

      return (await rs.json()) as RuneInfoByAddress;
    }, 0);
  }

  getRuneCollectionsByBatch (params: Record<string, string>, isTestnet = false): Promise<RunesCollectionInfo> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, 'rune');
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        // todo: update error
        throw new SWError('RuneScanService.getRuneCollectionsByBatch', await rs.text());
      }

      return (await rs.json()) as RunesCollectionInfo;
    }, 0);
  }

  // Singleton
  private static _instance: RunesService;

  public static getInstance () {
    if (!RunesService._instance) {
      RunesService._instance = new RunesService();
    }

    return RunesService._instance;
  }
}
