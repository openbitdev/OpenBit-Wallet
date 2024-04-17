"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateP2WPKHAddress = exports.validateP2TRAddress = exports.validateP2PKHAddress = exports.validateBitcoinAddress = exports.isBitcoinAddress = exports.getKeypairTypeByAddress = exports.getBitcoinAddressInfo = void 0;
var bitcoin = _interopRequireWildcard(require("bitcoinjs-lib"));
var _utilCrypto = require("@polkadot/util-crypto");
var _types = require("../../types");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

// https://github.com/ruigomeseu/bitcoin-address-validation/blob/master/src/index.ts
const addressTypes = {
  0x00: {
    type: _types.BitcoinAddressType.p2pkh,
    network: 'mainnet'
  },
  0x6f: {
    type: _types.BitcoinAddressType.p2pkh,
    network: 'testnet'
  },
  0x05: {
    type: _types.BitcoinAddressType.p2sh,
    network: 'mainnet'
  },
  0xc4: {
    type: _types.BitcoinAddressType.p2sh,
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
    type = _types.BitcoinAddressType.p2wpkh;
  } else if (decoded.version === 1) {
    type = _types.BitcoinAddressType.p2tr;
  } else {
    type = _types.BitcoinAddressType.p2wsh;
  }
  return {
    bech32: true,
    network,
    address,
    type
  };
};
const getBitcoinAddressInfo = address => {
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
exports.getBitcoinAddressInfo = getBitcoinAddressInfo;
const validateBitcoinAddress = (address, network) => {
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
exports.validateBitcoinAddress = validateBitcoinAddress;
const validateP2TRAddress = address => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.type === _types.BitcoinAddressType.p2tr) {
      return addressInfo.network;
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
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.type === _types.BitcoinAddressType.p2pkh) {
      return addressInfo.network;
    } else {
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
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.type === _types.BitcoinAddressType.p2wpkh) {
      return addressInfo.network;
    } else {
      return 'unknown';
    }
  } catch (error) {
    return 'unknown';
  }
};
exports.validateP2WPKHAddress = validateP2WPKHAddress;
const isBitcoinAddress = address => {
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    return addressInfo.network;
  } catch (error) {
    return 'unknown';
  }
};
exports.isBitcoinAddress = isBitcoinAddress;
const getKeypairTypeByAddress = address => {
  if ((0, _utilCrypto.isEthereumAddress)(address)) {
    return 'ethereum';
  }
  try {
    const addressInfo = getBitcoinAddressInfo(address);
    if (addressInfo.network === 'mainnet') {
      switch (addressInfo.type) {
        case _types.BitcoinAddressType.p2wpkh:
          return 'bitcoin-84';
        case _types.BitcoinAddressType.p2pkh:
          return 'bitcoin-44';
        case _types.BitcoinAddressType.p2tr:
          return 'bitcoin-86';
      }
    } else {
      switch (addressInfo.type) {
        case _types.BitcoinAddressType.p2wpkh:
          return 'bittest-84';
        case _types.BitcoinAddressType.p2pkh:
          return 'bittest-44';
        case _types.BitcoinAddressType.p2tr:
          return 'bittest-86';
      }
    }
  } catch (e) {}
  return 'sr25519';
};
exports.getKeypairTypeByAddress = getKeypairTypeByAddress;