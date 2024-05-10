(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.subwalletChainList = {}));
})(this, (function (exports) { 'use strict';

  const global = window;

  const _AssetLogoMap = {
  	"default": "https://dev.sw-chain-list-assets.pages.dev/assets/default.png",
  	"bitcoin-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	"bitcointestnet-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	"btc-bitcoin": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	"btc-bitcointestnet": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	"polkadot-native-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadot-native-dot.png",
  	"kusama-native-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kusama-native-ksm.png",
  	"ethereum-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-native-eth.png",
  	"binance-native-bnb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-native-bnb.png",
  	"moonbeam-native-glmr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-native-glmr.png",
  	"pioneer-native-neer": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pioneer-native-neer.png",
  	"aleph-native-azero": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-native-azero.png",
  	"astar-native-astr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-native-astr.png",
  	"statemint-native-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-native-dot.png",
  	"acala-native-aca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-native-aca.png",
  	"polygon-native-matic": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-native-matic.png",
  	"arbitrum_one-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-native-eth.png",
  	"arbitrum_one-erc20-arb-0x912ce59144191c1204e64559fe8253a0e49e6548": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-arb-0x912ce59144191c1204e64559fe8253a0e49e6548.png",
  	"optimism-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-native-eth.png",
  	"optimism-erc20-op-0x4200000000000000000000000000000000000042": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-erc20-op-0x4200000000000000000000000000000000000042.png",
  	"tomochain-native-vic": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tomochain-native-vic.png",
  	"acala-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-dot.png",
  	"acala-local-glmr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-glmr.png",
  	"acala-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-usdt.png",
  	"acala-local-aseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-aseed.png",
  	"acala-local-astr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-astr.png",
  	"acala-local-ldot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-ldot.png",
  	"acala-local-lcdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-lcdot.png",
  	"acala-local-tdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-tdot.png",
  	"alephtest-native-tzero": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/alephtest-native-tzero.png",
  	"moonbeam-local-xcdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcdot.png",
  	"moonbeam-local-xcintr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcintr.png",
  	"moonbeam-local-xcibtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcibtc.png",
  	"moonbeam-local-xcaca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcaca.png",
  	"moonbeam-local-xcaseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcaseed.png",
  	"moonbeam-erc721-mfbb-0x02a6dec99b2ca768d638fcd87a96f6069f91287c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mfbb-0x02a6dec99b2ca768d638fcd87a96f6069f91287c.png",
  	"ethereum-erc20-weth-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-weth-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
  	"astar-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-dot.png",
  	"astar-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-usdt.png",
  	"astarevm-native-astr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-native-astr.png",
  	"astarevm-erc20-usdt-0xffffffff000000000000000000000001000007c0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-usdt-0xffffffff000000000000000000000001000007c0.png",
  	"shibuya-native-sby": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shibuya-native-sby.png",
  	"shibuyaevm-native-sby": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shibuyaevm-native-sby.png",
  	"westend-native-wnd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/westend-native-wnd.png",
  	"rococo-native-roc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rococo-native-roc.png",
  	"bitcountry-native-nuum": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitcountry-native-nuum.png",
  	"bitcountry-local-bit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitcountry-local-bit.png",
  	"equilibrium_parachain-native-eq": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-native-eq.png",
  	"equilibrium_parachain-local-aca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-aca.png",
  	"equilibrium_parachain-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-dot.png",
  	"moonbase-native-dev": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbase-native-dev.png",
  	"moonriver-native-movr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-native-movr.png",
  	"turingstaging-native-tur": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/turingstaging-native-tur.png",
  	"turing-native-tur": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/turing-native-tur.png",
  	"bifrost-native-bnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-native-bnc.png",
  	"bifrost_dot-native-bnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-native-bnc.png",
  	"bifrost_dot-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-usdt.png",
  	"bifrost_dot-local-vdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vdot.png",
  	"bifrost_dot-local-vsdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vsdot.png",
  	"bifrost_dot-local-vglmr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vglmr.png",
  	"bifrost_testnet-native-bnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_testnet-native-bnc.png",
  	"calamari-native-kma": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-native-kma.png",
  	"calamari-local-zkkma": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkkma.png",
  	"calamari-local-bnb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-bnb.png",
  	"calamari-local-wbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-wbtc.png",
  	"calamari-local-busd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-busd.png",
  	"calamari-local-aseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-aseed.png",
  	"calamari-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-usdt.png",
  	"calamari-local-zkusdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkusdt.png",
  	"calamari-local-dai": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-dai.png",
  	"calamari-local-zkdai": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkdai.png",
  	"calamari-local-usdc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-usdc.png",
  	"calamari-local-zkusdc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkusdc.png",
  	"calamari-local-kar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-kar.png",
  	"calamari-local-zkkar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkkar.png",
  	"calamari-local-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-ksm.png",
  	"calamari-local-zkksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkksm.png",
  	"calamari-local-movr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-movr.png",
  	"calamari-local-zkmovr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkmovr.png",
  	"amplitude-native-ampe": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/amplitude-native-ampe.png",
  	"amplitude_test-native-ampe": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/amplitude_test-native-ampe.png",
  	"bobabase-native-boba": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bobabase-native-boba.png",
  	"shiden-native-sdn": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-native-sdn.png",
  	"shidenevm-native-sdn": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-native-sdn.png",
  	"pioneer-local-bit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pioneer-local-bit.png",
  	"ethereum_goerli-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum_goerli-native-eth.png",
  	"binance_test-native-tbnb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance_test-native-tbnb.png",
  	"parallel-native-para": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-native-para.png",
  	"parallel-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-usdt.png",
  	"clover-native-clv": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/clover-native-clv.png",
  	"cloverevm-native-clv": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/cloverevm-native-clv.png",
  	"hydradx_main-native-hdx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-native-hdx.png",
  	"hydradx_main-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdt.png",
  	"edgeware-native-edg": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/edgeware-native-edg.png",
  	"centrifuge-native-cfg": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/centrifuge-native-cfg.png",
  	"interlay-native-intr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-native-intr.png",
  	"interlay-local-ldot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-ldot.png",
  	"interlay-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-usdt.png",
  	"interlay-local-ibtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-ibtc.png",
  	"kintsugi-local-kbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-kbtc.png",
  	"nodle-native-nodl": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/nodle-native-nodl.png",
  	"darwinia2-native-ring": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/darwinia2-native-ring.png",
  	"darwinia2-local-kton": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/darwinia2-local-kton.png",
  	"sora_ksm-native-xor": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sora_ksm-native-xor.png",
  	"odyssey-native-ares": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/odyssey-native-ares.png",
  	"dancebox-native-dance": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dancebox-native-dance.png",
  	"amplitude-local-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/amplitude-local-ksm.png",
  	"polkadex-native-pdex": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadex-native-pdex.png",
  	"polkadextest-native-unit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadextest-native-unit.png",
  	"rmrk-native-unit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rmrk-native-unit.png",
  	"dolphin-native-dol": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dolphin-native-dol.png",
  	"opal-native-opl": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/opal-native-opl.png",
  	"efinity-native-efi": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/efinity-native-efi.png",
  	"composablefinance-native-layr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/composablefinance-native-layr.png",
  	"phala-native-pha": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/phala-native-pha.png",
  	"crust-native-cru": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crust-native-cru.png",
  	"statemine-native-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-native-ksm.png",
  	"karura-native-kar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-native-kar.png",
  	"khala-native-pha": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/khala-native-pha.png",
  	"kilt-native-kilt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kilt-native-kilt.png",
  	"basilisk-native-bsx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/basilisk-native-bsx.png",
  	"altair-native-air": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/altair-native-air.png",
  	"heiko-native-hko": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/heiko-native-hko.png",
  	"kintsugi-native-kint": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-native-kint.png",
  	"kintsugi-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-usdt.png",
  	"kintsugi_test-native-kint": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi_test-native-kint.png",
  	"picasso-native-pica": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/picasso-native-pica.png",
  	"quartz-native-qtz": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/quartz-native-qtz.png",
  	"unique_network-native-unq": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/unique_network-native-unq.png",
  	"genshiro-native-gens": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/genshiro-native-gens.png",
  	"genshiro-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/genshiro-local-dot.png",
  	"genshiro_testnet-native-token": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/genshiro_testnet-native-token.png",
  	"subsocial_x-native-sub": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subsocial_x-native-sub.png",
  	"zeitgeist-native-ztg": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/zeitgeist-native-ztg.png",
  	"sakura-native-sku": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sakura-native-sku.png",
  	"shadow-native-csm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shadow-native-csm.png",
  	"uniquenft-native-unq": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/uniquenft-native-unq.png",
  	"robonomics-native-xrt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/robonomics-native-xrt.png",
  	"integritee-native-teer": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/integritee-native-teer.png",
  	"integriteepolkadot-native-teer": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/integriteepolkadot-native-teer.png",
  	"crabparachain-native-crab": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crabparachain-native-crab.png",
  	"crabparachain-local-ckton": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crabparachain-local-ckton.png",
  	"pangolin-native-pring": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pangolin-native-pring.png",
  	"pangolin-local-pkton": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pangolin-local-pkton.png",
  	"chainx-native-pcx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/chainx-native-pcx.png",
  	"acala_testnet-native-aca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala_testnet-native-aca.png",
  	"mangatax-native-mgat": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/mangatax-native-mgat.png",
  	"mangatax_para-native-mgx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/mangatax_para-native-mgx.png",
  	"encointer-native-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/encointer-native-ksm.png",
  	"litmus-native-lit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/litmus-native-lit.png",
  	"litentry-native-lit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/litentry-native-lit.png",
  	"tinkernet-native-tnkr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tinkernet-native-tnkr.png",
  	"imbue_network-native-imbu": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/imbue_network-native-imbu.png",
  	"subspace_test-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_test-native-tssc.png",
  	"subspace_gemini_2a-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_2a-native-tssc.png",
  	"subspace_gemini_3c-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3c-native-tssc.png",
  	"subspace_gemini_3d-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3d-native-tssc.png",
  	"subspace_gemini_3e-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3e-native-tssc.png",
  	"subspace_gemini_3f-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3f-native-tssc.png",
  	"origintrail-native-neuro": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/origintrail-native-neuro.png",
  	"dorafactory-native-dora": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dorafactory-native-dora.png",
  	"bajun-native-baju": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bajun-native-baju.png",
  	"listen-native-lt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/listen-native-lt.png",
  	"kabocha-native-kab": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kabocha-native-kab.png",
  	"gmdie-native-fren": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/gmdie-native-fren.png",
  	"ternoa-native-caps": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ternoa-native-caps.png",
  	"tanganika-native-dhx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tanganika-native-dhx.png",
  	"pendulum-native-pen": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pendulum-native-pen.png",
  	"pendulum-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pendulum-local-dot.png",
  	"pendulum-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pendulum-local-usdt.png",
  	"gear_testnet-native-unit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/gear_testnet-native-unit.png",
  	"ternoa_alphanet-native-caps": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ternoa_alphanet-native-caps.png",
  	"calamari_test-native-kma": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari_test-native-kma.png",
  	"boba-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/boba-native-eth.png",
  	"kilt_peregrine-native-pilt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kilt_peregrine-native-pilt.png",
  	"xx_network-native-xx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/xx_network-native-xx.png",
  	"watr_network-native-watrd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_network-native-watrd.png",
  	"watr_mainnet-native-watr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_mainnet-native-watr.png",
  	"watr_mainnet_evm-native-watr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_mainnet_evm-native-watr.png",
  	"watr_network_evm-native-watrd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_network_evm-native-watrd.png",
  	"fusotao-native-tao": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/fusotao-native-tao.png",
  	"discovol-native-disc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/discovol-native-disc.png",
  	"discovol_testnet-native-disc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/discovol_testnet-native-disc.png",
  	"atocha-native-ato": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/atocha-native-ato.png",
  	"myriad-native-myria": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/myriad-native-myria.png",
  	"debio-native-dbio": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/debio-native-dbio.png",
  	"collectives-native-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/collectives-native-dot.png",
  	"ajunapolkadot-native-ajun": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ajunapolkadot-native-ajun.png",
  	"bitgreen-native-bbb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitgreen-native-bbb.png",
  	"frequency-native-frqcy": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/frequency-native-frqcy.png",
  	"hashednetwork-native-hash": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hashednetwork-native-hash.png",
  	"kapex-native-kpx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kapex-native-kpx.png",
  	"kylinnetwork-native-kyl": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kylinnetwork-native-kyl.png",
  	"ipci-native-mito": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ipci-native-mito.png",
  	"kico-native-kico": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kico-native-kico.png",
  	"luhnnetwork-native-luhn": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/luhnnetwork-native-luhn.png",
  	"pichiu-native-pchu": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pichiu-native-pchu.png",
  	"riodefi-native-unit": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/riodefi-native-unit.png",
  	"automata-native-ata": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/automata-native-ata.png",
  	"creditcoin-native-ctc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/creditcoin-native-ctc.png",
  	"crownsterling-native-csov": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crownsterling-native-csov.png",
  	"dockposmainnet-native-dock": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dockposmainnet-native-dock.png",
  	"kusari-native-ksi": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kusari-native-ksi.png",
  	"logion-native-lgnt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/logion-native-lgnt.png",
  	"neatcoin-native-neat": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/neatcoin-native-neat.png",
  	"nftmart-native-nmt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/nftmart-native-nmt.png",
  	"polymesh-native-polyx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polymesh-native-polyx.png",
  	"riochain-native-rfuel": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/riochain-native-rfuel.png",
  	"sherpax-native-ksx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sherpax-native-ksx.png",
  	"sora_substrate-native-xor": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sora_substrate-native-xor.png",
  	"swapdex-native-sdx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/swapdex-native-sdx.png",
  	"3dpass-native-p3d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/3dpass-native-p3d.png",
  	"alephsmartnet-native-szero": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/alephsmartnet-native-szero.png",
  	"kulupu-native-klp": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kulupu-native-klp.png",
  	"joystream-native-joy": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/joystream-native-joy.png",
  	"statemint-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-usdt.png",
  	"moonriver-local-xcksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xcksm.png",
  	"shiden-local-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-ksm.png",
  	"karura-local-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-ksm.png",
  	"karura-local-neer": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-neer.png",
  	"karura-local-bnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-bnc.png",
  	"karura-local-tksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-tksm.png",
  	"bifrost-local-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-ksm.png",
  	"bifrost-local-vksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vksm.png",
  	"bifrost-local-vsksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vsksm.png",
  	"bifrost-local-vmovr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vmovr.png",
  	"bifrost-local-vbnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vbnc.png",
  	"moonbeam-local-xcusdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcusdt.png",
  	"moonbeam-local-xceq": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xceq.png",
  	"moonbeam-local-xceqd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xceqd.png",
  	"moonriver-local-xcaseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xcaseed.png",
  	"moonriver-local-xckint": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xckint.png",
  	"moonriver-local-xckbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xckbtc.png",
  	"moonriver-local-xcbnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xcbnc.png",
  	"astar-local-aseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-aseed.png",
  	"astar-local-ldot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-ldot.png",
  	"astar-local-aca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-aca.png",
  	"astarevm-erc20-aseed-0xffffffff00000000000000010000000000000001": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-aseed-0xffffffff00000000000000010000000000000001.png",
  	"moonriver-local-xckar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xckar.png",
  	"karura-local-aseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-aseed.png",
  	"shiden-local-aseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-aseed.png",
  	"shidenevm-erc20-aseed-0xffffffff00000000000000010000000000000000": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-aseed-0xffffffff00000000000000010000000000000000.png",
  	"bifrost-local-aseed": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-aseed.png",
  	"bifrost-local-kar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-kar.png",
  	"statemine-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-usdt.png",
  	"statemine-local-rmrk": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-rmrk.png",
  	"statemine-local-aris": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-aris.png",
  	"statemine-local-bill": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-bill.png",
  	"statemine-local-chaos": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-chaos.png",
  	"statemine-local-chrwna": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-chrwna.png",
  	"statemine-local-bailego": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-bailego.png",
  	"moonbase-erc20-mfr-0xc2bfd8e028b342f0537adc2bf310821c807c1312": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbase-erc20-mfr-0xc2bfd8e028b342f0537adc2bf310821c807c1312.png",
  	"moonbase-erc20-mfg-0x3ef88816ebe8f50019e931bdffb0e428a44a29b1": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbase-erc20-mfg-0x3ef88816ebe8f50019e931bdffb0e428a44a29b1.png",
  	"moonbeam-erc20-usdc-0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-usdc-0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b.png",
  	"moonbeam-erc20-bnb-0xc9baa8cfdde8e328787e29b4b078abf2dadc2055": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-bnb-0xc9baa8cfdde8e328787e29b4b078abf2dadc2055.png",
  	"moonbeam-erc20-glint-0xcd3b51d98478d53f4515a306be565c6eebef1d58": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-glint-0xcd3b51d98478d53f4515a306be565c6eebef1d58.png",
  	"moonbeam-erc20-share-0x4204cad97732282d261fbb7088e07557810a6408": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-share-0x4204cad97732282d261fbb7088e07557810a6408.png",
  	"moonbeam-erc20-beans-0x65b09ef8c5a096c5fd3a80f1f7369e56eb932412": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-beans-0x65b09ef8c5a096c5fd3a80f1f7369e56eb932412.png",
  	"moonbeam-erc20-stella-0x0e358838ce72d5e61e0018a2ffac4bec5f4c88d2": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-stella-0x0e358838ce72d5e61e0018a2ffac4bec5f4c88d2.png",
  	"moonbeam-erc20-xstella-0x06a3b410b681c82417a906993acefb91bab6a080": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-xstella-0x06a3b410b681c82417a906993acefb91bab6a080.png",
  	"moonbeam-erc20-vesolar-0x0db6729c03c85b0708166ca92801bcb5cac781fc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-vesolar-0x0db6729c03c85b0708166ca92801bcb5cac781fc.png",
  	"moonbeam-erc20-flare-0xe3e43888fa7803cdc7bea478ab327cf1a0dc11a7": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-flare-0xe3e43888fa7803cdc7bea478ab327cf1a0dc11a7.png",
  	"moonbeam-erc20-cgs-0x2dfc76901bb2ac2a5fa5fc479590a490bbb10a5f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-cgs-0x2dfc76901bb2ac2a5fa5fc479590a490bbb10a5f.png",
  	"moonbeam-erc20-well-0x511ab53f793683763e5a8829738301368a2411e3": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-well-0x511ab53f793683763e5a8829738301368a2411e3.png",
  	"moonriver-erc20-usdc-0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-usdc-0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d.png",
  	"moonriver-erc20-dai-0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-dai-0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844.png",
  	"moonriver-erc20-mfam-0xbb8d88bcd9749636bc4d2be22aac4bb3b01a58f1": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-mfam-0xbb8d88bcd9749636bc4d2be22aac4bb3b01a58f1.png",
  	"moonriver-erc20-zlk-0x0f47ba9d9bde3442b42175e51d6a367928a1173b": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-zlk-0x0f47ba9d9bde3442b42175e51d6a367928a1173b.png",
  	"moonriver-erc20-solar-0x6bd193ee6d2104f14f94e2ca6efefae561a4334b": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-solar-0x6bd193ee6d2104f14f94e2ca6efefae561a4334b.png",
  	"moonriver-erc20-frax-0x1a93b23281cc1cde4c4741353f3064709a16197d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-frax-0x1a93b23281cc1cde4c4741353f3064709a16197d.png",
  	"moonriver-erc20-fxs-0x6f1d1ee50846fcbc3de91723e61cb68cfa6d0e98": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-fxs-0x6f1d1ee50846fcbc3de91723e61cb68cfa6d0e98.png",
  	"moonriver-erc20-cws-0x6fc9651f45b262ae6338a701d563ab118b1ec0ce": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-cws-0x6fc9651f45b262ae6338a701d563ab118b1ec0ce.png",
  	"moonriver-erc20-rib-0xbd90a6125a84e5c512129d622a75cdde176ade5e": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-rib-0xbd90a6125a84e5c512129d622a75cdde176ade5e.png",
  	"shiden-local-lksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-lksm.png",
  	"shiden-local-movr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-movr.png",
  	"shiden-local-kar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-kar.png",
  	"binance-erc20-busd-0xe9e7cea3dedca5984780bafc599bd69add087d56": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-busd-0xe9e7cea3dedca5984780bafc599bd69add087d56.png",
  	"astarevm-erc20-dot-0xffffffffffffffffffffffffffffffffffffffff": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-dot-0xffffffffffffffffffffffffffffffffffffffff.png",
  	"astarevm-erc20-arsw-0xde2578edec4669ba7f41c5d5d2386300bcea4678": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-arsw-0xde2578edec4669ba7f41c5d5d2386300bcea4678.png",
  	"astarevm-erc20-lay-0xc4335b1b76fa6d52877b3046eca68f6e708a27dd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-lay-0xc4335b1b76fa6d52877b3046eca68f6e708a27dd.png",
  	"astarevm-erc20-bai-0x733ebcc6df85f8266349defd0980f8ced9b45f35": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-bai-0x733ebcc6df85f8266349defd0980f8ced9b45f35.png",
  	"astarevm-erc20-atid-0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-atid-0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c.png",
  	"astarevm-erc20-srs-0x9448610696659de8f72e1831d392214ae1ca4838": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-srs-0x9448610696659de8f72e1831d392214ae1ca4838.png",
  	"astarevm-erc20-oru-0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-oru-0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f.png",
  	"astarevm-erc20-bnb-0x7f27352d5f83db87a5a3e00f4b07cc2138d8ee52": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-bnb-0x7f27352d5f83db87a5a3e00f4b07cc2138d8ee52.png",
  	"astarevm-erc20-busd-0x4bf769b05e832fcdc9053fffbc78ca889acb5e1e": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-busd-0x4bf769b05e832fcdc9053fffbc78ca889acb5e1e.png",
  	"astarevm-erc20-crv-0x7756a83563f0f56937a6fdf668e7d9f387c0d199": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-crv-0x7756a83563f0f56937a6fdf668e7d9f387c0d199.png",
  	"astarevm-erc20-dai-0x6de33698e9e9b787e09d3bd7771ef63557e148bb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-dai-0x6de33698e9e9b787e09d3bd7771ef63557e148bb.png",
  	"astarevm-erc20-pkex-0x1fe622e91e54d6ad00b01917351ea6081426764a": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-pkex-0x1fe622e91e54d6ad00b01917351ea6081426764a.png",
  	"astarevm-erc20-sdn-0x75364d4f779d0bd0facd9a218c67f87dd9aff3b4": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-sdn-0x75364d4f779d0bd0facd9a218c67f87dd9aff3b4.png",
  	"astarevm-erc20-usdc-0x6a2d262d56735dba19dd70682b39f6be9a931d98": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-usdc-0x6a2d262d56735dba19dd70682b39f6be9a931d98.png",
  	"astarevm-erc20-wbtc-0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-wbtc-0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca.png",
  	"astarevm-erc20-weth-0x81ecac0d6be0550a00ff064a4f9dd2400585fe9c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-weth-0x81ecac0d6be0550a00ff064a4f9dd2400585fe9c.png",
  	"astarevm-erc20-kzy-0x3d4dcfd2b483549527f7611ccfecb40b47d0c17b": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-kzy-0x3d4dcfd2b483549527f7611ccfecb40b47d0c17b.png",
  	"astarevm-erc20-wastr-0xaeaaf0e2c81af264101b9129c00f4440ccf0f720": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-wastr-0xaeaaf0e2c81af264101b9129c00f4440ccf0f720.png",
  	"astarevm-erc20-arsw_lp-0x87988ebde7e661f44eb3a586c5e0ceab533a2d9c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-arsw_lp-0x87988ebde7e661f44eb3a586c5e0ceab533a2d9c.png",
  	"astarevm-erc20-kos-0xbcf7aa4fc081f5670d9b8a1bdd1cfd98dcaee6e6": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-kos-0xbcf7aa4fc081f5670d9b8a1bdd1cfd98dcaee6e6.png",
  	"astarevm-erc20-ppc-0x34f79636a55d9961e47b7784ef460b021b499406": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-ppc-0x34f79636a55d9961e47b7784ef460b021b499406.png",
  	"shidenevm-erc20-usdt-0xffffffff000000000000000000000001000007c0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-usdt-0xffffffff000000000000000000000001000007c0.png",
  	"shidenevm-erc20-pkex-0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-pkex-0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98.png",
  	"shidenevm-erc20-bnb-0x332730a4f6e03d9c55829435f10360e13cfa41ff": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-bnb-0x332730a4f6e03d9c55829435f10360e13cfa41ff.png",
  	"shidenevm-erc20-jpyc-0x735abe48e8782948a37c7765ecb76b98cde97b0f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-jpyc-0x735abe48e8782948a37c7765ecb76b98cde97b0f.png",
  	"shidenevm-erc20-eth-0x765277eebeca2e31912c9946eae1021199b39c61": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-eth-0x765277eebeca2e31912c9946eae1021199b39c61.png",
  	"shidenevm-erc20-usdc-0xfa9343c3897324496a05fc75abed6bac29f8a40f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-usdc-0xfa9343c3897324496a05fc75abed6bac29f8a40f.png",
  	"shidenevm-erc20-wsdn-0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-wsdn-0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef.png",
  	"shidenevm-erc20-kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358.png",
  	"shidenevm-erc20-sms-0xec0c789c6dc019b1c19f055edf938b369d235d2c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-sms-0xec0c789c6dc019b1c19f055edf938b369d235d2c.png",
  	"shidenevm-erc20-stnd-0x722377a047e89ca735f09eb7cccab780943c4cb4": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-stnd-0x722377a047e89ca735f09eb7cccab780943c4cb4.png",
  	"shidenevm-erc20-srise-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-srise-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9.png",
  	"shidenevm-erc20-fegs-0xa9b79aab9d60e8e6d08d2cbad56ff0de58ff8d41": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-fegs-0xa9b79aab9d60e8e6d08d2cbad56ff0de58ff8d41.png",
  	"equilibrium_parachain-local-bnb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-bnb.png",
  	"equilibrium_parachain-local-bnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-bnc.png",
  	"equilibrium_parachain-local-cru": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-cru.png",
  	"equilibrium_parachain-local-eqd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-eqd.png",
  	"equilibrium_parachain-local-pha": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-pha.png",
  	"equilibrium_parachain-local-astr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-astr.png",
  	"equilibrium_parachain-local-busd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-busd.png",
  	"equilibrium_parachain-local-glmr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-glmr.png",
  	"equilibrium_parachain-local-ibtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-ibtc.png",
  	"equilibrium_parachain-local-intr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-intr.png",
  	"equilibrium_parachain-local-para": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-para.png",
  	"equilibrium_parachain-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-usdt.png",
  	"equilibrium_parachain-local-eqdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-eqdot.png",
  	"boba-erc20-boba-0xa18bf3994c0cc6e3b63ac420308e5383f53120d7": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/boba-erc20-boba-0xa18bf3994c0cc6e3b63ac420308e5383f53120d7.png",
  	"aventus-native-avt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aventus-native-avt.png",
  	"aventus_testnet-native-avt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aventus_testnet-native-avt.png",
  	"bifrost-local-movr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-movr.png",
  	"bifrost-local-rmrk": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-rmrk.png",
  	"bifrost-local-pha": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-pha.png",
  	"binance-erc20-usdc-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-usdc-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d.png",
  	"binance-erc20-vusdt-0xfd5840cd36d94d7229439859c0112a4185bc0255": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-vusdt-0xfd5840cd36d94d7229439859c0112a4185bc0255.png",
  	"binance-erc20-vbusd-0x95c78222b3d6e262426483d42cfa53685a67ab9d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-vbusd-0x95c78222b3d6e262426483d42cfa53685a67ab9d.png",
  	"binance-erc20-wbnb-0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-wbnb-0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
  	"binance-erc20-eth-0x2170ed0880ac9a755fd29b2688956bd959f933f8": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-eth-0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
  	"binance-erc20-cake-0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-cake-0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png",
  	"binance-erc20-btcb-0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-btcb-0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png",
  	"binance-erc20-ada-0x3ee2200efb3400fabb9aacf31297cbdd1d435d47": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-ada-0x3ee2200efb3400fabb9aacf31297cbdd1d435d47.png",
  	"binance-erc20-xrp-0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-xrp-0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe.png",
  	"binance-erc20-dot-0x7083609fce4d1d8dc0c979aab8c869ea2c873402": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-dot-0x7083609fce4d1d8dc0c979aab8c869ea2c873402.png",
  	"binance-erc20-usdt-0x55d398326f99059ff775485246999027b3197955": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-usdt-0x55d398326f99059ff775485246999027b3197955.png",
  	"ethereum-erc20-usdt-0xdac17f958d2ee523a2206206994597c13d831ec7": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-usdt-0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  	"ethereum-erc20-bnb-0xb8c77482e45f1f44de1745f52c74426c631bdd52": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-bnb-0xb8c77482e45f1f44de1745f52c74426c631bdd52.png",
  	"ethereum-erc20-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  	"ethereum-erc20-verse-0x249ca82617ec3dfb2589c4c17ab7ec9765350a18": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-verse-0x249ca82617ec3dfb2589c4c17ab7ec9765350a18.png",
  	"ethereum-erc20-busd-0x4fabb145d64652a948d72533023f6e7a623c7c53": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-busd-0x4fabb145d64652a948d72533023f6e7a623c7c53.png",
  	"ethereum-erc20-ldo-0x5a98fcbea516cf06857215779fd812ca3bef1b32": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ldo-0x5a98fcbea516cf06857215779fd812ca3bef1b32.png",
  	"ethereum-erc20-wsteth-0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-wsteth-0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0.png",
  	"ethereum-erc20-steth-0xae7ab96520de3a18e5e111b5eaab095312d7fe84": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-steth-0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png",
  	"ethereum-erc20-theta-0x3883f5e181fccaf8410fa61e12b59bad963fb645": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-theta-0x3883f5e181fccaf8410fa61e12b59bad963fb645.png",
  	"ethereum-erc20-near-0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-near-0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4.png",
  	"ethereum-erc20-ape-0x4d224452801aced8b2f0aebe155379bb5d594381": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ape-0x4d224452801aced8b2f0aebe155379bb5d594381.png",
  	"ethereum-erc20-link-0x514910771af9ca656af840dff83e8264ecf986ca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-link-0x514910771af9ca656af840dff83e8264ecf986ca.png",
  	"ethereum-erc20-dai-0x6b175474e89094c44da98b954eedeac495271d0f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-dai-0x6b175474e89094c44da98b954eedeac495271d0f.png",
  	"ethereum-erc20-bat-0x0d8775f648430679a709e98d2b0cb6250d2887ef": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-bat-0x0d8775f648430679a709e98d2b0cb6250d2887ef.png",
  	"ethereum-erc20-cro-0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-cro-0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b.png",
  	"ethereum-erc20-comp-0xc00e94cb662c3520282e6f5717214004a7f26888": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-comp-0xc00e94cb662c3520282e6f5717214004a7f26888.png",
  	"ethereum-erc20-enj-0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-enj-0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png",
  	"ethereum-erc20-sand-0x3845badade8e6dff049820680d1f14bd3903a5d0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-sand-0x3845badade8e6dff049820680d1f14bd3903a5d0.png",
  	"ethereum-erc20-gala-0x15d4c048f83bd7e37d49ea4c83a07267ec4203da": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-gala-0x15d4c048f83bd7e37d49ea4c83a07267ec4203da.png",
  	"ethereum-erc20-chz-0x3506424f91fd33084466f402d5d97f05f8e3b4af": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-chz-0x3506424f91fd33084466f402d5d97f05f8e3b4af.png",
  	"ethereum-erc20-1inch-0x111111111117dc0aa78b770fa6a738034120c302": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-1inch-0x111111111117dc0aa78b770fa6a738034120c302.png",
  	"ethereum-erc20-ftm-0x4e15361fd6b4bb609fa63c81a2be19d873717870": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ftm-0x4e15361fd6b4bb609fa63c81a2be19d873717870.png",
  	"ethereum-erc20-mkr-0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-mkr-0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png",
  	"ethereum-erc20-knc-0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-knc-0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202.png",
  	"ethereum-erc20-wbtc-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-wbtc-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
  	"ethereum-erc20-ens-0xc18360217d8f7ab5e7c516566761ea12ce7f9d72": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ens-0xc18360217d8f7ab5e7c516566761ea12ce7f9d72.png",
  	"ethereum-erc20-uni-0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-uni-0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
  	"ethereum-erc20-matic-0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-matic-0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
  	"ethereum-erc20-shib-0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-shib-0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png",
  	"moonbeam-erc20-tfa-0xe065ffaf3f7ded69bb5cf5fdd1fd1dda2eee8493": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-tfa-0xe065ffaf3f7ded69bb5cf5fdd1fd1dda2eee8493.png",
  	"moonbeam-erc721-mfmp-0x6758053c0b27e478ede1e4882adff708fc4fa72d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mfmp-0x6758053c0b27e478ede1e4882adff708fc4fa72d.png",
  	"moonbeam-erc721-mm-0xcc1a7573c8f10d0df7ee4d57cc958c8df4a5aca9": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mm-0xcc1a7573c8f10d0df7ee4d57cc958c8df4a5aca9.png",
  	"moonbeam-erc721-mdao-0xc6342eab8b7cc405fc35eba7f7401fc400ac0709": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mdao-0xc6342eab8b7cc405fc35eba7f7401fc400ac0709.png",
  	"moonbeam-erc721-glma-0x8fbe243d898e7c88a6724bb9eb13d746614d23d6": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-glma-0x8fbe243d898e7c88a6724bb9eb13d746614d23d6.png",
  	"moonbeam-erc721-glmj-0xcb13945ca8104f813992e4315f8ffefe64ac49ca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-glmj-0xcb13945ca8104f813992e4315f8ffefe64ac49ca.png",
  	"moonbeam-erc721-punk-0xfd86d63748a6390e4a80739e776463088811774d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-punk-0xfd86d63748a6390e4a80739e776463088811774d.png",
  	"moonbeam-erc721-gpunks-0x25714fcbc4be731b95ae86483ef97ef6c3deb5ce": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-gpunks-0x25714fcbc4be731b95ae86483ef97ef6c3deb5ce.png",
  	"moonbeam-erc721-glmrzuki-0xc36d971c11cebbcc20ee2c2910e07e2b1be3790d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-glmrzuki-0xc36d971c11cebbcc20ee2c2910e07e2b1be3790d.png",
  	"moonbeam-erc721-gkc-0x62e413d4b097b474999cf33d336cd74881084ba5": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-gkc-0x62e413d4b097b474999cf33d336cd74881084ba5.png",
  	"moonbeam-erc721-mbns-0x9576167eb03141f041ccaf57d4d0bd40abb2b583": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mbns-0x9576167eb03141f041ccaf57d4d0bd40abb2b583.png",
  	"moonbeam-erc721-anft-0xcf82ddcca84d0e419bccd7a540e807c114250ded": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-anft-0xcf82ddcca84d0e419bccd7a540e807c114250ded.png",
  	"moonriver-erc721-zoombie-0x08716e418e68564c96b68192e985762740728018": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc721-zoombie-0x08716e418e68564c96b68192e985762740728018.png",
  	"moonriver-erc721-nftq-0x79c8c73f85ec794f570aa7b768568a7fedb294f8": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc721-nftq-0x79c8c73f85ec794f570aa7b768568a7fedb294f8.png",
  	"astarevm-erc721-ghost-0xb4bd85893d6f66869d7766ace1b1eb4d867d963e": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-ghost-0xb4bd85893d6f66869d7766ace1b1eb4d867d963e.png",
  	"astar-psp34-neurolauncher-bylgjmskwd4s4pteacf2snbwfem4bners27fgnvcc9sqre4": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-neurolauncher-bylgjmskwd4s4pteacf2snbwfem4bners27fgnvcc9sqre4.png",
  	"astarevm-erc721-ap-0x1b57c69838cdbc59c8236dda73287a4780b4831f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-ap-0x1b57c69838cdbc59c8236dda73287a4780b4831f.png",
  	"astarevm-erc721-degen-0xd59fc6bfd9732ab19b03664a45dc29b8421bda9a": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-degen-0xd59fc6bfd9732ab19b03664a45dc29b8421bda9a.png",
  	"astarevm-erc721-anaut-0xf008371a7eed0ab54fdd975fe0d0f66fefba3415": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-anaut-0xf008371a7eed0ab54fdd975fe0d0f66fefba3415.png",
  	"astarevm-erc721-cat-0x8b5d62f396ca3c6cf19803234685e693733f9779": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-cat-0x8b5d62f396ca3c6cf19803234685e693733f9779.png",
  	"moonbeam-erc721-exrp-0x515e20e6275ceefe19221fc53e77e38cc32b80fb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-exrp-0x515e20e6275ceefe19221fc53e77e38cc32b80fb.png",
  	"moonbeam-erc721-moonpets-0x2159762693c629c5a44fc9bafd484f8b96713467": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-moonpets-0x2159762693c629c5a44fc9bafd484f8b96713467.png",
  	"vara_network-native-vara": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/vara_network-native-vara.png",
  	"polygon-erc20-usdt-0xc2132d05d31c914a87c6611c10748aeb04b58e8f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-erc20-usdt-0xc2132d05d31c914a87c6611c10748aeb04b58e8f.png",
  	"arbitrum_one-erc20-usdt-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-usdt-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.png",
  	"optimism-erc20-usdt-0x94b008aa00579c1307b0ef2c499ad98a8ce58e58": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-erc20-usdt-0x94b008aa00579c1307b0ef2c499ad98a8ce58e58.png",
  	"tomochain-erc20-usdt-0x381b31409e4d220919b2cff012ed94d70135a59e": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tomochain-erc20-usdt-0x381b31409e4d220919b2cff012ed94d70135a59e.png",
  	"polygon-erc20-usdc.e-0x2791bca1f2de4661ed88a30c99a7a9449aa84174": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-erc20-usdc.e-0x2791bca1f2de4661ed88a30c99a7a9449aa84174.png",
  	"polygon-erc20-usdc-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-erc20-usdc-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359.png",
  	"arbitrum_one-erc20-usdc-0xaf88d065e77c8cc2239327c5edb3a432268e5831": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-usdc-0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
  	"optimism-erc20-usdc-0x7f5c764cbc14f9669b88837ca1490cca17c31607": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-erc20-usdc-0x7f5c764cbc14f9669b88837ca1490cca17c31607.png",
  	"tomochain-erc20-usdc-0xcca4e6302510d555b654b3eab9c0fcb223bcfdf0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tomochain-erc20-usdc-0xcca4e6302510d555b654b3eab9c0fcb223bcfdf0.png",
  	"astar-psp34-serpenators-wcx5y1wsgpbxqqtn75jxnthey9w4ezsekcdjg2jx3gca97d": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-serpenators-wcx5y1wsgpbxqqtn75jxnthey9w4ezsekcdjg2jx3gca97d.png",
  	"astar-psp34-usagii-wvyvtr9ktvxa9frrfjpxvegytu5k5lf491xzfhmql3hadn6": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-usagii-wvyvtr9ktvxa9frrfjpxvegytu5k5lf491xzfhmql3hadn6.png",
  	"kate-native-avl": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kate-native-avl.png",
  	"aleph-psp22-inw-5h4acwlkupvpct6xgjzdgppxfocknkqu2juvnguw6bxepzst": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-psp22-inw-5h4acwlkupvpct6xgjzdgppxfocknkqu2juvnguw6bxepzst.png",
  	"bridgehubpolkadot-native-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bridgehubpolkadot-native-dot.png",
  	"bridgehubkusama-native-ksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bridgehubkusama-native-ksm.png",
  	"bifrost_dot-local-vfil": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vfil.png",
  	"ethereum-erc20-veth-0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-veth-0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f.png",
  	"kintsugi-local-lp_ksm_kint": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-lp_ksm_kint.png",
  	"kintsugi-local-lp_ksm_kbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-lp_ksm_kbtc.png",
  	"kintsugi-local-lp_kbtc_usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-lp_kbtc_usdt.png",
  	"fantom-native-ftm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/fantom-native-ftm.png",
  	"fantom_testnet-native-ftm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/fantom_testnet-native-ftm.png",
  	"binance-erc20-ftm-0xad29abb318791d579433d831ed122afeaf29dcfe": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-ftm-0xad29abb318791d579433d831ed122afeaf29dcfe.png",
  	"interlay-local-lp_dot_ibtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-lp_dot_ibtc.png",
  	"interlay-local-lp_ibtc_usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-lp_ibtc_usdt.png",
  	"interlay-local-lp_intr_usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-lp_intr_usdt.png",
  	"interlay-local-qibtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-qibtc.png",
  	"interlay-local-qdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-qdot.png",
  	"interlay-local-qusdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-qusdt.png",
  	"kintsugi-local-qkbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-qkbtc.png",
  	"kintsugi-local-qksm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-qksm.png",
  	"kintsugi-local-qusdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-qusdt.png",
  	"krest_network-native-krest": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/krest_network-native-krest.png",
  	"aleph-psp22-panx-5gsgacvqpf5suh2mhj1yudblabsscjeqcn2mimucwujnr5dq": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-psp22-panx-5gsgacvqpf5suh2mhj1yudblabsscjeqcn2mimucwujnr5dq.png",
  	"deeper_network-native-dpr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/deeper_network-native-dpr.png",
  	"ethereum-erc20-dpr-0xf3ae5d769e153ef72b4e3591ac004e89f48107a1": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-dpr-0xf3ae5d769e153ef72b4e3591ac004e89f48107a1.png",
  	"jur_network-native-jur": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/jur_network-native-jur.png",
  	"aleph-psp34-azerodomain-5ctqbfbc9sfdrcdbjdfliyw2pg9z5w6c6es8sk313blnfgdf": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-psp34-azerodomain-5ctqbfbc9sfdrcdbjdfliyw2pg9z5w6c6es8sk313blnfgdf.png",
  	"ethereum-erc20-usdd-0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-usdd-0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6.png",
  	"binance-erc20-usdd-0xd17479997f34dd9156deef8f95a52d81d265be9c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-usdd-0xd17479997f34dd9156deef8f95a52d81d265be9c.png",
  	"base_mainnet-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/base_mainnet-native-eth.png",
  	"avalanche_c-native-avax": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/avalanche_c-native-avax.png",
  	"crust_mainnet-native-cru": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crust_mainnet-native-cru.png",
  	"moonbeam-local-xcastr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcastr.png",
  	"bifrost_dot-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-dot.png",
  	"parallel-local-sdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-sdot.png",
  	"parallel-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-dot.png",
  	"interlay-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-dot.png",
  	"hydradx_main-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-dot.png",
  	"acala_evm-native-aca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala_evm-native-aca.png",
  	"karura_evm-native-kar": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura_evm-native-kar.png",
  	"statemint-local-usdc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-usdc.png",
  	"astar-psp34-neuroguns-az9bd2thegkrs3fnjv5oe7kgvrp5gqvdjmhc2gxjxa2yqbd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-neuroguns-az9bd2thegkrs3fnjv5oe7kgvrp5gqvdjmhc2gxjxa2yqbd.png",
  	"bittensor-native-tao": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bittensor-native-tao.png",
  	"hydradx_main-local-usdc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdc.png",
  	"moonbeam-erc20-cp": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-cp.jpg",
  	"zeta_test-native-zeta": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/zeta_test-native-zeta.png",
  	"xcavate-native-xcav": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/xcavate-native-xcav.png",
  	"arbitrum_one-erc20-usdc.e-0xff970a61a04b1ca14834a43f5de4533ebddb5cc8": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-usdc.e-0xff970a61a04b1ca14834a43f5de4533ebddb5cc8.png",
  	"moonbeam-erc20-stdot-0xbc7e02c4178a7df7d3e564323a5c359dc96c4db4": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-stdot-0xbc7e02c4178a7df7d3e564323a5c359dc96c4db4.png",
  	"enjin_matrixchain-native-enj": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/enjin_matrixchain-native-enj.png",
  	"enjin_relaychain-native-enj": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/enjin_relaychain-native-enj.png",
  	"subspace_gemini_3g-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3g-native-tssc.png",
  	"goldberg_testnet-native-avl": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/goldberg_testnet-native-avl.png",
  	"acala-local-usdcet": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-usdcet.png",
  	"interlay-local-usdc.wh": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-usdc.wh.png",
  	"centrifuge-local-usdc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/centrifuge-local-usdc.png",
  	"moonbeam-local-xcusdc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcusdc.png",
  	"vara_testnet-native-tvara": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/vara_testnet-native-tvara.png",
  	"energy_web_x_testnet-native-vt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_x_testnet-native-vt.png",
  	"energy_web_chain-native-ewt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_chain-native-ewt.png",
  	"energy_web_x_rococo-native-vt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_x_rococo-native-vt.png",
  	"energy_web_x-native-ewt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_x-native-ewt.png",
  	"acala-local-intr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-intr.png",
  	"parallel-local-aca": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-aca.png",
  	"hydradx_main-local-cfg": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-cfg.png",
  	"polimec-native-plmc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polimec-native-plmc.png",
  	"invarch-native-varch": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/invarch-native-varch.png",
  	"parallel-local-cdot714": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-cdot714.png",
  	"manta_network_evm-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network_evm-native-eth.png",
  	"polkadex_dot-native-pdex": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadex_dot-native-pdex.png",
  	"bifrost_dot-local-bncs": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-bncs.png",
  	"manta_network-native-manta": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network-native-manta.png",
  	"manta_network_evm-erc20-manta-0x95cef13441be50d20ca4558cc0a27b601ac544e5": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network_evm-erc20-manta-0x95cef13441be50d20ca4558cc0a27b601ac544e5.png",
  	"manta_network-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network-local-dot.png",
  	"moonbeam-local-xcmanta": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcmanta.png",
  	"bittensor_testnet-native-tao": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bittensor_testnet-native-tao.png",
  	"statemint-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-pink.png",
  	"moonbeam-local-xcpink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcpink.png",
  	"bifrost_dot-local-vmanta": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vmanta.png",
  	"bifrost_dot-local-manta": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-manta.png",
  	"subspace_gemini_3h-native-tssc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3h-native-tssc.png",
  	"continuum_network-native-nuum": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/continuum_network-native-nuum.png",
  	"hydradx_main-local-intr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-intr.png",
  	"rococo_assethub-native-roc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rococo_assethub-native-roc.png",
  	"rococo_assethub-local-weth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rococo_assethub-local-weth.png",
  	"okxtest-native-okx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/okxtest-native-okx.png",
  	"liberlandtest-native-ldn": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/liberlandtest-native-ldn.png",
  	"liberland-native-lld": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/liberland-native-lld.png",
  	"liberland-local-llm": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/liberland-local-llm.png",
  	"chainflip_dot-native-pdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/chainflip_dot-native-pdot.png",
  	"ethereum_goerli-erc20-usdc-0x07865c6e87b9f70255377e024ace6630c1eaa37f": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum_goerli-erc20-usdc-0x07865c6e87b9f70255377e024ace6630c1eaa37f.png",
  	"hydradx_main-local-astr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-astr.png",
  	"hydradx_main-local-bnc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-bnc.png",
  	"hydradx_main-local-glmr": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-glmr.png",
  	"tangletest-native-ttnt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tangletest-native-ttnt.png",
  	"dentnet-native-dentx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dentnet-native-dentx.png",
  	"dentnet-local-dent": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dentnet-local-dent.png",
  	"phykentest-native-ken": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/phykentest-native-ken.png",
  	"creditcointestevm-native-ctc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/creditcointestevm-native-ctc.png",
  	"astarzkevm-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarzkevm-native-eth.png",
  	"sepolia_ethereum-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sepolia_ethereum-native-eth.png",
  	"sepolia_ethereum-erc20-usdc-0x1c7d4b196cb0c7b01d743fbc6116a902379c7238": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sepolia_ethereum-erc20-usdc-0x1c7d4b196cb0c7b01d743fbc6116a902379c7238.png",
  	"statemint-local-ded": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-ded.png",
  	"hydradx_rococo-native-hdx": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_rococo-native-hdx.png",
  	"hydradx_rococo-local-dot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_rococo-local-dot.png",
  	"hydradx_rococo-local-usdt": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_rococo-local-usdt.png",
  	"bifrost_dot-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-pink.png",
  	"astar-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-pink.png",
  	"phala-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/phala-local-pink.png",
  	"acala-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-pink.png",
  	"crust-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crust-local-pink.png",
  	"darwinia2-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/darwinia2-local-pink.png",
  	"creditcointest-native-ctc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/creditcointest-native-ctc.png",
  	"moonbeam-erc20-rmrk-0x524d524b4c9366be706d3a90dcf70076ca037ae3": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-rmrk-0x524d524b4c9366be706d3a90dcf70076ca037ae3.png",
  	"astarevm-erc20-rmrk-0x524d524b4c9366be706d3a90dcf70076ca037ae3": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-rmrk-0x524d524b4c9366be706d3a90dcf70076ca037ae3.png",
  	"hydradx_main-local-ded": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-ded.png",
  	"xlayer-native-okb": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/xlayer-native-okb.png",
  	"astarzkevm-erc20-astr-0xdf41220c7e322bfef933d85d01821ad277f90172": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarzkevm-erc20-astr-0xdf41220c7e322bfef933d85d01821ad277f90172.png",
  	"moonbeam-local-xcded": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcded.png",
  	"statemint-local-dota": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-dota.png",
  	"moonbeam-local-xcbncs": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcbncs.png",
  	"hydradx_main-local-dai": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-dai.png",
  	"hydradx_main-local-ape": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-ape.png",
  	"hydradx_main-local-sub": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-sub.png",
  	"hydradx_main-local-4pool": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-4pool.png",
  	"hydradx_main-local-weth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-weth.png",
  	"hydradx_main-local-2pool": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-2pool.png",
  	"hydradx_main-local-vdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-vdot.png",
  	"hydradx_main-local-lrna": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-lrna.png",
  	"hydradx_main-local-dai-18": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-dai-18.png",
  	"hydradx_main-local-usdc-21": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdc-21.png",
  	"hydradx_main-local-usdt-23": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdt-23.png",
  	"hydradx_main-local-wbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-wbtc.png",
  	"hydradx_main-local-ibtc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-ibtc.png",
  	"hydradx_main-local-pink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-pink.png",
  	"acurast-native-cacu": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acurast-native-cacu.png",
  	"mythos-native-myth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/mythos-native-myth.png",
  	"statemint-local-beefy": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-beefy.png",
  	"hydradx_main-local-beefy": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-beefy.png",
  	"humanode-native-hmnd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/humanode-native-hmnd.png",
  	"humanodeevm-native-ehmnd": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/humanodeevm-native-ehmnd.png",
  	"humanodeevm-erc20-wehmnd-0x0000000000000000000000000000000000000802": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/humanodeevm-erc20-wehmnd-0x0000000000000000000000000000000000000802.png",
  	"moonbeam-local-xcvdot": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcvdot.png",
  	"statemint-local-stink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-stink.png",
  	"hydradx_main-local-stink": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-stink.png",
  	"base_mainnet-erc20-pink-0x66fc31b3233c7c001bdd21ff6e5e66fa08ef85d0": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/base_mainnet-erc20-pink-0x66fc31b3233c7c001bdd21ff6e5e66fa08ef85d0.png",
  	"paseotest-native-pas": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/paseotest-native-pas.png",
  	"commune-native-c": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/commune-native-c.png",
  	"dbcchain-native-dbc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dbcchain-native-dbc.png",
  	"dbcchain-local-dlc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dbcchain-local-dlc.png",
  	"availturingtest-native-avail": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/availturingtest-native-avail.png",
  	"bitlayer-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-native-btc.png",
  	"bitlayertest-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayertest-native-btc.png",
  	"bevm-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bevm-native-btc.png",
  	"bevmtest-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bevmtest-native-btc.png",
  	"b2-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/b2-native-btc.png",
  	"bitlayer-erc20-usdt-0xfe9f969faf8ad72a83b761138bf25de87eff9dd2": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-erc20-usdt-0xfe9f969faf8ad72a83b761138bf25de87eff9dd2.png",
  	"bitlayer-erc20-usdc-0x9827431e8b77e87c9894bd50b055d6be56be0030": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-erc20-usdc-0x9827431e8b77e87c9894bd50b055d6be56be0030.png",
  	"bitlayer-erc20-eth-0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-erc20-eth-0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2.png",
  	"bobmainnet-native-eth": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bobmainnet-native-eth.png",
  	"avail_mainnet-native-avail": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/avail_mainnet-native-avail.png",
  	"merlinevm-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/merlinevm-native-btc.png",
  	"botanixevmtest-native-btc": "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/botanixevmtest-native-btc.png",
  	"eth-ethereum": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/eth-ethereum.png",
  	"ibtc-interbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ibtc-interbtc.png",
  	"glmr-moonbeam": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/glmr-moonbeam.png",
  	"dot-polkadot": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dot-polkadot.png",
  	"aca-acala": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/aca-acala.png",
  	"movr-moonriver": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/movr-moonriver.png",
  	"usdt-tether": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/usdt-tether.png",
  	"astr-astar": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/astr-astar.png",
  	"dev-moonbasedev": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dev-moonbasedev.png",
  	"dai-daistablecoin": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dai-daistablecoin.png",
  	"dpr-deepernetwork": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dpr-deepernetwork.png",
  	"bnc-bifrostkusama": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bnc-bifrostkusama.png",
  	"boba-bobatoken": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/boba-bobatoken.png",
  	"cru-crust": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/cru-crust.png",
  	"sdn-shiden": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/sdn-shiden.png",
  	"arb-arbitrumone": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/arb-arbitrumone.png",
  	"usdd-decentralizedusd": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/usdd-decentralizedusd.png",
  	"neer-pioneer": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/neer-pioneer.png",
  	"kar-karura": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kar-karura.png",
  	"pkex-polkaex": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/pkex-polkaex.png",
  	"aseed-aseedacala": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/aseed-aseedacala.png",
  	"matic-polygon": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/matic-polygon.png",
  	"kbtc-kintsugiwrappedbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kbtc-kintsugiwrappedbtc.png",
  	"ftm-fantom": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ftm-fantom.png",
  	"ausd-karuradollar": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ausd-karuradollar.png",
  	"pha-phala": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/pha-phala.png",
  	"weth-wrappedether": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/weth-wrappedether.png",
  	"busd-binanceusd": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/busd-binanceusd.png",
  	"eq-equilibrium": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/eq-equilibrium.png",
  	"bnb-binance": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bnb-binance.png",
  	"usdc-usdcoin": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/usdc-usdcoin.png",
  	"rmrk-rmrkapp": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/rmrk-rmrkapp.png",
  	"kint-kintsugi": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kint-kintsugi.png",
  	"wbtc-wrappedbtc": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	"aseed-aseedkarura": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/aseed-aseedkarura.png",
  	"ausd-acaladollar": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ausd-acaladollar.png",
  	"eqd-equilibriumusd": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/eqd-equilibriumusd.png",
  	"kma-calamari": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kma-calamari.png",
  	"op-optimism": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/op-optimism.png",
  	"para-parallel": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/para-parallel.png",
  	"ksm-kusama": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ksm-kusama.png",
  	"intr-interlay": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/intr-interlay.png",
  	"enj-enjin": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/enj-enjin.png",
  	"cfg-centrifuge": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/cfg-centrifuge.png",
  	"manta-mantaatlantic": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/manta-mantaatlantic.png",
  	"pink-statemintpink": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/pink-statemintpink.png",
  	"bnc-bifrostpolkadot": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bnc-bifrostpolkadot.png",
  	"ded-ded": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ded-ded.png",
  	"bncs-inscriptiontoken": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bncs-inscriptiontoken.png",
  	"ape-apecoin": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ape-apecoin.png",
  	"vdot-voucherdot": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/vdot-voucherdot.png",
  	"beefy-beefy": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/beefy-beefy.png",
  	"hmnd-humanode": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/hmnd-humanode.png",
  	"stink-stink": "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/stink-stink.png",
  	"custom-moonbeam-erc20-cp-0x6021d2c27b6fbd6e7608d1f39b41398caee2f824": "https://dev.sw-chain-list-assets.pages.dev/assets/custom-chain-assets/cp_77d5363018.png",
  	"custom-aleph-psp22-zpf-5eskjbkpva1ppucmrkcmazdhqm9shihws9uqqsoi4vrdcdle": "https://dev.sw-chain-list-assets.pages.dev/assets/custom-chain-assets/zpf_2f06de3f07.png",
  	"custom-custom-substrate-gosnetwork-native-gos": "https://dev.sw-chain-list-assets.pages.dev/assets/custom-chain-assets/gos_a4d1a9cf7a.png",
  	"custom-custom-substrate-gosspectral-native-gost": "https://dev.sw-chain-list-assets.pages.dev/assets/custom-chain-assets/gos_a4d1a9cf7a.png"
  };

  const _AssetRefMap = {
  	"polkadot-NATIVE-DOT___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "polkadot",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___acala-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "acala-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "acala",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___astar-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "astar-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "astar",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___statemint-NATIVE-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "statemint-NATIVE-DOT",
  	srcChain: "polkadot",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___interlay-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "interlay-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "interlay",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___parallel-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "parallel-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "parallel",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___bifrost_dot-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "bifrost_dot-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "bifrost_dot",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___hydradx_main-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "hydradx_main",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___manta_network-LOCAL-DOT": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "manta_network-LOCAL-DOT",
  	srcChain: "polkadot",
  	destChain: "manta_network",
  	path: "XCM"
  },
  	"polkadot-NATIVE-DOT___ethereum-NATIVE-ETH": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "ethereum-NATIVE-ETH",
  	srcChain: "polkadot",
  	destChain: "ethereum",
  	path: "SWAP"
  },
  	"polkadot-NATIVE-DOT___ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
  	srcAsset: "polkadot-NATIVE-DOT",
  	destAsset: "ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  	srcChain: "polkadot",
  	destChain: "ethereum",
  	path: "SWAP"
  },
  	"kusama-NATIVE-KSM___statemine-NATIVE-KSM": {
  	srcAsset: "kusama-NATIVE-KSM",
  	destAsset: "statemine-NATIVE-KSM",
  	srcChain: "kusama",
  	destChain: "statemine",
  	path: "XCM"
  },
  	"kusama-NATIVE-KSM___moonriver-LOCAL-xcKSM": {
  	srcAsset: "kusama-NATIVE-KSM",
  	destAsset: "moonriver-LOCAL-xcKSM",
  	srcChain: "kusama",
  	destChain: "moonriver",
  	path: "XCM"
  },
  	"kusama-NATIVE-KSM___shiden-LOCAL-KSM": {
  	srcAsset: "kusama-NATIVE-KSM",
  	destAsset: "shiden-LOCAL-KSM",
  	srcChain: "kusama",
  	destChain: "shiden",
  	path: "XCM"
  },
  	"kusama-NATIVE-KSM___karura-LOCAL-KSM": {
  	srcAsset: "kusama-NATIVE-KSM",
  	destAsset: "karura-LOCAL-KSM",
  	srcChain: "kusama",
  	destChain: "karura",
  	path: "XCM"
  },
  	"kusama-NATIVE-KSM___bifrost-LOCAL-KSM": {
  	srcAsset: "kusama-NATIVE-KSM",
  	destAsset: "bifrost-LOCAL-KSM",
  	srcChain: "kusama",
  	destChain: "bifrost",
  	path: "XCM"
  },
  	"kusama-NATIVE-KSM___amplitude-LOCAL-KSM": {
  	srcAsset: "kusama-NATIVE-KSM",
  	destAsset: "amplitude-LOCAL-KSM",
  	srcChain: "kusama",
  	destChain: "amplitude",
  	path: "XCM"
  },
  	"ethereum-NATIVE-ETH___polkadot-NATIVE-DOT": {
  	srcAsset: "ethereum-NATIVE-ETH",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "ethereum",
  	destChain: "polkadot",
  	path: "SWAP"
  },
  	"moonbeam-NATIVE-GLMR___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "moonbeam-NATIVE-GLMR",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"pioneer-NATIVE-NEER___karura-LOCAL-NEER": {
  	srcAsset: "pioneer-NATIVE-NEER",
  	destAsset: "karura-LOCAL-NEER",
  	srcChain: "pioneer",
  	destChain: "karura",
  	path: "XCM"
  },
  	"astar-NATIVE-ASTR___acala-LOCAL-ASTR": {
  	srcAsset: "astar-NATIVE-ASTR",
  	destAsset: "acala-LOCAL-ASTR",
  	srcChain: "astar",
  	destChain: "acala",
  	path: "XCM"
  },
  	"statemint-NATIVE-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "statemint-NATIVE-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "statemint",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"acala-NATIVE-ACA___moonbeam-LOCAL-xcACA": {
  	srcAsset: "acala-NATIVE-ACA",
  	destAsset: "moonbeam-LOCAL-xcACA",
  	srcChain: "acala",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"acala-NATIVE-ACA___parallel-LOCAL-ACA": {
  	srcAsset: "acala-NATIVE-ACA",
  	destAsset: "parallel-LOCAL-ACA",
  	srcChain: "acala",
  	destChain: "parallel",
  	path: "XCM"
  },
  	"acala-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "acala-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "acala",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"acala-LOCAL-GLMR___moonbeam-NATIVE-GLMR": {
  	srcAsset: "acala-LOCAL-GLMR",
  	destAsset: "moonbeam-NATIVE-GLMR",
  	srcChain: "acala",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"acala-LOCAL-USDT___statemint-LOCAL-USDt": {
  	srcAsset: "acala-LOCAL-USDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "acala",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcDOT___polkadot-NATIVE-DOT": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "moonbeam",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcDOT___manta_network-LOCAL-DOT": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "manta_network-LOCAL-DOT",
  	srcChain: "moonbeam",
  	destChain: "manta_network",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcDOT___moonbeam-NATIVE-GLMR": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "moonbeam-NATIVE-GLMR",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"moonbeam-LOCAL-xcDOT___moonbeam-LOCAL-xcPINK": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "moonbeam-LOCAL-xcPINK",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"moonbeam-LOCAL-xcDOT___moonbeam-LOCAL-xcUSDT": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "moonbeam-LOCAL-xcUSDT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"moonbeam-LOCAL-xcDOT___moonbeam-ERC20-stDOT-0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "moonbeam-ERC20-stDOT-0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"moonbeam-LOCAL-xcDOT___moonbeam-LOCAL-xcvDOT": {
  	srcAsset: "moonbeam-LOCAL-xcDOT",
  	destAsset: "moonbeam-LOCAL-xcvDOT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"moonbeam-LOCAL-xcINTR___interlay-NATIVE-INTR": {
  	srcAsset: "moonbeam-LOCAL-xcINTR",
  	destAsset: "interlay-NATIVE-INTR",
  	srcChain: "moonbeam",
  	destChain: "interlay",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcIBTC___interlay-LOCAL-iBTC": {
  	srcAsset: "moonbeam-LOCAL-xcIBTC",
  	destAsset: "interlay-LOCAL-iBTC",
  	srcChain: "moonbeam",
  	destChain: "interlay",
  	path: "XCM"
  },
  	"astar-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "astar-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "astar",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"astar-LOCAL-USDT___statemint-LOCAL-USDt": {
  	srcAsset: "astar-LOCAL-USDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "astar",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"rococo-NATIVE-ROC___hydradx_rococo-NATIVE-HDX": {
  	srcAsset: "rococo-NATIVE-ROC",
  	destAsset: "hydradx_rococo-NATIVE-HDX",
  	srcChain: "rococo",
  	destChain: "hydradx_rococo",
  	path: "XCM"
  },
  	"bifrost_dot-LOCAL-USDT___statemint-LOCAL-USDt": {
  	srcAsset: "bifrost_dot-LOCAL-USDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "bifrost_dot",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"ethereum_goerli-NATIVE-ETH___chainflip_dot-NATIVE-pDOT": {
  	srcAsset: "ethereum_goerli-NATIVE-ETH",
  	destAsset: "chainflip_dot-NATIVE-pDOT",
  	srcChain: "ethereum_goerli",
  	destChain: "chainflip_dot",
  	path: "SWAP"
  },
  	"ethereum_goerli-NATIVE-ETH___ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F": {
  	srcAsset: "ethereum_goerli-NATIVE-ETH",
  	destAsset: "ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  	srcChain: "ethereum_goerli",
  	destChain: "ethereum_goerli",
  	path: "SWAP"
  },
  	"parallel-LOCAL-USDT___statemint-LOCAL-USDt": {
  	srcAsset: "parallel-LOCAL-USDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "parallel",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-NATIVE-HDX___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-NATIVE-HDX",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___statemint-LOCAL-USDt": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "hydradx_main",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-USDT___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-USDT",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"centrifuge-NATIVE-CFG___hydradx_main-LOCAL-CFG": {
  	srcAsset: "centrifuge-NATIVE-CFG",
  	destAsset: "hydradx_main-LOCAL-CFG",
  	srcChain: "centrifuge",
  	destChain: "hydradx_main",
  	path: "XCM"
  },
  	"interlay-NATIVE-INTR___moonbeam-LOCAL-xcINTR": {
  	srcAsset: "interlay-NATIVE-INTR",
  	destAsset: "moonbeam-LOCAL-xcINTR",
  	srcChain: "interlay",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"interlay-NATIVE-INTR___acala-LOCAL-INTR": {
  	srcAsset: "interlay-NATIVE-INTR",
  	destAsset: "acala-LOCAL-INTR",
  	srcChain: "interlay",
  	destChain: "acala",
  	path: "XCM"
  },
  	"interlay-LOCAL-USDT___statemint-LOCAL-USDt": {
  	srcAsset: "interlay-LOCAL-USDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "interlay",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"interlay-LOCAL-iBTC___moonbeam-LOCAL-xcIBTC": {
  	srcAsset: "interlay-LOCAL-iBTC",
  	destAsset: "moonbeam-LOCAL-xcIBTC",
  	srcChain: "interlay",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"statemine-NATIVE-KSM___kusama-NATIVE-KSM": {
  	srcAsset: "statemine-NATIVE-KSM",
  	destAsset: "kusama-NATIVE-KSM",
  	srcChain: "statemine",
  	destChain: "kusama",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___moonbeam-LOCAL-xcUSDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "moonbeam-LOCAL-xcUSDT",
  	srcChain: "statemint",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___astar-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "astar-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "astar",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___hydradx_main-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "hydradx_main",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___parallel-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "parallel-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "parallel",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___equilibrium_parachain-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "equilibrium_parachain-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "equilibrium_parachain",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___bifrost_dot-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "bifrost_dot-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "bifrost_dot",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___acala-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "acala-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "acala",
  	path: "XCM"
  },
  	"statemint-LOCAL-USDt___interlay-LOCAL-USDT": {
  	srcAsset: "statemint-LOCAL-USDt",
  	destAsset: "interlay-LOCAL-USDT",
  	srcChain: "statemint",
  	destChain: "interlay",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcUSDT___statemint-LOCAL-USDt": {
  	srcAsset: "moonbeam-LOCAL-xcUSDT",
  	destAsset: "statemint-LOCAL-USDt",
  	srcChain: "moonbeam",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcUSDT___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "moonbeam-LOCAL-xcUSDT",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48___polkadot-NATIVE-DOT": {
  	srcAsset: "ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "ethereum",
  	destChain: "polkadot",
  	path: "SWAP"
  },
  	"bifrost_dot-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "bifrost_dot-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "bifrost_dot",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"parallel-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "parallel-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "parallel",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"interlay-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "interlay-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "interlay",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "hydradx_main",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP",
  	metadata: {
  		alternativeAsset: "polkadot-NATIVE-DOT"
  	}
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP",
  	metadata: {
  		alternativeAsset: "polkadot-NATIVE-DOT"
  	}
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DOT___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-DOT",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"statemint-LOCAL-USDC___hydradx_main-LOCAL-USDC": {
  	srcAsset: "statemint-LOCAL-USDC",
  	destAsset: "hydradx_main-LOCAL-USDC",
  	srcChain: "statemint",
  	destChain: "hydradx_main",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-USDC___statemint-LOCAL-USDC": {
  	srcAsset: "hydradx_main-LOCAL-USDC",
  	destAsset: "statemint-LOCAL-USDC",
  	srcChain: "hydradx_main",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"moonbeam-ERC20-stDOT-0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "moonbeam-ERC20-stDOT-0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"acala-LOCAL-INTR___interlay-NATIVE-INTR": {
  	srcAsset: "acala-LOCAL-INTR",
  	destAsset: "interlay-NATIVE-INTR",
  	srcChain: "acala",
  	destChain: "interlay",
  	path: "XCM"
  },
  	"parallel-LOCAL-ACA___acala-NATIVE-ACA": {
  	srcAsset: "parallel-LOCAL-ACA",
  	destAsset: "acala-NATIVE-ACA",
  	srcChain: "parallel",
  	destChain: "acala",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-CFG___centrifuge-NATIVE-CFG": {
  	srcAsset: "hydradx_main-LOCAL-CFG",
  	destAsset: "centrifuge-NATIVE-CFG",
  	srcChain: "hydradx_main",
  	destChain: "centrifuge",
  	path: "XCM"
  },
  	"manta_network-NATIVE-MANTA___moonbeam-LOCAL-xcMANTA": {
  	srcAsset: "manta_network-NATIVE-MANTA",
  	destAsset: "moonbeam-LOCAL-xcMANTA",
  	srcChain: "manta_network",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"manta_network-NATIVE-MANTA___bifrost_dot-LOCAL-MANTA": {
  	srcAsset: "manta_network-NATIVE-MANTA",
  	destAsset: "bifrost_dot-LOCAL-MANTA",
  	srcChain: "manta_network",
  	destChain: "bifrost_dot",
  	path: "XCM"
  },
  	"manta_network-LOCAL-DOT___polkadot-NATIVE-DOT": {
  	srcAsset: "manta_network-LOCAL-DOT",
  	destAsset: "polkadot-NATIVE-DOT",
  	srcChain: "manta_network",
  	destChain: "polkadot",
  	path: "XCM"
  },
  	"manta_network-LOCAL-DOT___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "manta_network-LOCAL-DOT",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "manta_network",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcMANTA___manta_network-NATIVE-MANTA": {
  	srcAsset: "moonbeam-LOCAL-xcMANTA",
  	destAsset: "manta_network-NATIVE-MANTA",
  	srcChain: "moonbeam",
  	destChain: "manta_network",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___moonbeam-LOCAL-xcPINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "moonbeam-LOCAL-xcPINK",
  	srcChain: "statemint",
  	destChain: "moonbeam",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___astar-LOCAL-PINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "astar-LOCAL-PINK",
  	srcChain: "statemint",
  	destChain: "astar",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___bifrost_dot-LOCAL-PINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "bifrost_dot-LOCAL-PINK",
  	srcChain: "statemint",
  	destChain: "bifrost_dot",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___acala-LOCAL-PINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "acala-LOCAL-PINK",
  	srcChain: "statemint",
  	destChain: "acala",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___phala-LOCAL-PINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "phala-LOCAL-PINK",
  	srcChain: "statemint",
  	destChain: "phala",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___darwinia2-LOCAL-PINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "darwinia2-LOCAL-PINK",
  	srcChain: "statemint",
  	destChain: "darwinia2",
  	path: "XCM"
  },
  	"statemint-LOCAL-PINK___crust-LOCAL-PINK": {
  	srcAsset: "statemint-LOCAL-PINK",
  	destAsset: "crust-LOCAL-PINK",
  	srcChain: "statemint",
  	destChain: "crust",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcPINK___statemint-LOCAL-PINK": {
  	srcAsset: "moonbeam-LOCAL-xcPINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "moonbeam",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcPINK___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "moonbeam-LOCAL-xcPINK",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"bifrost_dot-LOCAL-MANTA___manta_network-NATIVE-MANTA": {
  	srcAsset: "bifrost_dot-LOCAL-MANTA",
  	destAsset: "manta_network-NATIVE-MANTA",
  	srcChain: "bifrost_dot",
  	destChain: "manta_network",
  	path: "XCM"
  },
  	"chainflip_dot-NATIVE-pDOT___sepolia_ethereum-NATIVE-ETH": {
  	srcAsset: "chainflip_dot-NATIVE-pDOT",
  	destAsset: "sepolia_ethereum-NATIVE-ETH",
  	srcChain: "chainflip_dot",
  	destChain: "sepolia_ethereum",
  	path: "SWAP"
  },
  	"chainflip_dot-NATIVE-pDOT___sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238": {
  	srcAsset: "chainflip_dot-NATIVE-pDOT",
  	destAsset: "sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  	srcChain: "chainflip_dot",
  	destChain: "sepolia_ethereum",
  	path: "SWAP"
  },
  	"ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F___chainflip_dot-NATIVE-pDOT": {
  	srcAsset: "ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  	destAsset: "chainflip_dot-NATIVE-pDOT",
  	srcChain: "ethereum_goerli",
  	destChain: "chainflip_dot",
  	path: "SWAP"
  },
  	"ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F___ethereum_goerli-NATIVE-ETH": {
  	srcAsset: "ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  	destAsset: "ethereum_goerli-NATIVE-ETH",
  	srcChain: "ethereum_goerli",
  	destChain: "ethereum_goerli",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-ASTR___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-ASTR",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-GLMR___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-GLMR",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"sepolia_ethereum-NATIVE-ETH___chainflip_dot-NATIVE-pDOT": {
  	srcAsset: "sepolia_ethereum-NATIVE-ETH",
  	destAsset: "chainflip_dot-NATIVE-pDOT",
  	srcChain: "sepolia_ethereum",
  	destChain: "chainflip_dot",
  	path: "SWAP"
  },
  	"sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238___chainflip_dot-NATIVE-pDOT": {
  	srcAsset: "sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  	destAsset: "chainflip_dot-NATIVE-pDOT",
  	srcChain: "sepolia_ethereum",
  	destChain: "chainflip_dot",
  	path: "SWAP"
  },
  	"hydradx_rococo-NATIVE-HDX___hydradx_rococo-LOCAL-DOT": {
  	srcAsset: "hydradx_rococo-NATIVE-HDX",
  	destAsset: "hydradx_rococo-LOCAL-DOT",
  	srcChain: "hydradx_rococo",
  	destChain: "hydradx_rococo",
  	path: "SWAP",
  	metadata: {
  		alternativeAsset: "rococo-NATIVE-ROC"
  	}
  },
  	"hydradx_rococo-NATIVE-HDX___hydradx_rococo-LOCAL-USDT": {
  	srcAsset: "hydradx_rococo-NATIVE-HDX",
  	destAsset: "hydradx_rococo-LOCAL-USDT",
  	srcChain: "hydradx_rococo",
  	destChain: "hydradx_rococo",
  	path: "SWAP"
  },
  	"hydradx_rococo-LOCAL-DOT___hydradx_rococo-NATIVE-HDX": {
  	srcAsset: "hydradx_rococo-LOCAL-DOT",
  	destAsset: "hydradx_rococo-NATIVE-HDX",
  	srcChain: "hydradx_rococo",
  	destChain: "hydradx_rococo",
  	path: "SWAP"
  },
  	"hydradx_rococo-LOCAL-DOT___hydradx_rococo-LOCAL-USDT": {
  	srcAsset: "hydradx_rococo-LOCAL-DOT",
  	destAsset: "hydradx_rococo-LOCAL-USDT",
  	srcChain: "hydradx_rococo",
  	destChain: "hydradx_rococo",
  	path: "SWAP"
  },
  	"hydradx_rococo-LOCAL-USDT___hydradx_rococo-NATIVE-HDX": {
  	srcAsset: "hydradx_rococo-LOCAL-USDT",
  	destAsset: "hydradx_rococo-NATIVE-HDX",
  	srcChain: "hydradx_rococo",
  	destChain: "hydradx_rococo",
  	path: "SWAP"
  },
  	"hydradx_rococo-LOCAL-USDT___hydradx_rococo-LOCAL-DOT": {
  	srcAsset: "hydradx_rococo-LOCAL-USDT",
  	destAsset: "hydradx_rococo-LOCAL-DOT",
  	srcChain: "hydradx_rococo",
  	destChain: "hydradx_rococo",
  	path: "SWAP"
  },
  	"bifrost_dot-LOCAL-PINK___statemint-LOCAL-PINK": {
  	srcAsset: "bifrost_dot-LOCAL-PINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "bifrost_dot",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"astar-LOCAL-PINK___statemint-LOCAL-PINK": {
  	srcAsset: "astar-LOCAL-PINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "astar",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"phala-LOCAL-PINK___statemint-LOCAL-PINK": {
  	srcAsset: "phala-LOCAL-PINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "phala",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"acala-LOCAL-PINK___statemint-LOCAL-PINK": {
  	srcAsset: "acala-LOCAL-PINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "acala",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"crust-LOCAL-PINK___statemint-LOCAL-PINK": {
  	srcAsset: "crust-LOCAL-PINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "crust",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"darwinia2-LOCAL-PINK___statemint-LOCAL-PINK": {
  	srcAsset: "darwinia2-LOCAL-PINK",
  	destAsset: "statemint-LOCAL-PINK",
  	srcChain: "darwinia2",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-DED___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-DED",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-4Pool___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-4Pool",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-WETH___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-WETH",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-2Pool___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-2Pool",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-PINK": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-PINK",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-vDOT___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-vDOT",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-USDT": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-USDT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-DOT": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-DOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-NATIVE-HDX": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-NATIVE-HDX",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-4Pool": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-4Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-WETH": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-WETH",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-DED": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-DED",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-2Pool": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-2Pool",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-vDOT": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-vDOT",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-ASTR": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-ASTR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"hydradx_main-LOCAL-PINK___hydradx_main-LOCAL-GLMR": {
  	srcAsset: "hydradx_main-LOCAL-PINK",
  	destAsset: "hydradx_main-LOCAL-GLMR",
  	srcChain: "hydradx_main",
  	destChain: "hydradx_main",
  	path: "SWAP"
  },
  	"statemint-LOCAL-BEEFY___hydradx_main-LOCAL-BEEFY": {
  	srcAsset: "statemint-LOCAL-BEEFY",
  	destAsset: "hydradx_main-LOCAL-BEEFY",
  	srcChain: "statemint",
  	destChain: "hydradx_main",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-BEEFY___statemint-LOCAL-BEEFY": {
  	srcAsset: "hydradx_main-LOCAL-BEEFY",
  	destAsset: "statemint-LOCAL-BEEFY",
  	srcChain: "hydradx_main",
  	destChain: "statemint",
  	path: "XCM"
  },
  	"moonbeam-LOCAL-xcvDOT___moonbeam-LOCAL-xcDOT": {
  	srcAsset: "moonbeam-LOCAL-xcvDOT",
  	destAsset: "moonbeam-LOCAL-xcDOT",
  	srcChain: "moonbeam",
  	destChain: "moonbeam",
  	path: "SWAP"
  },
  	"statemint-LOCAL-STINK___hydradx_main-LOCAL-STINK": {
  	srcAsset: "statemint-LOCAL-STINK",
  	destAsset: "hydradx_main-LOCAL-STINK",
  	srcChain: "statemint",
  	destChain: "hydradx_main",
  	path: "XCM"
  },
  	"hydradx_main-LOCAL-STINK___statemint-LOCAL-STINK": {
  	srcAsset: "hydradx_main-LOCAL-STINK",
  	destAsset: "statemint-LOCAL-STINK",
  	srcChain: "hydradx_main",
  	destChain: "statemint",
  	path: "XCM"
  }
  };

  const _ChainAssetMap = {
  	"bitcoin-NATIVE-BTC": {
  	originChain: "bitcoin",
  	slug: "bitcoin-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	decimals: 8,
  	priceId: "bitcoin",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-Bitcoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png"
  },
  	"bitcoinTestnet-NATIVE-BTC": {
  	originChain: "bitcoinTestnet",
  	slug: "bitcoinTestnet-NATIVE-BTC",
  	name: "Bitcoin Testnet",
  	symbol: "BTC",
  	decimals: 8,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-BitcoinTestnet",
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png"
  },
  	"polkadot-NATIVE-DOT": {
  	originChain: "polkadot",
  	slug: "polkadot-NATIVE-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadot-native-dot.png"
  },
  	"kusama-NATIVE-KSM": {
  	originChain: "kusama",
  	slug: "kusama-NATIVE-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "333333333",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kusama-native-ksm.png"
  },
  	"ethereum-NATIVE-ETH": {
  	originChain: "ethereum",
  	slug: "ethereum-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-native-eth.png"
  },
  	"binance-NATIVE-BNB": {
  	originChain: "binance",
  	slug: "binance-NATIVE-BNB",
  	name: "Binance Smart Chain",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: "binancecoin",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BNB-Binance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-native-bnb.png"
  },
  	"moonbeam-NATIVE-GLMR": {
  	originChain: "moonbeam",
  	slug: "moonbeam-NATIVE-GLMR",
  	name: "Moonbeam",
  	symbol: "GLMR",
  	decimals: 18,
  	priceId: "moonbeam",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "GLMR-Moonbeam",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-native-glmr.png"
  },
  	"pioneer-NATIVE-NEER": {
  	originChain: "pioneer",
  	slug: "pioneer-NATIVE-NEER",
  	name: "Pioneer Network",
  	symbol: "NEER",
  	decimals: 18,
  	priceId: "metaverse-network-pioneer",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		multilocation: {
  			NativeToken: 0
  		}
  	},
  	multiChainAsset: "NEER-Pioneer",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pioneer-native-neer.png"
  },
  	"aleph-NATIVE-AZERO": {
  	originChain: "aleph",
  	slug: "aleph-NATIVE-AZERO",
  	name: "Aleph Zero",
  	symbol: "AZERO",
  	decimals: 12,
  	priceId: "aleph-zero",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-native-azero.png"
  },
  	"astar-NATIVE-ASTR": {
  	originChain: "astar",
  	slug: "astar-NATIVE-ASTR",
  	name: "Astar",
  	symbol: "ASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: {
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: "Here"
  			}
  		}
  	},
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-native-astr.png"
  },
  	"statemint-NATIVE-DOT": {
  	originChain: "statemint",
  	slug: "statemint-NATIVE-DOT",
  	name: "Statemint",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: {
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: "Here"
  			}
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-native-dot.png"
  },
  	"acala-NATIVE-ACA": {
  	originChain: "acala",
  	slug: "acala-NATIVE-ACA",
  	name: "Acala",
  	symbol: "ACA",
  	decimals: 12,
  	priceId: "acala",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			NativeAssetId: {
  				Token: "ACA"
  			}
  		},
  		multilocation: {
  			Token: "ACA"
  		}
  	},
  	multiChainAsset: "ACA-Acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-native-aca.png"
  },
  	"polygon-NATIVE-MATIC": {
  	originChain: "polygon",
  	slug: "polygon-NATIVE-MATIC",
  	name: "Polygon",
  	symbol: "MATIC",
  	decimals: 18,
  	priceId: "matic-network",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "MATIC-Polygon",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-native-matic.png"
  },
  	"arbitrum_one-NATIVE-ETH": {
  	originChain: "arbitrum_one",
  	slug: "arbitrum_one-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-native-eth.png"
  },
  	"arbitrum_one-ERC20-ARB-0x912CE59144191C1204E64559FE8253a0e49E6548": {
  	originChain: "arbitrum_one",
  	slug: "arbitrum_one-ERC20-ARB-0x912CE59144191C1204E64559FE8253a0e49E6548",
  	name: "Arbitrum",
  	symbol: "ARB",
  	decimals: 18,
  	priceId: "arbitrum",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548"
  	},
  	multiChainAsset: "ARB-ArbitrumOne",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-arb-0x912ce59144191c1204e64559fe8253a0e49e6548.png"
  },
  	"optimism-NATIVE-ETH": {
  	originChain: "optimism",
  	slug: "optimism-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-native-eth.png"
  },
  	"optimism-ERC20-OP-0x4200000000000000000000000000000000000042": {
  	originChain: "optimism",
  	slug: "optimism-ERC20-OP-0x4200000000000000000000000000000000000042",
  	name: "Optimism",
  	symbol: "OP",
  	decimals: 18,
  	priceId: "optimism",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4200000000000000000000000000000000000042"
  	},
  	multiChainAsset: "OP-Optimism",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-erc20-op-0x4200000000000000000000000000000000000042.png"
  },
  	"tomochain-NATIVE-VIC": {
  	originChain: "tomochain",
  	slug: "tomochain-NATIVE-VIC",
  	name: "Viction",
  	symbol: "VIC",
  	decimals: 18,
  	priceId: "tomochain",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tomochain-native-vic.png"
  },
  	"acala-LOCAL-DOT": {
  	originChain: "acala",
  	slug: "acala-LOCAL-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "DOT"
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-dot.png"
  },
  	"acala-LOCAL-GLMR": {
  	originChain: "acala",
  	slug: "acala-LOCAL-GLMR",
  	name: "Moonbeam",
  	symbol: "GLMR",
  	decimals: 18,
  	priceId: "moonbeam",
  	minAmount: "100000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 0
  		}
  	},
  	multiChainAsset: "GLMR-Moonbeam",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-glmr.png"
  },
  	"acala-LOCAL-USDT": {
  	originChain: "acala",
  	slug: "acala-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 12
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-usdt.png"
  },
  	"acala-LOCAL-aSEED": {
  	originChain: "acala",
  	slug: "acala-LOCAL-aSEED",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-acala",
  	minAmount: "100000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "AUSD"
  		}
  	},
  	multiChainAsset: "aSEED-aSEEDAcala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-aseed.png"
  },
  	"acala-LOCAL-ASTR": {
  	originChain: "acala",
  	slug: "acala-LOCAL-ASTR",
  	name: "Astar",
  	symbol: "ASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: "100000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 2
  		}
  	},
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-astr.png"
  },
  	"acala-LOCAL-LDOT": {
  	originChain: "acala",
  	slug: "acala-LOCAL-LDOT",
  	name: "Liquid DOT",
  	symbol: "LDOT",
  	decimals: 10,
  	priceId: "liquid-staking-dot",
  	minAmount: "500000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "LDOT"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-ldot.png"
  },
  	"acala-LOCAL-LcDOT": {
  	originChain: "acala",
  	slug: "acala-LOCAL-LcDOT",
  	name: "Liquid Crowdloan DOT",
  	symbol: "LcDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LiquidCrowdloan: 13
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-lcdot.png"
  },
  	"acala-LOCAL-tDOT": {
  	originChain: "acala",
  	slug: "acala-LOCAL-tDOT",
  	name: "Tapio DOT",
  	symbol: "tDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			StableAssetPoolToken: 0
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-tdot.png"
  },
  	"alephTest-NATIVE-TZERO": {
  	originChain: "alephTest",
  	slug: "alephTest-NATIVE-TZERO",
  	name: "Aleph Zero Testnet",
  	symbol: "TZERO",
  	decimals: 12,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/alephtest-native-tzero.png"
  },
  	"moonbeam-LOCAL-xcDOT": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcDOT",
  	name: "Polkadot",
  	symbol: "xcDOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "42259045809535163221576417993425387648",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080"
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcdot.png"
  },
  	"moonbeam-LOCAL-xcINTR": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcINTR",
  	name: "Interlay",
  	symbol: "xcINTR",
  	decimals: 10,
  	priceId: "interlay",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "101170542313601871197860408087030232491",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFffFFFFF4C1cbCd97597339702436d4F18a375Ab"
  	},
  	multiChainAsset: "INTR-Interlay",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcintr.png"
  },
  	"moonbeam-LOCAL-xcIBTC": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcIBTC",
  	name: "interBTC",
  	symbol: "xcIBTC",
  	decimals: 8,
  	priceId: "interbtc",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "120637696315203257380661607956669368914",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFFFFfFf5AC1f9A51A93F5C527385edF7Fe98A52"
  	},
  	multiChainAsset: "iBTC-interBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcibtc.png"
  },
  	"moonbeam-LOCAL-xcACA": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcACA",
  	name: "Acala",
  	symbol: "xcACA",
  	decimals: 12,
  	priceId: "acala",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "224821240862170613278369189818311486111",
  		assetType: "ForeignAsset",
  		contractAddress: "0xffffFFffa922Fef94566104a6e5A35a4fCDDAA9f"
  	},
  	multiChainAsset: "ACA-Acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcaca.png"
  },
  	"moonbeam-LOCAL-xcaSEED": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcaSEED",
  	name: "aUSD SEED",
  	symbol: "xcaSEED",
  	decimals: 12,
  	priceId: "ausd-seed-acala",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "110021739665376159354538090254163045594",
  		assetType: "ForeignAsset",
  		contractAddress: "0xfFfFFFFF52C56A9257bB97f4B2b6F7B2D624ecda"
  	},
  	multiChainAsset: "aSEED-aSEEDAcala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcaseed.png"
  },
  	"moonbeam-ERC721-MFBB-0x02a6dec99b2ca768d638fcd87a96f6069f91287c": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-MFBB-0x02a6dec99b2ca768d638fcd87a96f6069f91287c",
  	name: "MoonFit Beast and Beauty",
  	symbol: "MFBB",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x02A6DeC99B2Ca768D638fcD87A96F6069F91287c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mfbb-0x02a6dec99b2ca768d638fcd87a96f6069f91287c.png"
  },
  	"ethereum-ERC20-WETH-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-WETH-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  	name: "Wrapped Ether",
  	symbol: "WETH",
  	decimals: 18,
  	priceId: "weth",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  	},
  	multiChainAsset: "WETH-WrappedEther",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-weth-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png"
  },
  	"astar-LOCAL-DOT": {
  	originChain: "astar",
  	slug: "astar-LOCAL-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "340282366920938463463374607431768211455",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: "Here"
  			}
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-dot.png"
  },
  	"astar-LOCAL-USDT": {
  	originChain: "astar",
  	slug: "astar-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "4294969280",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 1984
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-usdt.png"
  },
  	"astarEvm-NATIVE-ASTR": {
  	originChain: "astarEvm",
  	slug: "astarEvm-NATIVE-ASTR",
  	name: "Astar",
  	symbol: "ASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-native-astr.png"
  },
  	"astarEvm-ERC20-USDT-0xFFFFFFFF000000000000000000000001000007C0": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-USDT-0xFFFFFFFF000000000000000000000001000007C0",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xFFFFFFFF000000000000000000000001000007C0"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-usdt-0xffffffff000000000000000000000001000007c0.png"
  },
  	"shibuya-NATIVE-SBY": {
  	originChain: "shibuya",
  	slug: "shibuya-NATIVE-SBY",
  	name: "Shibuya",
  	symbol: "SBY",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shibuya-native-sby.png"
  },
  	"shibuyaEvm-NATIVE-SBY": {
  	originChain: "shibuyaEvm",
  	slug: "shibuyaEvm-NATIVE-SBY",
  	name: "Shibuya",
  	symbol: "SBY",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shibuyaevm-native-sby.png"
  },
  	"westend-NATIVE-WND": {
  	originChain: "westend",
  	slug: "westend-NATIVE-WND",
  	name: "Westend",
  	symbol: "WND",
  	decimals: 12,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/westend-native-wnd.png"
  },
  	"rococo-NATIVE-ROC": {
  	originChain: "rococo",
  	slug: "rococo-NATIVE-ROC",
  	name: "Rococo",
  	symbol: "ROC",
  	decimals: 12,
  	priceId: null,
  	minAmount: "33333333",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rococo-native-roc.png"
  },
  	"bitcountry-NATIVE-NUUM": {
  	originChain: "bitcountry",
  	slug: "bitcountry-NATIVE-NUUM",
  	name: "Bit.Country - Alpha Net",
  	symbol: "NUUM",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitcountry-native-nuum.png"
  },
  	"bitcountry-LOCAL-BIT": {
  	originChain: "bitcountry",
  	slug: "bitcountry-LOCAL-BIT",
  	name: "BIT",
  	symbol: "BIT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			MiningResource: 0
  		}
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitcountry-local-bit.png"
  },
  	"equilibrium_parachain-NATIVE-EQ": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-NATIVE-EQ",
  	name: "Equilibrium",
  	symbol: "EQ",
  	decimals: 9,
  	priceId: "equilibrium-token",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "25969"
  	},
  	multiChainAsset: "EQ-Equilibrium",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-native-eq.png"
  },
  	"equilibrium_parachain-LOCAL-ACA": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-ACA",
  	name: "Acala",
  	symbol: "ACA",
  	decimals: 12,
  	priceId: "acala",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6382433"
  	},
  	multiChainAsset: "ACA-Acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-aca.png"
  },
  	"equilibrium_parachain-LOCAL-DOT": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6582132"
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-dot.png"
  },
  	"moonbase-NATIVE-DEV": {
  	originChain: "moonbase",
  	slug: "moonbase-NATIVE-DEV",
  	name: "DEV",
  	symbol: "DEV",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "DEV-MoonbaseDev",
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbase-native-dev.png"
  },
  	"moonriver-NATIVE-MOVR": {
  	originChain: "moonriver",
  	slug: "moonriver-NATIVE-MOVR",
  	name: "Moonriver",
  	symbol: "MOVR",
  	decimals: 18,
  	priceId: "moonriver",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "MOVR-Moonriver",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-native-movr.png"
  },
  	"turingStaging-NATIVE-TUR": {
  	originChain: "turingStaging",
  	slug: "turingStaging-NATIVE-TUR",
  	name: "Turing",
  	symbol: "TUR",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/turingstaging-native-tur.png"
  },
  	"turing-NATIVE-TUR": {
  	originChain: "turing",
  	slug: "turing-NATIVE-TUR",
  	name: "Turing",
  	symbol: "TUR",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/turing-native-tur.png"
  },
  	"bifrost-NATIVE-BNC": {
  	originChain: "bifrost",
  	slug: "bifrost-NATIVE-BNC",
  	name: "Bifrost Kusama",
  	symbol: "BNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BNC-BifrostKusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-native-bnc.png"
  },
  	"bifrost_dot-NATIVE-BNC": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-NATIVE-BNC",
  	name: "Bifrost Polkadot",
  	symbol: "BNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BNC-BifrostPolkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-native-bnc.png"
  },
  	"bifrost_dot-LOCAL-USDT": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token2: "2"
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-usdt.png"
  },
  	"bifrost_dot-LOCAL-vDOT": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-vDOT",
  	name: "Voucher DOT",
  	symbol: "vDOT",
  	decimals: 10,
  	priceId: "voucher-dot",
  	minAmount: "1000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken2: "0"
  		}
  	},
  	multiChainAsset: "vDOT-VoucherDot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vdot.png"
  },
  	"bifrost_dot-LOCAL-vsDOT": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-vsDOT",
  	name: "Voucher Slot DOT",
  	symbol: "vsDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VSToken2: "0"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vsdot.png"
  },
  	"bifrost_dot-LOCAL-vGLMR": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-vGLMR",
  	name: "Voucher GLMR",
  	symbol: "vGLMR",
  	decimals: 18,
  	priceId: "voucher-glmr",
  	minAmount: "1000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken2: "1"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vglmr.png"
  },
  	"bifrost_testnet-NATIVE-BNC": {
  	originChain: "bifrost_testnet",
  	slug: "bifrost_testnet-NATIVE-BNC",
  	name: "Bifrost Testnet",
  	symbol: "BNC",
  	decimals: 12,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_testnet-native-bnc.png"
  },
  	"calamari-NATIVE-KMA": {
  	originChain: "calamari",
  	slug: "calamari-NATIVE-KMA",
  	name: "Calamari",
  	symbol: "KMA",
  	decimals: 12,
  	priceId: "calamari-network",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "1"
  	},
  	multiChainAsset: "KMA-Calamari",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-native-kma.png"
  },
  	"calamari-LOCAL-zkKMA": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkKMA",
  	name: "Calamari",
  	symbol: "zkKMA",
  	decimals: 12,
  	priceId: "calamari-network",
  	minAmount: "100000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1"
  	},
  	multiChainAsset: "KMA-Calamari",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkkma.png"
  },
  	"calamari-LOCAL-BNB": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-BNB",
  	name: "Binance Smart Chain",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: "binancecoin",
  	minAmount: "40000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "21"
  	},
  	multiChainAsset: "BNB-Binance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-bnb.png"
  },
  	"calamari-LOCAL-WBTC": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-WBTC",
  	name: "Wrapped Bitcoin",
  	symbol: "WBTC",
  	decimals: 8,
  	priceId: "wrapped-bitcoin",
  	minAmount: "35",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "26"
  	},
  	multiChainAsset: "WBTC-WrappedBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-wbtc.png"
  },
  	"calamari-LOCAL-BUSD": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-BUSD",
  	name: "Binance USD",
  	symbol: "BUSD",
  	decimals: 18,
  	priceId: "binance-usd",
  	minAmount: "10000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "23"
  	},
  	multiChainAsset: "BUSD-BinanceUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-busd.png"
  },
  	"calamari-LOCAL-aSEED": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-aSEED",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-karura",
  	minAmount: "10000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "9"
  	},
  	multiChainAsset: "aSEED-aSEEDKarura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-aseed.png"
  },
  	"calamari-LOCAL-USDT": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "14"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-usdt.png"
  },
  	"calamari-LOCAL-zkUSDT": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkUSDT",
  	name: "Tether USD",
  	symbol: "zkUSDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "14"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkusdt.png"
  },
  	"calamari-LOCAL-DAI": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-DAI",
  	name: "DAI Stablecoin",
  	symbol: "DAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: "10000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "15"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-dai.png"
  },
  	"calamari-LOCAL-zkDAI": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkDAI",
  	name: "DAI Stablecoin",
  	symbol: "zkDAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: "10000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "15"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkdai.png"
  },
  	"calamari-LOCAL-USDC": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-USDC",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "16"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-usdc.png"
  },
  	"calamari-LOCAL-zkUSDC": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkUSDC",
  	name: "USD Coin",
  	symbol: "zkUSDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "16"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkusdc.png"
  },
  	"calamari-LOCAL-KAR": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-KAR",
  	name: "Karura",
  	symbol: "KAR",
  	decimals: 12,
  	priceId: "karura",
  	minAmount: "100000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "8"
  	},
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-kar.png"
  },
  	"calamari-LOCAL-zkKAR": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkKAR",
  	name: "Karura",
  	symbol: "zkKAR",
  	decimals: 12,
  	priceId: "karura",
  	minAmount: "100000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "8"
  	},
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkkar.png"
  },
  	"calamari-LOCAL-KSM": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "33333333",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "12"
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-ksm.png"
  },
  	"calamari-LOCAL-zkKSM": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkKSM",
  	name: "Kusama",
  	symbol: "zkKSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "33333333",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "12"
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkksm.png"
  },
  	"calamari-LOCAL-MOVR": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-MOVR",
  	name: "Moonriver",
  	symbol: "MOVR",
  	decimals: 18,
  	priceId: "moonriver",
  	minAmount: "100000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "11"
  	},
  	multiChainAsset: "MOVR-Moonriver",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-movr.png"
  },
  	"calamari-LOCAL-zkMOVR": {
  	originChain: "calamari",
  	slug: "calamari-LOCAL-zkMOVR",
  	name: "Moonriver",
  	symbol: "zkMOVR",
  	decimals: 18,
  	priceId: "moonriver",
  	minAmount: "100000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "11"
  	},
  	multiChainAsset: "MOVR-Moonriver",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari-local-zkmovr.png"
  },
  	"amplitude-NATIVE-AMPE": {
  	originChain: "amplitude",
  	slug: "amplitude-NATIVE-AMPE",
  	name: "Amplitude",
  	symbol: "AMPE",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/amplitude-native-ampe.png"
  },
  	"amplitude_test-NATIVE-AMPE": {
  	originChain: "amplitude_test",
  	slug: "amplitude_test-NATIVE-AMPE",
  	name: "Amplitude Testnet",
  	symbol: "AMPE",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/amplitude_test-native-ampe.png"
  },
  	"bobabase-NATIVE-BOBA": {
  	originChain: "bobabase",
  	slug: "bobabase-NATIVE-BOBA",
  	name: "Bobabase",
  	symbol: "BOBA",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bobabase-native-boba.png"
  },
  	"shiden-NATIVE-SDN": {
  	originChain: "shiden",
  	slug: "shiden-NATIVE-SDN",
  	name: "Shiden",
  	symbol: "SDN",
  	decimals: 18,
  	priceId: "shiden",
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "SDN-Shiden",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-native-sdn.png"
  },
  	"shidenEvm-NATIVE-SDN": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-NATIVE-SDN",
  	name: "Shiden EVM",
  	symbol: "SDN",
  	decimals: 18,
  	priceId: "shiden",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "SDN-Shiden",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-native-sdn.png"
  },
  	"pioneer-LOCAL-BIT": {
  	originChain: "pioneer",
  	slug: "pioneer-LOCAL-BIT",
  	name: "BIT",
  	symbol: "BIT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			MiningResource: 0
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pioneer-local-bit.png"
  },
  	"ethereum_goerli-NATIVE-ETH": {
  	originChain: "ethereum_goerli",
  	slug: "ethereum_goerli-NATIVE-ETH",
  	name: "Ethereum Goerli",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum_goerli-native-eth.png"
  },
  	"binance_test-NATIVE-tBNB": {
  	originChain: "binance_test",
  	slug: "binance_test-NATIVE-tBNB",
  	name: "Binance Smart Chain (Testnet)",
  	symbol: "tBNB",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance_test-native-tbnb.png"
  },
  	"parallel-NATIVE-PARA": {
  	originChain: "parallel",
  	slug: "parallel-NATIVE-PARA",
  	name: "Parallel",
  	symbol: "PARA",
  	decimals: 12,
  	priceId: "parallel-finance",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "PARA-Parallel",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-native-para.png"
  },
  	"parallel-LOCAL-USDT": {
  	originChain: "parallel",
  	slug: "parallel-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "102"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-usdt.png"
  },
  	"clover-NATIVE-CLV": {
  	originChain: "clover",
  	slug: "clover-NATIVE-CLV",
  	name: "Clover",
  	symbol: "CLV",
  	decimals: 18,
  	priceId: "clover-finance",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/clover-native-clv.png"
  },
  	"cloverEvm-NATIVE-CLV": {
  	originChain: "cloverEvm",
  	slug: "cloverEvm-NATIVE-CLV",
  	name: "Clover - EVM",
  	symbol: "CLV",
  	decimals: 18,
  	priceId: "clover-finance",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/cloverevm-native-clv.png"
  },
  	"hydradx_main-NATIVE-HDX": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-NATIVE-HDX",
  	name: "HydraDX",
  	symbol: "HDX",
  	decimals: 12,
  	priceId: "hydradx",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "0",
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-native-hdx.png"
  },
  	"hydradx_main-LOCAL-USDT": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-USDT",
  	name: "Statemint USDT",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "10",
  		autoEnable: true,
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 1984
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdt.png"
  },
  	"edgeware-NATIVE-EDG": {
  	originChain: "edgeware",
  	slug: "edgeware-NATIVE-EDG",
  	name: "Edgeware",
  	symbol: "EDG",
  	decimals: 18,
  	priceId: "edgeware",
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/edgeware-native-edg.png"
  },
  	"centrifuge-NATIVE-CFG": {
  	originChain: "centrifuge",
  	slug: "centrifuge-NATIVE-CFG",
  	name: "Centrifuge",
  	symbol: "CFG",
  	decimals: 18,
  	priceId: "centrifuge",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			Native: null
  		}
  	},
  	multiChainAsset: "CFG-Centrifuge",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/centrifuge-native-cfg.png"
  },
  	"interlay-NATIVE-INTR": {
  	originChain: "interlay",
  	slug: "interlay-NATIVE-INTR",
  	name: "Interlay",
  	symbol: "INTR",
  	decimals: 10,
  	priceId: "interlay",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			Token: "INTR"
  		}
  	},
  	multiChainAsset: "INTR-Interlay",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-native-intr.png"
  },
  	"interlay-LOCAL-LDOT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-LDOT",
  	name: "Liquid DOT",
  	symbol: "LDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 1
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-ldot.png"
  },
  	"interlay-LOCAL-USDT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 2
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-usdt.png"
  },
  	"interlay-LOCAL-iBTC": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-iBTC",
  	name: "interBTC",
  	symbol: "iBTC",
  	decimals: 8,
  	priceId: "interbtc",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "IBTC"
  		}
  	},
  	multiChainAsset: "iBTC-interBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-ibtc.png"
  },
  	"kintsugi-LOCAL-kBTC": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-kBTC",
  	name: "Kintsugi Wrapped BTC",
  	symbol: "kBTC",
  	decimals: 8,
  	priceId: "kintsugi-btc",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "KBTC"
  		}
  	},
  	multiChainAsset: "kBTC-KintsugiWrappedBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-kbtc.png"
  },
  	"nodle-NATIVE-NODL": {
  	originChain: "nodle",
  	slug: "nodle-NATIVE-NODL",
  	name: "Nodle",
  	symbol: "NODL",
  	decimals: 11,
  	priceId: "nodle-network",
  	minAmount: "10000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/nodle-native-nodl.png"
  },
  	"darwinia2-NATIVE-RING": {
  	originChain: "darwinia2",
  	slug: "darwinia2-NATIVE-RING",
  	name: "Darwinia",
  	symbol: "RING",
  	decimals: 18,
  	priceId: "darwinia-network-native-token",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/darwinia2-native-ring.png"
  },
  	"darwinia2-LOCAL-KTON": {
  	originChain: "darwinia2",
  	slug: "darwinia2-LOCAL-KTON",
  	name: "Darwinia Commitment Token",
  	symbol: "KTON",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1026"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/darwinia2-local-kton.png"
  },
  	"sora_ksm-NATIVE-XOR": {
  	originChain: "sora_ksm",
  	slug: "sora_ksm-NATIVE-XOR",
  	name: "SORA Kusama",
  	symbol: "XOR",
  	decimals: 18,
  	priceId: "sora",
  	minAmount: "1000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sora_ksm-native-xor.png"
  },
  	"odyssey-NATIVE-ARES": {
  	originChain: "odyssey",
  	slug: "odyssey-NATIVE-ARES",
  	name: "Ares Odyssey",
  	symbol: "ARES",
  	decimals: 12,
  	priceId: "ares-protocol",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/odyssey-native-ares.png"
  },
  	"dancebox-NATIVE-DANCE": {
  	originChain: "dancebox",
  	slug: "dancebox-NATIVE-DANCE",
  	name: "Dancebox",
  	symbol: "DANCE",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dancebox-native-dance.png"
  },
  	"amplitude-LOCAL-KSM": {
  	originChain: "amplitude",
  	slug: "amplitude-LOCAL-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			XCM: "0"
  		}
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/amplitude-local-ksm.png"
  },
  	"polkadex-NATIVE-PDEX": {
  	originChain: "polkadex",
  	slug: "polkadex-NATIVE-PDEX",
  	name: "Polkadex",
  	symbol: "PDEX",
  	decimals: 12,
  	priceId: "polkadex",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadex-native-pdex.png"
  },
  	"polkadexTest-NATIVE-Unit": {
  	originChain: "polkadexTest",
  	slug: "polkadexTest-NATIVE-Unit",
  	name: "Polkadex - Testnet",
  	symbol: "Unit",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadextest-native-unit.png"
  },
  	"rmrk-NATIVE-UNIT": {
  	originChain: "rmrk",
  	slug: "rmrk-NATIVE-UNIT",
  	name: "RMRK Devnet",
  	symbol: "UNIT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rmrk-native-unit.png"
  },
  	"dolphin-NATIVE-DOL": {
  	originChain: "dolphin",
  	slug: "dolphin-NATIVE-DOL",
  	name: "Dolphin Testnet",
  	symbol: "DOL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dolphin-native-dol.png"
  },
  	"opal-NATIVE-OPL": {
  	originChain: "opal",
  	slug: "opal-NATIVE-OPL",
  	name: "Opal",
  	symbol: "OPL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/opal-native-opl.png"
  },
  	"efinity-NATIVE-EFI": {
  	originChain: "efinity",
  	slug: "efinity-NATIVE-EFI",
  	name: "Efinity",
  	symbol: "EFI",
  	decimals: 18,
  	priceId: "efinity",
  	minAmount: "1000000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/efinity-native-efi.png"
  },
  	"composableFinance-NATIVE-LAYR": {
  	originChain: "composableFinance",
  	slug: "composableFinance-NATIVE-LAYR",
  	name: "Composable Finance",
  	symbol: "LAYR",
  	decimals: 12,
  	priceId: null,
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/composablefinance-native-layr.png"
  },
  	"phala-NATIVE-PHA": {
  	originChain: "phala",
  	slug: "phala-NATIVE-PHA",
  	name: "Phala",
  	symbol: "PHA",
  	decimals: 12,
  	priceId: "pha",
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "PHA-Phala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/phala-native-pha.png"
  },
  	"crust-NATIVE-CRU": {
  	originChain: "crust",
  	slug: "crust-NATIVE-CRU",
  	name: "Crust",
  	symbol: "CRU",
  	decimals: 12,
  	priceId: "crust-network",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "CRU-Crust",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crust-native-cru.png"
  },
  	"statemine-NATIVE-KSM": {
  	originChain: "statemine",
  	slug: "statemine-NATIVE-KSM",
  	name: "Statemine",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "3333333",
  	assetType: "NATIVE",
  	metadata: {
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: "Here"
  			}
  		}
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-native-ksm.png"
  },
  	"karura-NATIVE-KAR": {
  	originChain: "karura",
  	slug: "karura-NATIVE-KAR",
  	name: "Karura",
  	symbol: "KAR",
  	decimals: 12,
  	priceId: "karura",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			NativeAssetId: {
  				Token: "KAR"
  			}
  		},
  		multilocation: {
  			Token: "KAR"
  		}
  	},
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-native-kar.png"
  },
  	"khala-NATIVE-PHA": {
  	originChain: "khala",
  	slug: "khala-NATIVE-PHA",
  	name: "Khala",
  	symbol: "PHA",
  	decimals: 12,
  	priceId: "pha",
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/khala-native-pha.png"
  },
  	"kilt-NATIVE-KILT": {
  	originChain: "kilt",
  	slug: "kilt-NATIVE-KILT",
  	name: "KILT Spiritnet",
  	symbol: "KILT",
  	decimals: 15,
  	priceId: "kilt-protocol",
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kilt-native-kilt.png"
  },
  	"basilisk-NATIVE-BSX": {
  	originChain: "basilisk",
  	slug: "basilisk-NATIVE-BSX",
  	name: "Basilisk",
  	symbol: "BSX",
  	decimals: 12,
  	priceId: "basilisk",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/basilisk-native-bsx.png"
  },
  	"altair-NATIVE-AIR": {
  	originChain: "altair",
  	slug: "altair-NATIVE-AIR",
  	name: "Altair",
  	symbol: "AIR",
  	decimals: 18,
  	priceId: "altair",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/altair-native-air.png"
  },
  	"heiko-NATIVE-HKO": {
  	originChain: "heiko",
  	slug: "heiko-NATIVE-HKO",
  	name: "Heiko",
  	symbol: "HKO",
  	decimals: 12,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/heiko-native-hko.png"
  },
  	"kintsugi-NATIVE-KINT": {
  	originChain: "kintsugi",
  	slug: "kintsugi-NATIVE-KINT",
  	name: "Kintsugi",
  	symbol: "KINT",
  	decimals: 12,
  	priceId: "kintsugi",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			Token: "KINT"
  		}
  	},
  	multiChainAsset: "KINT-Kintsugi",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-native-kint.png"
  },
  	"kintsugi-LOCAL-USDT": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 3
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-usdt.png"
  },
  	"kintsugi_test-NATIVE-KINT": {
  	originChain: "kintsugi_test",
  	slug: "kintsugi_test-NATIVE-KINT",
  	name: "Kintsugi Testnet",
  	symbol: "KINT",
  	decimals: 12,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			Token: "KINT"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi_test-native-kint.png"
  },
  	"picasso-NATIVE-PICA": {
  	originChain: "picasso",
  	slug: "picasso-NATIVE-PICA",
  	name: "Picasso",
  	symbol: "PICA",
  	decimals: 12,
  	priceId: "picasso",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/picasso-native-pica.png"
  },
  	"quartz-NATIVE-QTZ": {
  	originChain: "quartz",
  	slug: "quartz-NATIVE-QTZ",
  	name: "Quartz",
  	symbol: "QTZ",
  	decimals: 18,
  	priceId: "quartz",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/quartz-native-qtz.png"
  },
  	"unique_network-NATIVE-UNQ": {
  	originChain: "unique_network",
  	slug: "unique_network-NATIVE-UNQ",
  	name: "Unique",
  	symbol: "UNQ",
  	decimals: 18,
  	priceId: "unique-network",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/unique_network-native-unq.png"
  },
  	"genshiro-NATIVE-GENS": {
  	originChain: "genshiro",
  	slug: "genshiro-NATIVE-GENS",
  	name: "Genshiro",
  	symbol: "GENS",
  	decimals: 9,
  	priceId: "genshiro",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "1734700659"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/genshiro-native-gens.png"
  },
  	"genshiro-LOCAL-DOT": {
  	originChain: "genshiro",
  	slug: "genshiro-LOCAL-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6582132"
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/genshiro-local-dot.png"
  },
  	"genshiro_testnet-NATIVE-TOKEN": {
  	originChain: "genshiro_testnet",
  	slug: "genshiro_testnet-NATIVE-TOKEN",
  	name: "Genshiro Testnet",
  	symbol: "TOKEN",
  	decimals: 9,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "1734700659"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/genshiro_testnet-native-token.png"
  },
  	"subsocial_x-NATIVE-SUB": {
  	originChain: "subsocial_x",
  	slug: "subsocial_x-NATIVE-SUB",
  	name: "SubsocialX",
  	symbol: "SUB",
  	decimals: 10,
  	priceId: "subsocial",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subsocial_x-native-sub.png"
  },
  	"zeitgeist-NATIVE-ZTG": {
  	originChain: "zeitgeist",
  	slug: "zeitgeist-NATIVE-ZTG",
  	name: "Zeitgeist",
  	symbol: "ZTG",
  	decimals: 10,
  	priceId: "zeitgeist",
  	minAmount: "50000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/zeitgeist-native-ztg.png"
  },
  	"sakura-NATIVE-SKU": {
  	originChain: "sakura",
  	slug: "sakura-NATIVE-SKU",
  	name: "Sakura",
  	symbol: "SKU",
  	decimals: 18,
  	priceId: "sakura",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sakura-native-sku.png"
  },
  	"shadow-NATIVE-CSM": {
  	originChain: "shadow",
  	slug: "shadow-NATIVE-CSM",
  	name: "Crust Shadow",
  	symbol: "CSM",
  	decimals: 12,
  	priceId: "crust-storage-market",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shadow-native-csm.png"
  },
  	"uniqueNft-NATIVE-UNQ": {
  	originChain: "uniqueNft",
  	slug: "uniqueNft-NATIVE-UNQ",
  	name: "Unique TestNet 2.0",
  	symbol: "UNQ",
  	decimals: 15,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/uniquenft-native-unq.png"
  },
  	"robonomics-NATIVE-XRT": {
  	originChain: "robonomics",
  	slug: "robonomics-NATIVE-XRT",
  	name: "Robonomics",
  	symbol: "XRT",
  	decimals: 9,
  	priceId: "robonomics-network",
  	minAmount: "1000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/robonomics-native-xrt.png"
  },
  	"integritee-NATIVE-TEER": {
  	originChain: "integritee",
  	slug: "integritee-NATIVE-TEER",
  	name: "Integritee Network",
  	symbol: "TEER",
  	decimals: 12,
  	priceId: "integritee",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/integritee-native-teer.png"
  },
  	"integriteePolkadot-NATIVE-TEER": {
  	originChain: "integriteePolkadot",
  	slug: "integriteePolkadot-NATIVE-TEER",
  	name: "Integritee Shell",
  	symbol: "TEER",
  	decimals: 12,
  	priceId: "integritee",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/integriteepolkadot-native-teer.png"
  },
  	"crabParachain-NATIVE-CRAB": {
  	originChain: "crabParachain",
  	slug: "crabParachain-NATIVE-CRAB",
  	name: "Crab2 Parachain",
  	symbol: "CRAB",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crabparachain-native-crab.png"
  },
  	"crabParachain-LOCAL-CKTON": {
  	originChain: "crabParachain",
  	slug: "crabParachain-LOCAL-CKTON",
  	name: "Crab Commitment Token",
  	symbol: "CKTON",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1026"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crabparachain-local-ckton.png"
  },
  	"pangolin-NATIVE-PRING": {
  	originChain: "pangolin",
  	slug: "pangolin-NATIVE-PRING",
  	name: "Pangolin",
  	symbol: "PRING",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pangolin-native-pring.png"
  },
  	"pangolin-LOCAL-PKTON": {
  	originChain: "pangolin",
  	slug: "pangolin-LOCAL-PKTON",
  	name: "Crab Commitment Token",
  	symbol: "PKTON",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1026"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pangolin-local-pkton.png"
  },
  	"chainx-NATIVE-PCX": {
  	originChain: "chainx",
  	slug: "chainx-NATIVE-PCX",
  	name: "Chain X",
  	symbol: "PCX",
  	decimals: 8,
  	priceId: "chainx",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/chainx-native-pcx.png"
  },
  	"acala_testnet-NATIVE-ACA": {
  	originChain: "acala_testnet",
  	slug: "acala_testnet-NATIVE-ACA",
  	name: "Acala Mandala TC7",
  	symbol: "ACA",
  	decimals: 12,
  	priceId: null,
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala_testnet-native-aca.png"
  },
  	"mangatax-NATIVE-MGAT": {
  	originChain: "mangatax",
  	slug: "mangatax-NATIVE-MGAT",
  	name: "MangataX Public Testnet",
  	symbol: "MGAT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/mangatax-native-mgat.png"
  },
  	"mangatax_para-NATIVE-MGX": {
  	originChain: "mangatax_para",
  	slug: "mangatax_para-NATIVE-MGX",
  	name: "Mangata Kusama",
  	symbol: "MGX",
  	decimals: 18,
  	priceId: "mangata-x",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			CurrencyId: "0"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/mangatax_para-native-mgx.png"
  },
  	"encointer-NATIVE-KSM": {
  	originChain: "encointer",
  	slug: "encointer-NATIVE-KSM",
  	name: "Encointer",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "33333333",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/encointer-native-ksm.png"
  },
  	"litmus-NATIVE-LIT": {
  	originChain: "litmus",
  	slug: "litmus-NATIVE-LIT",
  	name: "Litmus",
  	symbol: "LIT",
  	decimals: 12,
  	priceId: null,
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/litmus-native-lit.png"
  },
  	"litentry-NATIVE-LIT": {
  	originChain: "litentry",
  	slug: "litentry-NATIVE-LIT",
  	name: "Litentry",
  	symbol: "LIT",
  	decimals: 12,
  	priceId: "litentry",
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/litentry-native-lit.png"
  },
  	"tinkernet-NATIVE-TNKR": {
  	originChain: "tinkernet",
  	slug: "tinkernet-NATIVE-TNKR",
  	name: "InvArch Tinker",
  	symbol: "TNKR",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tinkernet-native-tnkr.png"
  },
  	"imbue_network-NATIVE-IMBU": {
  	originChain: "imbue_network",
  	slug: "imbue_network-NATIVE-IMBU",
  	name: "Imbue Kusama",
  	symbol: "IMBU",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/imbue_network-native-imbu.png"
  },
  	"subspace_test-NATIVE-tSSC": {
  	originChain: "subspace_test",
  	slug: "subspace_test-NATIVE-tSSC",
  	name: "Subspace Testnet",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_test-native-tssc.png"
  },
  	"subspace_gemini_2a-NATIVE-tSSC": {
  	originChain: "subspace_gemini_2a",
  	slug: "subspace_gemini_2a-NATIVE-tSSC",
  	name: "Subspace Gemini 2a",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_2a-native-tssc.png"
  },
  	"subspace_gemini_3c-NATIVE-tSSC": {
  	originChain: "subspace_gemini_3c",
  	slug: "subspace_gemini_3c-NATIVE-tSSC",
  	name: "Subspace Gemini 3c",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3c-native-tssc.png"
  },
  	"subspace_gemini_3d-NATIVE-tSSC": {
  	originChain: "subspace_gemini_3d",
  	slug: "subspace_gemini_3d-NATIVE-tSSC",
  	name: "Subspace Gemini 3d",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3d-native-tssc.png"
  },
  	"subspace_gemini_3e-NATIVE-tSSC": {
  	originChain: "subspace_gemini_3e",
  	slug: "subspace_gemini_3e-NATIVE-tSSC",
  	name: "Subspace Gemini 3e",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3e-native-tssc.png"
  },
  	"subspace_gemini_3f-NATIVE-tSSC": {
  	originChain: "subspace_gemini_3f",
  	slug: "subspace_gemini_3f-NATIVE-tSSC",
  	name: "Subspace Gemini 3f",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3f-native-tssc.png"
  },
  	"origintrail-NATIVE-NEURO": {
  	originChain: "origintrail",
  	slug: "origintrail-NATIVE-NEURO",
  	name: "OriginTrail",
  	symbol: "NEURO",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/origintrail-native-neuro.png"
  },
  	"dorafactory-NATIVE-DORA": {
  	originChain: "dorafactory",
  	slug: "dorafactory-NATIVE-DORA",
  	name: "Dorafactory",
  	symbol: "DORA",
  	decimals: 12,
  	priceId: "dora-factory",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dorafactory-native-dora.png"
  },
  	"bajun-NATIVE-BAJU": {
  	originChain: "bajun",
  	slug: "bajun-NATIVE-BAJU",
  	name: "Bajun Kusama",
  	symbol: "BAJU",
  	decimals: 12,
  	priceId: "ajuna-network",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bajun-native-baju.png"
  },
  	"listen-NATIVE-LT": {
  	originChain: "listen",
  	slug: "listen-NATIVE-LT",
  	name: "Listen Network",
  	symbol: "LT",
  	decimals: 12,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/listen-native-lt.png"
  },
  	"kabocha-NATIVE-KAB": {
  	originChain: "kabocha",
  	slug: "kabocha-NATIVE-KAB",
  	name: "Kabocha",
  	symbol: "KAB",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kabocha-native-kab.png"
  },
  	"gmdie-NATIVE-FREN": {
  	originChain: "gmdie",
  	slug: "gmdie-NATIVE-FREN",
  	name: "GM Parachain",
  	symbol: "FREN",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/gmdie-native-fren.png"
  },
  	"ternoa-NATIVE-CAPS": {
  	originChain: "ternoa",
  	slug: "ternoa-NATIVE-CAPS",
  	name: "Ternoa",
  	symbol: "CAPS",
  	decimals: 18,
  	priceId: "coin-capsule",
  	minAmount: "150000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ternoa-native-caps.png"
  },
  	"tanganika-NATIVE-DHX": {
  	originChain: "tanganika",
  	slug: "tanganika-NATIVE-DHX",
  	name: "DataHighway Tanganika",
  	symbol: "DHX",
  	decimals: 18,
  	priceId: "datahighway",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tanganika-native-dhx.png"
  },
  	"pendulum-NATIVE-PEN": {
  	originChain: "pendulum",
  	slug: "pendulum-NATIVE-PEN",
  	name: "Pendulum",
  	symbol: "PEN",
  	decimals: 12,
  	priceId: "pendulum-chain",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pendulum-native-pen.png"
  },
  	"pendulum-LOCAL-DOT": {
  	originChain: "pendulum",
  	slug: "pendulum-LOCAL-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			XCM: "0"
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pendulum-local-dot.png"
  },
  	"pendulum-LOCAL-USDT": {
  	originChain: "pendulum",
  	slug: "pendulum-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			XCM: "1"
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pendulum-local-usdt.png"
  },
  	"gear_testnet-NATIVE-Unit": {
  	originChain: "gear_testnet",
  	slug: "gear_testnet-NATIVE-Unit",
  	name: "Gear Staging Testnet",
  	symbol: "Unit",
  	decimals: 12,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/gear_testnet-native-unit.png"
  },
  	"ternoa_alphanet-NATIVE-CAPS": {
  	originChain: "ternoa_alphanet",
  	slug: "ternoa_alphanet-NATIVE-CAPS",
  	name: "Ternoa Alphanet",
  	symbol: "CAPS",
  	decimals: 18,
  	priceId: null,
  	minAmount: "150000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ternoa_alphanet-native-caps.png"
  },
  	"calamari_test-NATIVE-KMA": {
  	originChain: "calamari_test",
  	slug: "calamari_test-NATIVE-KMA",
  	name: "Calamari Staging",
  	symbol: "KMA",
  	decimals: 12,
  	priceId: null,
  	minAmount: "100000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/calamari_test-native-kma.png"
  },
  	"boba-NATIVE-ETH": {
  	originChain: "boba",
  	slug: "boba-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/boba-native-eth.png"
  },
  	"kilt_peregrine-NATIVE-PILT": {
  	originChain: "kilt_peregrine",
  	slug: "kilt_peregrine-NATIVE-PILT",
  	name: "KILT Peregrine",
  	symbol: "PILT",
  	decimals: 15,
  	priceId: null,
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kilt_peregrine-native-pilt.png"
  },
  	"xx_network-NATIVE-xx": {
  	originChain: "xx_network",
  	slug: "xx_network-NATIVE-xx",
  	name: "XX Network",
  	symbol: "xx",
  	decimals: 9,
  	priceId: "xxcoin",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/xx_network-native-xx.png"
  },
  	"watr_network-NATIVE-WATRD": {
  	originChain: "watr_network",
  	slug: "watr_network-NATIVE-WATRD",
  	name: "Watr Network",
  	symbol: "WATRD",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_network-native-watrd.png"
  },
  	"watr_mainnet-NATIVE-WATR": {
  	originChain: "watr_mainnet",
  	slug: "watr_mainnet-NATIVE-WATR",
  	name: "WATR",
  	symbol: "WATR",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_mainnet-native-watr.png"
  },
  	"watr_mainnet_evm-NATIVE-WATR": {
  	originChain: "watr_mainnet_evm",
  	slug: "watr_mainnet_evm-NATIVE-WATR",
  	name: "WATR",
  	symbol: "WATR",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_mainnet_evm-native-watr.png"
  },
  	"watr_network_evm-NATIVE-WATRD": {
  	originChain: "watr_network_evm",
  	slug: "watr_network_evm-NATIVE-WATRD",
  	name: "Watr Network - EVM",
  	symbol: "WATRD",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/watr_network_evm-native-watrd.png"
  },
  	"fusotao-NATIVE-TAO": {
  	originChain: "fusotao",
  	slug: "fusotao-NATIVE-TAO",
  	name: "Fusotao",
  	symbol: "TAO",
  	decimals: 18,
  	priceId: "fusotao",
  	minAmount: "1",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/fusotao-native-tao.png"
  },
  	"discovol-NATIVE-DISC": {
  	originChain: "discovol",
  	slug: "discovol-NATIVE-DISC",
  	name: "Discovol",
  	symbol: "DISC",
  	decimals: 14,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/discovol-native-disc.png"
  },
  	"discovol_testnet-NATIVE-DISC": {
  	originChain: "discovol_testnet",
  	slug: "discovol_testnet-NATIVE-DISC",
  	name: "Discovol Testnet",
  	symbol: "DISC",
  	decimals: 14,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/discovol_testnet-native-disc.png"
  },
  	"atocha-NATIVE-ATO": {
  	originChain: "atocha",
  	slug: "atocha-NATIVE-ATO",
  	name: "Atocha",
  	symbol: "ATO",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/atocha-native-ato.png"
  },
  	"myriad-NATIVE-MYRIA": {
  	originChain: "myriad",
  	slug: "myriad-NATIVE-MYRIA",
  	name: "Myriad",
  	symbol: "MYRIA",
  	decimals: 18,
  	priceId: "myria",
  	minAmount: "1000000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/myriad-native-myria.png"
  },
  	"deBio-NATIVE-DBIO": {
  	originChain: "deBio",
  	slug: "deBio-NATIVE-DBIO",
  	name: "DeBio",
  	symbol: "DBIO",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/debio-native-dbio.png"
  },
  	"collectives-NATIVE-DOT": {
  	originChain: "collectives",
  	slug: "collectives-NATIVE-DOT",
  	name: "Polkadot Collectives",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/collectives-native-dot.png"
  },
  	"ajunaPolkadot-NATIVE-AJUN": {
  	originChain: "ajunaPolkadot",
  	slug: "ajunaPolkadot-NATIVE-AJUN",
  	name: "Ajuna Network",
  	symbol: "AJUN",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ajunapolkadot-native-ajun.png"
  },
  	"bitgreen-NATIVE-BBB": {
  	originChain: "bitgreen",
  	slug: "bitgreen-NATIVE-BBB",
  	name: "Bitgreen",
  	symbol: "BBB",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitgreen-native-bbb.png"
  },
  	"frequency-NATIVE-FRQCY": {
  	originChain: "frequency",
  	slug: "frequency-NATIVE-FRQCY",
  	name: "Frequency",
  	symbol: "FRQCY",
  	decimals: 8,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/frequency-native-frqcy.png"
  },
  	"hashedNetwork-NATIVE-HASH": {
  	originChain: "hashedNetwork",
  	slug: "hashedNetwork-NATIVE-HASH",
  	name: "Hashed Network",
  	symbol: "HASH",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hashednetwork-native-hash.png"
  },
  	"kapex-NATIVE-KPX": {
  	originChain: "kapex",
  	slug: "kapex-NATIVE-KPX",
  	name: "Kapex",
  	symbol: "KPX",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kapex-native-kpx.png"
  },
  	"kylinNetwork-NATIVE-KYL": {
  	originChain: "kylinNetwork",
  	slug: "kylinNetwork-NATIVE-KYL",
  	name: "Kylin Network",
  	symbol: "KYL",
  	decimals: 18,
  	priceId: "kylin-network",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kylinnetwork-native-kyl.png"
  },
  	"ipci-NATIVE-MITO": {
  	originChain: "ipci",
  	slug: "ipci-NATIVE-MITO",
  	name: "DAO IPCI",
  	symbol: "MITO",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ipci-native-mito.png"
  },
  	"kico-NATIVE-KICO": {
  	originChain: "kico",
  	slug: "kico-NATIVE-KICO",
  	name: "KICO",
  	symbol: "KICO",
  	decimals: 14,
  	priceId: null,
  	minAmount: "100000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kico-native-kico.png"
  },
  	"luhnNetwork-NATIVE-LUHN": {
  	originChain: "luhnNetwork",
  	slug: "luhnNetwork-NATIVE-LUHN",
  	name: "Luhn Network",
  	symbol: "LUHN",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/luhnnetwork-native-luhn.png"
  },
  	"pichiu-NATIVE-PCHU": {
  	originChain: "pichiu",
  	slug: "pichiu-NATIVE-PCHU",
  	name: "Pichiu Network",
  	symbol: "PCHU",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/pichiu-native-pchu.png"
  },
  	"riodefi-NATIVE-UNIT": {
  	originChain: "riodefi",
  	slug: "riodefi-NATIVE-UNIT",
  	name: "RioDeFi",
  	symbol: "UNIT",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/riodefi-native-unit.png"
  },
  	"automata-NATIVE-ATA": {
  	originChain: "automata",
  	slug: "automata-NATIVE-ATA",
  	name: "Automata",
  	symbol: "ATA",
  	decimals: 18,
  	priceId: "automata",
  	minAmount: "1000000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/automata-native-ata.png"
  },
  	"creditcoin-NATIVE-CTC": {
  	originChain: "creditcoin",
  	slug: "creditcoin-NATIVE-CTC",
  	name: "Creditcoin",
  	symbol: "CTC",
  	decimals: 18,
  	priceId: "creditcoin-2",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/creditcoin-native-ctc.png"
  },
  	"crownSterling-NATIVE-CSOV": {
  	originChain: "crownSterling",
  	slug: "crownSterling-NATIVE-CSOV",
  	name: "Crown Sterling",
  	symbol: "CSOV",
  	decimals: 12,
  	priceId: "crown-sovereign",
  	minAmount: "1",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crownsterling-native-csov.png"
  },
  	"dockPosMainnet-NATIVE-DOCK": {
  	originChain: "dockPosMainnet",
  	slug: "dockPosMainnet-NATIVE-DOCK",
  	name: "Dock",
  	symbol: "DOCK",
  	decimals: 6,
  	priceId: "dock",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dockposmainnet-native-dock.png"
  },
  	"kusari-NATIVE-KSI": {
  	originChain: "kusari",
  	slug: "kusari-NATIVE-KSI",
  	name: "Kusari",
  	symbol: "KSI",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kusari-native-ksi.png"
  },
  	"logion-NATIVE-LGNT": {
  	originChain: "logion",
  	slug: "logion-NATIVE-LGNT",
  	name: "logion Standalone",
  	symbol: "LGNT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/logion-native-lgnt.png"
  },
  	"neatcoin-NATIVE-NEAT": {
  	originChain: "neatcoin",
  	slug: "neatcoin-NATIVE-NEAT",
  	name: "Neatcoin",
  	symbol: "NEAT",
  	decimals: 12,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/neatcoin-native-neat.png"
  },
  	"nftmart-NATIVE-NMT": {
  	originChain: "nftmart",
  	slug: "nftmart-NATIVE-NMT",
  	name: "NFTMart",
  	symbol: "NMT",
  	decimals: 12,
  	priceId: "nftmart-token",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/nftmart-native-nmt.png"
  },
  	"polymesh-NATIVE-POLYX": {
  	originChain: "polymesh",
  	slug: "polymesh-NATIVE-POLYX",
  	name: "Polymesh Mainnet",
  	symbol: "POLYX",
  	decimals: 6,
  	priceId: "polymesh",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polymesh-native-polyx.png"
  },
  	"riochain-NATIVE-RFUEL": {
  	originChain: "riochain",
  	slug: "riochain-NATIVE-RFUEL",
  	name: "RioChain",
  	symbol: "RFUEL",
  	decimals: 12,
  	priceId: "rio-defi",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/riochain-native-rfuel.png"
  },
  	"sherpax-NATIVE-KSX": {
  	originChain: "sherpax",
  	slug: "sherpax-NATIVE-KSX",
  	name: "SherpaX",
  	symbol: "KSX",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sherpax-native-ksx.png"
  },
  	"sora_substrate-NATIVE-XOR": {
  	originChain: "sora_substrate",
  	slug: "sora_substrate-NATIVE-XOR",
  	name: "SORA",
  	symbol: "XOR",
  	decimals: 18,
  	priceId: "sora",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "0x0200000000000000000000000000000000000000000000000000000000000000"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sora_substrate-native-xor.png"
  },
  	"swapdex-NATIVE-SDX": {
  	originChain: "swapdex",
  	slug: "swapdex-NATIVE-SDX",
  	name: "Swapdex",
  	symbol: "SDX",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/swapdex-native-sdx.png"
  },
  	"3dpass-NATIVE-P3D": {
  	originChain: "3dpass",
  	slug: "3dpass-NATIVE-P3D",
  	name: "3DPass",
  	symbol: "P3D",
  	decimals: 12,
  	priceId: "3dpass",
  	minAmount: "1",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/3dpass-native-p3d.png"
  },
  	"alephSmartNet-NATIVE-SZERO": {
  	originChain: "alephSmartNet",
  	slug: "alephSmartNet-NATIVE-SZERO",
  	name: "Aleph Zero Smartnet",
  	symbol: "SZERO",
  	decimals: 12,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/alephsmartnet-native-szero.png"
  },
  	"kulupu-NATIVE-KLP": {
  	originChain: "kulupu",
  	slug: "kulupu-NATIVE-KLP",
  	name: "Kulupu",
  	symbol: "KLP",
  	decimals: 12,
  	priceId: "kulupu",
  	minAmount: "100000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kulupu-native-klp.png"
  },
  	"joystream-NATIVE-JOY": {
  	originChain: "joystream",
  	slug: "joystream-NATIVE-JOY",
  	name: "Joystream",
  	symbol: "JOY",
  	decimals: 10,
  	priceId: "joystream",
  	minAmount: "266666560",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/joystream-native-joy.png"
  },
  	"statemint-LOCAL-USDt": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-USDt",
  	name: "Tether USD",
  	symbol: "USDt",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "70000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1984",
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: {
  					X2: [
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 1984
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-usdt.png"
  },
  	"moonriver-LOCAL-xcKSM": {
  	originChain: "moonriver",
  	slug: "moonriver-LOCAL-xcKSM",
  	name: "Kusama",
  	symbol: "xcKSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "42259045809535163221576417993425387648",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080"
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xcksm.png"
  },
  	"shiden-LOCAL-KSM": {
  	originChain: "shiden",
  	slug: "shiden-LOCAL-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "340282366920938463463374607431768211455",
  		assetType: "ForeignAsset",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: "Here"
  			}
  		}
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-ksm.png"
  },
  	"karura-LOCAL-KSM": {
  	originChain: "karura",
  	slug: "karura-LOCAL-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "KSM"
  		}
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-ksm.png"
  },
  	"karura-LOCAL-NEER": {
  	originChain: "karura",
  	slug: "karura-LOCAL-NEER",
  	name: "Metaverse.Network Pioneer",
  	symbol: "NEER",
  	decimals: 18,
  	priceId: "metaverse-network-pioneer",
  	minAmount: "100000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: "9"
  		}
  	},
  	multiChainAsset: "NEER-Pioneer",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-neer.png"
  },
  	"karura-LOCAL-BNC": {
  	originChain: "karura",
  	slug: "karura-LOCAL-BNC",
  	name: "Bifrost Kusama",
  	symbol: "BNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: "8000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "BNC"
  		}
  	},
  	multiChainAsset: "BNC-BifrostKusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-bnc.png"
  },
  	"karura-LOCAL-tKSM": {
  	originChain: "karura",
  	slug: "karura-LOCAL-tKSM",
  	name: "Taiga KSM",
  	symbol: "tKSM",
  	decimals: 12,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			StableAssetPoolToken: "0"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-tksm.png"
  },
  	"bifrost-LOCAL-KSM": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "KSM"
  		}
  	},
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-ksm.png"
  },
  	"bifrost-LOCAL-vKSM": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-vKSM",
  	name: "Voucher KSM",
  	symbol: "vKSM",
  	decimals: 12,
  	priceId: "voucher-ksm",
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken: "KSM"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vksm.png"
  },
  	"bifrost-LOCAL-vsKSM": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-vsKSM",
  	name: "Voucher Slot KSM",
  	symbol: "vsKSM",
  	decimals: 12,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VSToken: "KSM"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vsksm.png"
  },
  	"bifrost-LOCAL-vMOVR": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-vMOVR",
  	name: "Voucher MOVR",
  	symbol: "vMOVR",
  	decimals: 18,
  	priceId: "voucher-movr",
  	minAmount: "1000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken: "MOVR"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vmovr.png"
  },
  	"bifrost-LOCAL-vBNC": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-vBNC",
  	name: "Voucher BNC",
  	symbol: "vBNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: "10000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken: "BNC"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-vbnc.png"
  },
  	"moonbeam-LOCAL-xcUSDT": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcUSDT",
  	name: "Tether USD",
  	symbol: "xcUSDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "311091173110107856861649819128533077277",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcusdt.png"
  },
  	"moonbeam-LOCAL-xcEQ": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcEQ",
  	name: "Equilibrium Token",
  	symbol: "xcEQ",
  	decimals: 9,
  	priceId: "equilibrium-token",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "190590555344745888270686124937537713878",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFffFFfFf8f6267e040D8a0638C576dfBa4F0F6D6"
  	},
  	multiChainAsset: "EQ-Equilibrium",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xceq.png"
  },
  	"moonbeam-LOCAL-xcEQD": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcEQD",
  	name: "Equilibrium Dollar",
  	symbol: "xcEQD",
  	decimals: 9,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "187224307232923873519830480073807488153",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFffFfFF8cdA1707bAF23834d211B08726B1E499"
  	},
  	multiChainAsset: "EQD-EquilibriumUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xceqd.png"
  },
  	"moonriver-LOCAL-xcaSEED": {
  	originChain: "moonriver",
  	slug: "moonriver-LOCAL-xcaSEED",
  	name: "aUSD SEED",
  	symbol: "xcaSEED",
  	decimals: 12,
  	priceId: "ausd-seed-karura",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "214920334981412447805621250067209749032",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFfFffFFfa1B026a00FbAA67c86D5d1d5BF8D8228"
  	},
  	multiChainAsset: "aSEED-aSEEDKarura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xcaseed.png"
  },
  	"moonriver-LOCAL-xcKINT": {
  	originChain: "moonriver",
  	slug: "moonriver-LOCAL-xcKINT",
  	name: "Kintsugi",
  	symbol: "xcKINT",
  	decimals: 12,
  	priceId: "kintsugi",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "175400718394635817552109270754364440562",
  		assetType: "ForeignAsset",
  		contractAddress: "0xfffFFFFF83F4f317d3cbF6EC6250AeC3697b3fF2"
  	},
  	multiChainAsset: "KINT-Kintsugi",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xckint.png"
  },
  	"moonriver-LOCAL-xcKBTC": {
  	originChain: "moonriver",
  	slug: "moonriver-LOCAL-xcKBTC",
  	name: "Kintsugi Wrapped BTC",
  	symbol: "xcKBTC",
  	decimals: 8,
  	priceId: "kintsugi-btc",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "328179947973504579459046439826496046832",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFFfFfFfF6E528AD57184579beeE00c5d5e646F0"
  	},
  	multiChainAsset: "kBTC-KintsugiWrappedBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xckbtc.png"
  },
  	"moonriver-LOCAL-xcBNC": {
  	originChain: "moonriver",
  	slug: "moonriver-LOCAL-xcBNC",
  	name: "Bifrost Kusama",
  	symbol: "xcBNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "319623561105283008236062145480775032445",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFfFFfFFF075423be54811EcB478e911F22dDe7D"
  	},
  	multiChainAsset: "BNC-BifrostKusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xcbnc.png"
  },
  	"astar-LOCAL-aSEED": {
  	originChain: "astar",
  	slug: "astar-LOCAL-aSEED",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-acala",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551617",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X2: [
  						{
  							Parachain: 2000
  						},
  						{
  							GeneralKey: "0x0001"
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "aSEED-aSEEDAcala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-aseed.png"
  },
  	"astar-LOCAL-LDOT": {
  	originChain: "astar",
  	slug: "astar-LOCAL-LDOT",
  	name: "Liquid DOT",
  	symbol: "LDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551618"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-ldot.png"
  },
  	"astar-LOCAL-ACA": {
  	originChain: "astar",
  	slug: "astar-LOCAL-ACA",
  	name: "Acala",
  	symbol: "ACA",
  	decimals: 12,
  	priceId: "acala",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551616"
  	},
  	multiChainAsset: "ACA-Acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-aca.png"
  },
  	"astarEvm-ERC20-aSEED-0xfFFFFfFF00000000000000010000000000000001": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-aSEED-0xfFFFFfFF00000000000000010000000000000001",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-acala",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xfFFFFfFF00000000000000010000000000000001"
  	},
  	multiChainAsset: "aSEED-aSEEDAcala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-aseed-0xffffffff00000000000000010000000000000001.png"
  },
  	"moonriver-LOCAL-xcKAR": {
  	originChain: "moonriver",
  	slug: "moonriver-LOCAL-xcKAR",
  	name: "Karura",
  	symbol: "xcKAR",
  	decimals: 12,
  	priceId: "karura",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "10810581592933651521121702237638664357",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFfFFFFfF08220AD2E6e157f26eD8bD22A336A0A5"
  	},
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-local-xckar.png"
  },
  	"karura-LOCAL-aSEED": {
  	originChain: "karura",
  	slug: "karura-LOCAL-aSEED",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-karura",
  	minAmount: "10000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "KUSD"
  		}
  	},
  	multiChainAsset: "aSEED-aSEEDKarura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura-local-aseed.png"
  },
  	"shiden-LOCAL-aSEED": {
  	originChain: "shiden",
  	slug: "shiden-LOCAL-aSEED",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-karura",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551616",
  		assetType: "ForeignAsset"
  	},
  	multiChainAsset: "aSEED-aSEEDKarura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-aseed.png"
  },
  	"shidenEvm-ERC20-aSEED-0xfFFfFFfF00000000000000010000000000000000": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-aSEED-0xfFFfFFfF00000000000000010000000000000000",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-karura",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xfFFfFFfF00000000000000010000000000000000"
  	},
  	multiChainAsset: "aSEED-aSEEDKarura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-aseed-0xffffffff00000000000000010000000000000000.png"
  },
  	"bifrost-LOCAL-aSEED": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-aSEED",
  	name: "aUSD SEED",
  	symbol: "aSEED",
  	decimals: 12,
  	priceId: "ausd-seed-karura",
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Stable: "KUSD"
  		}
  	},
  	multiChainAsset: "aSEED-aSEEDKarura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-aseed.png"
  },
  	"bifrost-LOCAL-KAR": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-KAR",
  	name: "Karura",
  	symbol: "KAR",
  	decimals: 12,
  	priceId: "karura",
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "KAR"
  		}
  	},
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-kar.png"
  },
  	"statemine-LOCAL-USDt": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-USDt",
  	name: "Tether USD",
  	symbol: "USDt",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "100",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1984"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-usdt.png"
  },
  	"statemine-LOCAL-RMRK": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-RMRK",
  	name: "RMRK.app",
  	symbol: "RMRK",
  	decimals: 10,
  	priceId: "rmrk",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "8"
  	},
  	multiChainAsset: "RMRK-RMRKApp",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-rmrk.png"
  },
  	"statemine-LOCAL-ARIS": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-ARIS",
  	name: "PolarisDAO",
  	symbol: "ARIS",
  	decimals: 8,
  	priceId: null,
  	minAmount: "10000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "16"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-aris.png"
  },
  	"statemine-LOCAL-BILL": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-BILL",
  	name: "BILLCOIN",
  	symbol: "BILL",
  	decimals: 8,
  	priceId: null,
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "223"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-bill.png"
  },
  	"statemine-LOCAL-CHAOS": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-CHAOS",
  	name: "Chaos",
  	symbol: "CHAOS",
  	decimals: 10,
  	priceId: null,
  	minAmount: "10000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "69420"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-chaos.png"
  },
  	"statemine-LOCAL-CHRWNA": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-CHRWNA",
  	name: "Chrawnna Coin",
  	symbol: "CHRWNA",
  	decimals: 10,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "567"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-chrwna.png"
  },
  	"statemine-LOCAL-BAILEGO": {
  	originChain: "statemine",
  	slug: "statemine-LOCAL-BAILEGO",
  	name: "SHIBATALES",
  	symbol: "BAILEGO",
  	decimals: 0,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "88888"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemine-local-bailego.png"
  },
  	"moonbase-ERC20-MFR-0xc2bFd8e028b342F0537aDC2bF310821c807c1312": {
  	originChain: "moonbase",
  	slug: "moonbase-ERC20-MFR-0xc2bFd8e028b342F0537aDC2bF310821c807c1312",
  	name: "MFR Token",
  	symbol: "MFR",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xc2bFd8e028b342F0537aDC2bF310821c807c1312"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbase-erc20-mfr-0xc2bfd8e028b342f0537adc2bf310821c807c1312.png"
  },
  	"moonbase-ERC20-MFG-0x3ef88816ebE8F50019e931bdFFB0e428A44a29B1": {
  	originChain: "moonbase",
  	slug: "moonbase-ERC20-MFG-0x3ef88816ebE8F50019e931bdFFB0e428A44a29B1",
  	name: "MFG Token",
  	symbol: "MFG",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3ef88816ebE8F50019e931bdFFB0e428A44a29B1"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbase-erc20-mfg-0x3ef88816ebe8f50019e931bdffb0e428a44a29b1.png"
  },
  	"moonbeam-ERC20-USDC-0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-USDC-0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-usdc-0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b.png"
  },
  	"moonbeam-ERC20-BNB-0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-BNB-0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055",
  	name: "Binance",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: "binancecoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055"
  	},
  	multiChainAsset: "BNB-Binance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-bnb-0xc9baa8cfdde8e328787e29b4b078abf2dadc2055.png"
  },
  	"moonbeam-ERC20-GLINT-0xcd3B51D98478D53F4515A306bE565c6EebeF1D58": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-GLINT-0xcd3B51D98478D53F4515A306bE565c6EebeF1D58",
  	name: "Beamswap",
  	symbol: "GLINT",
  	decimals: 18,
  	priceId: "beamswap",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xcd3B51D98478D53F4515A306bE565c6EebeF1D58"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-glint-0xcd3b51d98478d53f4515a306be565c6eebef1d58.png"
  },
  	"moonbeam-ERC20-SHARE-0x4204cAd97732282d261FbB7088e07557810A6408": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-SHARE-0x4204cAd97732282d261FbB7088e07557810A6408",
  	name: "Beamshare",
  	symbol: "SHARE",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4204cAd97732282d261FbB7088e07557810A6408"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-share-0x4204cad97732282d261fbb7088e07557810a6408.png"
  },
  	"moonbeam-ERC20-BEANS-0x65b09ef8c5A096C5Fd3A80f1F7369E56eB932412": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-BEANS-0x65b09ef8c5A096C5Fd3A80f1F7369E56eB932412",
  	name: "MoonBeans",
  	symbol: "BEANS",
  	decimals: 18,
  	priceId: "moonbeans",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x65b09ef8c5A096C5Fd3A80f1F7369E56eB932412"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-beans-0x65b09ef8c5a096c5fd3a80f1f7369e56eb932412.png"
  },
  	"moonbeam-ERC20-STELLA-0x0E358838ce72d5e61E0018a2ffaC4bEC5F4c88d2": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-STELLA-0x0E358838ce72d5e61E0018a2ffaC4bEC5F4c88d2",
  	name: "StellaSwap",
  	symbol: "STELLA",
  	decimals: 18,
  	priceId: "stellaswap",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0E358838ce72d5e61E0018a2ffaC4bEC5F4c88d2"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-stella-0x0e358838ce72d5e61e0018a2ffac4bec5f4c88d2.png"
  },
  	"moonbeam-ERC20-xStella-0x06A3b410b681c82417A906993aCeFb91bAB6A080": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-xStella-0x06A3b410b681c82417A906993aCeFb91bAB6A080",
  	name: "XStella",
  	symbol: "xStella",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x06A3b410b681c82417A906993aCeFb91bAB6A080"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-xstella-0x06a3b410b681c82417a906993acefb91bab6a080.png"
  },
  	"moonbeam-ERC20-veSOLAR-0x0DB6729C03C85B0708166cA92801BcB5CAc781fC": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-veSOLAR-0x0DB6729C03C85B0708166cA92801BcB5CAc781fC",
  	name: "Vested SolarBeam",
  	symbol: "veSOLAR",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0DB6729C03C85B0708166cA92801BcB5CAc781fC"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-vesolar-0x0db6729c03c85b0708166ca92801bcb5cac781fc.png"
  },
  	"moonbeam-ERC20-FLARE-0xE3e43888fa7803cDC7BEA478aB327cF1A0dc11a7": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-FLARE-0xE3e43888fa7803cDC7BEA478aB327cF1A0dc11a7",
  	name: "Flare",
  	symbol: "FLARE",
  	decimals: 18,
  	priceId: "solarflare",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xE3e43888fa7803cDC7BEA478aB327cF1A0dc11a7"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-flare-0xe3e43888fa7803cdc7bea478ab327cf1a0dc11a7.png"
  },
  	"moonbeam-ERC20-CGS-0x2Dfc76901bB2ac2A5fA5fc479590A490BBB10a5F": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-CGS-0x2Dfc76901bB2ac2A5fA5fc479590A490BBB10a5F",
  	name: "Cougar",
  	symbol: "CGS",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x2Dfc76901bB2ac2A5fA5fc479590A490BBB10a5F"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-cgs-0x2dfc76901bb2ac2a5fa5fc479590a490bbb10a5f.png"
  },
  	"moonbeam-ERC20-WELL-0x511ab53f793683763e5a8829738301368a2411e3": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-WELL-0x511ab53f793683763e5a8829738301368a2411e3",
  	name: "MoonWell Artemis",
  	symbol: "WELL",
  	decimals: 18,
  	priceId: "moonwell-artemis",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x511ab53f793683763e5a8829738301368a2411e3"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-well-0x511ab53f793683763e5a8829738301368a2411e3.png"
  },
  	"moonriver-ERC20-USDC-0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-USDC-0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-usdc-0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d.png"
  },
  	"moonriver-ERC20-DAI-0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-DAI-0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844",
  	name: "Dai Stablecoin",
  	symbol: "DAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-dai-0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844.png"
  },
  	"moonriver-ERC20-MFAM-0xBb8d88bcD9749636BC4D2bE22aaC4Bb3B01A58F1": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-MFAM-0xBb8d88bcD9749636BC4D2bE22aaC4Bb3B01A58F1",
  	name: "MFAM",
  	symbol: "MFAM",
  	decimals: 18,
  	priceId: "moonwell",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xBb8d88bcD9749636BC4D2bE22aaC4Bb3B01A58F1"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-mfam-0xbb8d88bcd9749636bc4d2be22aac4bb3b01a58f1.png"
  },
  	"moonriver-ERC20-ZLK-0x0f47ba9d9Bde3442b42175e51d6A367928A1173B": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-ZLK-0x0f47ba9d9Bde3442b42175e51d6A367928A1173B",
  	name: "Zenlink Network",
  	symbol: "ZLK",
  	decimals: 18,
  	priceId: "zenlink-network-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0f47ba9d9Bde3442b42175e51d6A367928A1173B"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-zlk-0x0f47ba9d9bde3442b42175e51d6a367928a1173b.png"
  },
  	"moonriver-ERC20-SOLAR-0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-SOLAR-0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B",
  	name: "SolarBeam",
  	symbol: "SOLAR",
  	decimals: 18,
  	priceId: "solarbeam",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-solar-0x6bd193ee6d2104f14f94e2ca6efefae561a4334b.png"
  },
  	"moonriver-ERC20-FRAX-0x1A93B23281CC1CDE4C4741353F3064709A16197d": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-FRAX-0x1A93B23281CC1CDE4C4741353F3064709A16197d",
  	name: "SolarBeam",
  	symbol: "FRAX",
  	decimals: 18,
  	priceId: "frax",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x1A93B23281CC1CDE4C4741353F3064709A16197d"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-frax-0x1a93b23281cc1cde4c4741353f3064709a16197d.png"
  },
  	"moonriver-ERC20-FXS-0x6f1D1Ee50846Fcbc3de91723E61cb68CFa6D0E98": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-FXS-0x6f1D1Ee50846Fcbc3de91723E61cb68CFa6D0E98",
  	name: "Frax Share",
  	symbol: "FXS",
  	decimals: 18,
  	priceId: "frax-share",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6f1D1Ee50846Fcbc3de91723E61cb68CFa6D0E98"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-fxs-0x6f1d1ee50846fcbc3de91723e61cb68cfa6d0e98.png"
  },
  	"moonriver-ERC20-CWS-0x6fc9651f45B262AE6338a701D563Ab118B1eC0Ce": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-CWS-0x6fc9651f45B262AE6338a701D563Ab118B1eC0Ce",
  	name: "Crowns",
  	symbol: "CWS",
  	decimals: 18,
  	priceId: "crowns",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6fc9651f45B262AE6338a701D563Ab118B1eC0Ce"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-cws-0x6fc9651f45b262ae6338a701d563ab118b1ec0ce.png"
  },
  	"moonriver-ERC20-RIB-0xbD90A6125a84E5C512129D622a75CDDE176aDE5E": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC20-RIB-0xbD90A6125a84E5C512129D622a75CDDE176aDE5E",
  	name: "RiverBoat",
  	symbol: "RIB",
  	decimals: 18,
  	priceId: "riverboat",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xbD90A6125a84E5C512129D622a75CDDE176aDE5E"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc20-rib-0xbd90a6125a84e5c512129d622a75cdde176ade5e.png"
  },
  	"shiden-LOCAL-LKSM": {
  	originChain: "shiden",
  	slug: "shiden-LOCAL-LKSM",
  	name: "Liquid KSM",
  	symbol: "LKSM",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551619",
  		assetType: "ForeignAsset"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-lksm.png"
  },
  	"shiden-LOCAL-MOVR": {
  	originChain: "shiden",
  	slug: "shiden-LOCAL-MOVR",
  	name: "Moonriver",
  	symbol: "MOVR",
  	decimals: 18,
  	priceId: "moonriver",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551620",
  		assetType: "ForeignAsset"
  	},
  	multiChainAsset: "MOVR-Moonriver",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-movr.png"
  },
  	"shiden-LOCAL-KAR": {
  	originChain: "shiden",
  	slug: "shiden-LOCAL-KAR",
  	name: "Karura",
  	symbol: "KAR",
  	decimals: 12,
  	priceId: "karura",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551618",
  		assetType: "ForeignAsset"
  	},
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shiden-local-kar.png"
  },
  	"binance-ERC20-BUSD-0xe9e7cea3dedca5984780bafc599bd69add087d56": {
  	originChain: "binance",
  	slug: "binance-ERC20-BUSD-0xe9e7cea3dedca5984780bafc599bd69add087d56",
  	name: "Binance USD",
  	symbol: "BUSD",
  	decimals: 18,
  	priceId: "binance-usd",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
  	},
  	multiChainAsset: "BUSD-BinanceUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-busd-0xe9e7cea3dedca5984780bafc599bd69add087d56.png"
  },
  	"astarEvm-ERC20-DOT-0xffffffffffffffffffffffffffffffffffffffff": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-DOT-0xffffffffffffffffffffffffffffffffffffffff",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xffffffffffffffffffffffffffffffffffffffff"
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-dot-0xffffffffffffffffffffffffffffffffffffffff.png"
  },
  	"astarEvm-ERC20-ARSW-0xde2578edec4669ba7f41c5d5d2386300bcea4678": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-ARSW-0xde2578edec4669ba7f41c5d5d2386300bcea4678",
  	name: "ArthSwap Token",
  	symbol: "ARSW",
  	decimals: 18,
  	priceId: "arthswap",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xde2578edec4669ba7f41c5d5d2386300bcea4678"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-arsw-0xde2578edec4669ba7f41c5d5d2386300bcea4678.png"
  },
  	"astarEvm-ERC20-LAY-0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-LAY-0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd",
  	name: "Lay Token",
  	symbol: "LAY",
  	decimals: 18,
  	priceId: "starlay-finance",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-lay-0xc4335b1b76fa6d52877b3046eca68f6e708a27dd.png"
  },
  	"astarEvm-ERC20-BAI-0x733ebcc6df85f8266349defd0980f8ced9b45f35": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-BAI-0x733ebcc6df85f8266349defd0980f8ced9b45f35",
  	name: "BAI Stablecoin",
  	symbol: "BAI",
  	decimals: 18,
  	priceId: "bai-stablecoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x733ebcc6df85f8266349defd0980f8ced9b45f35"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-bai-0x733ebcc6df85f8266349defd0980f8ced9b45f35.png"
  },
  	"astarEvm-ERC20-ATID-0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-ATID-0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c",
  	name: "ATID",
  	symbol: "ATID",
  	decimals: 18,
  	priceId: "astriddao-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-atid-0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c.png"
  },
  	"astarEvm-ERC20-SRS-0x9448610696659de8f72e1831d392214ae1ca4838": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-SRS-0x9448610696659de8f72e1831d392214ae1ca4838",
  	name: "Sirius Finance",
  	symbol: "SRS",
  	decimals: 18,
  	priceId: "sirius-finance",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x9448610696659de8f72e1831d392214ae1ca4838"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-srs-0x9448610696659de8f72e1831d392214ae1ca4838.png"
  },
  	"astarEvm-ERC20-ORU-0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-ORU-0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f",
  	name: "Orcus Token",
  	symbol: "ORU",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-oru-0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f.png"
  },
  	"astarEvm-ERC20-BNB-0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-BNB-0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52",
  	name: "Binance Coin",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: "binancecoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52"
  	},
  	multiChainAsset: "BNB-Binance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-bnb-0x7f27352d5f83db87a5a3e00f4b07cc2138d8ee52.png"
  },
  	"astarEvm-ERC20-BUSD-0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-BUSD-0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E",
  	name: "Binance USD",
  	symbol: "BUSD",
  	decimals: 18,
  	priceId: "binance-usd",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E"
  	},
  	multiChainAsset: "BUSD-BinanceUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-busd-0x4bf769b05e832fcdc9053fffbc78ca889acb5e1e.png"
  },
  	"astarEvm-ERC20-CRV-0x7756a83563f0f56937A6FdF668E7D9F387c0D199": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-CRV-0x7756a83563f0f56937A6FdF668E7D9F387c0D199",
  	name: "Curve DAO Token",
  	symbol: "CRV",
  	decimals: 18,
  	priceId: "curve-dao-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7756a83563f0f56937A6FdF668E7D9F387c0D199"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-crv-0x7756a83563f0f56937a6fdf668e7d9f387c0d199.png"
  },
  	"astarEvm-ERC20-DAI-0x6De33698e9e9b787e09d3Bd7771ef63557E148bb": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-DAI-0x6De33698e9e9b787e09d3Bd7771ef63557E148bb",
  	name: "Dai Stablecoin",
  	symbol: "DAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6De33698e9e9b787e09d3Bd7771ef63557E148bb"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-dai-0x6de33698e9e9b787e09d3bd7771ef63557e148bb.png"
  },
  	"astarEvm-ERC20-PKEX-0x1fE622E91e54D6AD00B01917351Ea6081426764A": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-PKEX-0x1fE622E91e54D6AD00B01917351Ea6081426764A",
  	name: "PolkaEx",
  	symbol: "PKEX",
  	decimals: 18,
  	priceId: "polkaex",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x1fE622E91e54D6AD00B01917351Ea6081426764A"
  	},
  	multiChainAsset: "PKEX-PolkaEx",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-pkex-0x1fe622e91e54d6ad00b01917351ea6081426764a.png"
  },
  	"astarEvm-ERC20-SDN-0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-SDN-0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4",
  	name: "Shiden Network",
  	symbol: "SDN",
  	decimals: 18,
  	priceId: "shiden",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4"
  	},
  	multiChainAsset: "SDN-Shiden",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-sdn-0x75364d4f779d0bd0facd9a218c67f87dd9aff3b4.png"
  },
  	"astarEvm-ERC20-USDC-0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-USDC-0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-usdc-0x6a2d262d56735dba19dd70682b39f6be9a931d98.png"
  },
  	"astarEvm-ERC20-WBTC-0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-WBTC-0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca",
  	name: "Wrapped BTC",
  	symbol: "WBTC",
  	decimals: 8,
  	priceId: "wrapped-bitcoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca"
  	},
  	multiChainAsset: "WBTC-WrappedBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-wbtc-0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca.png"
  },
  	"astarEvm-ERC20-WETH-0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-WETH-0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c",
  	name: "Wrapped Ether",
  	symbol: "WETH",
  	decimals: 18,
  	priceId: "weth",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-weth-0x81ecac0d6be0550a00ff064a4f9dd2400585fe9c.png"
  },
  	"astarEvm-ERC20-KZY-0x3d4DCFD2B483549527f7611ccFecb40b47d0c17b": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-KZY-0x3d4DCFD2B483549527f7611ccFecb40b47d0c17b",
  	name: "Kazuya Token",
  	symbol: "KZY",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3d4DCFD2B483549527f7611ccFecb40b47d0c17b"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-kzy-0x3d4dcfd2b483549527f7611ccfecb40b47d0c17b.png"
  },
  	"astarEvm-ERC20-WASTR-0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-WASTR-0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720",
  	name: "Wrapped Astar",
  	symbol: "WASTR",
  	decimals: 18,
  	priceId: "wrapped-astar",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-wastr-0xaeaaf0e2c81af264101b9129c00f4440ccf0f720.png"
  },
  	"astarEvm-ERC20-ARSW_LP-0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-ARSW_LP-0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C",
  	name: "Arthswap LPs (ARSW-LP)",
  	symbol: "ARSW_LP",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-arsw_lp-0x87988ebde7e661f44eb3a586c5e0ceab533a2d9c.png"
  },
  	"astarEvm-ERC20-KOS-0xbcF7aa4fC081f5670d9b8a1BdD1cFd98DCAeE6e6": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-KOS-0xbcF7aa4fC081f5670d9b8a1BdD1cFd98DCAeE6e6",
  	name: "KaioShin Token",
  	symbol: "KOS",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xbcF7aa4fC081f5670d9b8a1BdD1cFd98DCAeE6e6"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-kos-0xbcf7aa4fc081f5670d9b8a1bdd1cfd98dcaee6e6.png"
  },
  	"astarEvm-ERC20-PPC-0x34F79636a55d9961E47b7784eF460B021B499406": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-PPC-0x34F79636a55d9961E47b7784eF460B021B499406",
  	name: "Pepe Coin",
  	symbol: "PPC",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x34F79636a55d9961E47b7784eF460B021B499406"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-ppc-0x34f79636a55d9961e47b7784ef460b021b499406.png"
  },
  	"shidenEvm-ERC20-USDT-0xFFFFFFFF000000000000000000000001000007C0": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-USDT-0xFFFFFFFF000000000000000000000001000007C0",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xFFFFFFFF000000000000000000000001000007C0"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-usdt-0xffffffff000000000000000000000001000007c0.png"
  },
  	"shidenEvm-ERC20-PKEX-0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-PKEX-0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98",
  	name: "PolkaEx",
  	symbol: "PKEX",
  	decimals: 18,
  	priceId: "polkaex",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98"
  	},
  	multiChainAsset: "PKEX-PolkaEx",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-pkex-0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98.png"
  },
  	"shidenEvm-ERC20-BNB-0x332730a4f6e03d9c55829435f10360e13cfa41ff": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-BNB-0x332730a4f6e03d9c55829435f10360e13cfa41ff",
  	name: "Binance",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x332730a4f6e03d9c55829435f10360e13cfa41ff"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-bnb-0x332730a4f6e03d9c55829435f10360e13cfa41ff.png"
  },
  	"shidenEvm-ERC20-JPYC-0x735abe48e8782948a37c7765ecb76b98cde97b0f": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-JPYC-0x735abe48e8782948a37c7765ecb76b98cde97b0f",
  	name: "JPY Coin",
  	symbol: "JPYC",
  	decimals: 18,
  	priceId: "jpyc",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x735abe48e8782948a37c7765ecb76b98cde97b0f"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-jpyc-0x735abe48e8782948a37c7765ecb76b98cde97b0f.png"
  },
  	"shidenEvm-ERC20-ETH-0x765277eebeca2e31912c9946eae1021199b39c61": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-ETH-0x765277eebeca2e31912c9946eae1021199b39c61",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x765277eebeca2e31912c9946eae1021199b39c61"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-eth-0x765277eebeca2e31912c9946eae1021199b39c61.png"
  },
  	"shidenEvm-ERC20-USDC-0xfa9343c3897324496a05fc75abed6bac29f8a40f": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-USDC-0xfa9343c3897324496a05fc75abed6bac29f8a40f",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xfa9343c3897324496a05fc75abed6bac29f8a40f"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-usdc-0xfa9343c3897324496a05fc75abed6bac29f8a40f.png"
  },
  	"shidenEvm-ERC20-WSDN-0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-WSDN-0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef",
  	name: "Wrapped Shiden",
  	symbol: "WSDN",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-wsdn-0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef.png"
  },
  	"shidenEvm-ERC20-Kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-Kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358",
  	name: "Kaco Token",
  	symbol: "Kac",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xb12c13e66ade1f72f71834f2fc5082db8c091358"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358.png"
  },
  	"shidenEvm-ERC20-SMS-0xec0c789c6dc019b1c19f055edf938b369d235d2c": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-SMS-0xec0c789c6dc019b1c19f055edf938b369d235d2c",
  	name: "SafeMoonShiden",
  	symbol: "SMS",
  	decimals: 9,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xec0c789c6dc019b1c19f055edf938b369d235d2c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-sms-0xec0c789c6dc019b1c19f055edf938b369d235d2c.png"
  },
  	"shidenEvm-ERC20-STND-0x722377A047e89CA735f09Eb7CccAb780943c4CB4": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-STND-0x722377A047e89CA735f09Eb7CccAb780943c4CB4",
  	name: "Standard",
  	symbol: "STND",
  	decimals: 18,
  	priceId: "standard-protocol",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x722377A047e89CA735f09Eb7CccAb780943c4CB4"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-stnd-0x722377a047e89ca735f09eb7cccab780943c4cb4.png"
  },
  	"shidenEvm-ERC20-SRISE-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-SRISE-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9",
  	name: "SHIDENRISE",
  	symbol: "SRISE",
  	decimals: 9,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-srise-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9.png"
  },
  	"shidenEvm-ERC20-FEGS-0xa9b79AAB9d60e8e6d08D2cbAd56ff0De58ff8d41": {
  	originChain: "shidenEvm",
  	slug: "shidenEvm-ERC20-FEGS-0xa9b79AAB9d60e8e6d08D2cbAd56ff0De58ff8d41",
  	name: "FEGSHIDEN",
  	symbol: "FEGS",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xa9b79AAB9d60e8e6d08D2cbAd56ff0De58ff8d41"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/shidenevm-erc20-fegs-0xa9b79aab9d60e8e6d08d2cbad56ff0de58ff8d41.png"
  },
  	"equilibrium_parachain-LOCAL-BNB": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-BNB",
  	name: "Binance Coin",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: "binancecoin",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6450786"
  	},
  	multiChainAsset: "BNB-Binance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-bnb.png"
  },
  	"equilibrium_parachain-LOCAL-BNC": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-BNC",
  	name: "Bifrost Kusama",
  	symbol: "BNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6450787"
  	},
  	multiChainAsset: "BNC-BifrostKusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-bnc.png"
  },
  	"equilibrium_parachain-LOCAL-CRU": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-CRU",
  	name: "Crust",
  	symbol: "CRU",
  	decimals: 12,
  	priceId: "crust-network",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6517365"
  	},
  	multiChainAsset: "CRU-Crust",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-cru.png"
  },
  	"equilibrium_parachain-LOCAL-EQD": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-EQD",
  	name: "EQD",
  	symbol: "EQD",
  	decimals: 9,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6648164"
  	},
  	multiChainAsset: "EQD-EquilibriumUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-eqd.png"
  },
  	"equilibrium_parachain-LOCAL-PHA": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-PHA",
  	name: "Phala",
  	symbol: "PHA",
  	decimals: 12,
  	priceId: "pha",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "7366753"
  	},
  	multiChainAsset: "PHA-Phala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-pha.png"
  },
  	"equilibrium_parachain-LOCAL-ASTR": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-ASTR",
  	name: "Astar",
  	symbol: "ASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1634956402"
  	},
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-astr.png"
  },
  	"equilibrium_parachain-LOCAL-BUSD": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-BUSD",
  	name: "Binance USD",
  	symbol: "BUSD",
  	decimals: 18,
  	priceId: "binance-usd",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1651864420"
  	},
  	multiChainAsset: "BUSD-BinanceUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-busd.png"
  },
  	"equilibrium_parachain-LOCAL-GLMR": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-GLMR",
  	name: "Moonbeam",
  	symbol: "GLMR",
  	decimals: 18,
  	priceId: "moonbeam",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1735159154"
  	},
  	multiChainAsset: "GLMR-Moonbeam",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-glmr.png"
  },
  	"equilibrium_parachain-LOCAL-iBTC": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-iBTC",
  	name: "interBTC",
  	symbol: "iBTC",
  	decimals: 8,
  	priceId: "interbtc",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1768060003"
  	},
  	multiChainAsset: "iBTC-interBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-ibtc.png"
  },
  	"equilibrium_parachain-LOCAL-INTR": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-INTR",
  	name: "Interlay",
  	symbol: "INTR",
  	decimals: 10,
  	priceId: "interlay",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1768846450"
  	},
  	multiChainAsset: "INTR-Interlay",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-intr.png"
  },
  	"equilibrium_parachain-LOCAL-PARA": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-PARA",
  	name: "Parallel",
  	symbol: "PARA",
  	decimals: 12,
  	priceId: "parallel-finance",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1885434465"
  	},
  	multiChainAsset: "PARA-Parallel",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-para.png"
  },
  	"equilibrium_parachain-LOCAL-USDT": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-USDT",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1970496628",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 1984
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-usdt.png"
  },
  	"equilibrium_parachain-LOCAL-EQDOT": {
  	originChain: "equilibrium_parachain",
  	slug: "equilibrium_parachain-LOCAL-EQDOT",
  	name: "EQDOT",
  	symbol: "EQDOT",
  	decimals: 9,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "435694104436"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/equilibrium_parachain-local-eqdot.png"
  },
  	"boba-ERC20-BOBA-0xa18bf3994c0cc6e3b63ac420308e5383f53120d7": {
  	originChain: "boba",
  	slug: "boba-ERC20-BOBA-0xa18bf3994c0cc6e3b63ac420308e5383f53120d7",
  	name: "Boba Token",
  	symbol: "BOBA",
  	decimals: 18,
  	priceId: "boba-network",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xa18bf3994c0cc6e3b63ac420308e5383f53120d7"
  	},
  	multiChainAsset: "BOBA-BobaToken",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/boba-erc20-boba-0xa18bf3994c0cc6e3b63ac420308e5383f53120d7.png"
  },
  	"aventus-NATIVE-AVT": {
  	originChain: "aventus",
  	slug: "aventus-NATIVE-AVT",
  	name: "Aventus",
  	symbol: "AVT",
  	decimals: 18,
  	priceId: "aventus",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aventus-native-avt.png"
  },
  	"aventus_testnet-NATIVE-AVT": {
  	originChain: "aventus_testnet",
  	slug: "aventus_testnet-NATIVE-AVT",
  	name: "Aventus",
  	symbol: "AVT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aventus_testnet-native-avt.png"
  },
  	"bifrost-LOCAL-MOVR": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-MOVR",
  	name: "Moonriver Native Token",
  	symbol: "MOVR",
  	decimals: 18,
  	priceId: "moonriver",
  	minAmount: "1000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "MOVR"
  		}
  	},
  	multiChainAsset: "MOVR-Moonriver",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-movr.png"
  },
  	"bifrost-LOCAL-RMRK": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-RMRK",
  	name: "RMRK Token",
  	symbol: "RMRK",
  	decimals: 10,
  	priceId: "rmrk",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "RMRK"
  		}
  	},
  	multiChainAsset: "RMRK-RMRKApp",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-rmrk.png"
  },
  	"bifrost-LOCAL-PHA": {
  	originChain: "bifrost",
  	slug: "bifrost-LOCAL-PHA",
  	name: "Phala Native Token",
  	symbol: "PHA",
  	decimals: 12,
  	priceId: "pha",
  	minAmount: "40000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "PHA"
  		}
  	},
  	multiChainAsset: "PHA-Phala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost-local-pha.png"
  },
  	"binance-ERC20-USDC-0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
  	originChain: "binance",
  	slug: "binance-ERC20-USDC-0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  	name: "Binance-Peg USD Coin",
  	symbol: "USDC",
  	decimals: 18,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-usdc-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d.png"
  },
  	"binance-ERC20-vUSDT-0xfD5840Cd36d94D7229439859C0112a4185BC0255": {
  	originChain: "binance",
  	slug: "binance-ERC20-vUSDT-0xfD5840Cd36d94D7229439859C0112a4185BC0255",
  	name: "Venus USDT",
  	symbol: "vUSDT",
  	decimals: 8,
  	priceId: "venus-usdt",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xfD5840Cd36d94D7229439859C0112a4185BC0255"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-vusdt-0xfd5840cd36d94d7229439859c0112a4185bc0255.png"
  },
  	"binance-ERC20-vBUSD-0x95c78222B3D6e262426483D42CfA53685A67Ab9D": {
  	originChain: "binance",
  	slug: "binance-ERC20-vBUSD-0x95c78222B3D6e262426483D42CfA53685A67Ab9D",
  	name: "Venus BUSD",
  	symbol: "vBUSD",
  	decimals: 8,
  	priceId: "venus-busd",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x95c78222B3D6e262426483D42CfA53685A67Ab9D"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-vbusd-0x95c78222b3d6e262426483d42cfa53685a67ab9d.png"
  },
  	"binance-ERC20-WBNB-0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
  	originChain: "binance",
  	slug: "binance-ERC20-WBNB-0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  	name: "Wrapped BNB",
  	symbol: "WBNB",
  	decimals: 18,
  	priceId: "wbnb",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-wbnb-0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"
  },
  	"binance-ERC20-ETH-0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
  	originChain: "binance",
  	slug: "binance-ERC20-ETH-0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  	name: "Binance-Peg Ethereum Token",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
  	},
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-eth-0x2170ed0880ac9a755fd29b2688956bd959f933f8.png"
  },
  	"binance-ERC20-Cake-0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82": {
  	originChain: "binance",
  	slug: "binance-ERC20-Cake-0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  	name: "PancakeSwap Token",
  	symbol: "Cake",
  	decimals: 18,
  	priceId: "pancakeswap-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-cake-0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png"
  },
  	"binance-ERC20-BTCB-0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
  	originChain: "binance",
  	slug: "binance-ERC20-BTCB-0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  	name: "Binance-Peg BTCB Token",
  	symbol: "BTCB",
  	decimals: 18,
  	priceId: "binance-bitcoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-btcb-0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png"
  },
  	"binance-ERC20-ADA-0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47": {
  	originChain: "binance",
  	slug: "binance-ERC20-ADA-0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
  	name: "Binance-Peg Cardano Token",
  	symbol: "ADA",
  	decimals: 18,
  	priceId: "binance-peg-cardano",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-ada-0x3ee2200efb3400fabb9aacf31297cbdd1d435d47.png"
  },
  	"binance-ERC20-XRP-0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE": {
  	originChain: "binance",
  	slug: "binance-ERC20-XRP-0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
  	name: "Binance-Peg XRP Token",
  	symbol: "XRP",
  	decimals: 18,
  	priceId: "binance-peg-xrp",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-xrp-0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe.png"
  },
  	"binance-ERC20-DOT-0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402": {
  	originChain: "binance",
  	slug: "binance-ERC20-DOT-0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
  	name: "Binance-Peg Polkadot Token",
  	symbol: "DOT",
  	decimals: 18,
  	priceId: "binance-peg-polkadot",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-dot-0x7083609fce4d1d8dc0c979aab8c869ea2c873402.png"
  },
  	"binance-ERC20-USDT-0x55d398326f99059fF775485246999027B3197955": {
  	originChain: "binance",
  	slug: "binance-ERC20-USDT-0x55d398326f99059fF775485246999027B3197955",
  	name: "Binance-Peg BSC-USD",
  	symbol: "USDT",
  	decimals: 18,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x55d398326f99059fF775485246999027B3197955"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-usdt-0x55d398326f99059ff775485246999027b3197955.png"
  },
  	"ethereum-ERC20-USDT-0xdAC17F958D2ee523a2206206994597C13D831ec7": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-USDT-0xdAC17F958D2ee523a2206206994597C13D831ec7",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-usdt-0xdac17f958d2ee523a2206206994597c13d831ec7.png"
  },
  	"ethereum-ERC20-BNB-0xB8c77482e45F1F44dE1745F52C74426C631bDD52": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-BNB-0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  	name: "BNB",
  	symbol: "BNB",
  	decimals: 18,
  	priceId: "binancecoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
  	},
  	multiChainAsset: "BNB-Binance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-bnb-0xb8c77482e45f1f44de1745f52c74426c631bdd52.png"
  },
  	"ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-USDC-0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
  },
  	"ethereum-ERC20-VERSE-0x249cA82617eC3DfB2589c4c17ab7EC9765350a18": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-VERSE-0x249cA82617eC3DfB2589c4c17ab7EC9765350a18",
  	name: "Verse token",
  	symbol: "VERSE",
  	decimals: 18,
  	priceId: "verse-bitcoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x249cA82617eC3DfB2589c4c17ab7EC9765350a18"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-verse-0x249ca82617ec3dfb2589c4c17ab7ec9765350a18.png"
  },
  	"ethereum-ERC20-BUSD-0x4Fabb145d64652a948d72533023f6E7A623C7C53": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-BUSD-0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  	name: "Binance USD",
  	symbol: "BUSD",
  	decimals: 18,
  	priceId: "binance-usd",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
  	},
  	multiChainAsset: "BUSD-BinanceUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-busd-0x4fabb145d64652a948d72533023f6e7a623c7c53.png"
  },
  	"ethereum-ERC20-LDO-0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-LDO-0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
  	name: "Lido DAO Token",
  	symbol: "LDO",
  	decimals: 18,
  	priceId: "lido-dao",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ldo-0x5a98fcbea516cf06857215779fd812ca3bef1b32.png"
  },
  	"ethereum-ERC20-wstETH-0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-wstETH-0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
  	name: "Wrapped liquid staked Ether 2.0",
  	symbol: "wstETH",
  	decimals: 18,
  	priceId: "wrapped-steth",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-wsteth-0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0.png"
  },
  	"ethereum-ERC20-stETH-0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-stETH-0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
  	name: "Lido Staked Ether",
  	symbol: "stETH",
  	decimals: 18,
  	priceId: "staked-ether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-steth-0xae7ab96520de3a18e5e111b5eaab095312d7fe84.png"
  },
  	"ethereum-ERC20-THETA-0x3883f5e181fccaF8410FA61e12b59BAd963fb645": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-THETA-0x3883f5e181fccaF8410FA61e12b59BAd963fb645",
  	name: "Theta Token",
  	symbol: "THETA",
  	decimals: 18,
  	priceId: "theta-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3883f5e181fccaF8410FA61e12b59BAd963fb645"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-theta-0x3883f5e181fccaf8410fa61e12b59bad963fb645.png"
  },
  	"ethereum-ERC20-NEAR-0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-NEAR-0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4",
  	name: "NEAR",
  	symbol: "NEAR",
  	decimals: 24,
  	priceId: "near",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-near-0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4.png"
  },
  	"ethereum-ERC20-APE-0x4d224452801ACEd8B2F0aebE155379bb5D594381": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-APE-0x4d224452801ACEd8B2F0aebE155379bb5D594381",
  	name: "ApeCoin",
  	symbol: "APE",
  	decimals: 18,
  	priceId: "apecoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4d224452801ACEd8B2F0aebE155379bb5D594381"
  	},
  	multiChainAsset: "APE-ApeCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ape-0x4d224452801aced8b2f0aebe155379bb5d594381.png"
  },
  	"ethereum-ERC20-LINK-0x514910771AF9Ca656af840dff83E8264EcF986CA": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-LINK-0x514910771AF9Ca656af840dff83E8264EcF986CA",
  	name: "ChainLink Token",
  	symbol: "LINK",
  	decimals: 18,
  	priceId: "chainlink",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-link-0x514910771af9ca656af840dff83e8264ecf986ca.png"
  },
  	"ethereum-ERC20-DAI-0x6B175474E89094C44Da98b954EedeAC495271d0F": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-DAI-0x6B175474E89094C44Da98b954EedeAC495271d0F",
  	name: "Dai Stablecoin",
  	symbol: "DAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-dai-0x6b175474e89094c44da98b954eedeac495271d0f.png"
  },
  	"ethereum-ERC20-BAT-0x0D8775F648430679A709E98d2b0Cb6250d2887EF": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-BAT-0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
  	name: "Basic Attention",
  	symbol: "BAT",
  	decimals: 18,
  	priceId: "basic-attention-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-bat-0x0d8775f648430679a709e98d2b0cb6250d2887ef.png"
  },
  	"ethereum-ERC20-CRO-0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-CRO-0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
  	name: "Cronos Coin",
  	symbol: "CRO",
  	decimals: 8,
  	priceId: "crypto-com-chain",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-cro-0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b.png"
  },
  	"ethereum-ERC20-COMP-0xc00e94Cb662C3520282E6f5717214004A7f26888": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-COMP-0xc00e94Cb662C3520282E6f5717214004A7f26888",
  	name: "Compound",
  	symbol: "COMP",
  	decimals: 18,
  	priceId: "compound-governance-token",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xc00e94Cb662C3520282E6f5717214004A7f26888"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-comp-0xc00e94cb662c3520282e6f5717214004a7f26888.png"
  },
  	"ethereum-ERC20-ENJ-0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-ENJ-0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c",
  	name: "Enjin Coin",
  	symbol: "ENJ",
  	decimals: 18,
  	priceId: "enjincoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-enj-0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png"
  },
  	"ethereum-ERC20-SAND-0x3845badAde8e6dFF049820680d1F14bD3903a5d0": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-SAND-0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
  	name: "The Sandbox",
  	symbol: "SAND",
  	decimals: 18,
  	priceId: "the-sandbox",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-sand-0x3845badade8e6dff049820680d1f14bd3903a5d0.png"
  },
  	"ethereum-ERC20-GALA-0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-GALA-0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA",
  	name: "GALA",
  	symbol: "GALA",
  	decimals: 8,
  	priceId: "gala",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-gala-0x15d4c048f83bd7e37d49ea4c83a07267ec4203da.png"
  },
  	"ethereum-ERC20-CHZ-0x3506424F91fD33084466F402d5D97f05F8e3b4AF": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-CHZ-0x3506424F91fD33084466F402d5D97f05F8e3b4AF",
  	name: "Chiliz",
  	symbol: "CHZ",
  	decimals: 18,
  	priceId: "chiliz",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3506424F91fD33084466F402d5D97f05F8e3b4AF"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-chz-0x3506424f91fd33084466f402d5d97f05f8e3b4af.png"
  },
  	"ethereum-ERC20-1INCH-0x111111111117dC0aa78b770fA6A738034120C302": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-1INCH-0x111111111117dC0aa78b770fA6A738034120C302",
  	name: "1INCH Token",
  	symbol: "1INCH",
  	decimals: 18,
  	priceId: "1inch",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x111111111117dC0aa78b770fA6A738034120C302"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-1inch-0x111111111117dc0aa78b770fa6a738034120c302.png"
  },
  	"ethereum-ERC20-FTM-0x4E15361FD6b4BB609Fa63C81A2be19d873717870": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-FTM-0x4E15361FD6b4BB609Fa63C81A2be19d873717870",
  	name: "Fantom Token",
  	symbol: "FTM",
  	decimals: 18,
  	priceId: "fantom",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4E15361FD6b4BB609Fa63C81A2be19d873717870"
  	},
  	multiChainAsset: "FTM-Fantom",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ftm-0x4e15361fd6b4bb609fa63c81a2be19d873717870.png"
  },
  	"ethereum-ERC20-MKR-0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-MKR-0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  	name: "Maker",
  	symbol: "MKR",
  	decimals: 18,
  	priceId: "maker",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-mkr-0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png"
  },
  	"ethereum-ERC20-KNC-0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-KNC-0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202",
  	name: "Kyber Network Crystal",
  	symbol: "KNC",
  	decimals: 18,
  	priceId: "kyber-network-crystal",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-knc-0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202.png"
  },
  	"ethereum-ERC20-WBTC-0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-WBTC-0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  	name: "Wrapped BTC",
  	symbol: "WBTC",
  	decimals: 8,
  	priceId: "wrapped-bitcoin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  	},
  	multiChainAsset: "WBTC-WrappedBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-wbtc-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"
  },
  	"ethereum-ERC20-ENS-0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-ENS-0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72",
  	name: "Ethereum Name Service",
  	symbol: "ENS",
  	decimals: 18,
  	priceId: "ethereum-name-service",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-ens-0xc18360217d8f7ab5e7c516566761ea12ce7f9d72.png"
  },
  	"ethereum-ERC20-UNI-0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-UNI-0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  	name: "Uniswap",
  	symbol: "UNI",
  	decimals: 18,
  	priceId: "uniswap",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-uni-0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png"
  },
  	"ethereum-ERC20-MATIC-0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-MATIC-0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  	name: "Matic Token",
  	symbol: "MATIC",
  	decimals: 18,
  	priceId: "matic-network",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-matic-0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
  },
  	"ethereum-ERC20-SHIB-0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-SHIB-0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  	name: "SHIBA INU",
  	symbol: "SHIB",
  	decimals: 18,
  	priceId: "shiba-inu",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-shib-0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.png"
  },
  	"moonbeam-ERC20-TFA-0xE065ffaf3f7dED69BB5cf5FDd1Fd1dDA2EEe8493": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-TFA-0xE065ffaf3f7dED69BB5cf5FDd1Fd1dDA2EEe8493",
  	name: "Take Flight Alpha DAO",
  	symbol: "TFA",
  	decimals: 18,
  	priceId: "take-flight-alpha-dao",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xE065ffaf3f7dED69BB5cf5FDd1Fd1dDA2EEe8493"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-tfa-0xe065ffaf3f7ded69bb5cf5fdd1fd1dda2eee8493.png"
  },
  	"moonbeam-ERC721-MFMP-0x6758053c0b27E478edE1E4882adFF708Fc4FA72D": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-MFMP-0x6758053c0b27E478edE1E4882adFF708Fc4FA72D",
  	name: "MoonFit Mint Pass",
  	symbol: "MFMP",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x6758053c0b27E478edE1E4882adFF708Fc4FA72D"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mfmp-0x6758053c0b27e478ede1e4882adff708fc4fa72d.png"
  },
  	"moonbeam-ERC721-MM-0xCc1A7573C8f10d0df7Ee4d57cc958C8Df4a5Aca9": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-MM-0xCc1A7573C8f10d0df7Ee4d57cc958C8Df4a5Aca9",
  	name: "Moon Monkeys",
  	symbol: "MM",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xCc1A7573C8f10d0df7Ee4d57cc958C8Df4a5Aca9"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mm-0xcc1a7573c8f10d0df7ee4d57cc958c8df4a5aca9.png"
  },
  	"moonbeam-ERC721-MDAO-0xc6342EAB8B7cC405Fc35ebA7F7401fc400aC0709": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-MDAO-0xc6342EAB8B7cC405Fc35ebA7F7401fc400aC0709",
  	name: "MoonDAONFT",
  	symbol: "MDAO",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xc6342EAB8B7cC405Fc35ebA7F7401fc400aC0709"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mdao-0xc6342eab8b7cc405fc35eba7f7401fc400ac0709.png"
  },
  	"moonbeam-ERC721-GLMA-0x8fbe243d898e7c88a6724bb9eb13d746614d23d6": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-GLMA-0x8fbe243d898e7c88a6724bb9eb13d746614d23d6",
  	name: "GlimmerApes",
  	symbol: "GLMA",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x8fbe243d898e7c88a6724bb9eb13d746614d23d6"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-glma-0x8fbe243d898e7c88a6724bb9eb13d746614d23d6.png"
  },
  	"moonbeam-ERC721-GLMJ-0xcB13945Ca8104f813992e4315F8fFeFE64ac49cA": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-GLMJ-0xcB13945Ca8104f813992e4315F8fFeFE64ac49cA",
  	name: "GlimmerJungle",
  	symbol: "GLMJ",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xcB13945Ca8104f813992e4315F8fFeFE64ac49cA"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-glmj-0xcb13945ca8104f813992e4315f8ffefe64ac49ca.png"
  },
  	"moonbeam-ERC721-PUNK-0xFD86D63748a6390E4a80739e776463088811774D": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-PUNK-0xFD86D63748a6390E4a80739e776463088811774D",
  	name: "Moonbeam Punks",
  	symbol: "PUNK",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xFD86D63748a6390E4a80739e776463088811774D"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-punk-0xfd86d63748a6390e4a80739e776463088811774d.png"
  },
  	"moonbeam-ERC721-GPUNKS-0x25714FcBc4bE731B95AE86483EF97ef6C3deB5Ce": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-GPUNKS-0x25714FcBc4bE731B95AE86483EF97ef6C3deB5Ce",
  	name: "GlmrPunks",
  	symbol: "GPUNKS",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x25714FcBc4bE731B95AE86483EF97ef6C3deB5Ce"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-gpunks-0x25714fcbc4be731b95ae86483ef97ef6c3deb5ce.png"
  },
  	"moonbeam-ERC721-GlmrZuki-0xC36D971c11CEbbCc20eE2C2910e07e2b1Be3790d": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-GlmrZuki-0xC36D971c11CEbbCc20eE2C2910e07e2b1Be3790d",
  	name: "MoonbeamZuki",
  	symbol: "GlmrZuki",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xC36D971c11CEbbCc20eE2C2910e07e2b1Be3790d"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-glmrzuki-0xc36d971c11cebbcc20ee2c2910e07e2b1be3790d.png"
  },
  	"moonbeam-ERC721-GKC-0x62E413D4b097b474999CF33d336cD74881084ba5": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-GKC-0x62E413D4b097b474999CF33d336cD74881084ba5",
  	name: "GlimmerKongsClub",
  	symbol: "GKC",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x62E413D4b097b474999CF33d336cD74881084ba5"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-gkc-0x62e413d4b097b474999cf33d336cd74881084ba5.png"
  },
  	"moonbeam-ERC721-MBNS-0x9576167Eb03141F041ccAf57D4D0bd40Abb2b583": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-MBNS-0x9576167Eb03141F041ccAf57D4D0bd40Abb2b583",
  	name: "Moonbeam Name Service (.moon)",
  	symbol: "MBNS",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x9576167Eb03141F041ccAf57D4D0bd40Abb2b583"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-mbns-0x9576167eb03141f041ccaf57d4d0bd40abb2b583.png"
  },
  	"moonbeam-ERC721-ANFT-0xcf82ddcca84d0e419bccd7a540e807c114250ded": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-ANFT-0xcf82ddcca84d0e419bccd7a540e807c114250ded",
  	name: "AthosNFT",
  	symbol: "ANFT",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xcf82ddcca84d0e419bccd7a540e807c114250ded"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-anft-0xcf82ddcca84d0e419bccd7a540e807c114250ded.png"
  },
  	"moonriver-ERC721-ZOOMBIE-0x08716e418e68564C96b68192E985762740728018": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC721-ZOOMBIE-0x08716e418e68564C96b68192E985762740728018",
  	name: "Zoombies",
  	symbol: "ZOOMBIE",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x08716e418e68564C96b68192E985762740728018"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc721-zoombie-0x08716e418e68564c96b68192e985762740728018.png"
  },
  	"moonriver-ERC721-NFTQ-0x79c8C73F85ec794f570aa7B768568a7fEdB294f8": {
  	originChain: "moonriver",
  	slug: "moonriver-ERC721-NFTQ-0x79c8C73F85ec794f570aa7B768568a7fEdB294f8",
  	name: "Moonriver NFT Quest",
  	symbol: "NFTQ",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x79c8C73F85ec794f570aa7B768568a7fEdB294f8"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonriver-erc721-nftq-0x79c8c73f85ec794f570aa7b768568a7fedb294f8.png"
  },
  	"astarEvm-ERC721-GHOST-0xb4bd85893d6f66869d7766ace1b1eb4d867d963e": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC721-GHOST-0xb4bd85893d6f66869d7766ace1b1eb4d867d963e",
  	name: "AstarGhost",
  	symbol: "GHOST",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xb4bd85893d6f66869d7766ace1b1eb4d867d963e"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-ghost-0xb4bd85893d6f66869d7766ace1b1eb4d867d963e.png"
  },
  	"astar-PSP34-Neurolauncher-bYLgJmSkWd4S4pTEacF2sNBWFeM4bNerS27FgNVcC9SqRE4": {
  	originChain: "astar",
  	slug: "astar-PSP34-Neurolauncher-bYLgJmSkWd4S4pTEacF2sNBWFeM4bNerS27FgNVcC9SqRE4",
  	name: "Neurolauncher",
  	symbol: "NRL",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "PSP34",
  	metadata: {
  		contractAddress: "bYLgJmSkWd4S4pTEacF2sNBWFeM4bNerS27FgNVcC9SqRE4"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-neurolauncher-bylgjmskwd4s4pteacf2snbwfem4bners27fgnvcc9sqre4.png"
  },
  	"astarEvm-ERC721-AP-0x1b57C69838cDbC59c8236DDa73287a4780B4831F": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC721-AP-0x1b57C69838cDbC59c8236DDa73287a4780B4831F",
  	name: "Astar Punks",
  	symbol: "AP",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x1b57C69838cDbC59c8236DDa73287a4780B4831F"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-ap-0x1b57c69838cdbc59c8236dda73287a4780b4831f.png"
  },
  	"astarEvm-ERC721-DEGEN-0xd59fc6bfd9732ab19b03664a45dc29b8421bda9a": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC721-DEGEN-0xd59fc6bfd9732ab19b03664a45dc29b8421bda9a",
  	name: "AstarDegens",
  	symbol: "DEGEN",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xd59fc6bfd9732ab19b03664a45dc29b8421bda9a"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-degen-0xd59fc6bfd9732ab19b03664a45dc29b8421bda9a.png"
  },
  	"astarEvm-ERC721-ANAUT-0xf008371a7EeD0AB54FDd975fE0d0f66fEFBA3415": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC721-ANAUT-0xf008371a7EeD0AB54FDd975fE0d0f66fEFBA3415",
  	name: "Astarnaut",
  	symbol: "ANAUT",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0xf008371a7EeD0AB54FDd975fE0d0f66fEFBA3415"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-anaut-0xf008371a7eed0ab54fdd975fe0d0f66fefba3415.png"
  },
  	"astarEvm-ERC721-CAT-0x8b5d62f396Ca3C6cF19803234685e693733f9779": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC721-CAT-0x8b5d62f396Ca3C6cF19803234685e693733f9779",
  	name: "AstarCats",
  	symbol: "CAT",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x8b5d62f396Ca3C6cF19803234685e693733f9779"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc721-cat-0x8b5d62f396ca3c6cf19803234685e693733f9779.png"
  },
  	"moonbeam-ERC721-EXRP-0x515e20e6275ceefe19221fc53e77e38cc32b80fb": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-EXRP-0x515e20e6275ceefe19221fc53e77e38cc32b80fb",
  	name: "Exiled Racers Pilot",
  	symbol: "EXRP",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x515e20e6275ceefe19221fc53e77e38cc32b80fb"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-exrp-0x515e20e6275ceefe19221fc53e77e38cc32b80fb.png"
  },
  	"moonbeam-ERC721-MOONPETS-0x2159762693C629C5A44Fc9baFD484f8B96713467": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC721-MOONPETS-0x2159762693C629C5A44Fc9baFD484f8B96713467",
  	name: "MOONPETS",
  	symbol: "MOONPETS",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "ERC721",
  	metadata: {
  		contractAddress: "0x2159762693C629C5A44Fc9baFD484f8B96713467"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc721-moonpets-0x2159762693c629c5a44fc9bafd484f8b96713467.png"
  },
  	"vara_network-NATIVE-VARA": {
  	originChain: "vara_network",
  	slug: "vara_network-NATIVE-VARA",
  	name: "Vara",
  	symbol: "VARA",
  	decimals: 12,
  	priceId: "vara-network",
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/vara_network-native-vara.png"
  },
  	"polygon-ERC20-USDT-0xc2132D05D31c914a87C6611C10748AEb04B58e8F": {
  	originChain: "polygon",
  	slug: "polygon-ERC20-USDT-0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-erc20-usdt-0xc2132d05d31c914a87c6611c10748aeb04b58e8f.png"
  },
  	"arbitrum_one-ERC20-USDT-0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": {
  	originChain: "arbitrum_one",
  	slug: "arbitrum_one-ERC20-USDT-0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-usdt-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.png"
  },
  	"optimism-ERC20-USDT-0x94b008aA00579c1307B0EF2c499aD98a8ce58e58": {
  	originChain: "optimism",
  	slug: "optimism-ERC20-USDT-0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-erc20-usdt-0x94b008aa00579c1307b0ef2c499ad98a8ce58e58.png"
  },
  	"tomochain-ERC20-USDT-0x381B31409e4D220919B2cFF012ED94d70135A59e": {
  	originChain: "tomochain",
  	slug: "tomochain-ERC20-USDT-0x381B31409e4D220919B2cFF012ED94d70135A59e",
  	name: "Tether USD",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x381B31409e4D220919B2cFF012ED94d70135A59e"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tomochain-erc20-usdt-0x381b31409e4d220919b2cff012ed94d70135a59e.png"
  },
  	"polygon-ERC20-USDC.e-0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174": {
  	originChain: "polygon",
  	slug: "polygon-ERC20-USDC.e-0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  	name: "USD Coin (PoS)",
  	symbol: "USDC.e",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-erc20-usdc.e-0x2791bca1f2de4661ed88a30c99a7a9449aa84174.png"
  },
  	"polygon-ERC20-USDC-0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359": {
  	originChain: "polygon",
  	slug: "polygon-ERC20-USDC-0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polygon-erc20-usdc-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359.png"
  },
  	"arbitrum_one-ERC20-USDC-0xaf88d065e77c8cC2239327C5EDb3A432268e5831": {
  	originChain: "arbitrum_one",
  	slug: "arbitrum_one-ERC20-USDC-0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-usdc-0xaf88d065e77c8cc2239327c5edb3a432268e5831.png"
  },
  	"optimism-ERC20-USDC-0x7F5c764cBc14f9669B88837ca1490cCa17c31607": {
  	originChain: "optimism",
  	slug: "optimism-ERC20-USDC-0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/optimism-erc20-usdc-0x7f5c764cbc14f9669b88837ca1490cca17c31607.png"
  },
  	"tomochain-ERC20-USDC-0xCCA4E6302510d555B654B3EaB9c0fCB223BCFDf0": {
  	originChain: "tomochain",
  	slug: "tomochain-ERC20-USDC-0xCCA4E6302510d555B654B3EaB9c0fCB223BCFDf0",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xCCA4E6302510d555B654B3EaB9c0fCB223BCFDf0"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tomochain-erc20-usdc-0xcca4e6302510d555b654b3eab9c0fcb223bcfdf0.png"
  },
  	"astar-PSP34-SERPENATORS-WCX5y1WsgPBxQqtn75jXNtHey9w4EZSEKCdjg2jX3gcA97D": {
  	originChain: "astar",
  	slug: "astar-PSP34-SERPENATORS-WCX5y1WsgPBxQqtn75jXNtHey9w4EZSEKCdjg2jX3gcA97D",
  	name: "AI SERPENATORS",
  	symbol: "SERPENATORS",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "PSP34",
  	metadata: {
  		contractAddress: "WCX5y1WsgPBxQqtn75jXNtHey9w4EZSEKCdjg2jX3gcA97D"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-serpenators-wcx5y1wsgpbxqqtn75jxnthey9w4ezsekcdjg2jx3gca97d.png"
  },
  	"astar-PSP34-USAGII-WvyVtR9Ktvxa9fRRFJPXvEgYTU5K5Lf491xzFhMQL3haDN6": {
  	originChain: "astar",
  	slug: "astar-PSP34-USAGII-WvyVtR9Ktvxa9fRRFJPXvEgYTU5K5Lf491xzFhMQL3haDN6",
  	name: "USAGII",
  	symbol: "USAGII",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "PSP34",
  	metadata: {
  		contractAddress: "WvyVtR9Ktvxa9fRRFJPXvEgYTU5K5Lf491xzFhMQL3haDN6"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-usagii-wvyvtr9ktvxa9frrfjpxvegytu5k5lf491xzfhmql3hadn6.png"
  },
  	"kate-NATIVE-AVL": {
  	originChain: "kate",
  	slug: "kate-NATIVE-AVL",
  	name: "AVL",
  	symbol: "AVL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kate-native-avl.png"
  },
  	"aleph-PSP22-INW-5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST": {
  	originChain: "aleph",
  	slug: "aleph-PSP22-INW-5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST",
  	name: "Ink Whale",
  	symbol: "INW",
  	decimals: 12,
  	priceId: null,
  	minAmount: null,
  	assetType: "PSP22",
  	metadata: {
  		contractAddress: "5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-psp22-inw-5h4acwlkupvpct6xgjzdgppxfocknkqu2juvnguw6bxepzst.png"
  },
  	"bridgeHubPolkadot-NATIVE-DOT": {
  	originChain: "bridgeHubPolkadot",
  	slug: "bridgeHubPolkadot-NATIVE-DOT",
  	name: "DOT",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bridgehubpolkadot-native-dot.png"
  },
  	"bridgeHubKusama-NATIVE-KSM": {
  	originChain: "bridgeHubKusama",
  	slug: "bridgeHubKusama-NATIVE-KSM",
  	name: "KSM",
  	symbol: "KSM",
  	decimals: 12,
  	priceId: "kusama",
  	minAmount: "33333333",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "KSM-Kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bridgehubkusama-native-ksm.png"
  },
  	"bifrost_dot-LOCAL-vFIL": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-vFIL",
  	name: "Voucher FIL",
  	symbol: "vFIL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken2: "4"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vfil.png"
  },
  	"ethereum-ERC20-vETH-0x4Bc3263Eb5bb2Ef7Ad9aB6FB68be80E43b43801F": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-vETH-0x4Bc3263Eb5bb2Ef7Ad9aB6FB68be80E43b43801F",
  	name: "Voucher Ethereum 2.0",
  	symbol: "vETH",
  	decimals: 18,
  	priceId: "voucher-ethereum-2-0",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x4Bc3263Eb5bb2Ef7Ad9aB6FB68be80E43b43801F"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-veth-0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f.png"
  },
  	"kintsugi-LOCAL-LP_KSM_KINT": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-LP_KSM_KINT",
  	name: "LP KSM-KINT",
  	symbol: "LP KSM-KINT",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LpToken: [
  				{
  					Token: "KSM"
  				},
  				{
  					Token: "KINT"
  				}
  			]
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-lp_ksm_kint.png"
  },
  	"kintsugi-LOCAL-LP_KSM_kBTC": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-LP_KSM_kBTC",
  	name: "LP KSM-kBTC",
  	symbol: "LP KSM-kBTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LpToken: [
  				{
  					Token: "KSM"
  				},
  				{
  					Token: "KBTC"
  				}
  			]
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-lp_ksm_kbtc.png"
  },
  	"kintsugi-LOCAL-LP_kBTC_USDT": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-LP_kBTC_USDT",
  	name: "LP kBTC-USDT",
  	symbol: "LP kBTC-USDT",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LpToken: [
  				{
  					Token: "kBTC"
  				},
  				{
  					ForeignAsset: 3
  				}
  			]
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-lp_kbtc_usdt.png"
  },
  	"fantom-NATIVE-FTM": {
  	originChain: "fantom",
  	slug: "fantom-NATIVE-FTM",
  	name: "Fantom",
  	symbol: "FTM",
  	decimals: 18,
  	priceId: "fantom",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "FTM-Fantom",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/fantom-native-ftm.png"
  },
  	"fantom_testnet-NATIVE-FTM": {
  	originChain: "fantom_testnet",
  	slug: "fantom_testnet-NATIVE-FTM",
  	name: "Fantom",
  	symbol: "FTM",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/fantom_testnet-native-ftm.png"
  },
  	"binance-ERC20-FTM-0xAD29AbB318791D579433D831ed122aFeAf29dcfe": {
  	originChain: "binance",
  	slug: "binance-ERC20-FTM-0xAD29AbB318791D579433D831ed122aFeAf29dcfe",
  	name: "Fantom",
  	symbol: "FTM",
  	decimals: 18,
  	priceId: "fantom",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xAD29AbB318791D579433D831ed122aFeAf29dcfe"
  	},
  	multiChainAsset: "FTM-Fantom",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-ftm-0xad29abb318791d579433d831ed122afeaf29dcfe.png"
  },
  	"interlay-LOCAL-LP_DOT_iBTC": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-LP_DOT_iBTC",
  	name: "LP DOT-iBTC",
  	symbol: "LP DOT-iBTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LpToken: [
  				{
  					Token: "DOT"
  				},
  				{
  					Token: "iBTC"
  				}
  			]
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-lp_dot_ibtc.png"
  },
  	"interlay-LOCAL-LP_iBTC_USDT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-LP_iBTC_USDT",
  	name: "LP iBTC-USDT",
  	symbol: "LP iBTC-USDT",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LpToken: [
  				{
  					Token: "iBTC"
  				},
  				{
  					ForeignAsset: 2
  				}
  			]
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-lp_ibtc_usdt.png"
  },
  	"interlay-LOCAL-LP_INTR_USDT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-LP_INTR_USDT",
  	name: "LP INTR-USDT",
  	symbol: "LP INTR-USDT",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LpToken: [
  				{
  					Token: "INTR"
  				},
  				{
  					ForeignAsset: 2
  				}
  			]
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-lp_intr_usdt.png"
  },
  	"interlay-LOCAL-qIBTC": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-qIBTC",
  	name: "qIBTC",
  	symbol: "qIBTC",
  	decimals: 8,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LendToken: 1
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-qibtc.png"
  },
  	"interlay-LOCAL-qDOT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-qDOT",
  	name: "qDOT",
  	symbol: "qDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LendToken: 2
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-qdot.png"
  },
  	"interlay-LOCAL-qUSDT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-qUSDT",
  	name: "qUSDT",
  	symbol: "qUSDT",
  	decimals: 6,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LendToken: 3
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-qusdt.png"
  },
  	"kintsugi-LOCAL-qKBTC": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-qKBTC",
  	name: "qKBTC",
  	symbol: "qKBTC",
  	decimals: 8,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LendToken: 1
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-qkbtc.png"
  },
  	"kintsugi-LOCAL-qKSM": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-qKSM",
  	name: "qKSM",
  	symbol: "qKSM",
  	decimals: 12,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LendToken: 2
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-qksm.png"
  },
  	"kintsugi-LOCAL-qUSDT": {
  	originChain: "kintsugi",
  	slug: "kintsugi-LOCAL-qUSDT",
  	name: "qUSDT",
  	symbol: "qUSDT",
  	decimals: 6,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			LendToken: 3
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/kintsugi-local-qusdt.png"
  },
  	"krest_network-NATIVE-KREST": {
  	originChain: "krest_network",
  	slug: "krest_network-NATIVE-KREST",
  	name: "Krest",
  	symbol: "KREST",
  	decimals: 18,
  	priceId: "krest",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/krest_network-native-krest.png"
  },
  	"aleph-PSP22-PANX-5GSGAcvqpF5SuH2MhJ1YUdbLAbssCjeqCn2miMUCWUjnr5DQ": {
  	originChain: "aleph",
  	slug: "aleph-PSP22-PANX-5GSGAcvqpF5SuH2MhJ1YUdbLAbssCjeqCn2miMUCWUjnr5DQ",
  	name: "Panorama Swap Token",
  	symbol: "PANX",
  	decimals: 12,
  	priceId: "panorama-swap-token",
  	minAmount: "0",
  	assetType: "PSP22",
  	metadata: {
  		contractAddress: "5GSGAcvqpF5SuH2MhJ1YUdbLAbssCjeqCn2miMUCWUjnr5DQ"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-psp22-panx-5gsgacvqpf5suh2mhj1yudblabsscjeqcn2mimucwujnr5dq.png"
  },
  	"deeper_network-NATIVE-DPR": {
  	originChain: "deeper_network",
  	slug: "deeper_network-NATIVE-DPR",
  	name: "Deeper Network",
  	symbol: "DPR",
  	decimals: 18,
  	priceId: "deeper-network",
  	minAmount: "200000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "DPR-DeeperNetwork",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/deeper_network-native-dpr.png"
  },
  	"ethereum-ERC20-DPR-0xf3AE5d769e153Ef72b4e3591aC004E89F48107a1": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-DPR-0xf3AE5d769e153Ef72b4e3591aC004E89F48107a1",
  	name: "Deeper",
  	symbol: "DPR",
  	decimals: 18,
  	priceId: "deeper-network",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xf3AE5d769e153Ef72b4e3591aC004E89F48107a1"
  	},
  	multiChainAsset: "DPR-DeeperNetwork",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-dpr-0xf3ae5d769e153ef72b4e3591ac004e89f48107a1.png"
  },
  	"jur_network-NATIVE-JUR": {
  	originChain: "jur_network",
  	slug: "jur_network-NATIVE-JUR",
  	name: "Jur",
  	symbol: "JUR",
  	decimals: 18,
  	priceId: "jur",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/jur_network-native-jur.png"
  },
  	"aleph-PSP34-AzeroDomain-5CTQBfBC9SfdrCDBJdfLiyW2pg9z5W6C6Es8sK313BLnFgDf": {
  	originChain: "aleph",
  	slug: "aleph-PSP34-AzeroDomain-5CTQBfBC9SfdrCDBJdfLiyW2pg9z5W6C6Es8sK313BLnFgDf",
  	name: "AZERO.ID Domains",
  	symbol: "AZEROID",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "PSP34",
  	metadata: {
  		contractAddress: "5CTQBfBC9SfdrCDBJdfLiyW2pg9z5W6C6Es8sK313BLnFgDf"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/aleph-psp34-azerodomain-5ctqbfbc9sfdrcdbjdfliyw2pg9z5w6c6es8sk313blnfgdf.png"
  },
  	"ethereum-ERC20-USDD-0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6": {
  	originChain: "ethereum",
  	slug: "ethereum-ERC20-USDD-0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6",
  	name: "Decentralized USD",
  	symbol: "USDD",
  	decimals: 18,
  	priceId: "usdd",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6"
  	},
  	multiChainAsset: "USDD-DecentralizedUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum-erc20-usdd-0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6.png"
  },
  	"binance-ERC20-USDD-0xd17479997F34dd9156Deef8F95A52D81D265be9c": {
  	originChain: "binance",
  	slug: "binance-ERC20-USDD-0xd17479997F34dd9156Deef8F95A52D81D265be9c",
  	name: "Decentralized USD",
  	symbol: "USDD",
  	decimals: 18,
  	priceId: "usdd",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xd17479997F34dd9156Deef8F95A52D81D265be9c"
  	},
  	multiChainAsset: "USDD-DecentralizedUSD",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/binance-erc20-usdd-0xd17479997f34dd9156deef8f95a52d81d265be9c.png"
  },
  	"base_mainnet-NATIVE-ETH": {
  	originChain: "base_mainnet",
  	slug: "base_mainnet-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/base_mainnet-native-eth.png"
  },
  	"avalanche_c-NATIVE-AVAX": {
  	originChain: "avalanche_c",
  	slug: "avalanche_c-NATIVE-AVAX",
  	name: "Avalanche",
  	symbol: "AVAX",
  	decimals: 18,
  	priceId: "avalanche-2",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/avalanche_c-native-avax.png"
  },
  	"crust_mainnet-NATIVE-CRU": {
  	originChain: "crust_mainnet",
  	slug: "crust_mainnet-NATIVE-CRU",
  	name: "Crust",
  	symbol: "CRU",
  	decimals: 12,
  	priceId: "crust-network",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "CRU-Crust",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crust_mainnet-native-cru.png"
  },
  	"moonbeam-LOCAL-xcASTR": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcASTR",
  	name: "Astar",
  	symbol: "xcASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "224077081838586484055667086558292981199",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFfFFFfffA893AD19e540E172C10d78D4d479B5Cf"
  	},
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcastr.png"
  },
  	"bifrost_dot-LOCAL-DOT": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-DOT",
  	name: "Polkadot DOT",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token2: "0"
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-dot.png"
  },
  	"parallel-LOCAL-sDOT": {
  	originChain: "parallel",
  	slug: "parallel-LOCAL-sDOT",
  	name: "sDOT",
  	symbol: "sDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1001"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-sdot.png"
  },
  	"parallel-LOCAL-DOT": {
  	originChain: "parallel",
  	slug: "parallel-LOCAL-DOT",
  	name: "DOT",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "101"
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-dot.png"
  },
  	"interlay-LOCAL-DOT": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-DOT",
  	name: "DOT",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token: "DOT"
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-dot.png"
  },
  	"hydradx_main-LOCAL-DOT": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-DOT",
  	name: "DOT",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "17540000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "5",
  		autoEnable: true,
  		canPayTxFee: true,
  		alternativeSwapAsset: "polkadot-NATIVE-DOT"
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-dot.png"
  },
  	"acala_evm-NATIVE-ACA": {
  	originChain: "acala_evm",
  	slug: "acala_evm-NATIVE-ACA",
  	name: "Acala",
  	symbol: "ACA",
  	decimals: 18,
  	priceId: "acala",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ACA-Acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala_evm-native-aca.png"
  },
  	"karura_evm-NATIVE-KAR": {
  	originChain: "karura_evm",
  	slug: "karura_evm-NATIVE-KAR",
  	name: "Karura",
  	symbol: "KAR",
  	decimals: 18,
  	priceId: "karura",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "KAR-Karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/karura_evm-native-kar.png"
  },
  	"statemint-LOCAL-USDC": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-USDC",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "70000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1337",
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: {
  					X2: [
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 1337
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-usdc.png"
  },
  	"astar-PSP34-Neuroguns-aZ9bd2tHeGKrs3FnJv5oe7kgVrP5GQvdJMhC2GxjXA2Yqbd": {
  	originChain: "astar",
  	slug: "astar-PSP34-Neuroguns-aZ9bd2tHeGKrs3FnJv5oe7kgVrP5GQvdJMhC2GxjXA2Yqbd",
  	name: "Neuroguns",
  	symbol: "NRG",
  	decimals: null,
  	priceId: null,
  	minAmount: null,
  	assetType: "PSP34",
  	metadata: {
  		contractAddress: "aZ9bd2tHeGKrs3FnJv5oe7kgVrP5GQvdJMhC2GxjXA2Yqbd"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-psp34-neuroguns-az9bd2thegkrs3fnjv5oe7kgvrp5gqvdjmhc2gxjxa2yqbd.png"
  },
  	"bittensor-NATIVE-TAO": {
  	originChain: "bittensor",
  	slug: "bittensor-NATIVE-TAO",
  	name: "Bittensor",
  	symbol: "TAO",
  	decimals: 9,
  	priceId: "bittensor",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bittensor-native-tao.png"
  },
  	"hydradx_main-LOCAL-USDC": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-USDC",
  	name: "USDC (Polkadot Asset Hub)",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "22",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 1337
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdc.png"
  },
  	"moonbeam-ERC20-CP": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-CP",
  	name: "Cypress",
  	symbol: "CP",
  	decimals: 18,
  	priceId: "cypress",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x6021D2C27B6FBd6e7608D1F39B41398CAee2F824"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-cp.jpg"
  },
  	"zeta_test-NATIVE-ZETA": {
  	originChain: "zeta_test",
  	slug: "zeta_test-NATIVE-ZETA",
  	name: "ZETA",
  	symbol: "ZETA",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/zeta_test-native-zeta.png"
  },
  	"xcavate-NATIVE-XCAV": {
  	originChain: "xcavate",
  	slug: "xcavate-NATIVE-XCAV",
  	name: "XCAV",
  	symbol: "XCAV",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/xcavate-native-xcav.png"
  },
  	"arbitrum_one-ERC20-USDC.e-0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": {
  	originChain: "arbitrum_one",
  	slug: "arbitrum_one-ERC20-USDC.e-0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  	name: "Bridged USDC",
  	symbol: "USDC.e",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/arbitrum_one-erc20-usdc.e-0xff970a61a04b1ca14834a43f5de4533ebddb5cc8.png"
  },
  	"moonbeam-ERC20-stDOT-0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-stDOT-0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4",
  	name: "Stella stDOT",
  	symbol: "stDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xbc7E02c4178a7dF7d3E564323a5c359dc96C4db4"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-stdot-0xbc7e02c4178a7df7d3e564323a5c359dc96c4db4.png"
  },
  	"enjin_matrixchain-NATIVE-ENJ": {
  	originChain: "enjin_matrixchain",
  	slug: "enjin_matrixchain-NATIVE-ENJ",
  	name: "Enjin Matrixchain",
  	symbol: "ENJ",
  	decimals: 18,
  	priceId: "enjincoin",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ENJ-Enjin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/enjin_matrixchain-native-enj.png"
  },
  	"enjin_relaychain-NATIVE-ENJ": {
  	originChain: "enjin_relaychain",
  	slug: "enjin_relaychain-NATIVE-ENJ",
  	name: "Enjin Relaychain",
  	symbol: "ENJ",
  	decimals: 18,
  	priceId: "enjincoin",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ENJ-Enjin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/enjin_relaychain-native-enj.png"
  },
  	"subspace_gemini_3g-NATIVE-tSSC": {
  	originChain: "subspace_gemini_3g",
  	slug: "subspace_gemini_3g-NATIVE-tSSC",
  	name: "Subspace Gemini 3g",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3g-native-tssc.png"
  },
  	"goldberg_testnet-NATIVE-AVL": {
  	originChain: "goldberg_testnet",
  	slug: "goldberg_testnet-NATIVE-AVL",
  	name: "Goldberg Testnet",
  	symbol: "AVL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/goldberg_testnet-native-avl.png"
  },
  	"acala-LOCAL-USDCet": {
  	originChain: "acala",
  	slug: "acala-LOCAL-USDCet",
  	name: "USD Coin (Portal from Ethereum)",
  	symbol: "USDCet",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Erc20: "0x07df96d1341a7d16ba1ad431e2c847d978bc2bce"
  		}
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-usdcet.png"
  },
  	"interlay-LOCAL-USDC.wh": {
  	originChain: "interlay",
  	slug: "interlay-LOCAL-USDC.wh",
  	name: "USD Coin",
  	symbol: "USDC.wh",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 8
  		}
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/interlay-local-usdc.wh.png"
  },
  	"centrifuge-LOCAL-USDC": {
  	originChain: "centrifuge",
  	slug: "centrifuge-LOCAL-USDC",
  	name: "USD Coin",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 6
  		}
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/centrifuge-local-usdc.png"
  },
  	"moonbeam-LOCAL-xcUSDC": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcUSDC",
  	name: "USD Coin",
  	symbol: "xcUSDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "166377000701797186346254371275954761085",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcusdc.png"
  },
  	"vara_testnet-NATIVE-TVARA": {
  	originChain: "vara_testnet",
  	slug: "vara_testnet-NATIVE-TVARA",
  	name: "Vara Network Testnet",
  	symbol: "TVARA",
  	decimals: 12,
  	priceId: null,
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/vara_testnet-native-tvara.png"
  },
  	"energy_web_x_testnet-NATIVE-VT": {
  	originChain: "energy_web_x_testnet",
  	slug: "energy_web_x_testnet-NATIVE-VT",
  	name: "VT",
  	symbol: "VT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_x_testnet-native-vt.png"
  },
  	"energy_web_chain-NATIVE-EWT": {
  	originChain: "energy_web_chain",
  	slug: "energy_web_chain-NATIVE-EWT",
  	name: "EWT",
  	symbol: "EWT",
  	decimals: 18,
  	priceId: "energy-web-token",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_chain-native-ewt.png"
  },
  	"energy_web_x_rococo-NATIVE-VT": {
  	originChain: "energy_web_x_rococo",
  	slug: "energy_web_x_rococo-NATIVE-VT",
  	name: "VT",
  	symbol: "VT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_x_rococo-native-vt.png"
  },
  	"energy_web_x-NATIVE-EWT": {
  	originChain: "energy_web_x",
  	slug: "energy_web_x-NATIVE-EWT",
  	name: "EWT",
  	symbol: "EWT",
  	decimals: 18,
  	priceId: "energy-web-token",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/energy_web_x-native-ewt.png"
  },
  	"acala-LOCAL-INTR": {
  	originChain: "acala",
  	slug: "acala-LOCAL-INTR",
  	name: "Interlay",
  	symbol: "INTR",
  	decimals: 10,
  	priceId: "interlay",
  	minAmount: "1000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 4
  		}
  	},
  	multiChainAsset: "INTR-Interlay",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-intr.png"
  },
  	"parallel-LOCAL-ACA": {
  	originChain: "parallel",
  	slug: "parallel-LOCAL-ACA",
  	name: "ACA",
  	symbol: "ACA",
  	decimals: 12,
  	priceId: "acala",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "108"
  	},
  	multiChainAsset: "ACA-Acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-aca.png"
  },
  	"hydradx_main-LOCAL-CFG": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-CFG",
  	name: "CFG",
  	symbol: "CFG",
  	decimals: 18,
  	priceId: "centrifuge",
  	minAmount: "32467532467532500",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "13"
  	},
  	multiChainAsset: "CFG-Centrifuge",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-cfg.png"
  },
  	"polimec-NATIVE-PLMC": {
  	originChain: "polimec",
  	slug: "polimec-NATIVE-PLMC",
  	name: "Polimec",
  	symbol: "PLMC",
  	decimals: 10,
  	priceId: "polimec",
  	minAmount: "100000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polimec-native-plmc.png"
  },
  	"invarch-NATIVE-VARCH": {
  	originChain: "invarch",
  	slug: "invarch-NATIVE-VARCH",
  	name: "InvArch Network",
  	symbol: "VARCH",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: {
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/invarch-native-varch.png"
  },
  	"parallel-LOCAL-cDOT714": {
  	originChain: "parallel",
  	slug: "parallel-LOCAL-cDOT714",
  	name: "cDOT-7/14",
  	symbol: "cDOT-7/14",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "200070014"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/parallel-local-cdot714.png"
  },
  	"manta_network_evm-NATIVE-ETH": {
  	originChain: "manta_network_evm",
  	slug: "manta_network_evm-NATIVE-ETH",
  	name: "Manta Pacific",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: null,
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network_evm-native-eth.png"
  },
  	"polkadex_dot-NATIVE-PDEX": {
  	originChain: "polkadex_dot",
  	slug: "polkadex_dot-NATIVE-PDEX",
  	name: "Polkadex Polkadot",
  	symbol: "PDEX",
  	decimals: 12,
  	priceId: "polkadex",
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/polkadex_dot-native-pdex.png"
  },
  	"bifrost_dot-LOCAL-BNCS": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-BNCS",
  	name: "BNCS Inscription Token",
  	symbol: "BNCS",
  	decimals: 12,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token2: "9"
  		}
  	},
  	multiChainAsset: "BNCS-InscriptionToken",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-bncs.png"
  },
  	"manta_network-NATIVE-MANTA": {
  	originChain: "manta_network",
  	slug: "manta_network-NATIVE-MANTA",
  	name: "Manta Atlantic",
  	symbol: "MANTA",
  	decimals: 18,
  	priceId: "manta-network",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		onChainInfo: {
  			MantaCurrency: "1"
  		}
  	},
  	multiChainAsset: "MANTA-MantaAtlantic",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network-native-manta.png"
  },
  	"manta_network_evm-ERC20-MANTA-0x95CeF13441Be50d20cA4558CC0a27B601aC544E5": {
  	originChain: "manta_network_evm",
  	slug: "manta_network_evm-ERC20-MANTA-0x95CeF13441Be50d20cA4558CC0a27B601aC544E5",
  	name: "Manta Pacific",
  	symbol: "MANTA",
  	decimals: 18,
  	priceId: "manta-network",
  	minAmount: null,
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x95CeF13441Be50d20cA4558CC0a27B601aC544E5"
  	},
  	multiChainAsset: "MANTA-MantaAtlantic",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network_evm-erc20-manta-0x95cef13441be50d20ca4558cc0a27b601ac544e5.png"
  },
  	"manta_network-LOCAL-DOT": {
  	originChain: "manta_network",
  	slug: "manta_network-LOCAL-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: "polkadot",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "8",
  		onChainInfo: {
  			MantaCurrency: "8"
  		}
  	},
  	multiChainAsset: "DOT-Polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/manta_network-local-dot.png"
  },
  	"moonbeam-LOCAL-xcMANTA": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcMANTA",
  	name: "Manta Atlantic",
  	symbol: "xcMANTA",
  	decimals: 18,
  	priceId: "manta-network",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "166446646689194205559791995948102903873",
  		assetType: "ForeignAsset",
  		contractAddress: "0xfFFffFFf7D3875460d4509eb8d0362c611B4E841"
  	},
  	multiChainAsset: "MANTA-MantaAtlantic",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcmanta.png"
  },
  	"bittensor_testnet-NATIVE-TAO": {
  	originChain: "bittensor_testnet",
  	slug: "bittensor_testnet-NATIVE-TAO",
  	name: "Bittensor Testnet",
  	symbol: "TAO",
  	decimals: 9,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bittensor_testnet-native-tao.png"
  },
  	"statemint-LOCAL-PINK": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-PINK",
  	name: "Statemint Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "23",
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: {
  					X2: [
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 23
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-pink.png"
  },
  	"moonbeam-LOCAL-xcPINK": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcPINK",
  	name: "Pink",
  	symbol: "xcPINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "64174511183114006009298114091987195453",
  		assetType: "ForeignAsset",
  		contractAddress: "0xfFfFFfFf30478fAFBE935e466da114E14fB3563d"
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcpink.png"
  },
  	"bifrost_dot-LOCAL-vMANTA": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-vMANTA",
  	name: "Voucher MANTA",
  	symbol: "vMANTA",
  	decimals: 18,
  	priceId: "bifrost-voucher-manta",
  	minAmount: "10000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			VToken2: "8"
  		}
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-vmanta.png"
  },
  	"bifrost_dot-LOCAL-MANTA": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-MANTA",
  	name: "Manta Network",
  	symbol: "MANTA",
  	decimals: 18,
  	priceId: "manta-network",
  	minAmount: "10000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token2: "8"
  		}
  	},
  	multiChainAsset: "MANTA-MantaAtlantic",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-manta.png"
  },
  	"subspace_gemini_3h-NATIVE-tSSC": {
  	originChain: "subspace_gemini_3h",
  	slug: "subspace_gemini_3h-NATIVE-tSSC",
  	name: "Subspace Gemini 3h",
  	symbol: "tSSC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/subspace_gemini_3h-native-tssc.png"
  },
  	"continuum_network-NATIVE-NUUM": {
  	originChain: "continuum_network",
  	slug: "continuum_network-NATIVE-NUUM",
  	name: "Continuum Network",
  	symbol: "NUUM",
  	decimals: 18,
  	priceId: "mnet-continuum",
  	minAmount: "100000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/continuum_network-native-nuum.png"
  },
  	"hydradx_main-LOCAL-INTR": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-INTR",
  	name: "Interlay",
  	symbol: "INTR",
  	decimals: 10,
  	priceId: "interlay",
  	minAmount: "6164274209",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "17"
  	},
  	multiChainAsset: "INTR-Interlay",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-intr.png"
  },
  	"rococo_assethub-NATIVE-ROC": {
  	originChain: "rococo_assethub",
  	slug: "rococo_assethub-NATIVE-ROC",
  	name: "Rococo Asset Hub",
  	symbol: "ROC",
  	decimals: 12,
  	priceId: null,
  	minAmount: "3333333",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rococo_assethub-native-roc.png"
  },
  	"rococo_assethub-LOCAL-WETH": {
  	originChain: "rococo_assethub",
  	slug: "rococo_assethub-LOCAL-WETH",
  	name: "Wrapped ETH (Bridged)",
  	symbol: "WETH",
  	decimals: 18,
  	priceId: null,
  	minAmount: null,
  	assetType: "LOCAL",
  	metadata: {
  		isBridged: true,
  		multilocation: {
  			parents: 2,
  			interior: {
  				X2: [
  					{
  						GlobalConsensus: {
  							Ethereum: {
  								chainId: 11155111
  							}
  						}
  					},
  					{
  						AccountKey20: {
  							key: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
  							network: null
  						}
  					}
  				]
  			}
  		}
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/rococo_assethub-local-weth.png"
  },
  	"okxTest-NATIVE-OKX": {
  	originChain: "okxTest",
  	slug: "okxTest-NATIVE-OKX",
  	name: "OKX X1 testnet",
  	symbol: "OKX",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/okxtest-native-okx.png"
  },
  	"liberlandTest-NATIVE-LDN": {
  	originChain: "liberlandTest",
  	slug: "liberlandTest-NATIVE-LDN",
  	name: "Liberland Testnet",
  	symbol: "LDN",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/liberlandtest-native-ldn.png"
  },
  	"liberland-NATIVE-LLD": {
  	originChain: "liberland",
  	slug: "liberland-NATIVE-LLD",
  	name: "Liberland",
  	symbol: "LLD",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/liberland-native-lld.png"
  },
  	"liberland-LOCAL-LLM": {
  	originChain: "liberland",
  	slug: "liberland-LOCAL-LLM",
  	name: "Liberland Merit",
  	symbol: "LLM",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/liberland-local-llm.png"
  },
  	"chainflip_dot-NATIVE-pDOT": {
  	originChain: "chainflip_dot",
  	slug: "chainflip_dot-NATIVE-pDOT",
  	name: "Polkadot Chainflip Testnet",
  	symbol: "pDOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/chainflip_dot-native-pdot.png"
  },
  	"ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F": {
  	originChain: "ethereum_goerli",
  	slug: "ethereum_goerli-ERC20-USDC-0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  	name: "USDC Goerli",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/ethereum_goerli-erc20-usdc-0x07865c6e87b9f70255377e024ace6630c1eaa37f.png"
  },
  	"hydradx_main-LOCAL-ASTR": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-ASTR",
  	name: "Astar",
  	symbol: "ASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: "147058823529412000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "9",
  		autoEnable: true,
  		alternativeSwapAsset: "astar-NATIVE-ASTR"
  	},
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-astr.png"
  },
  	"hydradx_main-LOCAL-BNC": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-BNC",
  	name: "Bifrost Native Coin",
  	symbol: "BNC",
  	decimals: 12,
  	priceId: "bifrost-native-coin",
  	minAmount: "68795189840",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "14"
  	},
  	multiChainAsset: "BNC-BifrostPolkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-bnc.png"
  },
  	"hydradx_main-LOCAL-GLMR": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-GLMR",
  	name: "Moonbeam",
  	symbol: "GLMR",
  	decimals: 18,
  	priceId: "moonbeam",
  	minAmount: "34854864344868000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "16",
  		autoEnable: true
  	},
  	multiChainAsset: "GLMR-Moonbeam",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-glmr.png"
  },
  	"tangleTest-NATIVE-tTNT": {
  	originChain: "tangleTest",
  	slug: "tangleTest-NATIVE-tTNT",
  	name: "Tangle Testnet",
  	symbol: "tTNT",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/tangletest-native-ttnt.png"
  },
  	"dentnet-NATIVE-DENTX": {
  	originChain: "dentnet",
  	slug: "dentnet-NATIVE-DENTX",
  	name: "DENTNet",
  	symbol: "DENTX",
  	decimals: 18,
  	priceId: null,
  	minAmount: "10000000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dentnet-native-dentx.png"
  },
  	"dentnet-LOCAL-DENT": {
  	originChain: "dentnet",
  	slug: "dentnet-LOCAL-DENT",
  	name: "DENT (ERC20)",
  	symbol: "DENT",
  	decimals: 8,
  	priceId: "dent",
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dentnet-local-dent.png"
  },
  	"phykenTest-NATIVE-KEN": {
  	originChain: "phykenTest",
  	slug: "phykenTest-NATIVE-KEN",
  	name: "Phyken Network Testnet",
  	symbol: "KEN",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/phykentest-native-ken.png"
  },
  	"creditcoinTestEvm-NATIVE-CTC": {
  	originChain: "creditcoinTestEvm",
  	slug: "creditcoinTestEvm-NATIVE-CTC",
  	name: "Creditcoin3 Testnet",
  	symbol: "CTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/creditcointestevm-native-ctc.png"
  },
  	"astarZkEvm-NATIVE-ETH": {
  	originChain: "astarZkEvm",
  	slug: "astarZkEvm-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarzkevm-native-eth.png"
  },
  	"sepolia_ethereum-NATIVE-ETH": {
  	originChain: "sepolia_ethereum",
  	slug: "sepolia_ethereum-NATIVE-ETH",
  	name: "Ethereum Sepolia",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sepolia_ethereum-native-eth.png"
  },
  	"sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238": {
  	originChain: "sepolia_ethereum",
  	slug: "sepolia_ethereum-ERC20-USDC-0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  	name: "USDC Sepolia",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/sepolia_ethereum-erc20-usdc-0x1c7d4b196cb0c7b01d743fbc6116a902379c7238.png"
  },
  	"statemint-LOCAL-DED": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-DED",
  	name: "DED",
  	symbol: "DED",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "30",
  		autoEnable: true,
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: {
  					X2: [
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 30
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "DED-DED",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-ded.png"
  },
  	"hydradx_rococo-NATIVE-HDX": {
  	originChain: "hydradx_rococo",
  	slug: "hydradx_rococo-NATIVE-HDX",
  	name: "HydraDX Rococo",
  	symbol: "HDX",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		assetId: "0"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_rococo-native-hdx.png"
  },
  	"hydradx_rococo-LOCAL-DOT": {
  	originChain: "hydradx_rococo",
  	slug: "hydradx_rococo-LOCAL-DOT",
  	name: "Polkadot Testnet",
  	symbol: "DOT",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "5"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_rococo-local-dot.png"
  },
  	"hydradx_rococo-LOCAL-USDT": {
  	originChain: "hydradx_rococo",
  	slug: "hydradx_rococo-LOCAL-USDT",
  	name: "Statemint USDT (testnet)",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: null,
  	minAmount: "100",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "10"
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_rococo-local-usdt.png"
  },
  	"bifrost_dot-LOCAL-PINK": {
  	originChain: "bifrost_dot",
  	slug: "bifrost_dot-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			Token2: "10"
  		}
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bifrost_dot-local-pink.png"
  },
  	"astar-LOCAL-PINK": {
  	originChain: "astar",
  	slug: "astar-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18446744073709551633",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 23
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astar-local-pink.png"
  },
  	"phala-LOCAL-PINK": {
  	originChain: "phala",
  	slug: "phala-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "100000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "12",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X2: [
  						{
  							Parachain: 2000
  						},
  						{
  							GeneralKey: {
  								data: "0x0001000000000000000000000000000000000000000000000000000000000000",
  								length: 2
  							}
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/phala-local-pink.png"
  },
  	"acala-LOCAL-PINK": {
  	originChain: "acala",
  	slug: "acala-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "LOCAL",
  	metadata: {
  		onChainInfo: {
  			ForeignAsset: 13
  		}
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acala-local-pink.png"
  },
  	"crust-LOCAL-PINK": {
  	originChain: "crust",
  	slug: "crust-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "64174511183114006009298114091987195453"
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/crust-local-pink.png"
  },
  	"darwinia2-LOCAL-PINK": {
  	originChain: "darwinia2",
  	slug: "darwinia2-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1028"
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/darwinia2-local-pink.png"
  },
  	"creditcoinTest-NATIVE-CTC": {
  	originChain: "creditcoinTest",
  	slug: "creditcoinTest-NATIVE-CTC",
  	name: "Creditcoin testnet",
  	symbol: "CTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/creditcointest-native-ctc.png"
  },
  	"moonbeam-ERC20-RMRK-0x524d524B4c9366be706D3A90dcf70076ca037aE3": {
  	originChain: "moonbeam",
  	slug: "moonbeam-ERC20-RMRK-0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  	name: "RMRK",
  	symbol: "RMRK",
  	decimals: 18,
  	priceId: "rmrk",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x524d524B4c9366be706D3A90dcf70076ca037aE3"
  	},
  	multiChainAsset: "RMRK-RMRKApp",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-erc20-rmrk-0x524d524b4c9366be706d3a90dcf70076ca037ae3.png"
  },
  	"astarEvm-ERC20-RMRK-0x524d524B4c9366be706D3A90dcf70076ca037aE3": {
  	originChain: "astarEvm",
  	slug: "astarEvm-ERC20-RMRK-0x524d524B4c9366be706D3A90dcf70076ca037aE3",
  	name: "RMRK",
  	symbol: "RMRK",
  	decimals: 18,
  	priceId: "rmrk",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x524d524B4c9366be706D3A90dcf70076ca037aE3"
  	},
  	multiChainAsset: "RMRK-RMRKApp",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarevm-erc20-rmrk-0x524d524b4c9366be706d3a90dcf70076ca037ae3.png"
  },
  	"hydradx_main-LOCAL-DED": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-DED",
  	name: "DED",
  	symbol: "DED",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1000019",
  		autoEnable: true,
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 30
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "DED-DED",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-ded.png"
  },
  	"xlayer-NATIVE-OKB": {
  	originChain: "xlayer",
  	slug: "xlayer-NATIVE-OKB",
  	name: "X Layer",
  	symbol: "OKB",
  	decimals: 18,
  	priceId: "okb",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/xlayer-native-okb.png"
  },
  	"astarZkEvm-ERC20-ASTR-0xdf41220C7e322bFEF933D85D01821ad277f90172": {
  	originChain: "astarZkEvm",
  	slug: "astarZkEvm-ERC20-ASTR-0xdf41220C7e322bFEF933D85D01821ad277f90172",
  	name: "Astar",
  	symbol: "ASTR",
  	decimals: 18,
  	priceId: "astar",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xdf41220C7e322bFEF933D85D01821ad277f90172"
  	},
  	multiChainAsset: "ASTR-Astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/astarzkevm-erc20-astr-0xdf41220c7e322bfef933d85d01821ad277f90172.png"
  },
  	"moonbeam-LOCAL-xcDED": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcDED",
  	name: "DED",
  	symbol: "xcDED",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "124463719055550872076363892993240202694",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFFFFFFF5DA2D7214D268375CF8FB1715705FDC6"
  	},
  	multiChainAsset: "DED-DED",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcded.png"
  },
  	"statemint-LOCAL-DOTA": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-DOTA",
  	name: "DOTA",
  	symbol: "DOTA",
  	decimals: 4,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18",
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-dota.png"
  },
  	"moonbeam-LOCAL-xcBNCS": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcBNCS",
  	name: "BNCS Inscription Token",
  	symbol: "xcBNCS",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "142155548796783636521833385094843759961",
  		assetType: "ForeignAsset",
  		contractAddress: "0xfFfffffF6aF229AE7f0F4e0188157e189a487D59"
  	},
  	multiChainAsset: "BNCS-InscriptionToken",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcbncs.png"
  },
  	"hydradx_main-LOCAL-DAI": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-DAI",
  	name: "DAI Stablecoin (via Wormhole)",
  	symbol: "DAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: "10000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "2"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-dai.png"
  },
  	"hydradx_main-LOCAL-APE": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-APE",
  	name: "ApeCoin (via Wormhole)",
  	symbol: "APE",
  	decimals: 18,
  	priceId: "apecoin",
  	minAmount: "2518891687657430",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "6"
  	},
  	multiChainAsset: "APE-ApeCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-ape.png"
  },
  	"hydradx_main-LOCAL-SUB": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-SUB",
  	name: "Subsocial",
  	symbol: "SUB",
  	decimals: 10,
  	priceId: "subsocial",
  	minAmount: "20000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "24"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-sub.png"
  },
  	"hydradx_main-LOCAL-4Pool": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-4Pool",
  	name: "USDT, DAI, USDC, USDT",
  	symbol: "4-Pool",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "100",
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-4pool.png"
  },
  	"hydradx_main-LOCAL-WETH": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-WETH",
  	name: "Ethereum (via Moonbeam)",
  	symbol: "WETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "5390835579515",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "20",
  		autoEnable: true
  	},
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-weth.png"
  },
  	"hydradx_main-LOCAL-2Pool": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-2Pool",
  	name: "WBTC, iBTC",
  	symbol: "2-Pool",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "101",
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-2pool.png"
  },
  	"hydradx_main-LOCAL-vDOT": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-vDOT",
  	name: "Bifrost Voucher DOT",
  	symbol: "vDOT",
  	decimals: 10,
  	priceId: "voucher-dot",
  	minAmount: "18761726",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "15",
  		autoEnable: true
  	},
  	multiChainAsset: "vDOT-VoucherDot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-vdot.png"
  },
  	"hydradx_main-LOCAL-LRNA": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-LRNA",
  	name: "Lerna",
  	symbol: "LRNA",
  	decimals: 12,
  	priceId: null,
  	minAmount: "400000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-lrna.png"
  },
  	"hydradx_main-LOCAL-DAI-18": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-DAI-18",
  	name: "Random token 1 (via Wormhole)",
  	symbol: "DAI",
  	decimals: 18,
  	priceId: "dai",
  	minAmount: "10000000000000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "18"
  	},
  	multiChainAsset: "DAI-DaiStablecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-dai-18.png"
  },
  	"hydradx_main-LOCAL-USDC-21": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-USDC-21",
  	name: "USDC (Moonbeam Wormhole)",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "usd-coin",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "21"
  	},
  	multiChainAsset: "USDC-USDCoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdc-21.png"
  },
  	"hydradx_main-LOCAL-USDT-23": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-USDT-23",
  	name: "USDT (Moonbeam Wormhole)",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "10000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "23"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-usdt-23.png"
  },
  	"hydradx_main-LOCAL-WBTC": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-WBTC",
  	name: "Wrapped Bitcoin (via Wormhole)",
  	symbol: "WBTC",
  	decimals: 8,
  	priceId: "wrapped-bitcoin",
  	minAmount: "44",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "3"
  	},
  	multiChainAsset: "WBTC-WrappedBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-wbtc.png"
  },
  	"hydradx_main-LOCAL-iBTC": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-iBTC",
  	name: "interBTC",
  	symbol: "iBTC",
  	decimals: 8,
  	priceId: "interbtc",
  	minAmount: "36",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "11"
  	},
  	multiChainAsset: "iBTC-interBTC",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-ibtc.png"
  },
  	"hydradx_main-LOCAL-PINK": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-PINK",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1000021"
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-pink.png"
  },
  	"acurast-NATIVE-cACU": {
  	originChain: "acurast",
  	slug: "acurast-NATIVE-cACU",
  	name: "Acurast Canary",
  	symbol: "cACU",
  	decimals: 12,
  	priceId: null,
  	minAmount: "1000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/acurast-native-cacu.png"
  },
  	"mythos-NATIVE-MYTH": {
  	originChain: "mythos",
  	slug: "mythos-NATIVE-MYTH",
  	name: "Mythos",
  	symbol: "MYTH",
  	decimals: 18,
  	priceId: "mythos",
  	minAmount: "1000000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		disableEvmTransfer: true
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/mythos-native-myth.png"
  },
  	"statemint-LOCAL-BEEFY": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-BEEFY",
  	name: "BEEFY",
  	symbol: "BEEFY",
  	decimals: 2,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "420",
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: {
  					X2: [
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 420
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "BEEFY-BEEFY",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-beefy.png"
  },
  	"hydradx_main-LOCAL-BEEFY": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-BEEFY",
  	name: "BEEFY",
  	symbol: "BEEFY",
  	decimals: 2,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1000036",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 420
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "BEEFY-BEEFY",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-beefy.png"
  },
  	"humanode-NATIVE-HMND": {
  	originChain: "humanode",
  	slug: "humanode-NATIVE-HMND",
  	name: "Humanode",
  	symbol: "HMND",
  	decimals: 18,
  	priceId: "humanode",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "HMND-Humanode",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/humanode-native-hmnd.png"
  },
  	"humanodeEvm-NATIVE-eHMND": {
  	originChain: "humanodeEvm",
  	slug: "humanodeEvm-NATIVE-eHMND",
  	name: "Humanode",
  	symbol: "eHMND",
  	decimals: 18,
  	priceId: "humanode",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "HMND-Humanode",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/humanodeevm-native-ehmnd.png"
  },
  	"humanodeEvm-ERC20-WeHMND-0x0000000000000000000000000000000000000802": {
  	originChain: "humanodeEvm",
  	slug: "humanodeEvm-ERC20-WeHMND-0x0000000000000000000000000000000000000802",
  	name: "Wrapped Humanode",
  	symbol: "WeHMND",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x0000000000000000000000000000000000000802"
  	},
  	multiChainAsset: "HMND-Humanode",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/humanodeevm-erc20-wehmnd-0x0000000000000000000000000000000000000802.png"
  },
  	"moonbeam-LOCAL-xcvDOT": {
  	originChain: "moonbeam",
  	slug: "moonbeam-LOCAL-xcvDOT",
  	name: "Bifrost Voucher DOT",
  	symbol: "xcvDOT",
  	decimals: 10,
  	priceId: "voucher-dot",
  	minAmount: "0",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "29085784439601774464560083082574142143",
  		assetType: "ForeignAsset",
  		contractAddress: "0xFFFfffFf15e1b7E3dF971DD813Bc394deB899aBf"
  	},
  	multiChainAsset: "vDOT-VoucherDot",
  	hasValue: null,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/moonbeam-local-xcvdot.png"
  },
  	"statemint-LOCAL-STINK": {
  	originChain: "statemint",
  	slug: "statemint-LOCAL-STINK",
  	name: "STINK",
  	symbol: "STINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1000000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "42069",
  		multilocation: {
  			Concrete: {
  				parents: 0,
  				interior: {
  					X2: [
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 42069
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "STINK-STINK",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/statemint-local-stink.png"
  },
  	"hydradx_main-LOCAL-STINK": {
  	originChain: "hydradx_main",
  	slug: "hydradx_main-LOCAL-STINK",
  	name: "STINK",
  	symbol: "STINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "1",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "1000034",
  		multilocation: {
  			Concrete: {
  				parents: 1,
  				interior: {
  					X3: [
  						{
  							Parachain: 1000
  						},
  						{
  							PalletInstance: 50
  						},
  						{
  							GeneralIndex: 42069
  						}
  					]
  				}
  			}
  		}
  	},
  	multiChainAsset: "STINK-STINK",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/hydradx_main-local-stink.png"
  },
  	"base_mainnet-ERC20-PINK-0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0": {
  	originChain: "base_mainnet",
  	slug: "base_mainnet-ERC20-PINK-0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0",
  	name: "Pink",
  	symbol: "PINK",
  	decimals: 10,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x66fc31b3233c7C001bdD21Ff6E5E66fA08EF85D0"
  	},
  	multiChainAsset: "PINK-StatemintPink",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/base_mainnet-erc20-pink-0x66fc31b3233c7c001bdd21ff6e5e66fa08ef85d0.png"
  },
  	"paseoTest-NATIVE-PAS": {
  	originChain: "paseoTest",
  	slug: "paseoTest-NATIVE-PAS",
  	name: "Paseo Testnet",
  	symbol: "PAS",
  	decimals: 10,
  	priceId: null,
  	minAmount: "10000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/paseotest-native-pas.png"
  },
  	"commune-NATIVE-C": {
  	originChain: "commune",
  	slug: "commune-NATIVE-C",
  	name: "COMAI",
  	symbol: "C",
  	decimals: 9,
  	priceId: "commune-ai",
  	minAmount: "500",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/commune-native-c.png"
  },
  	"dbcchain-NATIVE-DBC": {
  	originChain: "dbcchain",
  	slug: "dbcchain-NATIVE-DBC",
  	name: "DBC Mainnet",
  	symbol: "DBC",
  	decimals: 15,
  	priceId: "deepbrain-chain",
  	minAmount: "10000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dbcchain-native-dbc.png"
  },
  	"dbcchain-LOCAL-DLC": {
  	originChain: "dbcchain",
  	slug: "dbcchain-LOCAL-DLC",
  	name: "DeepLink Coin",
  	symbol: "DLC",
  	decimals: 8,
  	priceId: null,
  	minAmount: "100000",
  	assetType: "LOCAL",
  	metadata: {
  		assetId: "88"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/dbcchain-local-dlc.png"
  },
  	"availTuringTest-NATIVE-AVAIL": {
  	originChain: "availTuringTest",
  	slug: "availTuringTest-NATIVE-AVAIL",
  	name: "Avail Turing Testnet",
  	symbol: "AVAIL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: {
  		autoEnable: true
  	},
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/availturingtest-native-avail.png"
  },
  	"bitlayer-NATIVE-BTC": {
  	originChain: "bitlayer",
  	slug: "bitlayer-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: "bitcoin",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-Bitcoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-native-btc.png"
  },
  	"bitlayerTest-NATIVE-BTC": {
  	originChain: "bitlayerTest",
  	slug: "bitlayerTest-NATIVE-BTC",
  	name: "Bitcoin testnet",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-BitcoinTestnet",
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayertest-native-btc.png"
  },
  	"bevm-NATIVE-BTC": {
  	originChain: "bevm",
  	slug: "bevm-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: "bitcoin",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-Bitcoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bevm-native-btc.png"
  },
  	"bevmTest-NATIVE-BTC": {
  	originChain: "bevmTest",
  	slug: "bevmTest-NATIVE-BTC",
  	name: "Bitcoin testnet",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-BitcoinTestnet",
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bevmtest-native-btc.png"
  },
  	"b2-NATIVE-BTC": {
  	originChain: "b2",
  	slug: "b2-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: "bitcoin",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "BTC-Bitcoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/b2-native-btc.png"
  },
  	"bitlayer-ERC20-USDT-0xfe9f969faf8ad72a83b761138bf25de87eff9dd2": {
  	originChain: "bitlayer",
  	slug: "bitlayer-ERC20-USDT-0xfe9f969faf8ad72a83b761138bf25de87eff9dd2",
  	name: "Bitlayer-Peg USDT",
  	symbol: "USDT",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xfe9f969faf8ad72a83b761138bf25de87eff9dd2"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-erc20-usdt-0xfe9f969faf8ad72a83b761138bf25de87eff9dd2.png"
  },
  	"bitlayer-ERC20-USDC-0x9827431e8b77e87c9894bd50b055d6be56be0030": {
  	originChain: "bitlayer",
  	slug: "bitlayer-ERC20-USDC-0x9827431e8b77e87c9894bd50b055d6be56be0030",
  	name: "Bitlayer-Peg USDC",
  	symbol: "USDC",
  	decimals: 6,
  	priceId: "tether",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x9827431e8b77e87c9894bd50b055d6be56be0030"
  	},
  	multiChainAsset: "USDT-Tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-erc20-usdc-0x9827431e8b77e87c9894bd50b055d6be56be0030.png"
  },
  	"bitlayer-ERC20-ETH-0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2": {
  	originChain: "bitlayer",
  	slug: "bitlayer-ERC20-ETH-0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2",
  	name: "Bitlayer-Peg ETH",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2"
  	},
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bitlayer-erc20-eth-0xef63d4e178b3180beec9b0e143e0f37f4c93f4c2.png"
  },
  	"bevm-ERC20-WBTC-0xB5136FEba197f5fF4B765E5b50c74db717796dcD": {
  	originChain: "bevm",
  	slug: "bevm-ERC20-WBTC-0xB5136FEba197f5fF4B765E5b50c74db717796dcD",
  	name: "Wrapped BTC",
  	symbol: "WBTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0xB5136FEba197f5fF4B765E5b50c74db717796dcD"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: null
  },
  	"bevm-ERC20-stBTC-0x26bda683F874e7AE3e3A5d3fad44Bcb82a7c107C": {
  	originChain: "bevm",
  	slug: "bevm-ERC20-stBTC-0x26bda683F874e7AE3e3A5d3fad44Bcb82a7c107C",
  	name: "Liquid staked BTC",
  	symbol: "stBTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x26bda683F874e7AE3e3A5d3fad44Bcb82a7c107C"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: null
  },
  	"bevm-ERC20-wstBTC-0x2967E7Bb9DaA5711Ac332cAF874BD47ef99B3820": {
  	originChain: "bevm",
  	slug: "bevm-ERC20-wstBTC-0x2967E7Bb9DaA5711Ac332cAF874BD47ef99B3820",
  	name: "Wrapped liquid staked BTC 2.0",
  	symbol: "wstBTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "ERC20",
  	metadata: {
  		contractAddress: "0x2967E7Bb9DaA5711Ac332cAF874BD47ef99B3820"
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: null
  },
  	"bobMainnet-NATIVE-ETH": {
  	originChain: "bobMainnet",
  	slug: "bobMainnet-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	decimals: 18,
  	priceId: "ethereum",
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: "ETH-Ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/bobmainnet-native-eth.png"
  },
  	"avail_mainnet-NATIVE-AVAIL": {
  	originChain: "avail_mainnet",
  	slug: "avail_mainnet-NATIVE-AVAIL",
  	name: "Avail",
  	symbol: "AVAIL",
  	decimals: 18,
  	priceId: null,
  	minAmount: "1000000000000",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/avail_mainnet-native-avail.png"
  },
  	"merlinEvm-NATIVE-BTC": {
  	originChain: "merlinEvm",
  	slug: "merlinEvm-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/merlinevm-native-btc.png"
  },
  	"botanixEvmTest-NATIVE-BTC": {
  	originChain: "botanixEvmTest",
  	slug: "botanixEvmTest-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	decimals: 18,
  	priceId: null,
  	minAmount: "0",
  	assetType: "NATIVE",
  	metadata: null,
  	multiChainAsset: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/botanixevmtest-native-btc.png"
  },
  	"bitcoin-RUNE-RUNINGBITCOIN-841052:1863": {
  	originChain: "bitcoin",
  	slug: "bitcoin-RUNE-RUNINGBITCOIN-841052:1863",
  	name: "RUNING BITCOIN",
  	symbol: "RUNINGBITCOIN",
  	decimals: 8,
  	priceId: null,
  	minAmount: "0",
  	assetType: "RUNE",
  	metadata: {
  		runeId: "841052:1863",
  		spacersList: [
  			6
  		]
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/botanixevmtest-native-btc.png"
  },
  	"bitcoin-RUNE-RUNES*X*BITCOIN-840000:142": {
  	originChain: "bitcoin",
  	slug: "bitcoin-RUNE-RUNES*X*BITCOIN-840000:142",
  	name: "RUNES X BITCOIN",
  	symbol: "RUNES*X*BITCOIN",
  	decimals: 0,
  	priceId: null,
  	minAmount: "0",
  	assetType: "RUNE",
  	metadata: {
  		runeId: "840000:142",
  		spacersList: [
  			5,
  			6
  		]
  	},
  	multiChainAsset: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chain-assets/botanixevmtest-native-btc.png"
  }
  };

  var bitcoin$1 = {
  	slug: "bitcoin",
  	name: "Bitcoin",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	providers: {
  		Blockstream: "https://blockstream.info/api"
  	},
  	bitcoinInfo: {
  		blockExplorer: "https://mempool.space",
  		existentialDeposit: "0",
  		decimals: 8,
  		symbol: "BTC",
  		bitcoinNetwork: "mainnet"
  	},
  	substrateInfo: null,
  	evmInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: null
  	}
  };
  var bitcoinTestnet$1 = {
  	slug: "bitcoinTestnet",
  	name: "Bitcoin Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png",
  	providers: {
  		Blockstream: "https://blockstream.info/testnet/api"
  	},
  	bitcoinInfo: {
  		blockExplorer: "https://mempool.space/testnet",
  		existentialDeposit: "0",
  		decimals: 8,
  		symbol: "BTC",
  		bitcoinNetwork: "testnet"
  	},
  	substrateInfo: null,
  	evmInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: null
  	}
  };
  var polkadot$1 = {
  	slug: "polkadot",
  	name: "Polkadot",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadot.png",
  	providers: {
  		Dwellir: "wss://polkadot-rpc.dwellir.com",
  		RadiumBlock: "wss://polkadot.public.curie.radiumblock.co/ws",
  		Stakeworld: "wss://dot-rpc.stakeworld.io",
  		"Dwellir Tunisia": "wss://polkadot-rpc-tn.dwellir.com",
  		"IBP-GeoDNS1": "wss://rpc.ibp.network/polkadot",
  		"IBP-GeoDNS2": "wss://rpc.dotters.network/polkadot",
  		"Light Client": "light://substrate-connect/polkadot",
  		BlockOps: "wss://polkadot-public-rpc.blockops.network/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
  		addressPrefix: 0,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://polkadot.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "DOT",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "polkadot",
  		chainBalanceSlug: "polkadot"
  	}
  };
  var kusama$1 = {
  	slug: "kusama",
  	name: "Kusama",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kusama.png",
  	providers: {
  		Dwellir: "wss://kusama-rpc.dwellir.com",
  		RadiumBlock: "wss://kusama.public.curie.radiumblock.co/ws",
  		"Dwellir Tunisia": "wss://kusama-rpc-tn.dwellir.com",
  		LuckyFriday: "wss://rpc-kusama.luckyfriday.io",
  		Stakeworld: "wss://ksm-rpc.stakeworld.io",
  		"IBP-GeoDNS1": "wss://rpc.ibp.network/kusama",
  		"IBP-GeoDNS2": "wss://rpc.dotters.network/kusama",
  		"Light Client": "light://substrate-connect/kusama"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe",
  		addressPrefix: 2,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://kusama.subscan.io/",
  		existentialDeposit: "333333333",
  		symbol: "KSM",
  		decimals: 12,
  		hasNativeNft: true,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "kusama",
  		chainBalanceSlug: "kusama"
  	}
  };
  var ethereum$1 = {
  	slug: "ethereum",
  	name: "Ethereum",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ethereum.png",
  	providers: {
  		PublicNode: "https://ethereum.publicnode.com",
  		BlastApi: "https://eth-mainnet.public.blastapi.io",
  		Infura: "https://mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"
  	},
  	evmInfo: {
  		evmChainId: 1,
  		blockExplorer: "https://etherscan.io",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://etherscan.io"
  	},
  	substrateInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "ethereum"
  	}
  };
  var binance$1 = {
  	slug: "binance",
  	name: "Binance Smart Chain",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/binance.png",
  	providers: {
  		Binance: "https://bsc-dataseed.binance.org/",
  		Defibit: "https://bsc-dataseed1.defibit.io/",
  		Ninicoin: "https://bsc-dataseed1.ninicoin.io/",
  		Nodereal: "https://bsc.nodereal.io/"
  	},
  	evmInfo: {
  		evmChainId: 56,
  		blockExplorer: "https://bscscan.com",
  		existentialDeposit: "0",
  		symbol: "BNB",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "bsc"
  	}
  };
  var moonbeam$1 = {
  	slug: "moonbeam",
  	name: "Moonbeam",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonbeam.png",
  	providers: {
  		"Moonbeam Foundation": "wss://wss.api.moonbeam.network",
  		Dwellir: "wss://moonbeam-rpc.dwellir.com",
  		Blast: "wss://moonbeam.public.blastapi.io",
  		UnitedBloc: "wss://moonbeam.unitedbloc.com"
  	},
  	evmInfo: {
  		evmChainId: 1284,
  		blockExplorer: "https://moonbeam.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "GLMR",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC721",
  			"ERC20"
  		],
  		abiExplorer: "https://api-moonbeam.moonscan.io/api?module=contract&action=getabi"
  	},
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2004,
  		genesisHash: "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
  		addressPrefix: 1284,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://moonbeam.foundation/moonbeam-crowdloan/",
  		blockExplorer: "https://moonbeam.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "GLMR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: 3342,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2004-2",
  				paraId: 2004,
  				status: "won",
  				startTime: "2021-12-21T01:48:00.000Z",
  				endTime: "2023-10-24T01:48:00.000Z",
  				auctionIndex: 2,
  				firstPeriod: 6,
  				lastPeriod: 13
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "moonbeam",
  		chainBalanceSlug: "moonbeam"
  	}
  };
  var pioneer$1 = {
  	slug: "pioneer",
  	name: "Pioneer Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pioneer.png",
  	providers: {
  		Pioneer: "wss://pioneer-rpc-3.bit.country/wss"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2096,
  		genesisHash: "0xf22b7850cdd5a7657bbfd90ac86441275bbc57ace3d2698a740c7b0ec4de5ec3",
  		addressPrefix: 268,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://ksmcrowdloan.bit.country/",
  		blockExplorer: "https://pioneer.subscan.io/",
  		existentialDeposit: "100000000000000000",
  		symbol: "NEER",
  		decimals: 18,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2096-39",
  				paraId: 2096,
  				status: "won",
  				startTime: "2021-12-01T04:27:00.000Z",
  				endTime: "2022-11-02T04:27:00.000Z",
  				auctionIndex: 13,
  				firstPeriod: 17,
  				lastPeriod: 24
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "pioneer",
  		chainBalanceSlug: "pioneer"
  	}
  };
  var aleph$1 = {
  	slug: "aleph",
  	name: "Aleph Zero",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aleph.png",
  	providers: {
  		"Aleph Zero Foundation": "wss://ws.azero.dev",
  		Dwellir: "wss://aleph-zero-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x70255b4d28de0fc4e1a193d7e175ad1ccef431598211c55538f1018651a0344e",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: "https://contribute.alephzero.org/",
  		blockExplorer: "https://alephzero.subscan.io/",
  		existentialDeposit: "500",
  		symbol: "AZERO",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: [
  			"PSP34",
  			"PSP22"
  		],
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "alephzero",
  		chainBalanceSlug: "alephzero"
  	}
  };
  var astar$1 = {
  	slug: "astar",
  	name: "Astar",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/astar.png",
  	providers: {
  		Astar: "wss://rpc.astar.network",
  		OnFinality: "wss://astar.api.onfinality.io/public-ws",
  		Dwellir: "wss://astar-rpc.dwellir.com",
  		Blast: "wss://astar.public.blastapi.io",
  		"1RPC": "wss://1rpc.io/astr",
  		"Light Client": "light://substrate-connect/polkadot/astar"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2006,
  		genesisHash: "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
  		addressPrefix: 5,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.astar.network/#/",
  		blockExplorer: "https://astar.subscan.io/",
  		existentialDeposit: "1000000",
  		symbol: "ASTR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: [
  			"PSP34",
  			"PSP22"
  		],
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2006-3",
  				paraId: 2006,
  				status: "won",
  				startTime: "2021-12-21T01:48:00.000Z",
  				endTime: "2023-10-24T01:48:00.000Z",
  				auctionIndex: 3,
  				firstPeriod: 6,
  				lastPeriod: 13
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "astar",
  		chainBalanceSlug: "astar"
  	}
  };
  var astarEvm$1 = {
  	slug: "astarEvm",
  	name: "Astar - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/astarevm.png",
  	providers: {
  		Astar: "https://evm.astar.network",
  		OnFinality: "https://astar.api.onfinality.io/public",
  		Dwellir: "https://astar-rpc.dwellir.com",
  		Blast: "https://astar.public.blastapi.io"
  	},
  	evmInfo: {
  		evmChainId: 592,
  		blockExplorer: "https://blockscout.com/astar/",
  		existentialDeposit: "0",
  		symbol: "ASTR",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var statemint$1 = {
  	slug: "statemint",
  	name: "Polkadot Asset Hub (Statemint)",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/statemint.png",
  	providers: {
  		Dwellir: "wss://statemint-rpc.dwellir.com",
  		"Dwellir Tunisia": "wss://statemint-rpc-tn.dwellir.com",
  		"IBP-GeoDNS1": "wss://sys.ibp.network/statemint",
  		"IBP-GeoDNS2": "wss://sys.dotters.network/statemint",
  		StakeWorld: "wss://dot-rpc.stakeworld.io/assethub"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 1000,
  		genesisHash: "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f",
  		addressPrefix: 0,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://assethub-polkadot.subscan.io/",
  		existentialDeposit: "100000000",
  		symbol: "DOT",
  		decimals: 10,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "assethub-polkadot",
  		chainBalanceSlug: "statemint"
  	}
  };
  var acala$1 = {
  	slug: "acala",
  	name: "Acala",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acala.png",
  	providers: {
  		"Acala Foundation 0": "wss://acala-rpc-0.aca-api.network",
  		"Acala Foundation 1": "wss://acala-rpc-1.aca-api.network",
  		"Acala Foundation 2": "wss://acala-rpc-2.aca-api.network/ws",
  		"Acala Foundation 3": "wss://acala-rpc-3.aca-api.network/ws",
  		OnFinality: "wss://acala-polkadot.api.onfinality.io/public-ws",
  		Dwellir: "wss://acala-rpc.dwellir.com",
  		LuckyFriday: "wss://rpc-acala.luckyfriday.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2000,
  		genesisHash: "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c",
  		addressPrefix: 10,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://distribution.acala.network/",
  		blockExplorer: "https://acala.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "ACA",
  		decimals: 12,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2000-0",
  				paraId: 2000,
  				status: "won",
  				startTime: "2021-12-21T01:48:00.000Z",
  				endTime: "2023-10-24T01:48:00.000Z",
  				auctionIndex: 1,
  				firstPeriod: 6,
  				lastPeriod: 13
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "acala",
  		chainBalanceSlug: "acala"
  	}
  };
  var polygon$1 = {
  	slug: "polygon",
  	name: "Polygon",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polygon.png",
  	providers: {
  		"Polygon Scan": "https://polygon-rpc.com/",
  		Llamarpc: "https://polygon.llamarpc.com",
  		BlastApi: "https://polygon-mainnet.public.blastapi.io",
  		BorPublicNode: "https://polygon-bor.publicnode.com"
  	},
  	evmInfo: {
  		evmChainId: 137,
  		blockExplorer: "https://polygonscan.com",
  		existentialDeposit: "0",
  		symbol: "MATIC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://polygonscan.com"
  	},
  	substrateInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "polygon"
  	}
  };
  var arbitrum_one$1 = {
  	slug: "arbitrum_one",
  	name: "Arbitrum One",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/arbitrum_one.png",
  	providers: {
  		Omniatech: "https://endpoints.omniatech.io/v1/arbitrum/one/public",
  		BlastApi: "https://arbitrum-one.public.blastapi.io"
  	},
  	evmInfo: {
  		evmChainId: 42161,
  		blockExplorer: "https://arbiscan.io",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://arbiscan.io"
  	},
  	substrateInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "arbitrum"
  	}
  };
  var optimism$1 = {
  	slug: "optimism",
  	name: "Optimism",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/optimism.png",
  	providers: {
  		"Kyber Engineering": "https://optimism.kyberengineering.io",
  		BlastApi: "https://optimism-mainnet.public.blastapi.io"
  	},
  	evmInfo: {
  		evmChainId: 10,
  		blockExplorer: "https://optimistic.etherscan.io",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://optimistic.etherscan.io"
  	},
  	substrateInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "optimism"
  	}
  };
  var tomochain$1 = {
  	slug: "tomochain",
  	name: "Viction",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tomochain.png",
  	providers: {
  		TomoChain: "https://rpc.tomochain.com"
  	},
  	evmInfo: {
  		evmChainId: 88,
  		blockExplorer: "https://tomoscan.io",
  		existentialDeposit: "0",
  		symbol: "VIC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://tomoscan.io"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var alephTest$1 = {
  	slug: "alephTest",
  	name: "Aleph Zero Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/alephtest.png",
  	providers: {
  		"Aleph Zero Foundation": "wss://ws.test.azero.dev"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x05d5279c52c484cc80396535a316add7d47b1c5b9e0398dd1f584149341460c5",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "TZERO",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: [
  			"PSP34",
  			"PSP22"
  		],
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var shiden$1 = {
  	slug: "shiden",
  	name: "Shiden",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shiden.png",
  	providers: {
  		Astar: "wss://rpc.shiden.astar.network",
  		OnFinality: "wss://shiden.api.onfinality.io/public-ws",
  		Dwellir: "wss://shiden-rpc.dwellir.com",
  		Blast: "wss://shiden.public.blastapi.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2007,
  		genesisHash: "0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108",
  		addressPrefix: 5,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://shiden.subscan.io/",
  		existentialDeposit: "1000000",
  		symbol: "SDN",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: [
  			"PSP34",
  			"PSP22"
  		],
  		crowdloanParaId: 3335,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2258-92",
  				paraId: 2258,
  				status: "won",
  				startTime: "2023-01-25T04:27:00.000Z",
  				endTime: "2023-12-27T04:27:00.000Z",
  				auctionIndex: 70,
  				firstPeriod: 27,
  				lastPeriod: 34
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2120-75",
  				paraId: 2120,
  				status: "won",
  				startTime: "2022-05-18T04:27:00.000Z",
  				endTime: "2023-04-19T04:27:00.000Z",
  				auctionIndex: 35,
  				firstPeriod: 21,
  				lastPeriod: 28
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2007-0",
  				paraId: 2007,
  				status: "won",
  				startTime: "2021-06-16T04:27:00.000Z",
  				endTime: "2022-05-18T04:27:00.000Z",
  				auctionIndex: 3,
  				firstPeriod: 13,
  				lastPeriod: 20
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "shiden",
  		chainBalanceSlug: "shiden"
  	}
  };
  var shidenEvm$1 = {
  	slug: "shidenEvm",
  	name: "Shiden - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shidenevm.png",
  	providers: {
  		Astar: "https://evm.shiden.astar.network",
  		OnFinality: "https://shiden.api.onfinality.io/public",
  		Dwellir: "https://shiden-rpc.dwellir.com",
  		Blast: "https://shiden.public.blastapi.io"
  	},
  	evmInfo: {
  		evmChainId: 336,
  		blockExplorer: "https://blockscout.com/shiden/",
  		existentialDeposit: "0",
  		symbol: "SDN",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var shibuya$1 = {
  	slug: "shibuya",
  	name: "Shibuya Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shibuya.png",
  	providers: {
  		Shibuya: "wss://rpc.shibuya.astar.network",
  		Dwellir: "wss://shibuya-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 1000,
  		genesisHash: "0xddb89973361a170839f80f152d2e9e38a376a5a7eccefcade763f46a8e567019",
  		addressPrefix: 5,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://shibuya.subscan.io/",
  		existentialDeposit: "1000000",
  		symbol: "SBY",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: [
  			"PSP34",
  			"PSP22"
  		],
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "shibuya",
  		chainBalanceSlug: "shibuya"
  	}
  };
  var shibuyaEvm$1 = {
  	slug: "shibuyaEvm",
  	name: "Shibuya Testnet - EVM",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shibuyaevm.png",
  	providers: {
  		Shibuya: "https://evm.shibuya.astar.network ",
  		BlastAPI: "https://shibuya.public.blastapi.io"
  	},
  	evmInfo: {
  		evmChainId: 81,
  		blockExplorer: "https://blockscout.com/shibuya/",
  		existentialDeposit: "0",
  		symbol: "SBY",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var aventus$1 = {
  	slug: "aventus",
  	name: "Aventus Polkadot",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aventus.png",
  	providers: {
  		Aventus: "wss://public-rpc.mainnet.aventus.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2056,
  		genesisHash: "0x8b5c955b5c8fd7112562327e3859473df4e3dff49bd72a113dbb668d2cfa20d7",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.mainnet.aventus.io/",
  		existentialDeposit: "0",
  		symbol: "AVT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2056-45",
  				paraId: 2056,
  				status: "won",
  				startTime: "2022-08-30T01:48:00.000Z",
  				endTime: "2024-07-02T01:48:00.000Z",
  				auctionIndex: 26,
  				firstPeriod: 9,
  				lastPeriod: 16
  			}
  		]
  	},
  	extraInfo: null
  };
  var westend$1 = {
  	slug: "westend",
  	name: "Westend",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/westend.png",
  	providers: {
  		Parity: "wss://westend-rpc.polkadot.io",
  		Dwellir: "wss://westend-rpc.dwellir.com",
  		"Light Client": "light://substrate-connect/westend",
  		DottersNet: "wss://rpc.dotters.network/westend",
  		"Dwellir Tunisia": "wss://westend-rpc-tn.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://westend.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "WND",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "westend",
  		chainBalanceSlug: "westend"
  	}
  };
  var rococo$1 = {
  	slug: "rococo",
  	name: "Rococo",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/rococo.png",
  	providers: {
  		Parity: "wss://rococo-rpc.polkadot.io",
  		"Light Client": "light://substrate-connect/rococo"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://rococo.subscan.io/",
  		existentialDeposit: "33333333",
  		symbol: "ROC",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: [
  			"PSP34",
  			"PSP22"
  		],
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "rococo",
  		chainBalanceSlug: null
  	}
  };
  var bitcountry$1 = {
  	slug: "bitcountry",
  	name: "Bit.Country - Alpha Net",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitcountry.png",
  	providers: {
  		"Metaverse Foundation": "wss://alphanet-rpc-gcp.bit.country"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x8ffa3204b182fbda4676f75ea2d6a9bbdbbaf0d78470c62952e918c60e0583b4",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1",
  		symbol: "NUUM",
  		decimals: 18,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var equilibrium_parachain$1 = {
  	slug: "equilibrium_parachain",
  	name: "Equilibrium",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/equilibrium_parachain.png",
  	providers: {
  		Equilibrium: "wss://node.pol.equilibrium.io",
  		Dwellir: "wss://equilibrium-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2011,
  		genesisHash: "0x89d3ec46d2fb43ef5a9713833373d5ea666b092fa8fd68fbc34596036571b907",
  		addressPrefix: 68,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://equilibrium.io/en/crowdloan#bid",
  		blockExplorer: "https://equilibrium.subscan.io",
  		existentialDeposit: "100000000",
  		symbol: "EQ",
  		decimals: 9,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2011-29",
  				paraId: 2011,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 12,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: null
  };
  var moonbase$1 = {
  	slug: "moonbase",
  	name: "Moonbase Alpha",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonbase.png",
  	providers: {
  		"Moonbeam Foundation": "wss://wss.api.moonbase.moonbeam.network",
  		Blast: "wss://moonbase-alpha.public.blastapi.io"
  	},
  	evmInfo: {
  		evmChainId: 1287,
  		blockExplorer: "https://moonbase.moonscan.io/",
  		existentialDeposit: "0",
  		symbol: "DEV",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC721",
  			"ERC20"
  		],
  		abiExplorer: "https://api-moonbase.moonscan.io/api?module=contract&action=getabi"
  	},
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 1000,
  		genesisHash: "0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527",
  		addressPrefix: 1287,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://moonbase.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "DEV",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "moonbase",
  		chainBalanceSlug: "moonbase"
  	}
  };
  var moonriver$1 = {
  	slug: "moonriver",
  	name: "Moonriver",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonriver.png",
  	providers: {
  		"Moonbeam Foundation": "wss://wss.api.moonriver.moonbeam.network",
  		Blast: "wss://moonriver.public.blastapi.io",
  		Dwellir: "wss://moonriver-rpc.dwellir.com",
  		UnitedBloc: "wss://moonriver.unitedbloc.com:2001"
  	},
  	evmInfo: {
  		evmChainId: 1285,
  		blockExplorer: "https://moonriver.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "MOVR",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC721",
  			"ERC20"
  		],
  		abiExplorer: "https://api-moonriver.moonscan.io/api?module=contract&action=getabi"
  	},
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2023,
  		genesisHash: "0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b",
  		addressPrefix: 1285,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://moonriver.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "MOVR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2023-2",
  				paraId: 2023,
  				status: "won",
  				startTime: "2021-06-16T04:27:00.000Z",
  				endTime: "2022-05-18T04:27:00.000Z",
  				auctionIndex: 2,
  				firstPeriod: 13,
  				lastPeriod: 20
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2000-1",
  				paraId: 2000,
  				status: "won",
  				startTime: "2021-06-16T04:27:00.000Z",
  				endTime: "2022-05-18T04:27:00.000Z",
  				auctionIndex: 2,
  				firstPeriod: 13,
  				lastPeriod: 20
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "moonriver",
  		chainBalanceSlug: "moonriver"
  	}
  };
  var turingStaging$1 = {
  	slug: "turingStaging",
  	name: "Turing Staging",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/turingstaging.png",
  	providers: {
  		Turing: "wss://rpc.turing-staging.oak.tech"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2114,
  		genesisHash: "0xd54f0988402deb4548538626ce37e4a318441ea0529ca369400ebec4e04dfe4b",
  		addressPrefix: 51,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "100000000",
  		symbol: "TUR",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var turing$1 = {
  	slug: "turing",
  	name: "Turing",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/turing.png",
  	providers: {
  		Turing: "wss://rpc.turing.oak.tech",
  		Dwellir: "wss://turing-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2114,
  		genesisHash: "0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d",
  		addressPrefix: 51,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://turing.subscan.io/",
  		existentialDeposit: "100000000",
  		symbol: "TUR",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2114-68",
  				paraId: 2114,
  				status: "won",
  				startTime: "2022-04-06T04:27:00.000Z",
  				endTime: "2023-03-08T04:27:00.000Z",
  				auctionIndex: 30,
  				firstPeriod: 20,
  				lastPeriod: 27
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "turing",
  		chainBalanceSlug: "turing"
  	}
  };
  var bifrost$1 = {
  	slug: "bifrost",
  	name: "Bifrost Kusama",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bifrost.png",
  	providers: {
  		"Liebi 0": "wss://bifrost-rpc.liebi.com/ws",
  		Dwellir: "wss://bifrost-rpc.dwellir.com",
  		OnFinality: "wss://bifrost-parachain.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2001,
  		genesisHash: "0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed",
  		addressPrefix: 6,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://bifrost.app/vcrowdloan",
  		blockExplorer: "https://bifrost-kusama.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "BNC",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2262-95",
  				paraId: 2262,
  				status: "won",
  				startTime: "2023-03-08T04:27:00.000Z",
  				endTime: "2024-02-07T04:27:00.000Z",
  				auctionIndex: 71,
  				firstPeriod: 28,
  				lastPeriod: 35
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2001-9",
  				paraId: 2001,
  				status: "won",
  				startTime: "2021-06-16T04:27:00.000Z",
  				endTime: "2022-05-18T04:27:00.000Z",
  				auctionIndex: 5,
  				firstPeriod: 13,
  				lastPeriod: 20
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "bifrost-kusama",
  		chainBalanceSlug: "bifrost"
  	}
  };
  var bifrost_dot$1 = {
  	slug: "bifrost_dot",
  	name: "Bifrost Polkadot",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bifrost_dot.png",
  	providers: {
  		Dwellir: "wss://bifrost-polkadot-rpc.dwellir.com",
  		Liebi: "wss://hk.p.bifrost-rpc.liebi.com/ws",
  		LiebiEU: "wss://eu.bifrost-polkadot-rpc.liebi.com/ws",
  		OnFinality: "wss://bifrost-polkadot.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2030,
  		genesisHash: "0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b",
  		addressPrefix: 6,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://bifrost.app/vcrowdloan",
  		blockExplorer: "https://bifrost.subscan.io",
  		existentialDeposit: "10000000000",
  		symbol: "BNC",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2030-37",
  				paraId: 2030,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 65,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "bifrost",
  		chainBalanceSlug: "bifrost-p"
  	}
  };
  var bifrost_testnet$1 = {
  	slug: "bifrost_testnet",
  	name: "Bifrost Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bifrost_testnet.png",
  	providers: {
  		Liebi: "wss://bifrost-rpc.rococo.liebi.com/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "rococo",
  		paraId: 2030,
  		genesisHash: "0x0c003b98abbedae774f5e13cd6146781317016725ab4db34312ea2681e9901f3",
  		addressPrefix: 6,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://bifrost-testnet.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "BNC",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "bifrost-testnet"
  	}
  };
  var calamari$1 = {
  	slug: "calamari",
  	name: "Calamari",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/calamari.png",
  	providers: {
  		"Manta Network": "wss://calamari.systems"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2084,
  		genesisHash: "0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1",
  		addressPrefix: 78,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://calamari.network/",
  		blockExplorer: "https://calamari.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "KMA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2084-27",
  				paraId: 2084,
  				status: "won",
  				startTime: "2021-09-08T04:27:00.000Z",
  				endTime: "2022-08-10T04:27:00.000Z",
  				auctionIndex: 7,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "calamari",
  		chainBalanceSlug: "calamari"
  	}
  };
  var amplitude$1 = {
  	slug: "amplitude",
  	name: "Amplitude",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/amplitude.png",
  	providers: {
  		Amplitude: "wss://rpc-amplitude.pendulumchain.tech"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2124,
  		genesisHash: "0xcceae7f3b9947cdb67369c026ef78efa5f34a08fe5808d373c04421ecf4f1aaf",
  		addressPrefix: 57,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "AMPE",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2124-81",
  				paraId: 2124,
  				status: "won",
  				startTime: "2022-08-10T04:27:00.000Z",
  				endTime: "2023-07-12T04:27:00.000Z",
  				auctionIndex: 42,
  				firstPeriod: 23,
  				lastPeriod: 30
  			}
  		]
  	},
  	extraInfo: null
  };
  var amplitude_test$1 = {
  	slug: "amplitude_test",
  	name: "Amplitude Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/amplitude_test.png",
  	providers: {
  		Amplitude: "wss://rpc-foucoco.pendulumchain.tech"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "rococo",
  		paraId: 2124,
  		genesisHash: "0xa8d080b07f9c84465aeb9576db5a7838bcbca3ffb78dbfd7d4b56acafc1f29d1",
  		addressPrefix: 57,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "AMPE",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var bobabase$1 = {
  	slug: "bobabase",
  	name: "Bobabase Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bobabase.png",
  	providers: {
  	},
  	evmInfo: {
  		evmChainId: 1297,
  		blockExplorer: "https://blockexplorer.bobabase.boba.network/",
  		existentialDeposit: "0",
  		symbol: "BOBA",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://blockexplorer.bobabase.boba.network/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var ethereum_goerli$1 = {
  	slug: "ethereum_goerli",
  	name: "Ethereum Goerli",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ethereum_goerli.png",
  	providers: {
  		Infura: "https://goerli.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"
  	},
  	evmInfo: {
  		evmChainId: 5,
  		blockExplorer: "https://goerli.etherscan.io",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var binance_test$1 = {
  	slug: "binance_test",
  	name: "Binance Smart Chain (Testnet)",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/binance_test.png",
  	providers: {
  		Binance: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  		Binance2: "https://data-seed-prebsc-2-s1.binance.org:8545/"
  	},
  	evmInfo: {
  		evmChainId: 97,
  		blockExplorer: "https://testnet.bscscan.com",
  		existentialDeposit: "0",
  		symbol: "tBNB",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var parallel$1 = {
  	slug: "parallel",
  	name: "Parallel",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/parallel.png",
  	providers: {
  		Dwellir: "wss://parallel-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2012,
  		genesisHash: "0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97",
  		addressPrefix: 172,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.parallel.fi/#/auction/contribute/polkadot/2012",
  		blockExplorer: "https://parallel.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "PARA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: 3350,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2012-6",
  				paraId: 2012,
  				status: "won",
  				startTime: "2021-12-21T01:48:00.000Z",
  				endTime: "2023-10-24T01:48:00.000Z",
  				auctionIndex: 4,
  				firstPeriod: 6,
  				lastPeriod: 13
  			},
  			{
  				relayChain: "polkadot",
  				fundId: "3350-72",
  				paraId: 3350,
  				status: "failed",
  				startTime: "2023-10-24T01:48:00.000Z",
  				endTime: "2025-08-26T01:48:00.000Z",
  				auctionIndex: 0,
  				firstPeriod: 14,
  				lastPeriod: 21
  			},
  			{
  				relayChain: "polkadot",
  				fundId: "3350-78",
  				paraId: 3350,
  				status: "won",
  				startTime: "2024-01-16T01:48:00.000Z",
  				endTime: "2025-11-18T01:48:00.000Z",
  				auctionIndex: 54,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "parallel",
  		chainBalanceSlug: "parallel"
  	}
  };
  var clover$1 = {
  	slug: "clover",
  	name: "Clover",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/clover.png",
  	providers: {
  		Clover: "wss://rpc-para.clover.finance"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2002,
  		genesisHash: "0x5c7bd13edf349b33eb175ffae85210299e324d852916336027391536e686f267",
  		addressPrefix: 128,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://lucky.clover.finance/?type=support",
  		blockExplorer: "https://clv.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "CLV",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2002-5",
  				paraId: 2002,
  				status: "won",
  				startTime: "2021-12-21T01:48:00.000Z",
  				endTime: "2023-10-24T01:48:00.000Z",
  				auctionIndex: 5,
  				firstPeriod: 6,
  				lastPeriod: 13
  			},
  			{
  				relayChain: "polkadot",
  				fundId: "2002-76",
  				paraId: 2002,
  				status: "won",
  				startTime: "2024-01-16T01:48:00.000Z",
  				endTime: "2025-11-18T01:48:00.000Z",
  				auctionIndex: 53,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "clv",
  		chainBalanceSlug: "clover"
  	}
  };
  var cloverEvm$1 = {
  	slug: "cloverEvm",
  	name: "Clover - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/cloverevm.png",
  	providers: {
  		Clover: "wss://rpc-para.clover.finance"
  	},
  	evmInfo: {
  		evmChainId: 1024,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "CLV",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var hydradx_main$1 = {
  	slug: "hydradx_main",
  	name: "HydraDX",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/hydradx_main.png",
  	providers: {
  		"Galactic Council": "wss://rpc.hydradx.cloud",
  		Dwellir: "wss://hydradx-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2034,
  		genesisHash: "0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d",
  		addressPrefix: 63,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://loan.hydradx.io/",
  		blockExplorer: "https://hydradx.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "HDX",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2034-25",
  				paraId: 2034,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 9,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "hydradx",
  		chainBalanceSlug: "hydradx"
  	}
  };
  var edgeware$1 = {
  	slug: "edgeware",
  	name: "Edgeware",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/edgeware.png",
  	providers: {
  		JelliedOwl: "wss://edgeware.jelliedowl.net",
  		"Commonwealth Labs": "wss://mainnet2.edgewa.re"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b",
  		addressPrefix: 7,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://edgeware.subscan.io/",
  		existentialDeposit: "10000000000000",
  		symbol: "EDG",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "edgeware"
  	}
  };
  var centrifuge$1 = {
  	slug: "centrifuge",
  	name: "Centrifuge",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/centrifuge.png",
  	providers: {
  		Centrifuge: "wss://fullnode.parachain.centrifuge.io",
  		OnFinality: "wss://centrifuge-parachain.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2031,
  		genesisHash: "0xb3db41421702df9a7fcac62b53ffeac85f7853cc4e689e0b93aeb3db18c09d82",
  		addressPrefix: 36,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://centrifuge.io/parachain/crowdloan/",
  		blockExplorer: "https://centrifuge.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "CFG",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: 3353,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2031-18",
  				paraId: 2031,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 8,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "centrifuge",
  		chainBalanceSlug: "centrifuge-parachain"
  	}
  };
  var interlay$1 = {
  	slug: "interlay",
  	name: "Interlay",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/interlay.png",
  	providers: {
  		"Kintsugi Labs": "wss://api.interlay.io/parachain",
  		Dwellir: "wss://interlay-rpc.dwellir.com",
  		LuckyFriday: "wss://rpc-interlay.luckyfriday.io/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2032,
  		genesisHash: "0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72",
  		addressPrefix: 2032,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.interlay.io/",
  		blockExplorer: "https://interlay.subscan.io/",
  		existentialDeposit: null,
  		symbol: "INTR",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2032-15",
  				paraId: 2032,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 10,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "interlay",
  		chainBalanceSlug: "interlay"
  	}
  };
  var nodle$1 = {
  	slug: "nodle",
  	name: "Nodle",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/nodle.png",
  	providers: {
  		OnFinality: "wss://nodle-parachain.api.onfinality.io/public-ws",
  		Dwellir: "wss://eden-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2026,
  		genesisHash: "0x97da7ede98d7bad4e36b4d734b6055425a3be036da2a332ea5a7037656427a21",
  		addressPrefix: 37,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://parachain.nodle.com/",
  		blockExplorer: "https://nodle.subscan.io/",
  		existentialDeposit: "10000",
  		symbol: "NODL",
  		decimals: 11,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: 2012,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2026-14",
  				paraId: 2026,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 11,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "nodle",
  		chainBalanceSlug: "nodle"
  	}
  };
  var darwinia2$1 = {
  	slug: "darwinia2",
  	name: "Darwinia 2",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/darwinia2.png",
  	providers: {
  		"Darwinia Network": "wss://rpc.darwinia.network",
  		"Darwinia Community": "wss://darwinia-rpc.darwiniacommunitydao.xyz",
  		Dwellir: "wss://darwinia-rpc.dwellir.com"
  	},
  	evmInfo: {
  		evmChainId: 46,
  		blockExplorer: "https://darwinia.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "RING",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2046,
  		genesisHash: "0xf0b8924b12e8108550d28870bc03f7b45a947e1b2b9abf81bfb0b89ecb60570e",
  		addressPrefix: 18,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://darwinia.network/plo_contribute",
  		blockExplorer: "https://darwinia.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "RING",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "darwinia",
  		chainBalanceSlug: "darwinia"
  	}
  };
  var sora_ksm$1 = {
  	slug: "sora_ksm",
  	name: "SORA Kusama",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sora_ksm.png",
  	providers: {
  		Soramitsu: "wss://ws.parachain-collator-2.c2.sora2.soramitsu.co.jp"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2011,
  		genesisHash: "0x6d8d9f145c2177fa83512492cdd80a71e29f22473f4a8943a6292149ac319fb9",
  		addressPrefix: 420,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: null,
  		existentialDeposit: "1000000000000000",
  		symbol: "XOR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2011-96",
  				paraId: 2011,
  				status: "won",
  				startTime: "2023-03-08T04:27:00.000Z",
  				endTime: "2024-02-07T04:27:00.000Z",
  				auctionIndex: 73,
  				firstPeriod: 28,
  				lastPeriod: 35
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2011-62",
  				paraId: 2011,
  				status: "won",
  				startTime: "2022-02-23T04:27:00.000Z",
  				endTime: "2023-01-25T04:27:00.000Z",
  				auctionIndex: 24,
  				firstPeriod: 19,
  				lastPeriod: 26
  			}
  		]
  	},
  	extraInfo: null
  };
  var odyssey$1 = {
  	slug: "odyssey",
  	name: "Ares Odyssey",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/odyssey.png",
  	providers: {
  		AresProtocol: "wss://odyssey.aresprotocol.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x0f3665e2e57fb38fd638145b69e567fb05bbadfd457624f90f15e5dbb31320bb",
  		addressPrefix: 34,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "ARES",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var polkadex$1 = {
  	slug: "polkadex",
  	name: "Polkadex",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadex.png",
  	providers: {
  		RadiumBlock: "wss://polkadex.public.curie.radiumblock.co/ws",
  		OnFinality: "wss://polkadex.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c",
  		addressPrefix: 88,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://polkadex.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "PDEX",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "polkadex",
  		chainBalanceSlug: "polkadex"
  	}
  };
  var polkadexTest$1 = {
  	slug: "polkadexTest",
  	name: "Polkadex - Testnet",
  	isTestnet: true,
  	chainStatus: "STOPPED",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadextest.png",
  	providers: {
  		"Polkadex Team": "wss://blockchain.polkadex.trade"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xd0024e7110db2a8b35d6599e64e82d3eb30070200a423398319efb6b4d596427",
  		addressPrefix: 88,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: "https://www.polkadex.trade/crowdloans",
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "Unit",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var rmrk$1 = {
  	slug: "rmrk",
  	name: "RMRK Devnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/rmrk.png",
  	providers: {
  		rmrk: "wss://staging.node.rmrk.app"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6c7ae90ef70a31fe9f0f2329007ff4b4c4fe62fe71cd2b753ee37c1aa1070fef",
  		addressPrefix: 0,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000",
  		symbol: "UNIT",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var dolphin$1 = {
  	slug: "dolphin",
  	name: "Dolphin Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dolphin.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x79372c8ed25b51c0d3c1f085becb264c93f1ecbc71dcf387fdb5c294fd823a08",
  		addressPrefix: 78,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://dolphin.subscan.io/",
  		existentialDeposit: null,
  		symbol: "DOL",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "dolphin"
  	}
  };
  var opal$1 = {
  	slug: "opal",
  	name: "Opal",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/opal.png",
  	providers: {
  		Unique: "wss://ws-opal.unique.network",
  		Europe: "wss://eu-ws-opal.unique.network",
  		NA: "wss://us-ws-opal.unique.network",
  		Asia: "wss://asia-ws-opal.unique.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2037,
  		genesisHash: "0xc87870ef90a438d574b8e320f17db372c50f62beb52e479c8ff6ee5b460670b9",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "OPL",
  		decimals: 18,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var efinity$1 = {
  	slug: "efinity",
  	name: "Efinity",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/efinity.png",
  	providers: {
  		Efinity: "wss://rpc.efinity.io",
  		Dwellir: "wss://efinity -rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2021,
  		genesisHash: "0x335369975fced3fc22e23498da306a712f4fd964c957364d53c49cea9db8bc2f",
  		addressPrefix: 1110,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://enjin.io/efinity-crowdloan",
  		blockExplorer: "https://efinity.subscan.io/",
  		existentialDeposit: "1000000000000000000",
  		symbol: "EFI",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2021-20",
  				paraId: 2021,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 6,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "efinity"
  	}
  };
  var composableFinance$1 = {
  	slug: "composableFinance",
  	name: "Composable Finance",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/composablefinance.png",
  	providers: {
  		Composable: "wss://rpc.composable.finance"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2019,
  		genesisHash: "0xdaab8df776eb52ec604a5df5d388bb62a050a0aaec4556a64265b9d42755552d",
  		addressPrefix: 50,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.composable.finance/",
  		blockExplorer: "https://composable.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "LAYR",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2019-17",
  				paraId: 2019,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 7,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "composable",
  		chainBalanceSlug: "composable"
  	}
  };
  var phala$1 = {
  	slug: "phala",
  	name: "Phala",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/phala.png",
  	providers: {
  		Phala: "wss://api.phala.network/ws",
  		OnFinality: "wss://phala.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2035,
  		genesisHash: "0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736",
  		addressPrefix: 30,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://phala.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "PHA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2035-32",
  				paraId: 2035,
  				status: "won",
  				startTime: "2022-03-15T01:48:00.000Z",
  				endTime: "2024-01-16T01:48:00.000Z",
  				auctionIndex: 13,
  				firstPeriod: 7,
  				lastPeriod: 14
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "phala",
  		chainBalanceSlug: "phala"
  	}
  };
  var crust$1 = {
  	slug: "crust",
  	name: "Crust",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crust.png",
  	providers: {
  		Crust: "wss://crust-parachain.crustapps.net"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2008,
  		genesisHash: "0x4319cc49ee79495b57a1fec4d2bd43f59052dcc690276de566c2691d6df4f7b8",
  		addressPrefix: 88,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://crust-parachain.subscan.io/",
  		existentialDeposit: "100000000",
  		symbol: "CRU",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2008-44",
  				paraId: 2008,
  				status: "won",
  				startTime: "2022-11-22T01:48:00.000Z",
  				endTime: "2024-09-24T01:48:00.000Z",
  				auctionIndex: 30,
  				firstPeriod: 10,
  				lastPeriod: 17
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "crust-parachain",
  		chainBalanceSlug: "crust"
  	}
  };
  var statemine$1 = {
  	slug: "statemine",
  	name: "Kusama Asset Hub (Statemine)",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/statemine.png",
  	providers: {
  		Dwellir: "wss://statemine-rpc.dwellir.com",
  		"Dwellir Tunisia": "wss://statemine-rpc-tn.dwellir.com",
  		"IBP-GeoDNS1": "wss://sys.ibp.network/statemine",
  		"IBP-GeoDNS2": "wss://sys.dotters.network/statemine",
  		"Lucky Friday": "wss://rpc-asset-hub-kusama.luckyfriday.io",
  		"Stake World": "wss://ksm-rpc.stakeworld.io/assethub"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 1000,
  		genesisHash: "0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a",
  		addressPrefix: 2,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://assethub-kusama.subscan.io/",
  		existentialDeposit: "3333333",
  		symbol: "KSM",
  		decimals: 12,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "assethub-kusama",
  		chainBalanceSlug: "statemine"
  	}
  };
  var karura$1 = {
  	slug: "karura",
  	name: "Karura",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/karura.png",
  	providers: {
  		"Acala Foundation 0": "wss://karura-rpc-0.aca-api.network",
  		"Acala Foundation 1": "wss://karura-rpc-1.aca-api.network",
  		"Acala Foundation 2": "wss://karura-rpc-2.aca-api.network/ws",
  		"Acala Foundation 3": "wss://karura-rpc-3.aca-api.network/ws",
  		OnFinality: "wss://karura.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2000,
  		genesisHash: "0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b",
  		addressPrefix: 8,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://karura.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "KAR",
  		decimals: 12,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "karura",
  		chainBalanceSlug: "karura"
  	}
  };
  var khala$1 = {
  	slug: "khala",
  	name: "Khala",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/khala.png",
  	providers: {
  		Phala: "wss://khala-api.phala.network/ws",
  		OnFinality: "wss://khala.api.onfinality.io/public-ws",
  		Dwellir: "wss://khala-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2004,
  		genesisHash: "0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d",
  		addressPrefix: 30,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://khala.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "PHA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2004-6",
  				paraId: 2004,
  				status: "won",
  				startTime: "2021-06-16T04:27:00.000Z",
  				endTime: "2022-05-18T04:27:00.000Z",
  				auctionIndex: 4,
  				firstPeriod: 13,
  				lastPeriod: 20
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "khala",
  		chainBalanceSlug: "khala"
  	}
  };
  var kilt$1 = {
  	slug: "kilt",
  	name: "KILT Spiritnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kilt.png",
  	providers: {
  		"KILT Protocol": "wss://spiritnet.kilt.io/",
  		OnFinality: "wss://spiritnet.api.onfinality.io/public-ws",
  		Dwellir: "wss://kilt-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2086,
  		genesisHash: "0x411f057b9107718c9624d6aa4a3f23c1653898297f3d4d529d9bb6511a39dd21",
  		addressPrefix: 38,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://spiritnet.subscan.io/",
  		existentialDeposit: "10000000000000",
  		symbol: "KILT",
  		decimals: 15,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "spiritnet",
  		chainBalanceSlug: "spiritnet"
  	}
  };
  var basilisk$1 = {
  	slug: "basilisk",
  	name: "Basilisk",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/basilisk.png",
  	providers: {
  		"Basilisk ": "wss://rpc.basilisk.cloud",
  		Dwellir: "wss://basilisk-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2090,
  		genesisHash: "0xa85cfb9b9fd4d622a5b28289a02347af987d8f73fa3108450e2b4a11c1ce5755",
  		addressPrefix: 10041,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://loan.bsx.fi/",
  		blockExplorer: "https://basilisk.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "BSX",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2090-35",
  				paraId: 2090,
  				status: "won",
  				startTime: "2021-09-08T04:27:00.000Z",
  				endTime: "2022-08-10T04:27:00.000Z",
  				auctionIndex: 8,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "basilisk",
  		chainBalanceSlug: "basilisk"
  	}
  };
  var altair$1 = {
  	slug: "altair",
  	name: "Altair",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/altair.png",
  	providers: {
  		Centrifuge: "wss://fullnode.altair.centrifuge.io",
  		OnFinality: "wss://altair.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2088,
  		genesisHash: "0xaa3876c1dc8a1afcc2e9a685a49ff7704cfd36ad8c90bf2702b9d1b00cc40011",
  		addressPrefix: 136,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://centrifuge.io/altair/crowdloan/",
  		blockExplorer: "https://altair.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "AIR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2088-31",
  				paraId: 2088,
  				status: "won",
  				startTime: "2021-09-08T04:27:00.000Z",
  				endTime: "2022-08-10T04:27:00.000Z",
  				auctionIndex: 9,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "altair",
  		chainBalanceSlug: "altair"
  	}
  };
  var heiko$1 = {
  	slug: "heiko",
  	name: "Heiko",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/heiko.png",
  	providers: {
  		Parallel: "wss://heiko-rpc.parallel.fi"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2085,
  		genesisHash: "0x64a1c658a48b2e70a7fb1ad4c39eea35022568c20fc44a6e2e3d0a57aee6053b",
  		addressPrefix: 110,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.parallel.fi/#/auction/contribute/kusama/2085",
  		blockExplorer: "https://parallel-heiko.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "HKO",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2126-82",
  				paraId: 2126,
  				status: "won",
  				startTime: "2022-08-10T04:27:00.000Z",
  				endTime: "2023-07-12T04:27:00.000Z",
  				auctionIndex: 45,
  				firstPeriod: 23,
  				lastPeriod: 30
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2085-28",
  				paraId: 2085,
  				status: "won",
  				startTime: "2021-09-08T04:27:00.000Z",
  				endTime: "2022-08-10T04:27:00.000Z",
  				auctionIndex: 10,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "parallel-heiko",
  		chainBalanceSlug: "parallel-heiko"
  	}
  };
  var kintsugi$1 = {
  	slug: "kintsugi",
  	name: "Kintsugi",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kintsugi.png",
  	providers: {
  		"Kintsugi Labs": "wss://api-kusama.interlay.io/parachain",
  		OnFinality: "wss://kintsugi.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2092,
  		genesisHash: "0x9af9a64e6e4da8e3073901c3ff0cc4c3aad9563786d89daf6ad820b6e14a0b8b",
  		addressPrefix: 2092,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://kintsugi.interlay.io/",
  		blockExplorer: "https://kintsugi.subscan.io/",
  		existentialDeposit: null,
  		symbol: "KINT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2092-34",
  				paraId: 2092,
  				status: "won",
  				startTime: "2021-09-08T04:27:00.000Z",
  				endTime: "2022-08-10T04:27:00.000Z",
  				auctionIndex: 11,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "kintsugi",
  		chainBalanceSlug: "kintsugi"
  	}
  };
  var kintsugi_test$1 = {
  	slug: "kintsugi_test",
  	name: "Kintsugi Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kintsugi_test.png",
  	providers: {
  		testnet: "wss://api-dev-kintsugi.interlay.io/parachain"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2092,
  		genesisHash: "0xe3a1cf3db108e3e45c63a4841fe89ba95108b1db14fdec10c2e8a078ff322a67",
  		addressPrefix: 2092,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "KINT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var picasso$1 = {
  	slug: "picasso",
  	name: "Picasso",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/picasso.png",
  	providers: {
  		Composable: "wss://rpc.composablenodes.tech"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2087,
  		genesisHash: "0x6811a339673c9daa897944dcdac99c6e2939cc88245ed21951a0a3c9a2be75bc",
  		addressPrefix: 49,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.composable.finance/",
  		blockExplorer: "https://picasso.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "PICA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2270-100",
  				paraId: 2270,
  				status: "won",
  				startTime: "2023-05-31T04:27:00.000Z",
  				endTime: "2024-05-01T04:27:00.000Z",
  				auctionIndex: 84,
  				firstPeriod: 30,
  				lastPeriod: 37
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2130-85",
  				paraId: 2130,
  				status: "won",
  				startTime: "2022-08-10T04:27:00.000Z",
  				endTime: "2023-07-12T04:27:00.000Z",
  				auctionIndex: 49,
  				firstPeriod: 23,
  				lastPeriod: 30
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2087-37",
  				paraId: 2087,
  				status: "won",
  				startTime: "2021-12-01T04:27:00.000Z",
  				endTime: "2022-11-02T04:27:00.000Z",
  				auctionIndex: 12,
  				firstPeriod: 17,
  				lastPeriod: 24
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "picasso",
  		chainBalanceSlug: "picasso"
  	}
  };
  var quartz$1 = {
  	slug: "quartz",
  	name: "Quartz",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/quartz.png",
  	providers: {
  		"Unique Europe": "wss://eu-ws-quartz.unique.network",
  		"Unique US": "wss://us-ws-quartz.unique.network",
  		"Unique Asia": "wss://asia-ws-quartz.unique.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2095,
  		genesisHash: "0xcd4d732201ebe5d6b014edda071c4203e16867305332301dc8d092044b28e554",
  		addressPrefix: 255,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://unique.network/quartz/crowdloan/",
  		blockExplorer: "https://quartz.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "QTZ",
  		decimals: 18,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2095-45",
  				paraId: 2095,
  				status: "won",
  				startTime: "2021-12-01T04:27:00.000Z",
  				endTime: "2022-11-02T04:27:00.000Z",
  				auctionIndex: 14,
  				firstPeriod: 17,
  				lastPeriod: 24
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "quartz"
  	}
  };
  var unique_network$1 = {
  	slug: "unique_network",
  	name: "Unique",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/unique_network.png",
  	providers: {
  		unique: "wss://us-ws.unique.network/",
  		UniqueEu: "wss://eu-ws.unique.network/",
  		UniqueAsia: "wss://asia-ws.unique.network/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2037,
  		genesisHash: "0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31",
  		addressPrefix: 7391,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://unique.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "UNQ",
  		decimals: 18,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2037-31",
  				paraId: 2037,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 14,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "unique",
  		chainBalanceSlug: "unique"
  	}
  };
  var genshiro$1 = {
  	slug: "genshiro",
  	name: "Genshiro",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/genshiro.png",
  	providers: {
  		Equilibrium: "wss://node.genshiro.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2024,
  		genesisHash: "0x9de765698374eb576968c8a764168893fb277e65ad3ddafcfe2c49593fc6d663",
  		addressPrefix: 67,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://genshiro.equilibrium.io/en",
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "GENS",
  		decimals: 9,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2226-88",
  				paraId: 2226,
  				status: "won",
  				startTime: "2022-11-02T04:27:00.000Z",
  				endTime: "2023-10-04T04:27:00.000Z",
  				auctionIndex: 56,
  				firstPeriod: 25,
  				lastPeriod: 32
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2024-43",
  				paraId: 2024,
  				status: "won",
  				startTime: "2021-12-01T04:27:00.000Z",
  				endTime: "2022-11-02T04:27:00.000Z",
  				auctionIndex: 15,
  				firstPeriod: 17,
  				lastPeriod: 24
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "genshiro"
  	}
  };
  var genshiro_testnet$1 = {
  	slug: "genshiro_testnet",
  	name: "Genshiro Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/genshiro_testnet.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xdec164ef73b27c5b7e404114305102018a2b5a4ddda665bb510ce896ad5ba78d",
  		addressPrefix: 68,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "TOKEN",
  		decimals: 9,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: [
  		],
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subsocial_x$1 = {
  	slug: "subsocial_x",
  	name: "Subsocial",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subsocial_x.png",
  	providers: {
  		subsocialx: "wss://para.f3joule.space"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2101,
  		genesisHash: "0x4a12be580bb959937a1c7a61d5cf24428ed67fa571974b4007645d1886e7c89f",
  		addressPrefix: 28,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://app.subsocial.network/crowdloan",
  		blockExplorer: null,
  		existentialDeposit: "100000000",
  		symbol: "SUB",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var zeitgeist$1 = {
  	slug: "zeitgeist",
  	name: "Zeitgeist",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/zeitgeist.png",
  	providers: {
  		OnFinality: "wss://zeitgeist.api.onfinality.io/public-ws",
  		Dwellir: "wss://zeitgeist-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2092,
  		genesisHash: "0x1bf2a2ecb4a868de66ea8610f2ce7c8c43706561b6476031315f6640fe38e060",
  		addressPrefix: 73,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.zeitgeist.pm/",
  		blockExplorer: "https://zeitgeist.subscan.io/",
  		existentialDeposit: "50000000",
  		symbol: "ZTG",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2092-53",
  				paraId: 2092,
  				status: "won",
  				startTime: "2022-11-22T01:48:00.000Z",
  				endTime: "2024-09-24T01:48:00.000Z",
  				auctionIndex: 32,
  				firstPeriod: 10,
  				lastPeriod: 17
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "zeitgeist",
  		chainBalanceSlug: "zeitgeist"
  	}
  };
  var sakura$1 = {
  	slug: "sakura",
  	name: "Sakura",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sakura.png",
  	providers: {
  		Clover: "wss://rpc.sakura.clover.finance"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x7b0f142a9299b0886595992f8cac58814c8956de6a31c77caca95db01370fc2c",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "SKU",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2016-49",
  				paraId: 2016,
  				status: "won",
  				startTime: "2022-01-12T04:27:00.000Z",
  				endTime: "2022-12-14T04:27:00.000Z",
  				auctionIndex: 18,
  				firstPeriod: 18,
  				lastPeriod: 25
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "sakura"
  	}
  };
  var shadow$1 = {
  	slug: "shadow",
  	name: "Crust Shadow",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shadow.png",
  	providers: {
  		Crust: "wss://rpc-shadow.crust.network/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2012,
  		genesisHash: "0xd4c0c08ca49dc7c680c3dac71a7c0703e5b222f4b6c03fe4c5219bb8f22c18dc",
  		addressPrefix: 66,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://polkadot.js.org/apps/#/parachains/crowdloan",
  		blockExplorer: "https://shadow.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "CSM",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2225-87",
  				paraId: 2225,
  				status: "won",
  				startTime: "2022-11-02T04:27:00.000Z",
  				endTime: "2023-10-04T04:27:00.000Z",
  				auctionIndex: 57,
  				firstPeriod: 25,
  				lastPeriod: 32
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2012-53",
  				paraId: 2012,
  				status: "won",
  				startTime: "2022-01-12T04:27:00.000Z",
  				endTime: "2022-12-14T04:27:00.000Z",
  				auctionIndex: 19,
  				firstPeriod: 18,
  				lastPeriod: 25
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "shadow",
  		chainBalanceSlug: "shadow"
  	}
  };
  var uniqueNft$1 = {
  	slug: "uniqueNft",
  	name: "Unique TestNet 2.0",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/uniquenft.png",
  	providers: {
  		Unique: "wss://testnet2.unique.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x7cb0b5ec1431e348b7f531f02e5e6ba6d5983e26ba77b58335957f3d00585cbd",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "UNQ",
  		decimals: 15,
  		hasNativeNft: true,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var robonomics$1 = {
  	slug: "robonomics",
  	name: "Robonomics",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/robonomics.png",
  	providers: {
  		Airalab: "wss://kusama.rpc.robonomics.network/",
  		Samsara: "wss://robonomics.0xsamsara.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2048,
  		genesisHash: "0x631ccc82a078481584041656af292834e1ae6daab61d2875b4dd0c14bb9b17bc",
  		addressPrefix: 32,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://robonomics.network/kusama-slot/",
  		blockExplorer: "https://robonomics.subscan.io/",
  		existentialDeposit: "1000",
  		symbol: "XRT",
  		decimals: 9,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2240-90",
  				paraId: 2240,
  				status: "won",
  				startTime: "2022-12-14T04:27:00.000Z",
  				endTime: "2023-11-15T04:27:00.000Z",
  				auctionIndex: 63,
  				firstPeriod: 26,
  				lastPeriod: 33
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2048-57",
  				paraId: 2048,
  				status: "won",
  				startTime: "2022-01-12T04:27:00.000Z",
  				endTime: "2022-12-14T04:27:00.000Z",
  				auctionIndex: 20,
  				firstPeriod: 18,
  				lastPeriod: 25
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "robonomics",
  		chainBalanceSlug: "robonomics"
  	}
  };
  var integritee$1 = {
  	slug: "integritee",
  	name: "Integritee Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/integritee.png",
  	providers: {
  		Integritee: "wss://kusama.api.integritee.network",
  		OnFinality: "wss://integritee-kusama.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2015,
  		genesisHash: "0xcdedc8eadbfa209d3f207bba541e57c3c58a667b05a2e1d1e86353c9000758da",
  		addressPrefix: 13,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.integritee.network/",
  		blockExplorer: "https://integritee.subscan.io/",
  		existentialDeposit: "1000000000",
  		symbol: "TEER",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2015-59",
  				paraId: 2015,
  				status: "won",
  				startTime: "2022-02-23T04:27:00.000Z",
  				endTime: "2023-01-25T04:27:00.000Z",
  				auctionIndex: 21,
  				firstPeriod: 19,
  				lastPeriod: 26
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "integritee",
  		chainBalanceSlug: "integritee"
  	}
  };
  var integriteePolkadot$1 = {
  	slug: "integriteePolkadot",
  	name: "Integritee Shell",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/integriteepolkadot.png",
  	providers: {
  		Integritee: "wss://polkadot.api.integritee.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2039,
  		genesisHash: "0xe13e7af377c64e83f95e0d70d5e5c3c01d697a84538776c5b9bbe0e7d7b6034c",
  		addressPrefix: 13,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.integritee.network/",
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "TEER",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2039-40",
  				paraId: 2039,
  				status: "won",
  				startTime: "2022-08-30T01:48:00.000Z",
  				endTime: "2024-07-02T01:48:00.000Z",
  				auctionIndex: 23,
  				firstPeriod: 9,
  				lastPeriod: 16
  			}
  		]
  	},
  	extraInfo: null
  };
  var crabParachain$1 = {
  	slug: "crabParachain",
  	name: "Crab2 Parachain",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crabparachain.png",
  	providers: {
  		Crab: "wss://crab-rpc.darwinia.network/",
  		Dwellir: "wss://darwiniacrab-rpc.dwellir.com"
  	},
  	evmInfo: {
  		evmChainId: 44,
  		blockExplorer: "https://crab.subscan.io",
  		existentialDeposit: "0",
  		symbol: "CRAB",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2105,
  		genesisHash: "0x86e49c195aeae7c5c4a86ced251f1a28c67b3c35d8289c387ede1776cdd88b24",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crab.network/plo",
  		blockExplorer: "https://crab.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "CRAB",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2105-60",
  				paraId: 2105,
  				status: "won",
  				startTime: "2022-02-23T04:27:00.000Z",
  				endTime: "2023-01-25T04:27:00.000Z",
  				auctionIndex: 22,
  				firstPeriod: 19,
  				lastPeriod: 26
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "crab",
  		chainBalanceSlug: null
  	}
  };
  var pangolin$1 = {
  	slug: "pangolin",
  	name: "Pangolin",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pangolin.png",
  	providers: {
  		Pangolin_Network: "wss://pangolin-rpc.darwinia.network"
  	},
  	evmInfo: {
  		evmChainId: 43,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "PRING",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: {
  		relaySlug: "rococo",
  		paraId: 2105,
  		genesisHash: "0xb067215e6232ffeed7cede2f92ac6b65f2121523fa221fc76f2e4430086c6b70",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "PRING",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var chainx$1 = {
  	slug: "chainx",
  	name: "Chain X",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/chainx.png",
  	providers: {
  		"chainx ": "wss://mainnet.chainx.org/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6ac13efb5b368b97b4934cef6edfdd99c2af51ba5109bfb8dacc116f9c584c10",
  		addressPrefix: 44,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "PCX",
  		decimals: 8,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var acala_testnet$1 = {
  	slug: "acala_testnet",
  	name: "Acala Mandala TC7",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acala_testnet.png",
  	providers: {
  		Mandala: "wss://mandala-tc9-rpc.aca-staging.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2000,
  		genesisHash: "0x3035b88c212be330a1a724c675d56d53a5016ec32af1790738832db0227ac54c",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://acala-testnet.subscan.io/",
  		existentialDeposit: "100000000000",
  		symbol: "ACA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "acala-testnet",
  		chainBalanceSlug: "acala-testnet"
  	}
  };
  var mangatax$1 = {
  	slug: "mangatax",
  	name: "MangataX Public Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mangatax.png",
  	providers: {
  		mangatax: "wss://collator-01-ws-rococo.mangata.online"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x797fe0d6ea6917b5a36707961d819dca1826628123510730425c3bafc65ccf59",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "MGAT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "mangatax"
  	}
  };
  var mangatax_para$1 = {
  	slug: "mangatax_para",
  	name: "Mangata X",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mangatax_para.png",
  	providers: {
  		mangata: "wss://kusama-rpc.mangata.online",
  		"Mangata Archive": "wss://kusama-archive.mangata.online"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2110,
  		genesisHash: "0xd611f22d291c5b7b69f1e105cca03352984c344c4421977efaa4cbdd1834e2aa",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://mangatax.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "MGX",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2256-91",
  				paraId: 2256,
  				status: "won",
  				startTime: "2023-01-25T04:27:00.000Z",
  				endTime: "2023-12-27T04:27:00.000Z",
  				auctionIndex: 68,
  				firstPeriod: 27,
  				lastPeriod: 34
  			},
  			{
  				relayChain: "kusama",
  				fundId: "2110-66",
  				paraId: 2110,
  				status: "won",
  				startTime: "2022-04-06T04:27:00.000Z",
  				endTime: "2023-03-08T04:27:00.000Z",
  				auctionIndex: 26,
  				firstPeriod: 20,
  				lastPeriod: 27
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "mangatax",
  		chainBalanceSlug: null
  	}
  };
  var encointer$1 = {
  	slug: "encointer",
  	name: "Encointer",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/encointer.png",
  	providers: {
  		"Encointer Association": "wss://kusama.api.encointer.org"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 1001,
  		genesisHash: "0x7dd99936c1e9e6d1ce7d90eb6f33bea8393b4bf87677d675aa63c9cb3e8c5b5b",
  		addressPrefix: 2,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://encointer.subscan.io/",
  		existentialDeposit: "33333333",
  		symbol: "KSM",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "encointer"
  	}
  };
  var litmus$1 = {
  	slug: "litmus",
  	name: "Litmus",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/litmus.png",
  	providers: {
  		litmus: "wss://rpc.litmus-parachain.litentry.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2106,
  		genesisHash: "0xda5831fbc8570e3c6336d0d72b8c08f8738beefec812df21ef2afc2982ede09c",
  		addressPrefix: 131,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://kusama-crowdloan.litentry.com/",
  		blockExplorer: null,
  		existentialDeposit: "100000000000",
  		symbol: "LIT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2106-63",
  				paraId: 2106,
  				status: "won",
  				startTime: "2022-02-23T04:27:00.000Z",
  				endTime: "2023-01-25T04:27:00.000Z",
  				auctionIndex: 23,
  				firstPeriod: 19,
  				lastPeriod: 26
  			}
  		]
  	},
  	extraInfo: null
  };
  var litentry$1 = {
  	slug: "litentry",
  	name: "Litentry",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/litentry.png",
  	providers: {
  		Litentry: "wss://rpc.litentry-parachain.litentry.io",
  		Dwellir: "wss://litentry-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2013,
  		genesisHash: "0x2fc8bb6ed7c0051bdcf4866c322ed32b6276572713607e3297ccf411b8f14aa9",
  		addressPrefix: 31,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://crowdloan.litentry.com/",
  		blockExplorer: null,
  		existentialDeposit: "100000000000",
  		symbol: "LIT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2013-35",
  				paraId: 2013,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 15,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: null
  };
  var tinkernet$1 = {
  	slug: "tinkernet",
  	name: "Tinkernet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tinkernet.png",
  	providers: {
  		Dwellir: "wss://tinkernet-rpc.dwellir.com",
  		"Light Client": "light://substrate-connect/kusama/tinkernet"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2125,
  		genesisHash: "0xd42e9606a995dfe433dc7955dc2a70f495f350f373daa200098ae84437816ad2",
  		addressPrefix: 117,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://invarch.network/tinkernet",
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "TNKR",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2125-80",
  				paraId: 2125,
  				status: "won",
  				startTime: "2022-08-10T04:27:00.000Z",
  				endTime: "2023-07-12T04:27:00.000Z",
  				auctionIndex: 43,
  				firstPeriod: 23,
  				lastPeriod: 30
  			}
  		]
  	},
  	extraInfo: null
  };
  var imbue_network$1 = {
  	slug: "imbue_network",
  	name: "Imbue Kusama",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/imbue_network.png",
  	providers: {
  		Imbue: "wss://kusama.imbuenetwork.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2121,
  		genesisHash: "0xca93a37c913a25fa8fdb33c7f738afc39379cb71d37874a16d4c091a5aef9f89",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000",
  		symbol: "IMBU",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2121-79",
  				paraId: 2121,
  				status: "won",
  				startTime: "2022-06-29T04:27:00.000Z",
  				endTime: "2023-05-31T04:27:00.000Z",
  				auctionIndex: 40,
  				firstPeriod: 22,
  				lastPeriod: 29
  			}
  		]
  	},
  	extraInfo: null
  };
  var subspace_test$1 = {
  	slug: "subspace_test",
  	name: "Subspace Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_test.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x332ef6e751e25426e38996c51299dfc53bcd56f40b53dce2b2fc8442ae9c4a74",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subspace_gemini_2a$1 = {
  	slug: "subspace_gemini_2a",
  	name: "Subspace Gemini 2a",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_2a.png",
  	providers: {
  		"Europe 0": "wss://eu-0.gemini-2a.subspace.network/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x43d10ffd50990380ffe6c9392145431d630ae67e89dbc9c014cac2a417759101",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.subspace.network/#/gemini-2a",
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subspace_gemini_3c$1 = {
  	slug: "subspace_gemini_3c",
  	name: "Subspace Gemini 3c",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3c.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xab946a15b37f59c5f4f27c5de93acde9fe67a28e0b724a43a30e4fe0e87246b7",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.subspace.network/#/gemini-3c",
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subspace_gemini_3d$1 = {
  	slug: "subspace_gemini_3d",
  	name: "Subspace Gemini 3d",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3d.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x7f489750cfe91e17fc19b42a5acaba41d1975cedd3440075d4a4b4171ad0ac20",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.subspace.network/#/gemini-3d",
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subspace_gemini_3e$1 = {
  	slug: "subspace_gemini_3e",
  	name: "Subspace Gemini 3e",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3e.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xa3cd4b592d93f79943fbc58fc90ca8f516106699c9cf4d7ada98ca22877bc1ae",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.subspace.network/#/gemini-3e",
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subspace_gemini_3f$1 = {
  	slug: "subspace_gemini_3f",
  	name: "Subspace Gemini 3f",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3f.png",
  	providers: {
  		"Gemini 3f": "wss://rpc-0.gemini-3f.subspace.network/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x92e91e657747c41eeabed5129ff51689d2e935b9f6abfbd5dfcb2e1d0d035095",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.subspace.network/#/gemini-3f",
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var origintrail$1 = {
  	slug: "origintrail",
  	name: "NeuroWeb Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/origintrail.png",
  	providers: {
  		TraceLabs: "wss://parachain-rpc.origin-trail.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2043,
  		genesisHash: "0xe7e0962324a3b86c83404dbea483f25fb5dab4c224791c81b756cfc948006174",
  		addressPrefix: 101,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://origintrail.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "NEURO",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2043-38",
  				paraId: 2043,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 17,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "origintrail",
  		chainBalanceSlug: "origintrail"
  	}
  };
  var subspace_gemini_3g$1 = {
  	slug: "subspace_gemini_3g",
  	name: "Subspace Gemini 3g",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3g.png",
  	providers: {
  		"Gemini 3g": "wss://rpc-0.gemini-3g.subspace.network/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x418040fc282f5e5ddd432c46d05297636f6f75ce68d66499ff4cbda69ccd180b",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var dorafactory$1 = {
  	slug: "dorafactory",
  	name: "Dorafactory",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dorafactory.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2115,
  		genesisHash: "0x577d331ca43646f547cdaa07ad0aa387a383a93416764480665103081f3eaf14",
  		addressPrefix: 128,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "DORA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2115-74",
  				paraId: 2115,
  				status: "won",
  				startTime: "2022-05-18T04:27:00.000Z",
  				endTime: "2023-04-19T04:27:00.000Z",
  				auctionIndex: 33,
  				firstPeriod: 21,
  				lastPeriod: 28
  			}
  		]
  	},
  	extraInfo: null
  };
  var bajun$1 = {
  	slug: "bajun",
  	name: "Bajun Kusama",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bajun.png",
  	providers: {
  		AjunaNetwork: "wss://rpc-parachain.bajun.network",
  		OnFinality: "wss://bajun.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2119,
  		genesisHash: "0x35a06bfec2edf0ff4be89a6428ccd9ff5bd0167d618c5a0d4341f9600a458d14",
  		addressPrefix: 1337,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://bajun.subscan.io/",
  		existentialDeposit: "1000000000",
  		symbol: "BAJU",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2119-76",
  				paraId: 2119,
  				status: "won",
  				startTime: "2022-06-29T04:27:00.000Z",
  				endTime: "2023-05-31T04:27:00.000Z",
  				auctionIndex: 37,
  				firstPeriod: 22,
  				lastPeriod: 29
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "bajun",
  		chainBalanceSlug: "bajun"
  	}
  };
  var dancebox$1 = {
  	slug: "dancebox",
  	name: "Dancebox",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dancebox.png",
  	providers: {
  		Dancebox: "wss://fraa-dancebox-rpc.a.dancebox.tanssi.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 3000,
  		genesisHash: "0x27aafd88e5921f5d5c6aebcd728dacbbf5c2a37f63e2eda301f8e0def01c43ea",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "DANCE",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var listen$1 = {
  	slug: "listen",
  	name: "Listen Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/listen.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2118,
  		genesisHash: "0x48eb7f3fff34e702aa2b504674df8f8afbf9889f804e3088c0cb662e433552a0",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "LT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var kabocha$1 = {
  	slug: "kabocha",
  	name: "Kabocha",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kabocha.png",
  	providers: {
  		JelliedOwl: "wss://kabocha.jelliedowl.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2113,
  		genesisHash: "0xfeb426ca713f0f46c96465b8f039890370cf6bfd687c9076ea2843f58a6ae8a7",
  		addressPrefix: 27,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "KAB",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2113-73",
  				paraId: 2113,
  				status: "won",
  				startTime: "2022-06-29T04:27:00.000Z",
  				endTime: "2023-05-31T04:27:00.000Z",
  				auctionIndex: 38,
  				firstPeriod: 22,
  				lastPeriod: 29
  			}
  		]
  	},
  	extraInfo: null
  };
  var gmdie$1 = {
  	slug: "gmdie",
  	name: "GM Parachain",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/gmdie.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2123,
  		genesisHash: "0x19a3733beb9cb8a970a308d835599e9005e02dc007a35440e461a451466776f8",
  		addressPrefix: 7013,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "FREN",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2123-83",
  				paraId: 2123,
  				status: "won",
  				startTime: "2022-08-10T04:27:00.000Z",
  				endTime: "2023-07-12T04:27:00.000Z",
  				auctionIndex: 48,
  				firstPeriod: 23,
  				lastPeriod: 30
  			}
  		]
  	},
  	extraInfo: null
  };
  var ternoa$1 = {
  	slug: "ternoa",
  	name: "Ternoa",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ternoa.png",
  	providers: {
  		ternoa: "wss://mainnet.ternoa.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6859c81ca95ef624c9dfe4dc6e3381c33e5d6509e35e147092bfbc780f777c4e",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "150000000000000000",
  		symbol: "CAPS",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var tanganika$1 = {
  	slug: "tanganika",
  	name: "DataHighway Tanganika",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tanganika.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2116,
  		genesisHash: null,
  		addressPrefix: 33,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://datahighway.subscan.io/",
  		existentialDeposit: null,
  		symbol: "DHX",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2116-78",
  				paraId: 2116,
  				status: "won",
  				startTime: "2022-06-29T04:27:00.000Z",
  				endTime: "2023-05-31T04:27:00.000Z",
  				auctionIndex: 39,
  				firstPeriod: 22,
  				lastPeriod: 29
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "datahighway",
  		chainBalanceSlug: null
  	}
  };
  var pendulum$1 = {
  	slug: "pendulum",
  	name: "Pendulum",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pendulum.png",
  	providers: {
  		Pendulum: "wss://rpc-pendulum.prd.pendulumchain.tech"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2094,
  		genesisHash: "0x5d3c298622d5634ed019bf61ea4b71655030015bde9beb0d6a24743714462c86",
  		addressPrefix: 56,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "PEN",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2094-55",
  				paraId: 2094,
  				status: "won",
  				startTime: "2023-02-14T01:48:00.000Z",
  				endTime: "2024-12-17T01:48:00.000Z",
  				auctionIndex: 35,
  				firstPeriod: 11,
  				lastPeriod: 18
  			}
  		]
  	},
  	extraInfo: null
  };
  var gear_testnet$1 = {
  	slug: "gear_testnet",
  	name: "Gear Staging Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/gear_testnet.png",
  	providers: {
  		gear: "wss://rpc-node.gear-tech.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6f022bd353c56b3e441507e1173601fd9dc0fb7547e6a95bbaf9b21f311bcab6",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "Unit",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var ternoa_alphanet$1 = {
  	slug: "ternoa_alphanet",
  	name: "Ternoa Alphanet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ternoa_alphanet.png",
  	providers: {
  		ternoa: "wss://alphanet.ternoa.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x18bcdb75a0bba577b084878db2dc2546eb21504eaad4b564bb7d47f9d02b6ace",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "150000000000000000",
  		symbol: "CAPS",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var calamari_test$1 = {
  	slug: "calamari_test",
  	name: "Calamari Staging",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/calamari_test.png",
  	providers: {
  		calamari_test: "wss://c1.calamari.seabird.systems"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2084,
  		genesisHash: "0x53a6ab000c8c3c1015747a1e3ea237a327c77df3e59d142801a23b25163d4f45",
  		addressPrefix: 78,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "100000000000",
  		symbol: "KMA",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var boba$1 = {
  	slug: "boba",
  	name: "Boba Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/boba.png",
  	providers: {
  		"Read RPC": "https://lightning-replica.boba.network",
  		"Write RPC": "https://mainnet.boba.network"
  	},
  	evmInfo: {
  		evmChainId: 288,
  		blockExplorer: "https://bobascan.com/",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var bobabeam$1 = {
  	slug: "bobabeam",
  	name: "Bobabeam",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bobabeam.png",
  	providers: {
  		RPC: "https://bobabeam.boba.network",
  		"Replica RPC": "https://replica.bobabeam.boba.network"
  	},
  	evmInfo: {
  		evmChainId: 1294,
  		blockExplorer: "https://blockexplorer.bobabeam.boba.network",
  		existentialDeposit: "0",
  		symbol: "BOBA",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var kilt_peregrine$1 = {
  	slug: "kilt_peregrine",
  	name: "KILT Peregrine",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kilt_peregrine.png",
  	providers: {
  		kilt: "wss://peregrine.kilt.io/parachain-public-ws/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2000,
  		genesisHash: "0xa0c6e3bac382b316a68bca7141af1fba507207594c761076847ce358aeedcc21",
  		addressPrefix: 38,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://kilt-testnet.subscan.io/",
  		existentialDeposit: "10000000000000",
  		symbol: "PILT",
  		decimals: 15,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "kilt-testnet",
  		chainBalanceSlug: "kilt-testnet"
  	}
  };
  var xx_network$1 = {
  	slug: "xx_network",
  	name: "XX Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/xx_network.png",
  	providers: {
  		"XX Foundation": "wss://rpc.xx.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82aa",
  		addressPrefix: 55,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "xx",
  		decimals: 9,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var watr_network$1 = {
  	slug: "watr_network",
  	name: "Watr Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_network.png",
  	providers: {
  		watr: "wss://rpc.dev.watr.org"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2058,
  		genesisHash: "0xb53c620c41860278fa3068a5367c8eedceefce8a7c29237d830bc09a71737b5d",
  		addressPrefix: 19,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000000",
  		symbol: "WATRD",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var watr_network_evm$1 = {
  	slug: "watr_network_evm",
  	name: "Watr Testnet - EVM",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_network_evm.png",
  	providers: {
  		watr: "https://rpc.dev.watr.org"
  	},
  	evmInfo: {
  		evmChainId: 688,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "WATRD",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var fusotao$1 = {
  	slug: "fusotao",
  	name: "Fusotao",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/fusotao.png",
  	providers: {
  		fusotao: "wss://gateway.mainnet.octopus.network/fusotao/0efwa9v0crdx4dg3uj8jdmc5y7dj4ir2"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xa7113159e275582ee71ee499b24378a2416f34dc5aaf714443f0d11c6c3d99d3",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1",
  		symbol: "TAO",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var discovol$1 = {
  	slug: "discovol",
  	name: "Discovol",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/discovol.png",
  	providers: {
  		discovol: "wss://gateway.mainnet.octopus.network/discovol/afpft46l1egfhrv8at5pfyrld03zseo1"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x2dfbcf7700297bd8ce07a4665ab39e2ed1a3790df783b936988c85eb87e38bee",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "DISC",
  		decimals: 14,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var discovol_testnet$1 = {
  	slug: "discovol_testnet",
  	name: "Discovol Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/discovol_testnet.png",
  	providers: {
  		discovol_testnet: "wss://gateway.testnet.octopus.network/discovol/o4urcey87y4n1qimhfrad92gzs315z9h"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xdc1922b7f60b4925091bbfdd912684c449de7a7cdc5592e9eab11fee55fa53ec",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "DISC",
  		decimals: 14,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var atocha$1 = {
  	slug: "atocha",
  	name: "Atocha",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/atocha.png",
  	providers: {
  		atocha: "wss://gateway.mainnet.octopus.network/atocha/jungxomf4hdcfocwcalgoiz64g9avjim"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x1f11f745be512a17f39b571a9391b5ee6747b900c1db98176828e4a1346dbe9b",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000000000",
  		symbol: "ATO",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var myriad$1 = {
  	slug: "myriad",
  	name: "Myriad",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/myriad.png",
  	providers: {
  		myriad: "wss://gateway.mainnet.octopus.network/myriad/a4cb0a6e30ff5233a3567eb4e8cb71e0"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x74ed91fbc18497f011290f9119a2217908649170337b6414a2d44923ade07063",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000000000",
  		symbol: "MYRIA",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var deBio$1 = {
  	slug: "deBio",
  	name: "DeBio",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/debio.png",
  	providers: {
  		deBio: "wss://gateway.mainnet.octopus.network/debionetwork/ae48005a0c7ecb4053394559a7f4069e"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x996800af345b3109acdada9913e36d1efa98b89e7dcd0b61b70fdbfc13b2fa50",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000000",
  		symbol: "DBIO",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var collectives$1 = {
  	slug: "collectives",
  	name: "Polkadot Collectives",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/collectives.png",
  	providers: {
  		viaParity: "wss://polkadot-collectives-rpc.polkadot.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 1001,
  		genesisHash: "0x46ee89aa2eedd13e988962630ec9fb7565964cf5023bb351f2b6b25c1b68b0b2",
  		addressPrefix: 0,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "DOT",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var ajunaPolkadot$1 = {
  	slug: "ajunaPolkadot",
  	name: "Ajuna Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ajunapolkadot.png",
  	providers: {
  		OnFinality: "wss://ajuna.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2051,
  		genesisHash: "0xe358eb1d11b31255a286c12e44fe6780b7edb171d657905a97e39f71d9c6c3ee",
  		addressPrefix: 1328,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "AJUN",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2051-52",
  				paraId: 2051,
  				status: "won",
  				startTime: "2022-11-22T01:48:00.000Z",
  				endTime: "2024-09-24T01:48:00.000Z",
  				auctionIndex: 31,
  				firstPeriod: 10,
  				lastPeriod: 17
  			}
  		]
  	},
  	extraInfo: null
  };
  var bitgreen$1 = {
  	slug: "bitgreen",
  	name: "Bitgreen",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitgreen.png",
  	providers: {
  		viaBitgreen: "wss://mainnet.bitgreen.org"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2048,
  		genesisHash: "0xc14597baeccb232d662770d2d50ae832ca8c3192693d2b0814e6433f2888ddd6",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "BBB",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var frequency$1 = {
  	slug: "frequency",
  	name: "Frequency",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/frequency.png",
  	providers: {
  		"Frequency 0": "wss://0.rpc.frequency.xyz",
  		"Frequency 1": "wss://1.rpc.frequency.xyz"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2091,
  		genesisHash: "0x4a587bf17a404e3572747add7aab7bbe56e805a5479c6c436f07f36fcc8d3ae1",
  		addressPrefix: 90,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000",
  		symbol: "FRQCY",
  		decimals: 8,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var hashedNetwork$1 = {
  	slug: "hashedNetwork",
  	name: "Hashed Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/hashednetwork.png",
  	providers: {
  		"Hashed Systems": "wss://c1.hashed.live",
  		"Hashed Systems 2": "wss://c2.hashed.network",
  		"Hashed Systems 3": "wss://c3.hashed.live"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2093,
  		genesisHash: "0xdce5477cfca571c2cb652f38bbb70429004be3cf9649dd2b4ad9455b2251fe43",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "HASH",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2093-58",
  				paraId: 2093,
  				status: "won",
  				startTime: "2023-02-14T01:48:00.000Z",
  				endTime: "2024-12-17T01:48:00.000Z",
  				auctionIndex: 40,
  				firstPeriod: 11,
  				lastPeriod: 18
  			},
  			{
  				relayChain: "polkadot",
  				fundId: "2093-54",
  				paraId: 2093,
  				status: "failed",
  				startTime: "2022-11-22T01:48:00.000Z",
  				endTime: "2024-09-24T01:48:00.000Z",
  				auctionIndex: 34,
  				firstPeriod: 10,
  				lastPeriod: 17
  			}
  		]
  	},
  	extraInfo: null
  };
  var kapex$1 = {
  	slug: "kapex",
  	name: "Kapex",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kapex.png",
  	providers: {
  		viaTotem: "wss://kapex-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2007,
  		genesisHash: "0x7838c3c774e887c0a53bcba9e64f702361a1a852d5550b86b58cd73827fa1e1e",
  		addressPrefix: 2007,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1",
  		symbol: "KPX",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2007-39",
  				paraId: 2007,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 20,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: null
  };
  var kylinNetwork$1 = {
  	slug: "kylinNetwork",
  	name: "Kylin Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kylinnetwork.png",
  	providers: {
  		"Kylin Network": "wss://polkadot.kylin-node.co.uk"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2052,
  		genesisHash: "0xf2584690455deda322214e97edfffaf4c1233b6e4625e39478496b3e2f5a44c5",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "KYL",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2052-43",
  				paraId: 2052,
  				status: "won",
  				startTime: "2022-08-30T01:48:00.000Z",
  				endTime: "2024-07-02T01:48:00.000Z",
  				auctionIndex: 25,
  				firstPeriod: 9,
  				lastPeriod: 16
  			}
  		]
  	},
  	extraInfo: null
  };
  var ipci$1 = {
  	slug: "ipci",
  	name: "DAO IPCI",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ipci.png",
  	providers: {
  		viaAiralab: "wss://kusama.rpc.ipci.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2222,
  		genesisHash: "0x6f0f071506de39058fe9a95bbca983ac0e9c5da3443909574e95d52eb078d348",
  		addressPrefix: 32,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000",
  		symbol: "MITO",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var kico$1 = {
  	slug: "kico",
  	name: "KICO",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kico.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2107,
  		genesisHash: "0x52149c30c1eb11460dce6c08b73df8d53bb93b4a15d0a2e7fd5dafe86a73c0da",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "100000000000000",
  		symbol: "KICO",
  		decimals: 14,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2107-64",
  				paraId: 2107,
  				status: "won",
  				startTime: "2022-02-23T04:27:00.000Z",
  				endTime: "2023-01-25T04:27:00.000Z",
  				auctionIndex: 25,
  				firstPeriod: 19,
  				lastPeriod: 26
  			}
  		]
  	},
  	extraInfo: null
  };
  var luhnNetwork$1 = {
  	slug: "luhnNetwork",
  	name: "Luhn Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/luhnnetwork.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2232,
  		genesisHash: "0xba713fdbf674083c5541c1439b83d8e593e1105f35f11954bcc50d0bf9607873",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "LUHN",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var pichiu$1 = {
  	slug: "pichiu",
  	name: "Pichiu Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pichiu.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2102,
  		genesisHash: "0x0e06260459b4f9034aba0a75108c08ed73ea51d2763562749b1d3600986c4ea5",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "PCHU",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2102-69",
  				paraId: 2102,
  				status: "won",
  				startTime: "2022-05-18T04:27:00.000Z",
  				endTime: "2023-04-19T04:27:00.000Z",
  				auctionIndex: 31,
  				firstPeriod: 21,
  				lastPeriod: 28
  			}
  		]
  	},
  	extraInfo: null
  };
  var riodefi$1 = {
  	slug: "riodefi",
  	name: "RioDeFi",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/riodefi.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2227,
  		genesisHash: "0x70310f31bdb878e9920121807ee46236bda2e00c10eb105a40b386bd7ad16906",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "UNIT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var automata$1 = {
  	slug: "automata",
  	name: "Automata",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/automata.png",
  	providers: {
  		OnFinality: "wss://automata.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xc8eda34601b5a48c73f47ee39a3a86a858c34f044185b17dc7d5ad155813dc63",
  		addressPrefix: 2349,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000000000",
  		symbol: "ATA",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var creditcoin$1 = {
  	slug: "creditcoin",
  	name: "Creditcoin",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/creditcoin.png",
  	providers: {
  		"Creditcoin Foundation": "wss://mainnet.creditcoin.network/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xdd954cbf4000542ef1a15bca509cd89684330bee5e23766c527cdb0d7275e9c2",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://creditcoin.subscan.io/",
  		existentialDeposit: "500",
  		symbol: "CTC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "creditcoin",
  		chainBalanceSlug: "creditcoin"
  	}
  };
  var crownSterling$1 = {
  	slug: "crownSterling",
  	name: "Crown Sterling",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crownsterling.png",
  	providers: {
  		"Crown Sterling": "wss://blockchain.crownsterling.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xce24ecf534daea9cd46e425659ef4950a57dd29d07272b423220129c323a64b7",
  		addressPrefix: 0,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1",
  		symbol: "CSOV",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var dockPosMainnet$1 = {
  	slug: "dockPosMainnet",
  	name: "Dock",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dockposmainnet.png",
  	providers: {
  		"Dock Association": "wss://mainnet-node.dock.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6bfe24dca2a3be10f22212678ac13a6446ec764103c0f3471c71609eac384aae",
  		addressPrefix: 22,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://dock.subscan.io/",
  		existentialDeposit: "500",
  		symbol: "DOCK",
  		decimals: 6,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "dock",
  		chainBalanceSlug: null
  	}
  };
  var kusari$1 = {
  	slug: "kusari",
  	name: "Kusari",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kusari.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x4959f8d87d40d9ef516459ff177111bb03d875e5a7ed69282f6b689a707b69f5",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "KSI",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var logion$1 = {
  	slug: "logion",
  	name: "logion Standalone",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/logion.png",
  	providers: {
  		Logion: "wss://rpc01.logion.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: null,
  		genesisHash: "0xe9d7420a5f73edef005ccb8e043500aa5b2458f173912184ea93c14dc035a203",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "LGNT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: 3354,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "3341-73",
  				paraId: 3341,
  				status: "failed",
  				startTime: "2023-10-24T01:48:00.000Z",
  				endTime: "2025-08-26T01:48:00.000Z",
  				auctionIndex: 52,
  				firstPeriod: 14,
  				lastPeriod: 21
  			},
  			{
  				relayChain: "polkadot",
  				fundId: "3354-77",
  				paraId: 3354,
  				status: "won",
  				startTime: "2024-01-16T01:48:00.000Z",
  				endTime: "2025-11-18T01:48:00.000Z",
  				auctionIndex: 55,
  				firstPeriod: 15,
  				lastPeriod: 22
  			}
  		]
  	},
  	extraInfo: null
  };
  var neatcoin$1 = {
  	slug: "neatcoin",
  	name: "Neatcoin",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/neatcoin.png",
  	providers: {
  		Neatcoin: "wss://rpc.neatcoin.org/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xfbb541421d30423c9a753ffa844b64fd44d823f513bf49e3b73b3a656309a595",
  		addressPrefix: 48,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000",
  		symbol: "NEAT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var nftmart$1 = {
  	slug: "nftmart",
  	name: "NFTMart",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/nftmart.png",
  	providers: {
  		NFTMart: "wss://mainnet.nftmart.io/rpc/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xfcf9074303d8f319ad1bf0195b145871977e7c375883b834247cb01ff22f51f9",
  		addressPrefix: 12191,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "NMT",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var polymesh$1 = {
  	slug: "polymesh",
  	name: "Polymesh Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polymesh.png",
  	providers: {
  		Polymath: "wss://mainnet-rpc.polymesh.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6fbd74e5e1d0a61d52ccfe9d4adaed16dd3a7caa37c6bc4d0c2fa12e8b2f4063",
  		addressPrefix: 12,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://polymesh.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "POLYX",
  		decimals: 6,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "polymesh",
  		chainBalanceSlug: "polymesh"
  	}
  };
  var riochain$1 = {
  	slug: "riochain",
  	name: "RioChain",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/riochain.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xd8c6dc2e057b94d05c870a7b39bfb30ae10202ed9cf7731d28dafcfe9458e307",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "RFUEL",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var sherpax$1 = {
  	slug: "sherpax",
  	name: "SherpaX",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sherpax.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xe195ef16d0c628b5cab1486a233865def6e71f8b7814dd058a6b93a85118b796",
  		addressPrefix: 44,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000",
  		symbol: "KSX",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var sora_substrate$1 = {
  	slug: "sora_substrate",
  	name: "SORA",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sora_substrate.png",
  	providers: {
  		"SORA Parliament Ministry of Finance #2": "wss://mof2.sora.org",
  		"SORA Parliament Ministry of Finance": "wss://ws.mof.sora.org",
  		"SORA Parliament Ministry of Finance #3": "wss://mof3.sora.org",
  		OnFinality: "wss://sora.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: null,
  		genesisHash: "0x7e4e32d0feafd4f9c9414b0be86373f9a1efa904809b683453a9af6856d38ad5",
  		addressPrefix: 69,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://sora.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "XOR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: 2025,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2025-75",
  				paraId: 2025,
  				status: "won",
  				startTime: "2024-01-16T01:48:00.000Z",
  				endTime: "2025-11-18T01:48:00.000Z",
  				auctionIndex: 59,
  				firstPeriod: 15,
  				lastPeriod: 22
  			},
  			{
  				relayChain: "polkadot",
  				fundId: "2025-69",
  				paraId: 2025,
  				status: "failed",
  				startTime: "2023-10-24T01:48:00.000Z",
  				endTime: "2025-08-26T01:48:00.000Z",
  				auctionIndex: 51,
  				firstPeriod: 14,
  				lastPeriod: 21
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "sora",
  		chainBalanceSlug: null
  	}
  };
  var swapdex$1 = {
  	slug: "swapdex",
  	name: "Swapdex",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/swapdex.png",
  	providers: {
  		Swapdex: "wss://ws.swapdex.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x15bac4f0a9aad3f46c5fc067fdb59b3ff29738dcd491fe5e37b4b76121163471",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "SDX",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var alephSmartNet$1 = {
  	slug: "alephSmartNet",
  	name: "Aleph Zero Smartnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/alephsmartnet.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6153e2745a56d188365372b5cce283dfddbb96b17e9bb396cceb4630103ff92b",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "SZERO",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var kulupu$1 = {
  	slug: "kulupu",
  	name: "Kulupu",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kulupu.png",
  	providers: {
  		Kulupu: "wss://rpc.kulupu.corepaper.org/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba",
  		addressPrefix: 16,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "100000",
  		symbol: "KLP",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var joystream$1 = {
  	slug: "joystream",
  	name: "Joystream",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/joystream.png",
  	providers: {
  		Jsgenesis: "wss://rpc.joystream.org"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6b5e488e0fa8f9821110d5c13f4c468abcd43ce5e297e62b34c53c3346465956",
  		addressPrefix: 126,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://joystream.subscan.io/",
  		existentialDeposit: "266666560",
  		symbol: "JOY",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "joystream",
  		chainBalanceSlug: "joystream"
  	}
  };
  var aventus_testnet$1 = {
  	slug: "aventus_testnet",
  	name: "Aventus Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aventus_testnet.png",
  	providers: {
  		Aventus: "wss://public-rpc.public-testnet.aventus.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2056,
  		genesisHash: "0xa6ffcef7fb8caadf7f6c5ad8ada65e3eaa90d1604f3eabda546ff1d486865a0c",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.testnet.aventus.io/",
  		existentialDeposit: "0",
  		symbol: "AVT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var vara_network$1 = {
  	slug: "vara_network",
  	name: "Vara Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/vara_network.png",
  	providers: {
  		"Vara Network": "wss://rpc.vara.network",
  		BlastApi: "wss://vara-mainnet.public.blastapi.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xfe1b4c55fd4d668101126434206571a7838a8b6b93a6d1b95d607e78e6c53763",
  		addressPrefix: 137,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://vara.subscan.io/",
  		existentialDeposit: "10000000000000",
  		symbol: "VARA",
  		decimals: 12,
  		hasNativeNft: true,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "vara",
  		chainBalanceSlug: "vara"
  	}
  };
  var kate$1 = {
  	slug: "kate",
  	name: "Avail Kate Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kate.png",
  	providers: {
  		AVAIL: "wss://kate.avail.tools/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xd12003ac837853b062aaccca5ce87ac4838c48447e41db4a3dcfb5bf312350c6",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000",
  		symbol: "AVL",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var bridgeHubPolkadot$1 = {
  	slug: "bridgeHubPolkadot",
  	name: "Polkadot Bridge Hub",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bridgehubpolkadot.png",
  	providers: {
  		Parity: "wss://polkadot-bridge-hub-rpc.polkadot.io",
  		Stakeworld: "wss://dot-rpc.stakeworld.io/bridgehub"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 1002,
  		genesisHash: "0xdcf691b5a3fbe24adc99ddc959c0561b973e329b1aef4c4b22e7bb2ddecb4464",
  		addressPrefix: 0,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "DOT",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var bridgeHubKusama$1 = {
  	slug: "bridgeHubKusama",
  	name: "Kusama Bridge Hub",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bridgehubkusama.png",
  	providers: {
  		Parity: "wss://kusama-bridge-hub-rpc.polkadot.io",
  		Stakeworld: "wss://ksm-rpc.stakeworld.io/bridgehub",
  		"IBP-GeoDNS1": "wss://sys.ibp.network/bridgehub-kusama",
  		"IBP-GeoDNS2": "wss://sys.dotters.network/bridgehub-kusama"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 1002,
  		genesisHash: "0x00dcb981df86429de8bbacf9803401f09485366c44efbf53af9ecfab03adc7e5",
  		addressPrefix: 2,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "33333333",
  		symbol: "KSM",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var fantom_testnet$1 = {
  	slug: "fantom_testnet",
  	name: "Fantom Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/fantom_testnet.png",
  	providers: {
  		Ankr: "https://rpc.ankr.com/fantom_testnet",
  		X_API: "https://xapi.testnet.fantom.network/lachesis/",
  		FantomNetwork: "https://rpc.testnet.fantom.network/",
  		BlastApi: "https://fantom-testnet.public.blastapi.io/"
  	},
  	evmInfo: {
  		evmChainId: 4002,
  		blockExplorer: "https://testnet.ftmscan.com",
  		existentialDeposit: "0",
  		symbol: "FTM",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://testnet.ftmscan.com"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var fantom$1 = {
  	slug: "fantom",
  	name: "Fantom",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/fantom.png",
  	providers: {
  		Ankr: "https://rpc.ankr.com/fantom",
  		RPC_API: "https://rpcapi.fantom.network",
  		BlastApi: "https://fantom-mainnet.public.blastapi.io",
  		FTM_TOOLS: "https://rpc.ftm.tools",
  		PoktNetwork: "https://fantom-pokt.nodies.app/"
  	},
  	evmInfo: {
  		evmChainId: 250,
  		blockExplorer: "https://ftmscan.com",
  		existentialDeposit: "0",
  		symbol: "FTM",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://ftmscan.com"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var krest_network$1 = {
  	slug: "krest_network",
  	name: "Krest Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/krest_network.png",
  	providers: {
  		Peaq: "wss://wss-krest.peaq.network/",
  		UnitedBloc: "wss://krest.unitedbloc.com/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2241,
  		genesisHash: "0xb3dd5ad6a82872b30aabaede8f41dfd4ff6c32ff82f8757d034a45be63cf104c",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://krest.subscan.io/",
  		existentialDeposit: "500",
  		symbol: "KREST",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2241-97",
  				paraId: 2241,
  				status: "won",
  				startTime: "2023-03-08T04:27:00.000Z",
  				endTime: "2024-02-07T04:27:00.000Z",
  				auctionIndex: 72,
  				firstPeriod: 28,
  				lastPeriod: 35
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "krest",
  		chainBalanceSlug: null
  	}
  };
  var deeper_network$1 = {
  	slug: "deeper_network",
  	name: "Deeper Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/deeper_network.png",
  	providers: {
  		DeeperNetwork: "wss://mainnet-full.deeper.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x4466b9e982ab141d4115ed226ff4153b1d20e5b64f5401f732e60dec8326149f",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://deeperscan.io/deeper/",
  		existentialDeposit: "200000000000000000",
  		symbol: "DPR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var jur_network$1 = {
  	slug: "jur_network",
  	name: "Jur Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/jur_network.png",
  	providers: {
  		"Jur Mainnet": "wss://mainnet.jur.io/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x58d1393b47b11707978fbc07e77d7b6f7d9aa88d207dc008a52385f7dba6156a",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "JUR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var base_mainnet$1 = {
  	slug: "base_mainnet",
  	name: "Base Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/base_mainnet.png",
  	providers: {
  		PublicNode: "https://base.publicnode.com"
  	},
  	evmInfo: {
  		evmChainId: 8453,
  		blockExplorer: "https://basescan.org",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var avalanche_c$1 = {
  	slug: "avalanche_c",
  	name: "Avalanche C-Chain",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/avalanche_c.png",
  	providers: {
  		"Avax Network": "https://api.avax.network/ext/bc/C/rpc",
  		PublicNode: "https://avalanche-c-chain.publicnode.com"
  	},
  	evmInfo: {
  		evmChainId: 43114,
  		blockExplorer: "https://subnets.avax.network/c-chain/",
  		existentialDeposit: "0",
  		symbol: "AVAX",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "avalanche"
  	}
  };
  var crust_mainnet$1 = {
  	slug: "crust_mainnet",
  	name: "Crust Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crust_mainnet.png",
  	providers: {
  		OnFinality: "wss://crust.api.onfinality.io/public-ws",
  		"Crust Network": "wss://rpc.crust.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x8b404e7ed8789d813982b9cb4c8b664c05b3fbf433309f603af014ec9ce56a8c",
  		addressPrefix: 66,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://crust.subscan.io/",
  		existentialDeposit: "100000000",
  		symbol: "CRU",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "crust",
  		chainBalanceSlug: null
  	}
  };
  var acala_evm$1 = {
  	slug: "acala_evm",
  	name: "Acala - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acala_evm.png",
  	providers: {
  		Acala: "https://eth-rpc-acala.aca-api.network"
  	},
  	evmInfo: {
  		evmChainId: 787,
  		blockExplorer: "https://blockscout.acala.network/",
  		existentialDeposit: "100000000000000000",
  		symbol: "ACA",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://blockscout.acala.network/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var karura_evm$1 = {
  	slug: "karura_evm",
  	name: "Karura - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/karura_evm.png",
  	providers: {
  		Acala: "https://eth-rpc-karura.aca-api.network"
  	},
  	evmInfo: {
  		evmChainId: 686,
  		blockExplorer: "https://blockscout.karura.network/",
  		existentialDeposit: "100000000000000000",
  		symbol: "KAR",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://blockscout.karura.network/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var bittensor$1 = {
  	slug: "bittensor",
  	name: "Bittensor",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bittensor.png",
  	providers: {
  		Opentensor: "wss://entrypoint-finney.opentensor.ai:443"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x2f0555cc76fc2840a25a6ea3b9637146806f1f44b090c175ffde2a7e5ab36c03",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://scan.bittensor.com/",
  		existentialDeposit: "500",
  		symbol: "TAO",
  		decimals: 9,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2097-57",
  				paraId: 2097,
  				status: "won",
  				startTime: "2023-02-14T01:48:00.000Z",
  				endTime: "2024-12-17T01:48:00.000Z",
  				auctionIndex: 36,
  				firstPeriod: 11,
  				lastPeriod: 18
  			}
  		]
  	},
  	extraInfo: null
  };
  var xcavate$1 = {
  	slug: "xcavate",
  	name: "Xcavate",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/xcavate.png",
  	providers: {
  		Tanssi: "wss://fraa-dancebox-3031-rpc.a.dancebox.tanssi.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x8472759fe1cf8ce507282ddea8af43dd08e598c9da2faed66f3e18f51f93080f",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "XCAV",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var unorthodox$1 = {
  	slug: "unorthodox",
  	name: "Unorthodox",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/unorthodox.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2094,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var coinversation$1 = {
  	slug: "coinversation",
  	name: "Coinversation",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/coinversation.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2027,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2027-33",
  				paraId: 2027,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 19,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: null
  };
  var layerx_network$1 = {
  	slug: "layerx_network",
  	name: "LayerX Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/layerx_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2275,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var moonsama$1 = {
  	slug: "moonsama",
  	name: "Moonsama",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonsama.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3334,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "3334-64",
  				paraId: 3334,
  				status: "won",
  				startTime: "2023-05-09T01:48:00.000Z",
  				endTime: "2025-03-11T01:48:00.000Z",
  				auctionIndex: 42,
  				firstPeriod: 12,
  				lastPeriod: 19
  			}
  		]
  	},
  	extraInfo: null
  };
  var oak_network$1 = {
  	slug: "oak_network",
  	name: "OAK Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/oak_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2090,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2090-51",
  				paraId: 2090,
  				status: "won",
  				startTime: "2022-11-22T01:48:00.000Z",
  				endTime: "2024-09-24T01:48:00.000Z",
  				auctionIndex: 28,
  				firstPeriod: 10,
  				lastPeriod: 17
  			}
  		]
  	},
  	extraInfo: null
  };
  var omnibtc$1 = {
  	slug: "omnibtc",
  	name: "OmniBTC",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/omnibtc.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2053,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2053-46",
  				paraId: 2053,
  				status: "won",
  				startTime: "2022-11-22T01:48:00.000Z",
  				endTime: "2024-09-24T01:48:00.000Z",
  				auctionIndex: 34,
  				firstPeriod: 10,
  				lastPeriod: 17
  			}
  		]
  	},
  	extraInfo: null
  };
  var peaq$1 = {
  	slug: "peaq",
  	name: "peaq",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/peaq.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3338,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "3338-66",
  				paraId: 3338,
  				status: "won",
  				startTime: "2023-08-01T01:48:00.000Z",
  				endTime: "2025-06-03T01:48:00.000Z",
  				auctionIndex: 45,
  				firstPeriod: 13,
  				lastPeriod: 20
  			}
  		]
  	},
  	extraInfo: null
  };
  var quantum_portal$1 = {
  	slug: "quantum_portal",
  	name: "Quantum Portal",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/quantum_portal.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2274,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var virto_network$1 = {
  	slug: "virto_network",
  	name: "Virto Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/virto_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2281,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var energy_web_x$1 = {
  	slug: "energy_web_x",
  	name: "Energy Web X",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_x.png",
  	providers: {
  		EWX: "wss://public-rpc.mainnet.energywebx.com/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3345,
  		genesisHash: "0x5a51e04b88a4784d205091aa7bada002f3e5da3045e5b05655ee4db2589c33b5",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "EWT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "3345-70",
  				paraId: 3345,
  				status: "won",
  				startTime: "2023-10-24T01:48:00.000Z",
  				endTime: "2025-08-26T01:48:00.000Z",
  				auctionIndex: 49,
  				firstPeriod: 14,
  				lastPeriod: 21
  			}
  		]
  	},
  	extraInfo: null
  };
  var invarch$1 = {
  	slug: "invarch",
  	name: "InvArch Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/invarch.png",
  	providers: {
  		Dwellir: "wss://invarch-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3340,
  		genesisHash: "0x31a7d8914fb31c249b972f18c115f1e22b4b039abbcb03c73b6774c5642f9efe",
  		addressPrefix: 117,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "VARCH",
  		decimals: 12,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "3340-68",
  				paraId: 3340,
  				status: "won",
  				startTime: "2023-10-24T01:48:00.000Z",
  				endTime: "2025-08-26T01:48:00.000Z",
  				auctionIndex: 47,
  				firstPeriod: 14,
  				lastPeriod: 21
  			}
  		]
  	},
  	extraInfo: null
  };
  var zero$1 = {
  	slug: "zero",
  	name: "Zero",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/zero.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2236,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var kpron_network$1 = {
  	slug: "kpron_network",
  	name: " Kpron Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kpron_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2019,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var mars$1 = {
  	slug: "mars",
  	name: "Mars",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mars.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2008,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var snow$1 = {
  	slug: "snow",
  	name: "Snow",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/snow.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2129,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2129-86",
  				paraId: 2129,
  				status: "won",
  				startTime: "2022-09-21T04:27:00.000Z",
  				endTime: "2023-08-23T04:27:00.000Z",
  				auctionIndex: 51,
  				firstPeriod: 24,
  				lastPeriod: 31
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: null,
  		chainBalanceSlug: "snow"
  	}
  };
  var aband$1 = {
  	slug: "aband",
  	name: "Aband",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aband.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2257,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "kusama",
  				fundId: "2257-98",
  				paraId: 2257,
  				status: "won",
  				startTime: "2023-03-08T04:27:00.000Z",
  				endTime: "2024-02-07T04:27:00.000Z",
  				auctionIndex: 75,
  				firstPeriod: 28,
  				lastPeriod: 35
  			}
  		]
  	},
  	extraInfo: null
  };
  var acurast_canary$1 = {
  	slug: "acurast_canary",
  	name: "Acurast Canary",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acurast_canary.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2239,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var alpha_network$1 = {
  	slug: "alpha_network",
  	name: "Alpha Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/alpha_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2261,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var loom_network$1 = {
  	slug: "loom_network",
  	name: "Loom Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/loom_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2080,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subgame_gamma$1 = {
  	slug: "subgame_gamma",
  	name: "SubGame Gamma",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subgame_gamma.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2018,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var trustbase$1 = {
  	slug: "trustbase",
  	name: "TrustBase",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/trustbase.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2078,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var manta_network$1 = {
  	slug: "manta_network",
  	name: "Manta Atlantic",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/manta_network.png",
  	providers: {
  		"Manta Network": "wss://ws.manta.systems"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2104,
  		genesisHash: "0xf3c7ad88f6a80f366c4be216691411ef0622e8b809b1046ea297ef106058d4eb",
  		addressPrefix: 77,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://manta.subscan.io/",
  		existentialDeposit: "100000000000000000",
  		symbol: "MANTA",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "manta",
  		chainBalanceSlug: "manta"
  	}
  };
  var t3rn$1 = {
  	slug: "t3rn",
  	name: "t3rn",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/t3rn.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3333,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var geminis_network$1 = {
  	slug: "geminis_network",
  	name: "Geminis Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/geminis_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2038,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var polimec$1 = {
  	slug: "polimec",
  	name: "Polimec Polkadot",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polimec.png",
  	providers: {
  		Polimec: "wss://rpc.polimec.org",
  		Amforc: "wss://polimec.rpc.amforc.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3344,
  		genesisHash: "0x7eb9354488318e7549c722669dcbdcdc526f1fef1420e7944667212f3601fdbd",
  		addressPrefix: 41,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://explorer.polimec.org/polimec",
  		existentialDeposit: "100000000",
  		symbol: "PLMC",
  		decimals: 10,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "3344-71",
  				paraId: 3344,
  				status: "won",
  				startTime: "2023-10-24T01:48:00.000Z",
  				endTime: "2025-08-26T01:48:00.000Z",
  				auctionIndex: 51,
  				firstPeriod: 14,
  				lastPeriod: 21
  			}
  		]
  	},
  	extraInfo: null
  };
  var subdao$1 = {
  	slug: "subdao",
  	name: "SubDAO",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subdao.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2018,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subgame_network$1 = {
  	slug: "subgame_network",
  	name: "SubGame Network",
  	isTestnet: false,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subgame_network.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2017,
  		genesisHash: null,
  		addressPrefix: null,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: null,
  		decimals: null,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var zeta_test$1 = {
  	slug: "zeta_test",
  	name: "ZetaChain Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/zeta_test.png",
  	providers: {
  		Athens: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public"
  	},
  	evmInfo: {
  		evmChainId: 7001,
  		blockExplorer: "https://zetachain-athens-3.blockscout.com/",
  		existentialDeposit: "0",
  		symbol: "ZETA",
  		decimals: 18,
  		supportSmartContract: null,
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var watr_mainnet$1 = {
  	slug: "watr_mainnet",
  	name: "Watr Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_mainnet.png",
  	providers: {
  		Watr: "wss://watr-rpc.watr-api.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2058,
  		genesisHash: "0x161db6cdc5896fe55ef12b4778fe78dd65d7af43f65c601786b88d7a93ebc58a",
  		addressPrefix: 19,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000000",
  		symbol: "WATR",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var watr_mainnet_evm$1 = {
  	slug: "watr_mainnet_evm",
  	name: "Watr Mainnet - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_mainnet_evm.png",
  	providers: {
  		Watr: "wss://watr-rpc.watr-api.network"
  	},
  	evmInfo: {
  		evmChainId: 688,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000000",
  		symbol: "WATR",
  		decimals: 18,
  		supportSmartContract: null,
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var enjin_relaychain$1 = {
  	slug: "enjin_relaychain",
  	name: "Enjin Relaychain",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/enjin_relaychain.png",
  	providers: {
  		Enjin: "wss://rpc.relay.blockchain.enjin.io/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xd8761d3c88f26dc12875c00d3165f7d67243d56fc85b4cf19937601a7916e5a9",
  		addressPrefix: 2135,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://enjin.subscan.io/",
  		existentialDeposit: "100000000000000000",
  		symbol: "ENJ",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "enjin",
  		chainBalanceSlug: "enjin-relay"
  	}
  };
  var enjin_matrixchain$1 = {
  	slug: "enjin_matrixchain",
  	name: "Enjin Matrixchain",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/enjin_matrixchain.png",
  	providers: {
  		MatrixChain: "wss://rpc.matrix.blockchain.enjin.io/",
  		Dwellir: "wss://enjin-matrix-rpc-1.dwellir.com/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "enjin_relaychain",
  		paraId: 1000,
  		genesisHash: "0x3af4ff48ec76d2efc8476730f423ac07e25ad48f5f4c9dc39c778b164d808615",
  		addressPrefix: 1110,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: "https://matrix.subscan.io/",
  		existentialDeposit: "100000000000000000",
  		symbol: "ENJ",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "matrix",
  		chainBalanceSlug: "enjin-matrix"
  	}
  };
  var vara_testnet$1 = {
  	slug: "vara_testnet",
  	name: "Vara Network Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/vara_testnet.png",
  	providers: {
  		Vara: "wss://testnet.vara-network.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x525639f713f397dcf839bd022cd821f367ebcf179de7b9253531f8adbe5436d6",
  		addressPrefix: 137,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000",
  		symbol: "TVARA",
  		decimals: 12,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var goldberg_testnet$1 = {
  	slug: "goldberg_testnet",
  	name: "Avail Goldberg Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/goldberg_testnet.png",
  	providers: {
  		"Avail Tool Testnet": "wss://rpc-testnet.avail.tools/ws",
  		"Goldberg testnet": "wss://goldberg-testnet-rpc.avail.tools/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6f09966420b2608d1947ccfb0f2a362450d1fc7fd902c29b67c906eaa965a7ae",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://avail-testnet.subscan.io/",
  		existentialDeposit: "10000000000000",
  		symbol: "AVL",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "avail-testnet",
  		chainBalanceSlug: null
  	}
  };
  var energy_web_x_testnet$1 = {
  	slug: "energy_web_x_testnet",
  	name: "EWX Staging Parachain",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_x_testnet.png",
  	providers: {
  		EWX: "wss://ewx-staging-parachain-argon-wmfbanx0xb.energyweb.org/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 2000,
  		genesisHash: "0x89cac7a3b10e408ad81c92013900023f4378713bef4e82c3e3efaf818f009ba4",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "VT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var energy_web_chain$1 = {
  	slug: "energy_web_chain",
  	name: "Energy Web Chain",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_chain.png",
  	providers: {
  		"Energy Web Chain": "https://rpc.energyweb.org"
  	},
  	evmInfo: {
  		evmChainId: 246,
  		blockExplorer: "http://explorer.energyweb.org/",
  		existentialDeposit: "0",
  		symbol: "EWT",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://explorer.energyweb.org/api?module=contract&action=getabi"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var energy_web_x_rococo$1 = {
  	slug: "energy_web_x_rococo",
  	name: "Energy Web X Rococo",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_x_rococo.png",
  	providers: {
  		EWX: "wss://public-rpc.testnet.energywebx.com/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 3345,
  		genesisHash: "0xac123be800b7c9a3e3449bb70edd8e3d9008d27826381451eebf94bce1db1fbe",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "VT",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var manta_network_evm$1 = {
  	slug: "manta_network_evm",
  	name: "Manta Pacific",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/manta_network_evm.png",
  	providers: {
  		"Manta Pacific": "https://pacific-rpc.manta.network/http"
  	},
  	evmInfo: {
  		evmChainId: 169,
  		blockExplorer: "https://pacific-explorer.manta.network/",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://pacific-explorer.manta.network"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var polkadex_dot$1 = {
  	slug: "polkadex_dot",
  	name: "Polkadex Polkadot",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadex_dot.png",
  	providers: {
  		RadiumBlock: "wss://polkadex-parachain.public.curie.radiumblock.co/ws",
  		OnFinality: "wss://polkadex-parachain.api.onfinality.io/public-ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 2040,
  		genesisHash: "0x72f3bba34b1ecd532bccbed46701ad37c4ef329bfe86b7cf014ac06cb92ed47d",
  		addressPrefix: 89,
  		chainType: "PARACHAIN",
  		crowdloanUrl: "https://www.polkadex.trade/crowdloans",
  		blockExplorer: "https://polkadex-parachain.subscan.io/",
  		existentialDeposit: "1000000000000",
  		symbol: "PDEX",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  			{
  				relayChain: "polkadot",
  				fundId: "2040-36",
  				paraId: 2040,
  				status: "won",
  				startTime: "2022-06-07T01:48:00.000Z",
  				endTime: "2024-04-09T01:48:00.000Z",
  				auctionIndex: 16,
  				firstPeriod: 8,
  				lastPeriod: 15
  			}
  		]
  	},
  	extraInfo: {
  		subscanSlug: "polkadex-parachain",
  		chainBalanceSlug: null
  	}
  };
  var bittensor_testnet$1 = {
  	slug: "bittensor_testnet",
  	name: "Bittensor Testnet",
  	isTestnet: true,
  	chainStatus: "INACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bittensor_testnet.png",
  	providers: {
  		Testnet: "wss://test.finney.opentensor.ai:443"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x8f9cf856bf558a14440e75569c9e58594757048d7b3a84b5d25f6bd978263105",
  		addressPrefix: 42,
  		chainType: null,
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "TAO",
  		decimals: 9,
  		hasNativeNft: null,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var subspace_gemini_3h$1 = {
  	slug: "subspace_gemini_3h",
  	name: "Subspace Gemini 3h",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3h.png",
  	providers: {
  		"Gemini 3h": "wss://rpc-0.gemini-3h.subspace.network/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x0c121c75f4ef450f40619e1fca9d1e8e7fbabc42c895bc4790801e85d5a91c34",
  		addressPrefix: 2254,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://subspace.subscan.io/",
  		existentialDeposit: "500",
  		symbol: "tSSC",
  		decimals: 18,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "subspace",
  		chainBalanceSlug: null
  	}
  };
  var continuum_network$1 = {
  	slug: "continuum_network",
  	name: "Continuum Network",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/continuum_network.png",
  	providers: {
  		"Continuum RPC Node": "wss://continuum-rpc-1.metaverse.network/wss"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: 3346,
  		genesisHash: "0xae1ca86c936aa252cdc45f4f436220567b2bbbcc4834f5b8f4191462baf19dfb",
  		addressPrefix: 268,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://continuum.subscan.io/",
  		existentialDeposit: "100000000000000000",
  		symbol: "NUUM",
  		decimals: 18,
  		hasNativeNft: true,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "continuum",
  		chainBalanceSlug: "continuum"
  	}
  };
  var rococo_assethub$1 = {
  	slug: "rococo_assethub",
  	name: "Rococo Asset Hub",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/rococo_assethub.png",
  	providers: {
  		Dwellir: "wss://rococo-asset-hub-rpc.dwellir.com",
  		Parity: "wss://rococo-asset-hub-rpc.polkadot.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "rococo",
  		paraId: 1000,
  		genesisHash: "0x7c34d42fc815d392057c78b49f2755c753440ccd38bcb0405b3bcfb601d08734",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "3333333",
  		symbol: "ROC",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var okxTest$1 = {
  	slug: "okxTest",
  	name: "X Layer testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/okxtest.png",
  	providers: {
  		Testrpc: "https://testrpc.x1.tech/",
  		X1testrpc: "https://x1testrpc.okx.com/"
  	},
  	evmInfo: {
  		evmChainId: 195,
  		blockExplorer: "https://www.okx.com/explorer/xlayer-test/",
  		existentialDeposit: "0",
  		symbol: "OKX",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://www.okx.com/explorer/xlayer-test/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var liberlandTest$1 = {
  	slug: "liberlandTest",
  	name: "Liberland Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/liberlandtest.png",
  	providers: {
  		Liberland: "wss://testchain.liberland.org"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x131a8f81116a6ee880aa5f84b16115499a50f5f8dccfed80d87e204ec9203f3c",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "LDN",
  		decimals: 12,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var liberland$1 = {
  	slug: "liberland",
  	name: "Liberland",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/liberland.png",
  	providers: {
  		Liberland: "wss://mainnet.liberland.org",
  		Dwellir: "wss://liberland-rpc.dwellir.com"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6bd89e052d67a45bb60a9a23e8581053d5e0d619f15cb9865946937e690c42d6",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "LLD",
  		decimals: 12,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var chainflip_dot$1 = {
  	slug: "chainflip_dot",
  	name: "Polkadot Chainflip Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/chainflip_dot.png",
  	providers: {
  		Chainflip: "wss://rpc-pdot.chainflip.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xe566d149729892a803c3c4b1e652f09445926234d956a0f166be4d4dea91f536",
  		addressPrefix: 0,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000",
  		symbol: "pDOT",
  		decimals: 10,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var tangleTest$1 = {
  	slug: "tangleTest",
  	name: "Tangle Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tangletest.png",
  	providers: {
  		Webb: "wss://testnet-rpc.tangle.tools"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x3d22af97d919611e03bbcbda96f65988758865423e89b2d99547a6bb61452db3",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000000000",
  		symbol: "tTNT",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var dentnet$1 = {
  	slug: "dentnet",
  	name: "DENTNet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dentnet.png",
  	providers: {
  		Dentnet: "wss://rpc.dentnet.io/ws"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x0313f6a011d128d22f996703cbab05162e2fdc9e031493314fe6db79979c5ca7",
  		addressPrefix: 9807,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "10000000000000000",
  		symbol: "DENTX",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var phykenTest$1 = {
  	slug: "phykenTest",
  	name: "Phyken Network Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/phykentest.png",
  	providers: {
  		"Phyken Testnet": "wss://rpc.testnet.metaquity.xyz"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x1072ec50040d7d42226e34d1ce90d9401ed9506a0ae16390ce6e18df99a1c4e4",
  		addressPrefix: 666,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000",
  		symbol: "KEN",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var creditcoinTestEvm$1 = {
  	slug: "creditcoinTestEvm",
  	name: "Creditcoin Testnet - EVM",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/creditcointestevm.png",
  	providers: {
  		"Creditcoin Testnet EVM": "https://rpc.cc3-testnet.creditcoin.network/"
  	},
  	evmInfo: {
  		evmChainId: 102031,
  		blockExplorer: null,
  		existentialDeposit: null,
  		symbol: "CTC",
  		decimals: 18,
  		supportSmartContract: null,
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var astarZkEvm$1 = {
  	slug: "astarZkEvm",
  	name: "Astar zkEVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/astarzkevm.png",
  	providers: {
  		Dwellir: "https://astar-zkevm-rpc.dwellir.com"
  	},
  	evmInfo: {
  		evmChainId: 3776,
  		blockExplorer: "https://astar-zkevm.explorer.startale.com/",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://astar-zkevm.explorer.startale.com/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var sepolia_ethereum$1 = {
  	slug: "sepolia_ethereum",
  	name: "Ethereum Sepolia",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sepolia_ethereum.png",
  	providers: {
  		"Asia RPC": "https://rpc.sepolia.org",
  		"Europe RPC 2": "https://rpc2.sepolia.org",
  		RockX: "https://rpc-sepolia.rockx.com/"
  	},
  	evmInfo: {
  		evmChainId: 11155111,
  		blockExplorer: "https://sepolia.etherscan.io/",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: null
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var hydradx_rococo$1 = {
  	slug: "hydradx_rococo",
  	name: "HydraDX Rococo",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/hydradx_rococo.png",
  	providers: {
  		"Hydration Nice": "wss://rpc.nice.hydration.cloud"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "rococo",
  		paraId: 2032,
  		genesisHash: "0x06111acb32100bf87c88d28b1386f33136939b363cd86eb086626bc7d2a0022c",
  		addressPrefix: 63,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "HDX",
  		decimals: 12,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var creditcoinTest$1 = {
  	slug: "creditcoinTest",
  	name: "Creditcoin testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/creditcointest.png",
  	providers: {
  		Cc3: "wss://rpc.cc3-testnet.creditcoin.network"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xfc4ec97a1c1f119c4353aecb4a17c7c0cf7b40d5d660143d8bad9117e9866572",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://creditcoin3-testnet.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "CTC",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "creditcoin3-testnet",
  		chainBalanceSlug: null
  	}
  };
  var xlayer$1 = {
  	slug: "xlayer",
  	name: "X Layer",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/xlayer.png",
  	providers: {
  		"X Layer": "https://rpc.xlayer.tech",
  		"X Layer OKX": "https://xlayerrpc.okx.com/"
  	},
  	evmInfo: {
  		evmChainId: 196,
  		blockExplorer: "https://www.okx.com/explorer/xlayer",
  		existentialDeposit: "0",
  		symbol: "OKB",
  		decimals: 18,
  		supportSmartContract: null,
  		abiExplorer: "https://www.okx.com/explorer/xlayer"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var acurast$1 = {
  	slug: "acurast",
  	name: "Acurast Canary",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acurast.png",
  	providers: {
  		Acurast: "wss://acurast-canarynet-ws.prod.gke.papers.tech"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: "kusama",
  		paraId: 2239,
  		genesisHash: "0xce7681fb12aa8f7265d229a9074be0ea1d5e99b53eedcec2deade43857901808",
  		addressPrefix: 42,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000",
  		symbol: "cACU",
  		decimals: 12,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var mythos$1 = {
  	slug: "mythos",
  	name: "Mythos",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mythos.png",
  	providers: {
  		Parity: "wss://polkadot-mythos-rpc.polkadot.io"
  	},
  	evmInfo: {
  		evmChainId: -1,
  		blockExplorer: null,
  		existentialDeposit: "0",
  		symbol: "MYTH",
  		decimals: 18,
  		supportSmartContract: null,
  		abiExplorer: null
  	},
  	substrateInfo: {
  		relaySlug: "polkadot",
  		paraId: 3369,
  		genesisHash: "0xf6ee56e9c5277df5b4ce6ae9983ee88f3cbed27d31beeb98f9f84f997a1ab0b9",
  		addressPrefix: 29972,
  		chainType: "PARACHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000000",
  		symbol: "MYTH",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var humanode$1 = {
  	slug: "humanode",
  	name: "Humanode",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/humanode.png",
  	providers: {
  		Humanode: "wss://explorer-rpc-ws.mainnet.stages.humanode.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xc56fa32442b2dad76f214b3ae07998e4ca09736e4813724bfb0717caae2c8bee",
  		addressPrefix: 5234,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://humanode.subscan.io/",
  		existentialDeposit: "500",
  		symbol: "HMND",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "humanode",
  		chainBalanceSlug: "humanode"
  	}
  };
  var humanodeEvm$1 = {
  	slug: "humanodeEvm",
  	name: "Humanode - EVM",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/humanodeevm.png",
  	providers: {
  		Humanode: "https://explorer-rpc-http.mainnet.stages.humanode.io"
  	},
  	evmInfo: {
  		evmChainId: 5234,
  		blockExplorer: "https://humanode.subscan.io/",
  		existentialDeposit: "0",
  		symbol: "eHMND",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://humanode.subscan.io/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var paseoTest$1 = {
  	slug: "paseoTest",
  	name: "Paseo Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/paseotest.png",
  	providers: {
  		Amforc: "wss://paseo.rpc.amforc.com",
  		Dwellir: "wss://paseo-rpc.dwellir.com",
  		"IBP-GeoDNS1": "wss://rpc.ibp.network/paseo",
  		"IBP-GeoDNS2": "wss://rpc.dotters.network/paseo"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://paseo.subscan.io/",
  		existentialDeposit: "10000000000",
  		symbol: "PAS",
  		decimals: 10,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "paseo",
  		chainBalanceSlug: null
  	}
  };
  var commune$1 = {
  	slug: "commune",
  	name: "Commune AI",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/commune.png",
  	providers: {
  		"Commune Node 1": "wss://commune-api-node-1.communeai.net"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xbc6eb9753e2417476601485f9f8ef8474701ec199d456f989bd397682c9425c5",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "500",
  		symbol: "C",
  		decimals: 9,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var dbcchain$1 = {
  	slug: "dbcchain",
  	name: "DBC Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dbcchain.png",
  	providers: {
  		"DBC Chain": "wss://info1.dbcwallet.io"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xd523fa2e0581f069b4f0c7b5944c21e9abc72305a08067868c91b898d1bf1dff",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://dbc.subscan.io/",
  		existentialDeposit: "10000000000000",
  		symbol: "DBC",
  		decimals: 15,
  		hasNativeNft: null,
  		supportStaking: null,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: {
  		subscanSlug: "dbc",
  		chainBalanceSlug: "deepbrain"
  	}
  };
  var availTuringTest$1 = {
  	slug: "availTuringTest",
  	name: "Avail Turing Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/availturingtest.png",
  	providers: {
  		"Avail Turing ": "wss://turing-rpc.avail.so/",
  		"Avail Space": "wss://turing-rpc.availspace.app/"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0xd3d2f3a3495dc597434a99d7d449ebad6616db45e4e4f178f31cc6fa14378b70",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "AVAIL",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var bitlayer$1 = {
  	slug: "bitlayer",
  	name: "Bitlayer Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitlayer.png",
  	providers: {
  		Bitlayer: "https://rpc.bitlayer.org",
  		Rpc: "https://rpc.bitlayer-rpc.com",
  		Ankr: "https://rpc.ankr.com/bitlayer"
  	},
  	evmInfo: {
  		evmChainId: 200901,
  		blockExplorer: "https://www.btrscan.com",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://www.btrscan.com"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var bitlayerTest$1 = {
  	slug: "bitlayerTest",
  	name: "Bitlayer Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitlayertest.png",
  	providers: {
  		"Rpc testnet": "https://testnet-rpc.bitlayer.org"
  	},
  	evmInfo: {
  		evmChainId: 200810,
  		blockExplorer: "https://testnet-scan.bitlayer.org",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://testnet-scan.bitlayer.org"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var bevm$1 = {
  	slug: "bevm",
  	name: "BEVM Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bevm.png",
  	providers: {
  		"Mainnet 1": "https://rpc-mainnet-1.bevm.io",
  		"Mainnet 2": "https://rpc-mainnet-2.bevm.io"
  	},
  	evmInfo: {
  		evmChainId: 11501,
  		blockExplorer: "https://scan-mainnet.bevm.io/",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://scan-mainnet.bevm.io/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var bevmTest$1 = {
  	slug: "bevmTest",
  	name: "BEVM Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bevmtest.png",
  	providers: {
  		"BEVM testnet": "https://testnet.bevm.io"
  	},
  	evmInfo: {
  		evmChainId: 11503,
  		blockExplorer: "https://scan-testnet.bevm.io",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://scan-testnet.bevm.io"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var b2$1 = {
  	slug: "b2",
  	name: "B2 Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/b2.png",
  	providers: {
  		Bsquared: "https://rpc.bsquared.network",
  		"Alt technology": "https://b2-mainnet.alt.technology"
  	},
  	evmInfo: {
  		evmChainId: 223,
  		blockExplorer: "https://explorer.bsquared.network/",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://explorer.bsquared.network/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var bobMainnet$1 = {
  	slug: "bobMainnet",
  	name: "BOB Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bobmainnet.png",
  	providers: {
  		Gobob: "https://rpc.gobob.xyz/"
  	},
  	evmInfo: {
  		evmChainId: 60808,
  		blockExplorer: "https://explorer.gobob.xyz/",
  		existentialDeposit: "0",
  		symbol: "ETH",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://explorer.gobob.xyz/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var avail_mainnet$1 = {
  	slug: "avail_mainnet",
  	name: "Avail",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/avail_mainnet.png",
  	providers: {
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x128ea318539862c0a06b745981300d527c1041c6f3388a8c49565559e3ea3d10",
  		addressPrefix: 42,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: null,
  		existentialDeposit: "1000000000000",
  		symbol: "AVAIL",
  		decimals: 18,
  		hasNativeNft: null,
  		supportStaking: true,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  };
  var merlinEvm$1 = {
  	slug: "merlinEvm",
  	name: "Merlin Mainnet",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/merlinevm.png",
  	providers: {
  		"Merlin Chain": "https://rpc.merlinchain.io"
  	},
  	evmInfo: {
  		evmChainId: 4200,
  		blockExplorer: "https://scan.merlinchain.io",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://scan.merlinchain.io"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  var botanixEvmTest$1 = {
  	slug: "botanixEvmTest",
  	name: "Spiderchain Testnet",
  	isTestnet: true,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/botanixevmtest.png",
  	providers: {
  		"Botanix Labs": "https://node.botanixlabs.dev"
  	},
  	evmInfo: {
  		evmChainId: 3636,
  		blockExplorer: "https://blockscout.botanixlabs.dev/",
  		existentialDeposit: "0",
  		symbol: "BTC",
  		decimals: 18,
  		supportSmartContract: [
  			"ERC20",
  			"ERC721"
  		],
  		abiExplorer: "https://blockscout.botanixlabs.dev/"
  	},
  	substrateInfo: null,
  	extraInfo: null
  };
  const _ChainInfoMap = {
  	bitcoin: bitcoin$1,
  	bitcoinTestnet: bitcoinTestnet$1,
  	polkadot: polkadot$1,
  	kusama: kusama$1,
  	ethereum: ethereum$1,
  	binance: binance$1,
  	moonbeam: moonbeam$1,
  	pioneer: pioneer$1,
  	aleph: aleph$1,
  	astar: astar$1,
  	astarEvm: astarEvm$1,
  	statemint: statemint$1,
  	acala: acala$1,
  	polygon: polygon$1,
  	arbitrum_one: arbitrum_one$1,
  	optimism: optimism$1,
  	tomochain: tomochain$1,
  	alephTest: alephTest$1,
  	shiden: shiden$1,
  	shidenEvm: shidenEvm$1,
  	shibuya: shibuya$1,
  	shibuyaEvm: shibuyaEvm$1,
  	aventus: aventus$1,
  	westend: westend$1,
  	rococo: rococo$1,
  	bitcountry: bitcountry$1,
  	equilibrium_parachain: equilibrium_parachain$1,
  	moonbase: moonbase$1,
  	moonriver: moonriver$1,
  	turingStaging: turingStaging$1,
  	turing: turing$1,
  	bifrost: bifrost$1,
  	bifrost_dot: bifrost_dot$1,
  	bifrost_testnet: bifrost_testnet$1,
  	calamari: calamari$1,
  	amplitude: amplitude$1,
  	amplitude_test: amplitude_test$1,
  	bobabase: bobabase$1,
  	ethereum_goerli: ethereum_goerli$1,
  	binance_test: binance_test$1,
  	parallel: parallel$1,
  	clover: clover$1,
  	cloverEvm: cloverEvm$1,
  	hydradx_main: hydradx_main$1,
  	edgeware: edgeware$1,
  	centrifuge: centrifuge$1,
  	interlay: interlay$1,
  	nodle: nodle$1,
  	darwinia2: darwinia2$1,
  	sora_ksm: sora_ksm$1,
  	odyssey: odyssey$1,
  	polkadex: polkadex$1,
  	polkadexTest: polkadexTest$1,
  	rmrk: rmrk$1,
  	dolphin: dolphin$1,
  	opal: opal$1,
  	efinity: efinity$1,
  	composableFinance: composableFinance$1,
  	phala: phala$1,
  	crust: crust$1,
  	statemine: statemine$1,
  	karura: karura$1,
  	khala: khala$1,
  	kilt: kilt$1,
  	basilisk: basilisk$1,
  	altair: altair$1,
  	heiko: heiko$1,
  	kintsugi: kintsugi$1,
  	kintsugi_test: kintsugi_test$1,
  	picasso: picasso$1,
  	quartz: quartz$1,
  	unique_network: unique_network$1,
  	genshiro: genshiro$1,
  	genshiro_testnet: genshiro_testnet$1,
  	subsocial_x: subsocial_x$1,
  	zeitgeist: zeitgeist$1,
  	sakura: sakura$1,
  	shadow: shadow$1,
  	uniqueNft: uniqueNft$1,
  	robonomics: robonomics$1,
  	integritee: integritee$1,
  	integriteePolkadot: integriteePolkadot$1,
  	crabParachain: crabParachain$1,
  	pangolin: pangolin$1,
  	chainx: chainx$1,
  	acala_testnet: acala_testnet$1,
  	mangatax: mangatax$1,
  	mangatax_para: mangatax_para$1,
  	encointer: encointer$1,
  	litmus: litmus$1,
  	litentry: litentry$1,
  	tinkernet: tinkernet$1,
  	imbue_network: imbue_network$1,
  	subspace_test: subspace_test$1,
  	subspace_gemini_2a: subspace_gemini_2a$1,
  	subspace_gemini_3c: subspace_gemini_3c$1,
  	subspace_gemini_3d: subspace_gemini_3d$1,
  	subspace_gemini_3e: subspace_gemini_3e$1,
  	subspace_gemini_3f: subspace_gemini_3f$1,
  	origintrail: origintrail$1,
  	subspace_gemini_3g: subspace_gemini_3g$1,
  	dorafactory: dorafactory$1,
  	bajun: bajun$1,
  	dancebox: dancebox$1,
  	listen: listen$1,
  	kabocha: kabocha$1,
  	gmdie: gmdie$1,
  	ternoa: ternoa$1,
  	tanganika: tanganika$1,
  	pendulum: pendulum$1,
  	gear_testnet: gear_testnet$1,
  	ternoa_alphanet: ternoa_alphanet$1,
  	calamari_test: calamari_test$1,
  	boba: boba$1,
  	bobabeam: bobabeam$1,
  	kilt_peregrine: kilt_peregrine$1,
  	xx_network: xx_network$1,
  	watr_network: watr_network$1,
  	watr_network_evm: watr_network_evm$1,
  	fusotao: fusotao$1,
  	discovol: discovol$1,
  	discovol_testnet: discovol_testnet$1,
  	atocha: atocha$1,
  	myriad: myriad$1,
  	deBio: deBio$1,
  	collectives: collectives$1,
  	ajunaPolkadot: ajunaPolkadot$1,
  	bitgreen: bitgreen$1,
  	frequency: frequency$1,
  	hashedNetwork: hashedNetwork$1,
  	kapex: kapex$1,
  	kylinNetwork: kylinNetwork$1,
  	ipci: ipci$1,
  	kico: kico$1,
  	luhnNetwork: luhnNetwork$1,
  	pichiu: pichiu$1,
  	riodefi: riodefi$1,
  	automata: automata$1,
  	creditcoin: creditcoin$1,
  	crownSterling: crownSterling$1,
  	dockPosMainnet: dockPosMainnet$1,
  	kusari: kusari$1,
  	logion: logion$1,
  	neatcoin: neatcoin$1,
  	nftmart: nftmart$1,
  	polymesh: polymesh$1,
  	riochain: riochain$1,
  	sherpax: sherpax$1,
  	sora_substrate: sora_substrate$1,
  	swapdex: swapdex$1,
  	"3dpass": {
  	slug: "3dpass",
  	name: "3DPass",
  	isTestnet: false,
  	chainStatus: "ACTIVE",
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/chains/3dpass.png",
  	providers: {
  		"3dpass": "wss://rpc.3dpass.org",
  		"3dpscan": "wss://rpc.3dpscan.io",
  		"3dpass2": "wss://rpc2.3dpass.org"
  	},
  	evmInfo: null,
  	substrateInfo: {
  		relaySlug: null,
  		paraId: null,
  		genesisHash: "0x6c5894837ad89b6d92b114a2fb3eafa8fe3d26a54848e3447015442cd6ef4e66",
  		addressPrefix: 71,
  		chainType: "RELAYCHAIN",
  		crowdloanUrl: null,
  		blockExplorer: "https://3dpscan.io/",
  		existentialDeposit: "1",
  		symbol: "P3D",
  		decimals: 12,
  		hasNativeNft: false,
  		supportStaking: false,
  		supportSmartContract: null,
  		crowdloanParaId: null,
  		crowdloanFunds: [
  		]
  	},
  	extraInfo: null
  },
  	alephSmartNet: alephSmartNet$1,
  	kulupu: kulupu$1,
  	joystream: joystream$1,
  	aventus_testnet: aventus_testnet$1,
  	vara_network: vara_network$1,
  	kate: kate$1,
  	bridgeHubPolkadot: bridgeHubPolkadot$1,
  	bridgeHubKusama: bridgeHubKusama$1,
  	fantom_testnet: fantom_testnet$1,
  	fantom: fantom$1,
  	krest_network: krest_network$1,
  	deeper_network: deeper_network$1,
  	jur_network: jur_network$1,
  	base_mainnet: base_mainnet$1,
  	avalanche_c: avalanche_c$1,
  	crust_mainnet: crust_mainnet$1,
  	acala_evm: acala_evm$1,
  	karura_evm: karura_evm$1,
  	bittensor: bittensor$1,
  	xcavate: xcavate$1,
  	unorthodox: unorthodox$1,
  	coinversation: coinversation$1,
  	layerx_network: layerx_network$1,
  	moonsama: moonsama$1,
  	oak_network: oak_network$1,
  	omnibtc: omnibtc$1,
  	peaq: peaq$1,
  	quantum_portal: quantum_portal$1,
  	virto_network: virto_network$1,
  	energy_web_x: energy_web_x$1,
  	invarch: invarch$1,
  	zero: zero$1,
  	kpron_network: kpron_network$1,
  	mars: mars$1,
  	snow: snow$1,
  	aband: aband$1,
  	acurast_canary: acurast_canary$1,
  	alpha_network: alpha_network$1,
  	loom_network: loom_network$1,
  	subgame_gamma: subgame_gamma$1,
  	trustbase: trustbase$1,
  	manta_network: manta_network$1,
  	t3rn: t3rn$1,
  	geminis_network: geminis_network$1,
  	polimec: polimec$1,
  	subdao: subdao$1,
  	subgame_network: subgame_network$1,
  	zeta_test: zeta_test$1,
  	watr_mainnet: watr_mainnet$1,
  	watr_mainnet_evm: watr_mainnet_evm$1,
  	enjin_relaychain: enjin_relaychain$1,
  	enjin_matrixchain: enjin_matrixchain$1,
  	vara_testnet: vara_testnet$1,
  	goldberg_testnet: goldberg_testnet$1,
  	energy_web_x_testnet: energy_web_x_testnet$1,
  	energy_web_chain: energy_web_chain$1,
  	energy_web_x_rococo: energy_web_x_rococo$1,
  	manta_network_evm: manta_network_evm$1,
  	polkadex_dot: polkadex_dot$1,
  	bittensor_testnet: bittensor_testnet$1,
  	subspace_gemini_3h: subspace_gemini_3h$1,
  	continuum_network: continuum_network$1,
  	rococo_assethub: rococo_assethub$1,
  	okxTest: okxTest$1,
  	liberlandTest: liberlandTest$1,
  	liberland: liberland$1,
  	chainflip_dot: chainflip_dot$1,
  	tangleTest: tangleTest$1,
  	dentnet: dentnet$1,
  	phykenTest: phykenTest$1,
  	creditcoinTestEvm: creditcoinTestEvm$1,
  	astarZkEvm: astarZkEvm$1,
  	sepolia_ethereum: sepolia_ethereum$1,
  	hydradx_rococo: hydradx_rococo$1,
  	creditcoinTest: creditcoinTest$1,
  	xlayer: xlayer$1,
  	acurast: acurast$1,
  	mythos: mythos$1,
  	humanode: humanode$1,
  	humanodeEvm: humanodeEvm$1,
  	paseoTest: paseoTest$1,
  	commune: commune$1,
  	dbcchain: dbcchain$1,
  	availTuringTest: availTuringTest$1,
  	bitlayer: bitlayer$1,
  	bitlayerTest: bitlayerTest$1,
  	bevm: bevm$1,
  	bevmTest: bevmTest$1,
  	b2: b2$1,
  	bobMainnet: bobMainnet$1,
  	avail_mainnet: avail_mainnet$1,
  	merlinEvm: merlinEvm$1,
  	botanixEvmTest: botanixEvmTest$1
  };

  var polkadot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadot.png";
  var kusama = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kusama.png";
  var ethereum = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ethereum.png";
  var binance = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/binance.png";
  var moonbeam = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonbeam.png";
  var pioneer = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pioneer.png";
  var aleph = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aleph.png";
  var astar = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/astar.png";
  var astarEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/astarevm.png";
  var statemint = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/statemint.png";
  var acala = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acala.png";
  var polygon = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polygon.png";
  var arbitrum_one = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/arbitrum_one.png";
  var optimism = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/optimism.png";
  var tomochain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tomochain.png";
  var alephTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/alephtest.png";
  var shiden = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shiden.png";
  var shidenEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shidenevm.png";
  var shibuya = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shibuya.png";
  var shibuyaEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shibuyaevm.png";
  var aventus = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aventus.png";
  var westend = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/westend.png";
  var rococo = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/rococo.png";
  var bitcountry = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitcountry.png";
  var equilibrium_parachain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/equilibrium_parachain.png";
  var moonbase = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonbase.png";
  var moonriver = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonriver.png";
  var turingStaging = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/turingstaging.png";
  var turing = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/turing.png";
  var bifrost = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bifrost.png";
  var bifrost_dot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bifrost_dot.png";
  var bifrost_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bifrost_testnet.png";
  var calamari = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/calamari.png";
  var amplitude = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/amplitude.png";
  var amplitude_test = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/amplitude_test.png";
  var bobabase = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bobabase.png";
  var ethereum_goerli = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ethereum_goerli.png";
  var binance_test = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/binance_test.png";
  var parallel = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/parallel.png";
  var clover = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/clover.png";
  var cloverEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/cloverevm.png";
  var hydradx_main = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/hydradx_main.png";
  var edgeware = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/edgeware.png";
  var centrifuge = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/centrifuge.png";
  var interlay = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/interlay.png";
  var nodle = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/nodle.png";
  var darwinia2 = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/darwinia2.png";
  var sora_ksm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sora_ksm.png";
  var odyssey = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/odyssey.png";
  var polkadex = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadex.png";
  var polkadexTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadextest.png";
  var rmrk = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/rmrk.png";
  var dolphin = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dolphin.png";
  var opal = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/opal.png";
  var efinity = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/efinity.png";
  var composableFinance = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/composablefinance.png";
  var phala = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/phala.png";
  var crust = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crust.png";
  var statemine = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/statemine.png";
  var karura = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/karura.png";
  var khala = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/khala.png";
  var kilt = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kilt.png";
  var basilisk = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/basilisk.png";
  var altair = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/altair.png";
  var heiko = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/heiko.png";
  var kintsugi = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kintsugi.png";
  var kintsugi_test = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kintsugi_test.png";
  var picasso = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/picasso.png";
  var quartz = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/quartz.png";
  var unique_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/unique_network.png";
  var genshiro = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/genshiro.png";
  var genshiro_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/genshiro_testnet.png";
  var subsocial_x = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subsocial_x.png";
  var zeitgeist = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/zeitgeist.png";
  var sakura = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sakura.png";
  var shadow = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/shadow.png";
  var uniqueNft = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/uniquenft.png";
  var robonomics = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/robonomics.png";
  var integritee = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/integritee.png";
  var integriteePolkadot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/integriteepolkadot.png";
  var crabParachain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crabparachain.png";
  var pangolin = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pangolin.png";
  var chainx = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/chainx.png";
  var acala_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acala_testnet.png";
  var mangatax = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mangatax.png";
  var mangatax_para = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mangatax_para.png";
  var encointer = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/encointer.png";
  var litmus = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/litmus.png";
  var litentry = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/litentry.png";
  var tinkernet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tinkernet.png";
  var imbue_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/imbue_network.png";
  var subspace_test = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_test.png";
  var subspace_gemini_2a = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_2a.png";
  var subspace_gemini_3c = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3c.png";
  var subspace_gemini_3d = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3d.png";
  var subspace_gemini_3e = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3e.png";
  var subspace_gemini_3f = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3f.png";
  var origintrail = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/origintrail.png";
  var subspace_gemini_3g = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3g.png";
  var dorafactory = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dorafactory.png";
  var bajun = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bajun.png";
  var dancebox = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dancebox.png";
  var listen = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/listen.png";
  var kabocha = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kabocha.png";
  var gmdie = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/gmdie.png";
  var ternoa = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ternoa.png";
  var tanganika = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tanganika.png";
  var pendulum = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pendulum.png";
  var gear_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/gear_testnet.png";
  var ternoa_alphanet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ternoa_alphanet.png";
  var calamari_test = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/calamari_test.png";
  var boba = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/boba.png";
  var bobabeam = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bobabeam.png";
  var kilt_peregrine = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kilt_peregrine.png";
  var xx_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/xx_network.png";
  var watr_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_network.png";
  var watr_network_evm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_network_evm.png";
  var fusotao = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/fusotao.png";
  var discovol = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/discovol.png";
  var discovol_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/discovol_testnet.png";
  var atocha = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/atocha.png";
  var myriad = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/myriad.png";
  var deBio = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/debio.png";
  var collectives = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/collectives.png";
  var ajunaPolkadot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ajunapolkadot.png";
  var bitgreen = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitgreen.png";
  var frequency = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/frequency.png";
  var hashedNetwork = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/hashednetwork.png";
  var kapex = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kapex.png";
  var kylinNetwork = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kylinnetwork.png";
  var ipci = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/ipci.png";
  var kico = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kico.png";
  var luhnNetwork = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/luhnnetwork.png";
  var pichiu = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/pichiu.png";
  var riodefi = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/riodefi.png";
  var automata = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/automata.png";
  var creditcoin = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/creditcoin.png";
  var crownSterling = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crownsterling.png";
  var dockPosMainnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dockposmainnet.png";
  var kusari = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kusari.png";
  var logion = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/logion.png";
  var neatcoin = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/neatcoin.png";
  var nftmart = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/nftmart.png";
  var polymesh = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polymesh.png";
  var riochain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/riochain.png";
  var sherpax = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sherpax.png";
  var sora_substrate = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sora_substrate.png";
  var swapdex = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/swapdex.png";
  var alephSmartNet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/alephsmartnet.png";
  var kulupu = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kulupu.png";
  var joystream = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/joystream.png";
  var aventus_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aventus_testnet.png";
  var vara_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/vara_network.png";
  var kate = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kate.png";
  var bridgeHubPolkadot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bridgehubpolkadot.png";
  var bridgeHubKusama = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bridgehubkusama.png";
  var fantom_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/fantom_testnet.png";
  var fantom = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/fantom.png";
  var krest_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/krest_network.png";
  var deeper_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/deeper_network.png";
  var jur_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/jur_network.png";
  var base_mainnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/base_mainnet.png";
  var avalanche_c = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/avalanche_c.png";
  var crust_mainnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/crust_mainnet.png";
  var acala_evm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acala_evm.png";
  var karura_evm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/karura_evm.png";
  var bittensor = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bittensor.png";
  var xcavate = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/xcavate.png";
  var unorthodox = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/unorthodox.png";
  var coinversation = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/coinversation.png";
  var layerx_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/layerx_network.png";
  var moonsama = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/moonsama.png";
  var oak_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/oak_network.png";
  var omnibtc = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/omnibtc.png";
  var peaq = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/peaq.png";
  var quantum_portal = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/quantum_portal.png";
  var virto_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/virto_network.png";
  var energy_web_x = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_x.png";
  var invarch = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/invarch.png";
  var zero = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/zero.png";
  var kpron_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/kpron_network.png";
  var mars = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mars.png";
  var snow = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/snow.png";
  var aband = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/aband.png";
  var acurast_canary = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acurast_canary.png";
  var alpha_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/alpha_network.png";
  var loom_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/loom_network.png";
  var subgame_gamma = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subgame_gamma.png";
  var trustbase = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/trustbase.png";
  var manta_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/manta_network.png";
  var t3rn = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/t3rn.png";
  var geminis_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/geminis_network.png";
  var polimec = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polimec.png";
  var subdao = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subdao.png";
  var subgame_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subgame_network.png";
  var zeta_test = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/zeta_test.png";
  var watr_mainnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_mainnet.png";
  var watr_mainnet_evm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/watr_mainnet_evm.png";
  var enjin_relaychain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/enjin_relaychain.png";
  var enjin_matrixchain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/enjin_matrixchain.png";
  var vara_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/vara_testnet.png";
  var goldberg_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/goldberg_testnet.png";
  var energy_web_x_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_x_testnet.png";
  var energy_web_chain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_chain.png";
  var energy_web_x_rococo = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/energy_web_x_rococo.png";
  var manta_network_evm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/manta_network_evm.png";
  var polkadex_dot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/polkadex_dot.png";
  var bittensor_testnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bittensor_testnet.png";
  var subspace_gemini_3h = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/subspace_gemini_3h.png";
  var continuum_network = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/continuum_network.png";
  var rococo_assethub = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/rococo_assethub.png";
  var okxTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/okxtest.png";
  var liberlandTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/liberlandtest.png";
  var liberland = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/liberland.png";
  var chainflip_dot = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/chainflip_dot.png";
  var tangleTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/tangletest.png";
  var dentnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dentnet.png";
  var phykenTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/phykentest.png";
  var creditcoinTestEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/creditcointestevm.png";
  var astarZkEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/astarzkevm.png";
  var sepolia_ethereum = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/sepolia_ethereum.png";
  var hydradx_rococo = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/hydradx_rococo.png";
  var creditcoinTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/creditcointest.png";
  var xlayer = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/xlayer.png";
  var acurast = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/acurast.png";
  var mythos = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/mythos.png";
  var humanode = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/humanode.png";
  var humanodeEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/humanodeevm.png";
  var paseoTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/paseotest.png";
  var commune = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/commune.png";
  var dbcchain = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/dbcchain.png";
  var availTuringTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/availturingtest.png";
  var bitlayer = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitlayer.png";
  var bitlayerTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bitlayertest.png";
  var bevm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bevm.png";
  var bevmTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bevmtest.png";
  var b2 = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/b2.png";
  var bobMainnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/bobmainnet.png";
  var avail_mainnet = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/avail_mainnet.png";
  var merlinEvm = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/merlinevm.png";
  var botanixEvmTest = "https://dev.sw-chain-list-assets.pages.dev/assets/chains/botanixevmtest.png";
  var bitcoin = "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png";
  var bitcoinTestnet = "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png";
  const _ChainLogoMap = {
  	"default": "https://dev.sw-chain-list-assets.pages.dev/assets/default.png",
  	polkadot: polkadot,
  	kusama: kusama,
  	ethereum: ethereum,
  	binance: binance,
  	moonbeam: moonbeam,
  	pioneer: pioneer,
  	aleph: aleph,
  	astar: astar,
  	astarEvm: astarEvm,
  	statemint: statemint,
  	acala: acala,
  	polygon: polygon,
  	arbitrum_one: arbitrum_one,
  	optimism: optimism,
  	tomochain: tomochain,
  	alephTest: alephTest,
  	shiden: shiden,
  	shidenEvm: shidenEvm,
  	shibuya: shibuya,
  	shibuyaEvm: shibuyaEvm,
  	aventus: aventus,
  	westend: westend,
  	rococo: rococo,
  	bitcountry: bitcountry,
  	equilibrium_parachain: equilibrium_parachain,
  	moonbase: moonbase,
  	moonriver: moonriver,
  	turingStaging: turingStaging,
  	turing: turing,
  	bifrost: bifrost,
  	bifrost_dot: bifrost_dot,
  	bifrost_testnet: bifrost_testnet,
  	calamari: calamari,
  	amplitude: amplitude,
  	amplitude_test: amplitude_test,
  	bobabase: bobabase,
  	ethereum_goerli: ethereum_goerli,
  	binance_test: binance_test,
  	parallel: parallel,
  	clover: clover,
  	cloverEvm: cloverEvm,
  	hydradx_main: hydradx_main,
  	edgeware: edgeware,
  	centrifuge: centrifuge,
  	interlay: interlay,
  	nodle: nodle,
  	darwinia2: darwinia2,
  	sora_ksm: sora_ksm,
  	odyssey: odyssey,
  	polkadex: polkadex,
  	polkadexTest: polkadexTest,
  	rmrk: rmrk,
  	dolphin: dolphin,
  	opal: opal,
  	efinity: efinity,
  	composableFinance: composableFinance,
  	phala: phala,
  	crust: crust,
  	statemine: statemine,
  	karura: karura,
  	khala: khala,
  	kilt: kilt,
  	basilisk: basilisk,
  	altair: altair,
  	heiko: heiko,
  	kintsugi: kintsugi,
  	kintsugi_test: kintsugi_test,
  	picasso: picasso,
  	quartz: quartz,
  	unique_network: unique_network,
  	genshiro: genshiro,
  	genshiro_testnet: genshiro_testnet,
  	subsocial_x: subsocial_x,
  	zeitgeist: zeitgeist,
  	sakura: sakura,
  	shadow: shadow,
  	uniqueNft: uniqueNft,
  	robonomics: robonomics,
  	integritee: integritee,
  	integriteePolkadot: integriteePolkadot,
  	crabParachain: crabParachain,
  	pangolin: pangolin,
  	chainx: chainx,
  	acala_testnet: acala_testnet,
  	mangatax: mangatax,
  	mangatax_para: mangatax_para,
  	encointer: encointer,
  	litmus: litmus,
  	litentry: litentry,
  	tinkernet: tinkernet,
  	imbue_network: imbue_network,
  	subspace_test: subspace_test,
  	subspace_gemini_2a: subspace_gemini_2a,
  	subspace_gemini_3c: subspace_gemini_3c,
  	subspace_gemini_3d: subspace_gemini_3d,
  	subspace_gemini_3e: subspace_gemini_3e,
  	subspace_gemini_3f: subspace_gemini_3f,
  	origintrail: origintrail,
  	subspace_gemini_3g: subspace_gemini_3g,
  	dorafactory: dorafactory,
  	bajun: bajun,
  	dancebox: dancebox,
  	listen: listen,
  	kabocha: kabocha,
  	gmdie: gmdie,
  	ternoa: ternoa,
  	tanganika: tanganika,
  	pendulum: pendulum,
  	gear_testnet: gear_testnet,
  	ternoa_alphanet: ternoa_alphanet,
  	calamari_test: calamari_test,
  	boba: boba,
  	bobabeam: bobabeam,
  	kilt_peregrine: kilt_peregrine,
  	xx_network: xx_network,
  	watr_network: watr_network,
  	watr_network_evm: watr_network_evm,
  	fusotao: fusotao,
  	discovol: discovol,
  	discovol_testnet: discovol_testnet,
  	atocha: atocha,
  	myriad: myriad,
  	deBio: deBio,
  	collectives: collectives,
  	ajunaPolkadot: ajunaPolkadot,
  	bitgreen: bitgreen,
  	frequency: frequency,
  	hashedNetwork: hashedNetwork,
  	kapex: kapex,
  	kylinNetwork: kylinNetwork,
  	ipci: ipci,
  	kico: kico,
  	luhnNetwork: luhnNetwork,
  	pichiu: pichiu,
  	riodefi: riodefi,
  	automata: automata,
  	creditcoin: creditcoin,
  	crownSterling: crownSterling,
  	dockPosMainnet: dockPosMainnet,
  	kusari: kusari,
  	logion: logion,
  	neatcoin: neatcoin,
  	nftmart: nftmart,
  	polymesh: polymesh,
  	riochain: riochain,
  	sherpax: sherpax,
  	sora_substrate: sora_substrate,
  	swapdex: swapdex,
  	"3dpass": "https://dev.sw-chain-list-assets.pages.dev/assets/chains/3dpass.png",
  	alephSmartNet: alephSmartNet,
  	kulupu: kulupu,
  	joystream: joystream,
  	aventus_testnet: aventus_testnet,
  	vara_network: vara_network,
  	kate: kate,
  	bridgeHubPolkadot: bridgeHubPolkadot,
  	bridgeHubKusama: bridgeHubKusama,
  	fantom_testnet: fantom_testnet,
  	fantom: fantom,
  	krest_network: krest_network,
  	deeper_network: deeper_network,
  	jur_network: jur_network,
  	base_mainnet: base_mainnet,
  	avalanche_c: avalanche_c,
  	crust_mainnet: crust_mainnet,
  	acala_evm: acala_evm,
  	karura_evm: karura_evm,
  	bittensor: bittensor,
  	xcavate: xcavate,
  	unorthodox: unorthodox,
  	coinversation: coinversation,
  	layerx_network: layerx_network,
  	moonsama: moonsama,
  	oak_network: oak_network,
  	omnibtc: omnibtc,
  	peaq: peaq,
  	quantum_portal: quantum_portal,
  	virto_network: virto_network,
  	energy_web_x: energy_web_x,
  	invarch: invarch,
  	zero: zero,
  	kpron_network: kpron_network,
  	mars: mars,
  	snow: snow,
  	aband: aband,
  	acurast_canary: acurast_canary,
  	alpha_network: alpha_network,
  	loom_network: loom_network,
  	subgame_gamma: subgame_gamma,
  	trustbase: trustbase,
  	manta_network: manta_network,
  	t3rn: t3rn,
  	geminis_network: geminis_network,
  	polimec: polimec,
  	subdao: subdao,
  	subgame_network: subgame_network,
  	zeta_test: zeta_test,
  	watr_mainnet: watr_mainnet,
  	watr_mainnet_evm: watr_mainnet_evm,
  	enjin_relaychain: enjin_relaychain,
  	enjin_matrixchain: enjin_matrixchain,
  	vara_testnet: vara_testnet,
  	goldberg_testnet: goldberg_testnet,
  	energy_web_x_testnet: energy_web_x_testnet,
  	energy_web_chain: energy_web_chain,
  	energy_web_x_rococo: energy_web_x_rococo,
  	manta_network_evm: manta_network_evm,
  	polkadex_dot: polkadex_dot,
  	bittensor_testnet: bittensor_testnet,
  	subspace_gemini_3h: subspace_gemini_3h,
  	continuum_network: continuum_network,
  	rococo_assethub: rococo_assethub,
  	okxTest: okxTest,
  	liberlandTest: liberlandTest,
  	liberland: liberland,
  	chainflip_dot: chainflip_dot,
  	tangleTest: tangleTest,
  	dentnet: dentnet,
  	phykenTest: phykenTest,
  	creditcoinTestEvm: creditcoinTestEvm,
  	astarZkEvm: astarZkEvm,
  	sepolia_ethereum: sepolia_ethereum,
  	hydradx_rococo: hydradx_rococo,
  	creditcoinTest: creditcoinTest,
  	xlayer: xlayer,
  	acurast: acurast,
  	mythos: mythos,
  	humanode: humanode,
  	humanodeEvm: humanodeEvm,
  	paseoTest: paseoTest,
  	commune: commune,
  	dbcchain: dbcchain,
  	availTuringTest: availTuringTest,
  	bitlayer: bitlayer,
  	bitlayerTest: bitlayerTest,
  	bevm: bevm,
  	bevmTest: bevmTest,
  	b2: b2,
  	bobMainnet: bobMainnet,
  	avail_mainnet: avail_mainnet,
  	merlinEvm: merlinEvm,
  	botanixEvmTest: botanixEvmTest,
  	"custom-Substrate-gosnetwork": "https://dev.sw-chain-list-assets.pages.dev/assets/custom-chains/gos_37cd7c233c.png",
  	"custom-Substrate-gosspectral": "https://dev.sw-chain-list-assets.pages.dev/assets/custom-chains/gos_37cd7c233c.png",
  	bitcoin: bitcoin,
  	bitcoinTestnet: bitcoinTestnet
  };

  const _MultiChainAssetMap = {
  	"BTC-Bitcoin": {
  	slug: "BTC-Bitcoin",
  	originChainAsset: "bitcoin-NATIVE-BTC",
  	name: "Bitcoin",
  	symbol: "BTC",
  	priceId: "bitcoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png"
  },
  	"BTC-BitcoinTestnet": {
  	slug: "BTC-BitcoinTestnet",
  	originChainAsset: "bitcoinTestnet-NATIVE-BTC",
  	name: "Bitcoin Testnet",
  	symbol: "BTC",
  	priceId: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png"
  },
  	"ETH-Ethereum": {
  	slug: "ETH-Ethereum",
  	originChainAsset: "ethereum-NATIVE-ETH",
  	name: "Ethereum",
  	symbol: "ETH",
  	priceId: "ethereum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/eth-ethereum.png"
  },
  	"iBTC-interBTC": {
  	slug: "iBTC-interBTC",
  	originChainAsset: "interlay-LOCAL-iBTC",
  	name: "interBTC",
  	symbol: "iBTC",
  	priceId: "interbtc",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ibtc-interbtc.png"
  },
  	"GLMR-Moonbeam": {
  	slug: "GLMR-Moonbeam",
  	originChainAsset: "moonbeam-NATIVE-GLMR",
  	name: "Moonbeam",
  	symbol: "GLMR",
  	priceId: "moonbeam",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/glmr-moonbeam.png"
  },
  	"DOT-Polkadot": {
  	slug: "DOT-Polkadot",
  	originChainAsset: "polkadot-NATIVE-DOT",
  	name: "Polkadot",
  	symbol: "DOT",
  	priceId: "polkadot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dot-polkadot.png"
  },
  	"ACA-Acala": {
  	slug: "ACA-Acala",
  	originChainAsset: "acala-NATIVE-ACA",
  	name: "Acala",
  	symbol: "ACA",
  	priceId: "acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/aca-acala.png"
  },
  	"MOVR-Moonriver": {
  	slug: "MOVR-Moonriver",
  	originChainAsset: "moonriver-NATIVE-MOVR",
  	name: "Moonriver",
  	symbol: "MOVR",
  	priceId: "moonriver",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/movr-moonriver.png"
  },
  	"USDT-Tether": {
  	slug: "USDT-Tether",
  	originChainAsset: null,
  	name: "Tether",
  	symbol: "USDT",
  	priceId: "tether",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/usdt-tether.png"
  },
  	"ASTR-Astar": {
  	slug: "ASTR-Astar",
  	originChainAsset: "astar-NATIVE-ASTR",
  	name: "Astar",
  	symbol: "ASTR",
  	priceId: "astar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/astr-astar.png"
  },
  	"DEV-MoonbaseDev": {
  	slug: "DEV-MoonbaseDev",
  	originChainAsset: "moonbase-NATIVE-DEV",
  	name: "Moonbase Dev",
  	symbol: "DEV",
  	priceId: null,
  	hasValue: false,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dev-moonbasedev.png"
  },
  	"DAI-DaiStablecoin": {
  	slug: "DAI-DaiStablecoin",
  	originChainAsset: null,
  	name: "Dai Stablecoin",
  	symbol: "DAI",
  	priceId: "dai",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dai-daistablecoin.png"
  },
  	"DPR-DeeperNetwork": {
  	slug: "DPR-DeeperNetwork",
  	originChainAsset: "ethereum-ERC20-DPR-0xf3AE5d769e153Ef72b4e3591aC004E89F48107a1",
  	name: "Deeper Network",
  	symbol: "DPR",
  	priceId: "deeper-network",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/dpr-deepernetwork.png"
  },
  	"BNC-BifrostKusama": {
  	slug: "BNC-BifrostKusama",
  	originChainAsset: "bifrost-NATIVE-BNC",
  	name: "Bifrost Kusama",
  	symbol: "BNC",
  	priceId: "bifrost-native-coin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bnc-bifrostkusama.png"
  },
  	"BOBA-BobaToken": {
  	slug: "BOBA-BobaToken",
  	originChainAsset: null,
  	name: "Boba Token",
  	symbol: "BOBA",
  	priceId: "boba-network",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/boba-bobatoken.png"
  },
  	"CRU-Crust": {
  	slug: "CRU-Crust",
  	originChainAsset: "crust-NATIVE-CRU",
  	name: "Crust",
  	symbol: "CRU",
  	priceId: "crust-network",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/cru-crust.png"
  },
  	"SDN-Shiden": {
  	slug: "SDN-Shiden",
  	originChainAsset: "shiden-NATIVE-SDN",
  	name: "Shiden",
  	symbol: "SDN",
  	priceId: "shiden",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/sdn-shiden.png"
  },
  	"ARB-ArbitrumOne": {
  	slug: "ARB-ArbitrumOne",
  	originChainAsset: "arbitrum_one-ERC20-ARB-0x912CE59144191C1204E64559FE8253a0e49E6548",
  	name: "Arbitrum One",
  	symbol: "ARB",
  	priceId: "arbitrum",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/arb-arbitrumone.png"
  },
  	"USDD-DecentralizedUSD": {
  	slug: "USDD-DecentralizedUSD",
  	originChainAsset: null,
  	name: "Decentralized USD",
  	symbol: "USDD",
  	priceId: "usdd",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/usdd-decentralizedusd.png"
  },
  	"NEER-Pioneer": {
  	slug: "NEER-Pioneer",
  	originChainAsset: "pioneer-NATIVE-NEER",
  	name: "Pioneer",
  	symbol: "NEER",
  	priceId: "metaverse-network-pioneer",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/neer-pioneer.png"
  },
  	"KAR-Karura": {
  	slug: "KAR-Karura",
  	originChainAsset: "karura-NATIVE-KAR",
  	name: "Karura",
  	symbol: "KAR",
  	priceId: "karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kar-karura.png"
  },
  	"PKEX-PolkaEx": {
  	slug: "PKEX-PolkaEx",
  	originChainAsset: null,
  	name: "PolkaEx",
  	symbol: "PKEX",
  	priceId: "polkaex",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/pkex-polkaex.png"
  },
  	"aSEED-aSEEDAcala": {
  	slug: "aSEED-aSEEDAcala",
  	originChainAsset: "acala-LOCAL-aSEED",
  	name: "aUSD SEED (Acala)",
  	symbol: "aSEED",
  	priceId: "ausd-seed-acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/aseed-aseedacala.png"
  },
  	"MATIC-Polygon": {
  	slug: "MATIC-Polygon",
  	originChainAsset: "polygon-NATIVE-MATIC",
  	name: "Polygon",
  	symbol: "MATIC",
  	priceId: "matic-network",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/matic-polygon.png"
  },
  	"kBTC-KintsugiWrappedBTC": {
  	slug: "kBTC-KintsugiWrappedBTC",
  	originChainAsset: "kintsugi-LOCAL-kBTC",
  	name: "Kintsugi Wrapped BTC",
  	symbol: "kBTC",
  	priceId: "kintsugi-btc",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kbtc-kintsugiwrappedbtc.png"
  },
  	"FTM-Fantom": {
  	slug: "FTM-Fantom",
  	originChainAsset: "fantom-NATIVE-FTM",
  	name: "Fantom",
  	symbol: "FTM",
  	priceId: "fantom",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ftm-fantom.png"
  },
  	"aUSD-KaruraDollar": {
  	slug: "aUSD-KaruraDollar",
  	originChainAsset: null,
  	name: "Karura Dollar",
  	symbol: "aUSD",
  	priceId: "acala-dollar",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ausd-karuradollar.png"
  },
  	"PHA-Phala": {
  	slug: "PHA-Phala",
  	originChainAsset: "phala-NATIVE-PHA",
  	name: "Phala",
  	symbol: "PHA",
  	priceId: "pha",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/pha-phala.png"
  },
  	"WETH-WrappedEther": {
  	slug: "WETH-WrappedEther",
  	originChainAsset: "ethereum-ERC20-WETH-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  	name: "Wrapped Ether",
  	symbol: "WETH",
  	priceId: "weth",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/weth-wrappedether.png"
  },
  	"BUSD-BinanceUSD": {
  	slug: "BUSD-BinanceUSD",
  	originChainAsset: "binance-ERC20-BUSD-0xe9e7cea3dedca5984780bafc599bd69add087d56",
  	name: "Binance USD",
  	symbol: "BUSD",
  	priceId: "binance-usd",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/busd-binanceusd.png"
  },
  	"EQ-Equilibrium": {
  	slug: "EQ-Equilibrium",
  	originChainAsset: "equilibrium_parachain-NATIVE-EQ",
  	name: "Equilibrium",
  	symbol: "EQ",
  	priceId: "equilibrium-token",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/eq-equilibrium.png"
  },
  	"BNB-Binance": {
  	slug: "BNB-Binance",
  	originChainAsset: "binance-NATIVE-BNB",
  	name: "Binance Smart Chain",
  	symbol: "BNB",
  	priceId: "binancecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bnb-binance.png"
  },
  	"USDC-USDCoin": {
  	slug: "USDC-USDCoin",
  	originChainAsset: null,
  	name: "USDC",
  	symbol: "USDC",
  	priceId: "usd-coin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/usdc-usdcoin.png"
  },
  	"RMRK-RMRKApp": {
  	slug: "RMRK-RMRKApp",
  	originChainAsset: "statemine-LOCAL-RMRK",
  	name: "RMRK.app",
  	symbol: "RMRK",
  	priceId: "rmrk",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/rmrk-rmrkapp.png"
  },
  	"KINT-Kintsugi": {
  	slug: "KINT-Kintsugi",
  	originChainAsset: "kintsugi-NATIVE-KINT",
  	name: "Kintsugi",
  	symbol: "KINT",
  	priceId: "kintsugi",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kint-kintsugi.png"
  },
  	"WBTC-WrappedBTC": {
  	slug: "WBTC-WrappedBTC",
  	originChainAsset: null,
  	name: "Wrapped BTC",
  	symbol: "WBTC",
  	priceId: "wrapped-bitcoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/wbtc-wrappedbtc.png"
  },
  	"aSEED-aSEEDKarura": {
  	slug: "aSEED-aSEEDKarura",
  	originChainAsset: "karura-LOCAL-aSEED",
  	name: "aUSD SEED (Karura)",
  	symbol: "aSEED",
  	priceId: "ausd-seed-karura",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/aseed-aseedkarura.png"
  },
  	"aUSD-AcalaDollar": {
  	slug: "aUSD-AcalaDollar",
  	originChainAsset: null,
  	name: "Acala Dollar",
  	symbol: "aUSD",
  	priceId: "acala-dollar-acala",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ausd-acaladollar.png"
  },
  	"EQD-EquilibriumUSD": {
  	slug: "EQD-EquilibriumUSD",
  	originChainAsset: "equilibrium_parachain-LOCAL-EQD",
  	name: "Equilibrium USD",
  	symbol: "EQD",
  	priceId: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/eqd-equilibriumusd.png"
  },
  	"KMA-Calamari": {
  	slug: "KMA-Calamari",
  	originChainAsset: "calamari-NATIVE-KMA",
  	name: "Calamari",
  	symbol: "KMA",
  	priceId: "calamari-network",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/kma-calamari.png"
  },
  	"OP-Optimism": {
  	slug: "OP-Optimism",
  	originChainAsset: "optimism-ERC20-OP-0x4200000000000000000000000000000000000042",
  	name: "Optimism",
  	symbol: "OP",
  	priceId: "optimism",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/op-optimism.png"
  },
  	"PARA-Parallel": {
  	slug: "PARA-Parallel",
  	originChainAsset: "parallel-NATIVE-PARA",
  	name: "Parallel",
  	symbol: "PARA",
  	priceId: "parallel-finance",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/para-parallel.png"
  },
  	"KSM-Kusama": {
  	slug: "KSM-Kusama",
  	originChainAsset: "kusama-NATIVE-KSM",
  	name: "Kusama",
  	symbol: "KSM",
  	priceId: "kusama",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ksm-kusama.png"
  },
  	"INTR-Interlay": {
  	slug: "INTR-Interlay",
  	originChainAsset: "interlay-NATIVE-INTR",
  	name: "Interlay",
  	symbol: "INTR",
  	priceId: "interlay",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/intr-interlay.png"
  },
  	"ENJ-Enjin": {
  	slug: "ENJ-Enjin",
  	originChainAsset: "enjin_relaychain-NATIVE-ENJ",
  	name: "Enjin Relaychain",
  	symbol: "ENJ",
  	priceId: "enjincoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/enj-enjin.png"
  },
  	"CFG-Centrifuge": {
  	slug: "CFG-Centrifuge",
  	originChainAsset: "centrifuge-NATIVE-CFG",
  	name: "Centrifuge",
  	symbol: "CFG",
  	priceId: "centrifuge",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/cfg-centrifuge.png"
  },
  	"MANTA-MantaAtlantic": {
  	slug: "MANTA-MantaAtlantic",
  	originChainAsset: "manta_network-NATIVE-MANTA",
  	name: "Manta Atlantic",
  	symbol: "MANTA",
  	priceId: "manta-network",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/manta-mantaatlantic.png"
  },
  	"PINK-StatemintPink": {
  	slug: "PINK-StatemintPink",
  	originChainAsset: "statemint-LOCAL-PINK",
  	name: "Statemint Pink",
  	symbol: "PINK",
  	priceId: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/pink-statemintpink.png"
  },
  	"BNC-BifrostPolkadot": {
  	slug: "BNC-BifrostPolkadot",
  	originChainAsset: "bifrost_dot-NATIVE-BNC",
  	name: "Bifrost Polkadot",
  	symbol: "BNC",
  	priceId: "bifrost-native-coin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bnc-bifrostpolkadot.png"
  },
  	"DED-DED": {
  	slug: "DED-DED",
  	originChainAsset: "statemint-LOCAL-DED",
  	name: "DED",
  	symbol: "DED",
  	priceId: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ded-ded.png"
  },
  	"BNCS-InscriptionToken": {
  	slug: "BNCS-InscriptionToken",
  	originChainAsset: "bifrost_dot-LOCAL-BNCS",
  	name: "Inscription Token",
  	symbol: "BNCS",
  	priceId: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/bncs-inscriptiontoken.png"
  },
  	"APE-ApeCoin": {
  	slug: "APE-ApeCoin",
  	originChainAsset: "ethereum-ERC20-APE-0x4d224452801ACEd8B2F0aebE155379bb5D594381",
  	name: "ApeCoin",
  	symbol: "APE",
  	priceId: "apecoin",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/ape-apecoin.png"
  },
  	"vDOT-VoucherDot": {
  	slug: "vDOT-VoucherDot",
  	originChainAsset: "bifrost_dot-LOCAL-vDOT",
  	name: "Voucher Dot",
  	symbol: "vDOT",
  	priceId: "voucher-dot",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/vdot-voucherdot.png"
  },
  	"BEEFY-BEEFY": {
  	slug: "BEEFY-BEEFY",
  	originChainAsset: "statemint-LOCAL-BEEFY",
  	name: "BEEFY",
  	symbol: "BEEFY",
  	priceId: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/beefy-beefy.png"
  },
  	"HMND-Humanode": {
  	slug: "HMND-Humanode",
  	originChainAsset: "humanode-NATIVE-HMND",
  	name: "Humanode",
  	symbol: "HMND",
  	priceId: "humanode",
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/hmnd-humanode.png"
  },
  	"STINK-STINK": {
  	slug: "STINK-STINK",
  	originChainAsset: "statemint-LOCAL-STINK",
  	name: "STINK",
  	symbol: "STINK",
  	priceId: null,
  	hasValue: true,
  	icon: "https://dev.sw-chain-list-assets.pages.dev/assets/multi-chain-assets/stink-stink.png"
  }
  };

  const ChainInfoMap = _ChainInfoMap;
  const ChainAssetMap = _ChainAssetMap;
  const AssetRefMap = _AssetRefMap;
  const MultiChainAssetMap = _MultiChainAssetMap;
  const AssetLogoMap = _AssetLogoMap;
  const ChainLogoMap = _ChainLogoMap;
  exports.COMMON_CHAIN_SLUGS = void 0;
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
  })(exports.COMMON_CHAIN_SLUGS || (exports.COMMON_CHAIN_SLUGS = {}));
  exports.COMMON_ASSETS = void 0;
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
  })(exports.COMMON_ASSETS || (exports.COMMON_ASSETS = {}));
  const _DEFAULT_CHAINS = [exports.COMMON_CHAIN_SLUGS.POLKADOT, exports.COMMON_CHAIN_SLUGS.KUSAMA, exports.COMMON_CHAIN_SLUGS.ETHEREUM];

  exports.AssetLogoMap = AssetLogoMap;
  exports.AssetRefMap = AssetRefMap;
  exports.ChainAssetMap = ChainAssetMap;
  exports.ChainInfoMap = ChainInfoMap;
  exports.ChainLogoMap = ChainLogoMap;
  exports.MultiChainAssetMap = MultiChainAssetMap;
  exports._DEFAULT_CHAINS = _DEFAULT_CHAINS;

}));
