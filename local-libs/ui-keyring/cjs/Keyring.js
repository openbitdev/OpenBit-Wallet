"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keyring = void 0;
var _keyring = require("@subwallet/keyring");
var _uiSettings = require("@polkadot/ui-settings");
var _util = require("@polkadot/util");
var _utilCrypto = require("@polkadot/util-crypto");
var _env = require("./observable/env");
var _Base = require("./Base");
var _defaults = require("./defaults");
var _options = require("./options");
// Copyright 2017-2022 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

// 1 day
const RECENT_EXPIRY = 24 * 60 * 60 * 1000;

// No accounts (or test accounts) should be loaded until after the chain determination.
// Chain determination occurs outside of Keyring. Loading `keyring.loadAll({ type: 'ed25519' | 'sr25519' })` is triggered
// from the API after the chain is received
class Keyring extends _Base.Base {
  keyringOption = new _options.KeyringOption();
  #stores = {
    account: () => this.accounts,
    address: () => this.addresses,
    contract: () => this.contracts
  };
  addExternal(address) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const _address = (0, _util.isString)(address) ? address : this.encodeAddress(address);
    const type = (0, _keyring.getKeypairTypeByAddress)(_address);
    const pair = this.keyring.addFromAddress(address, (0, _util.objectSpread)({}, meta, {
      isExternal: true
    }), null, type);
    return {
      json: this.saveAccount(pair, false),
      pair
    };
  }
  addHardware(address, hardwareType) {
    let meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this.addExternal(address, (0, _util.objectSpread)({}, meta, {
      hardwareType,
      isHardware: true
    }));
  }
  addMultisig(addresses, threshold) {
    let meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const address = (0, _utilCrypto.createKeyMulti)(addresses, threshold);

    // we could use `sortAddresses`, but rather use internal encode/decode so we are 100%
    const who = (0, _util.u8aSorted)(addresses.map(who => this.decodeAddress(who))).map(who => this.encodeAddress(who));
    return this.addExternal(address, (0, _util.objectSpread)({}, meta, {
      isMultisig: true,
      threshold: (0, _util.bnToBn)(threshold).toNumber(),
      who
    }));
  }
  addPair(pair, withMasterPassword, password) {
    this.keyring.addPair(pair);
    return {
      json: this.saveAccount(pair, withMasterPassword, password),
      pair
    };
  }
  addUri(suri) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 ? arguments[2] : undefined;
    const pair = this.keyring.addFromUri(suri, meta, type);
    return {
      json: this.saveAccount(pair, true),
      pair
    };
  }
  backupAccount(pair, password) {
    if (!pair.isLocked) {
      pair.lock();
    }
    pair.decodePkcs8(password);
    const rs = pair.toJson(password);
    const meta = {
      ...rs.meta,
      isSubWallet: true
    };
    return {
      ...rs,
      meta
    };
  }
  async backupAccounts(password) {
    this.keyring.unlockKeyring(password);
    const addresses = this.getPairs().map(pair => pair.address);
    const accountPromises = addresses.map(address => {
      return new Promise(resolve => {
        this._store.get((0, _defaults.accountKey)(address), resolve);
      });
    });
    const accounts = await Promise.all(accountPromises);
    return (0, _util.objectSpread)({}, (0, _utilCrypto.jsonEncrypt)((0, _util.stringToU8a)(JSON.stringify(accounts)), ['batch-pkcs8'], password), {
      accounts: accounts.map(account => {
        const meta = {
          ...account.meta,
          isSubWallet: true
        };
        return {
          address: account.address,
          meta
        };
      })
    });
  }
  createFromJson(json) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.keyring.createFromJson((0, _util.objectSpread)({}, json, {
      meta: (0, _util.objectSpread)({}, json.meta, meta)
    }));
  }
  createFromUri(suri) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 ? arguments[2] : undefined;
    return this.keyring.createFromUri(suri, meta, type);
  }
  encryptAccount(pair, password) {
    const json = pair.toJson(password);
    json.meta.whenEdited = Date.now();
    this.keyring.addFromJson(json);
    this.accounts.add(this._store, pair.address, json, pair.type);
  }
  forgetAccount(address) {
    this.keyring.removePair(address);
    this.accounts.remove(this._store, address);
  }
  forgetAddress(address) {
    this.addresses.remove(this._store, address);
  }
  forgetContract(address) {
    this.contracts.remove(this._store, address);
  }
  getAccount(address) {
    return this.getAddress(address, 'account');
  }
  getAccounts() {
    const available = this.accounts.subject.getValue();
    return Object.keys(available).map(address => this.getAddress(address, 'account')).filter(account => _env.env.isDevelopment() || account.meta.isTesting !== true);
  }
  getAddress(_address) {
    let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const address = (0, _util.isString)(_address) ? _address : this.encodeAddress(_address);
    const publicKey = this.decodeAddress(address);
    const stores = type ? [this.#stores[type]] : Object.values(this.#stores);
    const info = stores.reduce((lastInfo, store) => store().subject.getValue()[address] || lastInfo, undefined);
    return info && {
      address,
      meta: info.json.meta,
      publicKey
    };
  }
  getAddresses() {
    const available = this.addresses.subject.getValue();
    return Object.keys(available).map(address => this.getAddress(address));
  }
  getContract(address) {
    return this.getAddress(address, 'contract');
  }
  getContracts() {
    const available = this.contracts.subject.getValue();
    return Object.entries(available).filter(_ref => {
      let [, {
        json: {
          meta: {
            contract
          }
        }
      }] = _ref;
      return !!contract && contract.genesisHash === this.genesisHash;
    }).map(_ref2 => {
      let [address] = _ref2;
      return this.getContract(address);
    });
  }
  rewriteKey(json, key, hexAddr, creator) {
    if (hexAddr.substr(0, 2) === '0x') {
      return;
    }
    this._store.remove(key);
    this._store.set(creator(hexAddr), json);
  }
  loadAccount(json, key) {
    let fromMulti = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (!json.meta.isTesting && json.encoded) {
      const pair = this.keyring.addFromJson(json, true, fromMulti);
      this.accounts.add(this._store, pair.address, json, pair.type);
    }
    const [, hexAddr] = key.split(':');
    this.rewriteKey(json, key, hexAddr.trim(), _defaults.accountKey);
  }
  loadAddress(json, key) {
    const {
      isRecent,
      whenCreated = 0
    } = json.meta;
    if (isRecent && Date.now() - whenCreated > RECENT_EXPIRY) {
      this._store.remove(key);
      return;
    }

    // We assume anything hex that is not 32bytes (64 + 2 bytes hex) is an Ethereum-like address
    // (this caters for both H160 addresses as well as full or compressed publicKeys) - in the case
    // of both ecdsa and ethereum, we keep it as-is
    const address = (0, _util.isHex)(json.address) && json.address.length !== 66 ? json.address : this.encodeAddress((0, _util.isHex)(json.address) ? (0, _util.hexToU8a)(json.address)
    // FIXME Just for the transition period (ignoreChecksum)
    : this.decodeAddress(json.address, true));
    const [, hexAddr] = key.split(':');
    this.addresses.add(this._store, address, json);
    this.rewriteKey(json, key, hexAddr, _defaults.addressKey);
  }
  loadContract(json, key) {
    const address = this.encodeAddress(this.decodeAddress(json.address));
    const [, hexAddr] = key.split(':');

    // move genesisHash to top-level (TODO Remove from contracts section?)
    json.meta.genesisHash = json.meta.genesisHash || json.meta.contract && json.meta.contract.genesisHash;
    this.contracts.add(this._store, address, json);
    this.rewriteKey(json, key, hexAddr, _defaults.contractKey);
  }
  loadInjected(address, meta, type) {
    const json = {
      address,
      meta: (0, _util.objectSpread)({}, meta, {
        isInjected: true
      })
    };
    try {
      const exists = this.getPair(address);
      if (exists) {
        return;
      }
    } catch (e) {}
    const pair = this.keyring.addFromAddress(address, json.meta, null, type);
    this.accounts.add(this._store, pair.address, json, pair.type);
  }
  allowGenesis(json) {
    if (json && json.meta && this.genesisHash) {
      const hashes = Object.values(_uiSettings.chains).find(hashes => hashes.includes(this.genesisHash || '')) || [this.genesisHash];
      if (json.meta.genesisHash) {
        return hashes.includes(json.meta.genesisHash) || this.genesisHashes.includes(json.meta.genesisHash);
      } else if (json.meta.contract) {
        return hashes.includes(json.meta.contract.genesisHash);
      }
    }
    return true;
  }
  loadAll(options) {
    let injected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    super.initKeyring(options);
    this._store.all((key, json) => {
      if (!(0, _util.isFunction)(options.filter) || options.filter(json)) {
        try {
          if (this.allowGenesis(json)) {
            if (_defaults.accountRegex.test(key)) {
              this.loadAccount(json, key);
            } else if (_defaults.addressRegex.test(key)) {
              this.loadAddress(json, key);
            } else if (_defaults.contractRegex.test(key)) {
              this.loadContract(json, key);
            }
          }
        } catch (error) {
          console.warn(`Keyring: Unable to load ${key}:${(0, _util.stringify)(json)}`);
        }
      }
    });
    injected.forEach(account => {
      if (this.allowGenesis(account)) {
        try {
          this.loadInjected(account.address, account.meta, account.type);
        } catch (error) {
          console.warn(`Keyring: Unable to inject ${(0, _util.stringify)(account)}`);
        }
      }
    });
    this.keyringOption.init(this);
  }
  restoreAccount(json, password, withMasterPassword) {
    const cryptoType = Array.isArray(json.encoding.content) ? json.encoding.content[1] : 'ed25519';
    const encType = Array.isArray(json.encoding.type) ? json.encoding.type : [json.encoding.type];
    const pair = (0, _keyring.createPair)({
      toSS58: this.encodeAddress,
      type: cryptoType
    }, {
      publicKey: this.decodeAddress(json.address, true)
    }, json.meta, (0, _util.isHex)(json.encoded) ? (0, _util.hexToU8a)(json.encoded) : (0, _utilCrypto.base64Decode)(json.encoded), encType);

    // unlock, save account and then lock (locking cleans secretKey, so needs to be last)
    pair.decodePkcs8(password);
    this.addPair(pair, withMasterPassword, password);
    pair.lock();
    return pair;
  }
  restoreAccounts(json, password) {
    const raws = JSON.parse((0, _util.u8aToString)((0, _utilCrypto.jsonDecrypt)(json, password)));
    const _accounts = json.accounts;
    const accounts = raws.map(account => {
      const override = _accounts.find(acc => acc.address === account.address);
      account.meta = Object.assign({}, account.meta, override == null ? void 0 : override.meta);
      return account;
    });
    const isSubWallet = accounts.every(account => {
      return !!account.meta.isSubWallet;
    });
    for (const account of accounts) {
      const meta = {
        ...account.meta
      };
      if (isSubWallet) {
        meta.pendingMigrate = true;
        delete meta.isSubWallet;
      }
      this.loadAccount({
        ...account,
        meta
      }, (0, _defaults.accountKey)(account.address), true);
    }
    if (isSubWallet) {
      const promises = [];
      for (const account of accounts) {
        if (!account.meta.isExternal) {
          const address = (0, _util.isHex)(account.address) ? (0, _utilCrypto.ethereumEncode)(account.address) : account.address;
          const promise = new Promise(resolve => {
            this.migrateWithMasterPassword(address, password);
            console.debug('migrated', address);
            resolve();
          });
          promises.push(promise);
        }
      }
      Promise.all(promises).finally(_util.noop);
    }
  }

  // withMasterPassword = true, with all account have private key
  // withMasterPassword = false, for the external account only
  saveAccount(pair, withMasterPassword, password) {
    this.addTimestamp(pair);
    let json;
    if (withMasterPassword) {
      json = this.keyring.addPairWithMasterPassword(pair);
    } else {
      json = pair.toJson(password);
    }
    this.keyring.addFromJson(json);
    this.accounts.add(this._store, pair.address, json, pair.type);
    return json;
  }
  saveAccountMeta(pair, meta) {
    const address = pair.address;
    this._store.get((0, _defaults.accountKey)(address), json => {
      pair.setMeta(meta);
      json.meta = pair.meta;
      this.accounts.add(this._store, address, json, pair.type);
    });
  }
  saveAddress(address, meta) {
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'address';
    const available = this.addresses.subject.getValue();
    const json = available[address] && available[address].json || {
      address,
      meta: {
        isRecent: undefined,
        whenCreated: Date.now()
      }
    };
    Object.keys(meta).forEach(key => {
      json.meta[key] = meta[key];
    });
    delete json.meta.isRecent;
    this.#stores[type]().add(this._store, address, json);
    return json;
  }
  saveContract(address, meta) {
    return this.saveAddress(address, meta, 'contract');
  }
  saveRecent(address) {
    const available = this.addresses.subject.getValue();
    if (!available[address]) {
      this.addresses.add(this._store, address, {
        address,
        meta: {
          genesisHash: this.genesisHash,
          isRecent: true,
          whenCreated: Date.now()
        }
      });
    }
    return this.addresses.subject.getValue()[address];
  }
  addPairWithMasterPassword(pair) {
    this.addTimestamp(pair);
    const json = this.keyring.addPairWithMasterPassword(pair);
    this.keyring.addFromJson(json);
    this.accounts.add(this._store, pair.address, json, pair.type);
    return {
      json,
      pair
    };
  }
  changeMasterPassword(newPassphrase, oldPassphrase) {
    const json = this.keyring.changeMasterPassword(newPassphrase, oldPassphrase);
    this._password_store.set(json);
    const pairJsons = this.keyring.getJsonPairsWithMasterPassword();
    const pairs = {};
    console.debug('Success to decode pairs');
    for (const pairJson of pairJsons) {
      const pair = this.keyring.addFromJson(pairJson, true);
      pairs[pairJson.address] = pair;
      console.debug('Success to save pair', pair.address);
    }
    for (const pairJson of pairJsons) {
      const pair = pairs[pairJson.address];
      this.accounts.add(this._store, pair.address, pairJson, pair.type);
      console.debug('Success to store pair', pair.address);
    }
  }
  migrateWithMasterPassword(address, oldPassphrase) {
    const pair = this.keyring.getPair(address);
    const json = this.keyring.migrateWithMasterPassword(pair.address, oldPassphrase);
    const _pair = this.keyring.getPair(address);
    json.meta.isMasterAccount = _pair.haveEntropy;

    // remove flag pending migrate
    delete json.meta.pendingMigrate;
    delete json.meta.isSubWallet;
    this.accounts.add(this._store, pair.address, json, pair.type);
  }
  unlockKeyring(password) {
    this.keyring.unlockKeyring(password);
  }
  unlockPair(address) {
    this.keyring.unlockPair(address);
  }
  lockAll() {
    this.keyring.lockALl();
  }
  resetWallet(resetAll) {
    const accountsSub = this.accounts.subject.getValue();
    for (const account of Object.keys(accountsSub)) {
      this.forgetAccount(account);
    }
    if (resetAll) {
      const addressesSub = this.addresses.subject.getValue();
      const contractsSub = this.contracts.subject.getValue();
      for (const address of Object.keys(addressesSub)) {
        this.forgetAddress(address);
      }
      for (const contract of Object.keys(contractsSub)) {
        this.forgetContract(contract);
      }
    }
    this._password_store.remove();
    this.keyring.resetPassword();
  }
  addInjects(accounts) {
    accounts.forEach(account => {
      if (this.allowGenesis(account)) {
        try {
          this.loadInjected(account.address, account.meta, account.type);
        } catch (error) {
          console.warn(`Keyring: Unable to inject ${(0, _util.stringify)(account)}`);
        }
      }
    });
  }
  removeInject(address) {
    try {
      const pair = this.getPair(address);
      const isInjected = !!pair.meta.isInjected;
      if (!isInjected) {
        // Not injected pair, so no need to check
        return;
      }
    } catch (e) {
      // No address on keyring
      return;
    }

    // Check existed on store
    const key = (0, _defaults.accountKey)(address);
    this._store.get(key, json => {
      if (json) {
        this.loadAccount(json, key);
      } else {
        this.forgetAccount(address);
      }
    });
  }
  removeInjects(addresses) {
    addresses.forEach(address => {
      try {
        this.removeInject(address);
      } catch (error) {
        this.keyring.removePair(address);
        console.warn(`Keyring: Unable to remove inject ${(0, _util.stringify)(address)}`);
      }
    });
  }
}
exports.Keyring = Keyring;