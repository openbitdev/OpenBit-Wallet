// Copyright 2017-2022 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUBWALLET_KEYRING } from '@subwallet/ui-keyring/defaults';
import store from 'store';
export class PasswordBrowserStore {
  get(fn) {
    fn(store.get(SUBWALLET_KEYRING));
  }
  remove(fn) {
    store.remove(SUBWALLET_KEYRING);
    fn && fn();
  }
  set(value, fn) {
    store.set(SUBWALLET_KEYRING, value);
    fn && fn();
  }
}