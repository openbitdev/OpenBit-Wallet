"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeAddress = void 0;
var bitcoin = _interopRequireWildcard(require("bitcoinjs-lib"));
var _utilCrypto = require("@polkadot/util-crypto");
var _decodeAddress = require("./decodeAddress");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const encodeAddress = function (key) {
  let ss58Format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 42;
  let type = arguments.length > 2 ? arguments[2] : undefined;
  // decode it, this means we can re-encode an address
  const u8a = (0, _decodeAddress.decodeAddress)(key);
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
  return (0, _utilCrypto.encodeAddress)(u8a, ss58Format);
};
exports.encodeAddress = encodeAddress;