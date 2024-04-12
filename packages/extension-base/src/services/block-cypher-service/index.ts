// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { ApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/types';
import { postRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';

import { BlockCypherTransactionCreateResponse } from './types';

interface BlockCypherError {
  error: string;
}

const BLOCK_CYPHER_API_URL = 'https://api.blockcypher.com/v1/btc';

export class BlockCypherService extends BaseApiRequestStrategy {
  // eslint-disable-next-line no-useless-constructor
  private constructor (context: ApiRequestContext) {
    super(context);
  }

  // Singleton
  private static _instance: BlockCypherService;

  public static getInstance () {
    if (!BlockCypherService._instance) {
      const context = new BaseApiRequestContext();

      BlockCypherService._instance = new BlockCypherService(context);
    }

    return BlockCypherService._instance;
  }

  override isRateLimited (e: Error): boolean {
    const error = JSON.parse(e.message) as BlockCypherError;

    return error.error === 'Limits reached.';
  }

  getApiUrl (isTestnet: boolean, path: string): string {
    return `${BLOCK_CYPHER_API_URL}/${isTestnet ? 'test3' : 'main'}/${path}`;
  }

  async createTransaction (isTestnet: boolean, bodyData: unknown): Promise<BlockCypherTransactionCreateResponse> {
    return this.addRequest(async () => {
      const rs = await postRequest(this.getApiUrl(isTestnet, 'txs/new'), bodyData);

      if (rs.status !== 200 && rs.status !== 400) {
        throw new Error(await rs.text());
      }

      const data = await rs.json() as BlockCypherTransactionCreateResponse;

      const filteredErrors = data.errors.filter((error) => !error.error.includes('Not enough funds after fees in')); // Case not enough funds to pay fee, some time estimate fee is not correct
      const isError = !!filteredErrors.length;

      const doubleSpend = data.tx.double_spend;

      if (isError) {
        throw new Error(filteredErrors[0].error);
      } else if (doubleSpend) {
        throw new Error('Transaction has been double spent');
      }
    }, 0);
  }
}
