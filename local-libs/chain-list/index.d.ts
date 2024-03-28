import { _AssetRef, _ChainAsset, _ChainInfo, _MultiChainAsset } from './types';
export declare const ChainInfoMap: Record<string, _ChainInfo>;
export declare const ChainAssetMap: Record<string, _ChainAsset>;
export declare const AssetRefMap: Record<string, _AssetRef>;
export declare const MultiChainAssetMap: Record<string, _MultiChainAsset>;
export declare const AssetLogoMap: Record<string, string>;
export declare const ChainLogoMap: Record<string, string>;
export declare enum COMMON_CHAIN_SLUGS {
    POLKADOT = "polkadot",
    KUSAMA = "kusama",
    MOONBEAM = "moonbeam",
    MOONRIVER = "moonriver",
    ETHEREUM = "ethereum",
    ACALA = "acala",
    KARURA = "karura",
    ALEPH_ZERO = "aleph",
    ASTAR = "astar",
    WESTEND = "westend",
    BINANCE = "binance",
    ASTAR_EVM = "astarEvm",
    HYDRADX = "hydradx_main",
    HYDRADX_TESTNET = "hydradx_rococo",
    ETHEREUM_SEPOLIA = "sepolia_ethereum",
    CHAINFLIP_POLKADOT = "chainflip_dot"
}
export declare enum COMMON_ASSETS {
    DOT = "polkadot-NATIVE-DOT",
    ETH = "ethereum-NATIVE-ETH",
    KSM = "kusama-NATIVE-KSM",
    ETH_SEPOLIA = "sepolia_ethereum-NATIVE-ETH",
    PDOT = "chainflip_dot-NATIVE-pDOT",
    HDX = "hydradx_main-NATIVE-HDX",
    USDC_ETHEREUM = "ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    USDC_SEPOLIA = "sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    HDX_TESTNET = "hydradx_rococo-NATIVE-HDX",
    USDT_HYDRADX_TESTNET = "hydradx_rococo-LOCAL-USDT",
    DOT_HYDRADX_TESTNET = "hydradx_rococo-LOCAL-DOT"
}
export declare const _DEFAULT_CHAINS: string[];
