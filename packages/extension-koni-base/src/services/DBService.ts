// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BalanceStoreV2 from '@subwallet/extension-koni-base/db-stores/v2/Balance';
import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

export default class DBService {
  private _logger: Logger;
  public _stores;

  constructor (pouchDB: PouchDB.Database) {
    this._logger = createLogger('DB_SERVICE');
    this._stores = {
      balance: new BalanceStoreV2(pouchDB),
      crowdloan: null,

      nft: null,
      nftCollection: null,

      staking: null,
      txHistory: null
    };

    this._logger.log('Initiation completed.');
  }
}
