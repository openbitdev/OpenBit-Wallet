// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';

interface RunesInfo {
  amount: string,
  amount_decimal: string,
  address: string,
  rune: {
    rune_id: string,
    rune: string,
    divisibility: number,
    symbol: string
  }
}

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

  getAddressRunesInfo (address: string, params: Record<string, string>, isTestnet = false): Promise<RunesInfo> {
    return this.addRequest(async () => {
      const url =  this.getUrl(isTestnet, `address/${address}/runes`);
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        // todo: update error
        throw new SWError('BTCScanService.getAddressSummaryInfo', await rs.text());
      }

      return (await rs.json()) as RunesInfo;
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
