// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { _BEAR_TOKEN } from '@subwallet/extension-base/services/chain-service/constants';
import { RunesCollectionInfoResponse, RunesInfoByAddressResponse, RuneTxsResponse, RuneUtxoResponse } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { OBResponse } from '@subwallet/extension-base/services/chain-service/types';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';

// const RUNE_ALPHA_ENDPOINT = 'https://mainnet-indexer-api.runealpha.xyz'; // todo: need update later
const OPENBIT_URL = 'https://api.openbit.app';

export class RunesService extends BaseApiRequestStrategy {
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

  getAddressRunesInfo (address: string, params: Record<string, string>, isTestnet = false): Promise<RunesInfoByAddressResponse> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, `address/${address}/runes`);
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        throw new SWError('RuneScanService.getAddressRunesInfo', await rs.text());
      }

      return (await rs.json()) as RunesInfoByAddressResponse;
    }, 1);
  }

  getRuneCollectionsByBatch (params: Record<string, string>, isTestnet = false): Promise<RunesCollectionInfoResponse> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, 'rune');
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        throw new SWError('RuneScanService.getRuneCollectionsByBatch', await rs.text());
      }

      return (await rs.json()) as RunesCollectionInfoResponse;
    }, 1);
  }

  getAddressRuneTxs (address: string, params: Record<string, string>, isTestnet = false): Promise<RuneTxsResponse> {
    return this.addRequest(async () => {
      const url = this.getUrl(isTestnet, `address/${address}/txs`);
      const rs = await getRequest(url, params);

      if (rs.status !== 200) {
        throw new SWError('RuneScanService.getAddressRuneTxs', await rs.text());
      }

      return (await rs.json()) as RuneTxsResponse;
    }, 0);
  }

  getAddressRuneUtxos (address: string, isTestnet = false): Promise<RuneUtxoResponse> {
    return this.addRequest(async () => {
      const _rs = await getRequest(this.getUrl(isTestnet, `rune/address/${address}/utxo`), undefined, this.headers);
      const rs = await _rs.json() as OBResponse<RuneUtxoResponse>;

      if (rs.status_code !== 200) {
        throw new SWError('RuneScanService.getAddressRuneUtxos', rs.message);
      }

      return rs.result;
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
