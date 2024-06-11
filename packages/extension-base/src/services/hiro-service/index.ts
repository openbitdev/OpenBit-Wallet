// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { _BEAR_TOKEN } from '@subwallet/extension-base/services/chain-service/constants';
import { Brc20BalanceFetchedData, Brc20MetadataFetchedData, InscriptionFetchedData } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { OBResponse } from '@subwallet/extension-base/services/chain-service/types';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';

const OPENBIT_URL = 'https://api.openbit.app';

export class HiroService extends BaseApiRequestStrategy {
  private constructor () {
    const context = new BaseApiRequestContext();

    super(context);
  }

  private headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${_BEAR_TOKEN}`
  };

  isRateLimited (): boolean {
    return false;
  }

  getUrl (isTestnet: boolean, path: string): string {
    if (!isTestnet) {
      return `${OPENBIT_URL}/${path}`;
    } else {
      // todo: update testnet url
      return '';
    }
  }

  getBRC20Metadata (ticker: string, isTestnet = false): Promise<Brc20MetadataFetchedData> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(isTestnet, `brc-20/tokens/${ticker}`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<Brc20MetadataFetchedData>;

      if (rs.status_code !== 200) {
        throw new SWError('HiroService.getBRC20Metadata', rs.message);
      }

      return rs.result;
    }, 3);
  }

  getAddressBRC20BalanceInfo (address: string, params: Record<string, string>, isTestnet = false): Promise<Brc20BalanceFetchedData> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(isTestnet, `brc-20/balances/${address}`), params, this.headers);
      const rs = await _rs.json() as OBResponse<Brc20BalanceFetchedData>;

      if (rs.status_code !== 200) {
        throw new SWError('HiroService.getAddressBRC20BalanceInfo', rs.message);
      }

      return rs.result;
    }, 3);
  }

  getAddressInscriptionsInfo (params: Record<string, string>, isTestnet = false): Promise<InscriptionFetchedData> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(isTestnet, 'inscriptions'), params, this.headers);
      const rs = await _rs.json() as OBResponse<InscriptionFetchedData>;

      if (rs.status_code !== 200) {
        throw new SWError('HiroService.getAddressInscriptionsInfo', rs.message);
      }

      return rs.result;
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
