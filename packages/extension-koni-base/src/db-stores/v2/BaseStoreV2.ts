// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { logger as createLogger } from '@polkadot/util/logger';
import { Logger } from '@polkadot/util/types';

export default abstract class BaseStoreV2 {
  protected _db: PouchDB.Database;
  protected _logger: Logger;

  protected constructor (db: PouchDB.Database, storeName: string) {
    this._db = db;
    this._logger = createLogger(storeName);
  }
}
