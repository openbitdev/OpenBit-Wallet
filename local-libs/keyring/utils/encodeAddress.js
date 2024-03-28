// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as bitcoin from 'bitcoinjs-lib';
import { encodeAddress as polkadotEncodeAddress } from '@polkadot/util-crypto';
import { decodeAddress } from "./decodeAddress.js";
export const encodeAddress = (key, ss58Format = 42, type) => {
  // decode it, this means we can re-encode an address
  const u8a = decodeAddress(key);
  const network = ss58Format === 0 ? bitcoin.networks.testnet : ss58Format === 1 ? bitcoin.networks.regtest : bitcoin.networks.bitcoin;
  if (type === 'bitcoin-44') {
    return bitcoin.address.toBase58Check(Buffer.from(u8a), network.pubKeyHash);
  }
  if (type === 'bitcoin-84') {
    return bitcoin.address.toBech32(Buffer.from(u8a), 0, network.bech32);
  }
  if (type === 'bitcoin-86') {
    return bitcoin.address.toBech32(Buffer.from(u8a), 1, network.bech32);
  }
  return polkadotEncodeAddress(u8a, ss58Format);
};