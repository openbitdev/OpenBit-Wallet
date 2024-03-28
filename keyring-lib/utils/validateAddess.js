// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as bitcoin from 'bitcoinjs-lib';
import { isEthereumAddress } from '@polkadot/util-crypto';
// Function to validate P2TR address
export const validateP2TRAddress = address => {
  try {
    const decodedAddress = bitcoin.address.fromBech32(address);
    if (decodedAddress.version === 1) {
      switch (decodedAddress.prefix) {
        case bitcoin.networks.bitcoin.bech32:
          return 'mainnet';
        case bitcoin.networks.testnet.bech32:
          return 'testnet';
        case bitcoin.networks.regtest.bech32:
          return 'regtest';
        default:
          return 'unknown';
      }
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
    const decodedAddress = bitcoin.address.fromBase58Check(address);
    switch (decodedAddress.version) {
      case bitcoin.networks.bitcoin.pubKeyHash:
        return 'mainnet';
      case bitcoin.networks.testnet.pubKeyHash:
        return 'testnet';
      case bitcoin.networks.regtest.pubKeyHash:
        return 'regtest';
      default:
        return 'unknown';
    }
  } catch (error) {
    return 'unknown';
  }
};

// Function to validate P2WPKH address
export const validateP2WPKHAddress = address => {
  try {
    const decodedAddress = bitcoin.address.fromBech32(address);
    if (decodedAddress.version === 0 && decodedAddress.data.length === 20) {
      switch (decodedAddress.prefix) {
        case bitcoin.networks.bitcoin.bech32:
          return 'mainnet';
        case bitcoin.networks.testnet.bech32:
          return 'testnet';
        case bitcoin.networks.regtest.bech32:
          return 'regtest';
        default:
          return 'unknown';
      }
    } else {
      return 'unknown';
    }
  } catch (error) {
    return 'unknown';
  }
};
export const isBitcoinAddress = address => {
  const p2tr = validateP2TRAddress(address);
  const p2pkh = validateP2PKHAddress(address);
  const p2wpkh = validateP2WPKHAddress(address);
  if (p2pkh !== 'unknown') {
    return p2pkh;
  } else if (p2wpkh !== 'unknown') {
    return p2wpkh;
  } else if (p2tr !== 'unknown') {
    return p2tr;
  } else {
    return 'unknown';
  }
};
export const getKeypairTypeByAddress = address => {
  if (isEthereumAddress(address)) {
    return 'ethereum';
  }
  if (validateP2TRAddress(address) === 'mainnet') {
    return 'bitcoin-86';
  }
  if (validateP2TRAddress(address) === 'testnet') {
    return 'bittest-86';
  }
  if (validateP2WPKHAddress(address) === 'mainnet') {
    return 'bitcoin-84';
  }
  if (validateP2WPKHAddress(address) === 'testnet') {
    return 'bittest-84';
  }
  if (validateP2PKHAddress(address) === 'mainnet') {
    return 'bitcoin-44';
  }
  if (validateP2PKHAddress(address) === 'testnet') {
    return 'bittest-44';
  }
  return 'sr25519';
};