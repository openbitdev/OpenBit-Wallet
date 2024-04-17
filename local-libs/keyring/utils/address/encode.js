// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as bitcoin from 'bitcoinjs-lib';
import { encodeAddress as polkadotEncodeAddress } from '@polkadot/util-crypto';
import { decodeAddress } from "./decode.js";
export const encodeAddress = (key, ss58Format = 42, type) => {
  // decode it, this means we can re-encode an address
  const u8a = decodeAddress(key);
  const network = !type || ['bitcoin-44', 'bitcoin-84', 'bitcoin-86'].includes(type) ? bitcoin.networks.bitcoin : ['bittest-44', 'bittest-84', 'bittest-86'].includes(type) ? bitcoin.networks.testnet : bitcoin.networks.regtest;
  if (type === 'bitcoin-44' || type === 'bittest-44') {
    return bitcoin.address.toBase58Check(Buffer.from(u8a), network.pubKeyHash);
  }
  if (type === 'bitcoin-84' || type === 'bittest-84') {
    return bitcoin.address.toBech32(Buffer.from(u8a), 0, network.bech32);
  }
  if (type === 'bitcoin-86' || type === 'bittest-86') {
    return bitcoin.address.toBech32(Buffer.from(u8a), 1, network.bech32);
  }
  return polkadotEncodeAddress(u8a, ss58Format);
};