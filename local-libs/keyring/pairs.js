// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isHex, isU8a, u8aToHex, u8aToU8a } from '@polkadot/util';
import { decodeAddress } from "./utils/index.js";
export class Pairs {
  #map = {};
  add(pair) {
    this.#map[decodeAddress(pair.address).toString()] = pair;
    return pair;
  }
  all() {
    return Object.values(this.#map);
  }
  get(address) {
    const pair = this.#map[decodeAddress(address).toString()];
    if (!pair) {
      throw new Error(`Unable to retrieve keypair '${isU8a(address) || isHex(address) ? u8aToHex(u8aToU8a(address)) : address}'`);
    }
    return pair;
  }
  remove(address) {
    delete this.#map[decodeAddress(address).toString()];
  }
}