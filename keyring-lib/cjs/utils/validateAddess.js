"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateP2WPKHAddress = exports.validateP2TRAddress = exports.validateP2PKHAddress = exports.isBitcoinAddress = exports.getKeypairTypeByAddress = void 0;
var bitcoin = _interopRequireWildcard(require("bitcoinjs-lib"));
var _utilCrypto = require("@polkadot/util-crypto");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Function to validate P2TR address
const validateP2TRAddress = address => {
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
exports.validateP2TRAddress = validateP2TRAddress;
const validateP2PKHAddress = address => {
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
exports.validateP2PKHAddress = validateP2PKHAddress;
const validateP2WPKHAddress = address => {
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
exports.validateP2WPKHAddress = validateP2WPKHAddress;
const isBitcoinAddress = address => {
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
exports.isBitcoinAddress = isBitcoinAddress;
const getKeypairTypeByAddress = address => {
  if ((0, _utilCrypto.isEthereumAddress)(address)) {
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
exports.getKeypairTypeByAddress = getKeypairTypeByAddress;