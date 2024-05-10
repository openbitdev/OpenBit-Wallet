// Copyright 2019-2022 @subwallet/chain-list authors & contributors
// SPDX-License-Identifier: Apache-2.0

export let _ChainStatus;
(function (_ChainStatus) {
  _ChainStatus["ACTIVE"] = "ACTIVE";
  _ChainStatus["INACTIVE"] = "INACTIVE";
  _ChainStatus["STOPPED"] = "STOPPED";
})(_ChainStatus || (_ChainStatus = {}));
export let _ChainProviderStatus;
(function (_ChainProviderStatus) {
  _ChainProviderStatus["ONLINE"] = "ONLINE";
  _ChainProviderStatus["OFFLINE"] = "OFFLINE";
  _ChainProviderStatus["UNSTABLE"] = "UNSTABLE";
})(_ChainProviderStatus || (_ChainProviderStatus = {}));
export let _AssetType;
(function (_AssetType) {
  _AssetType["NATIVE"] = "NATIVE";
  _AssetType["LOCAL"] = "LOCAL";
  _AssetType["ERC20"] = "ERC20";
  _AssetType["ERC721"] = "ERC721";
  _AssetType["PSP22"] = "PSP22";
  _AssetType["PSP34"] = "PSP34";
  _AssetType["UNKNOWN"] = "UNKNOWN";
  _AssetType["RUNE"] = "RUNE";
})(_AssetType || (_AssetType = {}));
export let _SubstrateChainType;
(function (_SubstrateChainType) {
  _SubstrateChainType["RELAYCHAIN"] = "RELAYCHAIN";
  _SubstrateChainType["PARACHAIN"] = "PARACHAIN";
})(_SubstrateChainType || (_SubstrateChainType = {}));
export let _FundStatus;
(function (_FundStatus) {
  _FundStatus["IN_AUCTION"] = "in_auction";
  _FundStatus["WON"] = "won";
  _FundStatus["WITHDRAW"] = "withdraw";
  _FundStatus["FAILED"] = "failed";
})(_FundStatus || (_FundStatus = {}));
export let _AssetRefPath;
(function (_AssetRefPath) {
  _AssetRefPath["XCM"] = "XCM";
  _AssetRefPath["MANTA_ZK"] = "MANTA_ZK";
  _AssetRefPath["SWAP"] = "SWAP";
})(_AssetRefPath || (_AssetRefPath = {}));
