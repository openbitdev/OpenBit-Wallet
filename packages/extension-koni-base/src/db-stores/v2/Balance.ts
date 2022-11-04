// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceItem } from '@subwallet/extension-base/background/KoniTypes';
import BaseStoreV2 from '@subwallet/extension-koni-base/db-stores/v2/BaseStoreV2';
import { _BalanceItem, PouchDBDataType } from '@subwallet/extension-koni-base/services/utils';
import { reformatAddress } from '@subwallet/extension-koni-base/utils';

// _id has the format: balance::chainHash::defaultSS58Address

export default class BalanceStoreV2 extends BaseStoreV2 {
  private _type = PouchDBDataType.BALANCE;

  constructor (db: PouchDB.Database) {
    super(db, 'BALANCE_STORE');
  }

  convertToSchema (genesisHash: string, address: string, balanceItem: BalanceItem) {
    const formattedAddress = reformatAddress(address, 42);
    const _id = `${this._type}::${genesisHash}::${formattedAddress}`;

    return {
      _id,
      _type: this._type,
      ...balanceItem
    } as _BalanceItem;
  }

  upsert (chain: string, genesisHash: string, address: string, balanceItem: BalanceItem) {
    const convertedObj = this.convertToSchema(genesisHash, address, balanceItem);

    this._db.get(convertedObj._id)
      .then((doc) => {
        if (doc) {
          this._db.put({
            ...convertedObj,
            _rev: doc._rev
          }).then((resp) => this._logger.log(`Updated balance for ${address} on ${chain}`, resp))
            .catch((e) => this._logger.error(`Error updating balance for ${address} on ${chain}`, e));
        } else {
          this._db.put(convertedObj)
            .then((resp) => this._logger.log(`Insert balance for ${address} on ${chain}`, resp))
            .catch((e) => this._logger.error(`Error inserting balance for ${address} on ${chain}`, e));
        }
      })
      .catch((e) => {
        this._logger.error(`Error upserting balance for ${address} on ${chain}`, e);
      });
  }
}
