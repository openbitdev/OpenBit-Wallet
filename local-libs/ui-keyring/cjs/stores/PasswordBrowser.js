"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordBrowserStore = void 0;
var _defaults = require("@subwallet/ui-keyring/defaults");
var _store = _interopRequireDefault(require("store"));
// Copyright 2017-2022 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

class PasswordBrowserStore {
  get(fn) {
    fn(_store.default.get(_defaults.SUBWALLET_KEYRING));
  }
  remove(fn) {
    _store.default.remove(_defaults.SUBWALLET_KEYRING);
    fn && fn();
  }
  set(value, fn) {
    _store.default.set(_defaults.SUBWALLET_KEYRING, value);
    fn && fn();
  }
}
exports.PasswordBrowserStore = PasswordBrowserStore;