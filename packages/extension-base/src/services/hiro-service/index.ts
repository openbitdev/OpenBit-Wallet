// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { Brc20BalanceFetchedData, Brc20MetadataFetchedData, InscriptionFetchedData } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';

const HIRO_ENDPOINT = 'https://ordinals-api.openbit.app/ordinals/v1';

export class HiroService extends BaseApiRequestStrategy {
  private constructor () {
    const context = new BaseApiRequestContext();

    super(context);
  }

  isRateLimited (): boolean {
    return false;
  }

  getUrl (isTestnet: boolean, path: string): string {
    if (!isTestnet) {
      return `${HIRO_ENDPOINT}/${path}`;
    } else {
      // todo: update testnet url
      return '';
    }
  }

  getBRC20Metadata (ticker: string, isTestnet = false): Promise<Brc20MetadataFetchedData> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, `brc-20/tokens/${ticker}`);

      const rs = await getRequest(url);

      if (rs.status !== 200) {
        throw new SWError('HiroService.getBRC20Metadata', await rs.text());
      }

      return (await rs.json()) as Brc20MetadataFetchedData;
    }, 0);
  }

  getAddressBRC20BalanceInfo (address: string, params: Record<string, string>, isTestnet = false): Promise<Brc20BalanceFetchedData> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, `brc-20/balances/${address}`);
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        throw new SWError('HiroService.getAddressBRC20BalanceInfo', await rs.text());
      }

      return (await rs.json()) as Brc20BalanceFetchedData;
    }, 0);
  }

  getAddressInscriptionsInfo (params: Record<string, string>, isTestnet = false): Promise<InscriptionFetchedData> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, 'inscriptions');
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        throw new SWError('HiroService.getAddressInscriptionsInfo', await rs.text());
      }

      return (await rs.json()) as InscriptionFetchedData;
    }, 0);
  }

  // Singleton
  private static _instance: HiroService;

  public static getInstance () {
    if (!HiroService._instance) {
      HiroService._instance = new HiroService();
    }

    return HiroService._instance;
  }
}
