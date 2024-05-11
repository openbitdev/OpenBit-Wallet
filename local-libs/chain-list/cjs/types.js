"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._SubstrateChainType = exports._FundStatus = exports._ChainStatus = exports._ChainProviderStatus = exports._AssetType = exports._AssetRefPath = void 0;
// Copyright 2019-2022 @subwallet/chain-list authors & contributors
// SPDX-License-Identifier: Apache-2.0
let _ChainStatus;
exports._ChainStatus = _ChainStatus;
(function (_ChainStatus) {
  _ChainStatus["ACTIVE"] = "ACTIVE";
  _ChainStatus["INACTIVE"] = "INACTIVE";
  _ChainStatus["STOPPED"] = "STOPPED";
})(_ChainStatus || (exports._ChainStatus = _ChainStatus = {}));
let _ChainProviderStatus;
exports._ChainProviderStatus = _ChainProviderStatus;
(function (_ChainProviderStatus) {
  _ChainProviderStatus["ONLINE"] = "ONLINE";
  _ChainProviderStatus["OFFLINE"] = "OFFLINE";
  _ChainProviderStatus["UNSTABLE"] = "UNSTABLE";
})(_ChainProviderStatus || (exports._ChainProviderStatus = _ChainProviderStatus = {}));
let _AssetType;
exports._AssetType = _AssetType;
(function (_AssetType) {
  _AssetType["NATIVE"] = "NATIVE";
  _AssetType["LOCAL"] = "LOCAL";
  _AssetType["ERC20"] = "ERC20";
  _AssetType["ERC721"] = "ERC721";
  _AssetType["PSP22"] = "PSP22";
  _AssetType["PSP34"] = "PSP34";
  _AssetType["UNKNOWN"] = "UNKNOWN";
  _AssetType["RUNE"] = "RUNE";
  _AssetType["BRC20"] = "BRC20";
})(_AssetType || (exports._AssetType = _AssetType = {}));
let _SubstrateChainType;
exports._SubstrateChainType = _SubstrateChainType;
(function (_SubstrateChainType) {
  _SubstrateChainType["RELAYCHAIN"] = "RELAYCHAIN";
  _SubstrateChainType["PARACHAIN"] = "PARACHAIN";
})(_SubstrateChainType || (exports._SubstrateChainType = _SubstrateChainType = {}));
let _FundStatus;
exports._FundStatus = _FundStatus;
(function (_FundStatus) {
  _FundStatus["IN_AUCTION"] = "in_auction";
  _FundStatus["WON"] = "won";
  _FundStatus["WITHDRAW"] = "withdraw";
  _FundStatus["FAILED"] = "failed";
})(_FundStatus || (exports._FundStatus = _FundStatus = {}));
let _AssetRefPath;
exports._AssetRefPath = _AssetRefPath;
(function (_AssetRefPath) {
  _AssetRefPath["XCM"] = "XCM";
  _AssetRefPath["MANTA_ZK"] = "MANTA_ZK";
  _AssetRefPath["SWAP"] = "SWAP";
})(_AssetRefPath || (exports._AssetRefPath = _AssetRefPath = {}));