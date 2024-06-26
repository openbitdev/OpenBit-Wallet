// Copyright 2017-2022 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createTestKeyring } from '@subwallet/keyring';
import { isBoolean, isNumber, isString } from '@polkadot/util';
import { accounts } from "./observable/accounts.js";
import { addresses } from "./observable/addresses.js";
import { contracts } from "./observable/contracts.js";
import { env } from "./observable/env.js";
import { BrowserStore } from "./stores/Browser.js"; // direct import (skip index with all)
import { PasswordBrowserStore } from "./stores/PasswordBrowser.js"; // direct import (skip index with all)

export class Base {
  #accounts;
  #addresses;
  #contracts;
  #keyring;
  _genesisHashAdd = [];
  constructor() {
    this.#accounts = accounts;
    this.#addresses = addresses;
    this.#contracts = contracts;
    this._store = new BrowserStore();
    this._password_store = new PasswordBrowserStore();
  }
  get accounts() {
    return this.#accounts;
  }
  get addresses() {
    return this.#addresses;
  }
  get contracts() {
    return this.#contracts;
  }
  get keyring() {
    if (this.#keyring) {
      return this.#keyring;
    }
    throw new Error('Keyring should be initialised via \'loadAll\' before use');
  }
  get genesisHash() {
    return this._genesisHash;
  }
  get genesisHashes() {
    return this._genesisHash ? [this._genesisHash, ...this._genesisHashAdd] : [...this._genesisHashAdd];
  }
  decodeAddress = (key, ignoreChecksum, ss58Format) => {
    return this.keyring.decodeAddress(key, ignoreChecksum, ss58Format);
  };
  encodeAddress = (key, ss58Format) => {
    return this.keyring.encodeAddress(key, ss58Format);
  };
  getPair(address) {
    return this.keyring.getPair(address);
  }
  getPairs() {
    return this.keyring.getPairs().filter(pair => env.isDevelopment() || pair.meta.isTesting !== true);
  }
  isAvailable(_address) {
    const accountsValue = this.accounts.subject.getValue();
    const addressesValue = this.addresses.subject.getValue();
    const contractsValue = this.contracts.subject.getValue();
    const address = isString(_address) ? _address : this.encodeAddress(_address);
    return !accountsValue[address] && !addressesValue[address] && !contractsValue[address];
  }
  isPassValid(password) {
    return password.length > 0;
  }
  setSS58Format(ss58Format) {
    if (this.#keyring && isNumber(ss58Format)) {
      this.#keyring.setSS58Format(ss58Format);
    }
  }
  setDevMode(isDevelopment) {
    env.set(isDevelopment);
  }
  initKeyring(options) {
    const keyring = createTestKeyring(options, true);
    if (isBoolean(options.isDevelopment)) {
      this.setDevMode(options.isDevelopment);
    }
    this.#keyring = keyring;
    this._genesisHash = options.genesisHash && (isString(options.genesisHash) ? options.genesisHash.toString() : options.genesisHash.toHex());
    this._genesisHashAdd = options.genesisHashAdd || [];
    this._store = options.store || this._store;
    this._password_store = options.password_store || this._password_store;
    this.addAccountPairs();
  }
  addAccountPairs() {
    this.keyring.getPairs().forEach(({
      address,
      meta
    }) => {
      this.accounts.add(this._store, address, {
        address,
        meta
      });
    });
  }
  addTimestamp(pair) {
    if (!pair.meta.whenCreated) {
      pair.setMeta({
        whenCreated: Date.now()
      });
    }
  }
  async restoreKeyringPassword() {
    return new Promise(resolve => {
      this._password_store.get(value => {
        if (this.#keyring && value) {
          this.#keyring.setupMasterPassword(value.passwordHash);
        }
        resolve();
      });
    });
  }
}