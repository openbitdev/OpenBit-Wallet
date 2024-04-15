// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as bitcoin from 'bitcoinjs-lib';
import { isEthereumAddress } from '@polkadot/util-crypto';
import { BitcoinAddressType } from "../../types.js";

// https://github.com/ruigomeseu/bitcoin-address-validation/blob/master/src/index.ts
const addressTypes = {
  0x00: {
    type: BitcoinAddressType.p2pkh,
    network: 'mainnet'
  },
  0x6f: {
    type: BitcoinAddressType.p2pkh,
    network: 'testnet'
  },
  0x05: {
    type: BitcoinAddressType.p2sh,
    network: 'mainnet'
  },
  0xc4: {
    type: BitcoinAddressType.p2sh,
    network: 'testnet'
  }
};
const parseBech32 = address => {
  let decoded;
  try {
    decoded = bitcoin.address.fromBech32(address);
  } catch (error) {
    throw new Error('Invalid address');
  }
  const mapPrefixToNetwork = {
    bc: 'mainnet',
    tb: 'testnet',
    bcrt: 'regtest'
  };
  const network = mapPrefixToNetwork[decoded.prefix];
  if (network === undefined) {
    throw new Error('Invalid address');
  }
  let type;
  if (decoded.data.length === 20) {
    type = BitcoinAddressType.p2wpkh;
  } else if (decoded.version === 1) {
    type = BitcoinAddressType.p2tr;
  } else {
    type = BitcoinAddressType.p2wsh;
  }
  return {
    bech32: true,
    network,
    address,
    type
  };
};
export const getBitcoinAddressInfo = address => {
  let decoded;
  const prefix = address.substr(0, 2).toLowerCase();
  if (prefix === 'bc' || prefix === 'tb') {
    return parseBech32(address);
  }
  try {
    decoded = bitcoin.address.fromBase58Check(address);
  } catch (error) {
    throw new Error('Invalid address');
  }
  const version = decoded.version;
  const validVersions = Object.keys(addressTypes).map(Number);
  if (!validVersions.includes(version)) {
    throw new Error('Invalid address');
  }
  const addressType = addressTypes[version];
  return {
    ...addressType,
    address,
    bech32: false
  };
};
export const validateBitcoinAddress = (address, network) => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (network) {
      return network === addressInfo.network;
    }
    return true;
  } catch (error) {
    return false;
  }
};

// Function to validate P2TR address
export const validateP2TRAddress = address => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.type === BitcoinAddressType.p2tr) {
      return addressInfo.network;
    } else {
      return 'unknown';
    }
  } catch (error) {
    return 'unknown';
  }
};

// Function to validate P2PKH address
export const validateP2PKHAddress = address => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.type === BitcoinAddressType.p2pkh) {
      return addressInfo.network;
    } else {
      return 'unknown';
    }
  } catch (error) {
    return 'unknown';
  }
};

// Function to validate P2WPKH address
export const validateP2WPKHAddress = address => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.type === BitcoinAddressType.p2wpkh) {
      return addressInfo.network;
    } else {
      return 'unknown';
    }
  } catch (error) {
    return 'unknown';
  }
};
export const isBitcoinAddress = address => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    return addressInfo.network;
  } catch (error) {
    return 'unknown';
  }
};
export const getKeypairTypeByAddress = address => {
  if (isEthereumAddress(address)) {
    return 'ethereum';
  }
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.network === 'mainnet') {
      switch (addressInfo.type) {
        case BitcoinAddressType.p2wpkh:
          return 'bitcoin-84';
        case BitcoinAddressType.p2pkh:
          return 'bitcoin-44';
        case BitcoinAddressType.p2tr:
          return 'bitcoin-86';
      }
    } else {
      switch (addressInfo.type) {
        case BitcoinAddressType.p2wpkh:
          return 'bittest-84';
        case BitcoinAddressType.p2pkh:
          return 'bittest-44';
        case BitcoinAddressType.p2tr:
          return 'bittest-86';
      }
    }
  } catch (e) {}
  return 'sr25519';
};