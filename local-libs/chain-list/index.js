// Copyright 2019-2024 @subwallet/chain-list authors & contributors
// SPDX-License-Identifier: Apache-2.0

import _AssetLogoMap from "./data/AssetLogoMap.json";
import _AssetRefMap from "./data/AssetRef.json";
import _ChainAssetMap from "./data/ChainAsset.json";
import _ChainInfoMap from "./data/ChainInfo.json";
import _ChainLogoMap from "./data/ChainLogoMap.json";
import _MultiChainAssetMap from "./data/MultiChainAsset.json";
export const ChainInfoMap = _ChainInfoMap;
export const ChainAssetMap = _ChainAssetMap;
export const AssetRefMap = _AssetRefMap;
export const MultiChainAssetMap = _MultiChainAssetMap;
export const AssetLogoMap = _AssetLogoMap;
export const ChainLogoMap = _ChainLogoMap;
export let COMMON_CHAIN_SLUGS;
(function (COMMON_CHAIN_SLUGS) {
  COMMON_CHAIN_SLUGS["POLKADOT"] = "polkadot";
  COMMON_CHAIN_SLUGS["KUSAMA"] = "kusama";
  COMMON_CHAIN_SLUGS["MOONBEAM"] = "moonbeam";
  COMMON_CHAIN_SLUGS["MOONRIVER"] = "moonriver";
  COMMON_CHAIN_SLUGS["ETHEREUM"] = "ethereum";
  COMMON_CHAIN_SLUGS["ACALA"] = "acala";
  COMMON_CHAIN_SLUGS["KARURA"] = "karura";
  COMMON_CHAIN_SLUGS["ALEPH_ZERO"] = "aleph";
  COMMON_CHAIN_SLUGS["ASTAR"] = "astar";
  COMMON_CHAIN_SLUGS["WESTEND"] = "westend";
  COMMON_CHAIN_SLUGS["BINANCE"] = "binance";
  COMMON_CHAIN_SLUGS["ASTAR_EVM"] = "astarEvm";
  COMMON_CHAIN_SLUGS["HYDRADX"] = "hydradx_main";
  COMMON_CHAIN_SLUGS["HYDRADX_TESTNET"] = "hydradx_rococo";
  COMMON_CHAIN_SLUGS["ETHEREUM_SEPOLIA"] = "sepolia_ethereum";
  COMMON_CHAIN_SLUGS["CHAINFLIP_POLKADOT"] = "chainflip_dot";
  COMMON_CHAIN_SLUGS["MOONBASE"] = "moonbase";
})(COMMON_CHAIN_SLUGS || (COMMON_CHAIN_SLUGS = {}));
export let COMMON_ASSETS;
(function (COMMON_ASSETS) {
  COMMON_ASSETS["DOT"] = "polkadot-NATIVE-DOT";
  COMMON_ASSETS["ETH"] = "ethereum-NATIVE-ETH";
  COMMON_ASSETS["KSM"] = "kusama-NATIVE-KSM";
  COMMON_ASSETS["ETH_SEPOLIA"] = "sepolia_ethereum-NATIVE-ETH";
  COMMON_ASSETS["PDOT"] = "chainflip_dot-NATIVE-pDOT";
  COMMON_ASSETS["HDX"] = "hydradx_main-NATIVE-HDX";
  COMMON_ASSETS["USDC_ETHEREUM"] = "ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  COMMON_ASSETS["USDC_SEPOLIA"] = "sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
  COMMON_ASSETS["HDX_TESTNET"] = "hydradx_rococo-NATIVE-HDX";
  COMMON_ASSETS["USDT_HYDRADX_TESTNET"] = "hydradx_rococo-LOCAL-USDT";
  COMMON_ASSETS["DOT_HYDRADX_TESTNET"] = "hydradx_rococo-LOCAL-DOT";
})(COMMON_ASSETS || (COMMON_ASSETS = {}));
export const _DEFAULT_CHAINS = [COMMON_CHAIN_SLUGS.POLKADOT, COMMON_CHAIN_SLUGS.KUSAMA, COMMON_CHAIN_SLUGS.ETHEREUM];