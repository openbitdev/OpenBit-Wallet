"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeAddress = void 0;
var bitcoin = _interopRequireWildcard(require("bitcoinjs-lib"));
var _util = require("@polkadot/util");
var _utilCrypto = require("@polkadot/util-crypto");
var _validateAddess = require("./validateAddess");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const decodeAddress = function (encoded, ignoreChecksum) {
  let ss58Format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  if (!encoded) {
    throw new Error('Invalid empty address passed');
  }
  if ((0, _util.isU8a)(encoded) || (0, _util.isHex)(encoded)) {
    return (0, _util.u8aToU8a)(encoded);
  }
  if ((0, _validateAddess.validateP2PKHAddress)(encoded) !== 'unknown') {
    const base58 = bitcoin.address.fromBase58Check(encoded);
    return (0, _util.hexToU8a)(base58.hash.toString('hex'));
  }
  if ((0, _validateAddess.validateP2TRAddress)(encoded) !== 'unknown' || (0, _validateAddess.validateP2WPKHAddress)(encoded) !== 'unknown') {
    const bech32 = bitcoin.address.fromBech32(encoded);
    return (0, _util.hexToU8a)(bech32.data.toString('hex'));
  }
  return (0, _utilCrypto.decodeAddress)(encoded, ignoreChecksum, ss58Format);
};
exports.decodeAddress = decodeAddress;