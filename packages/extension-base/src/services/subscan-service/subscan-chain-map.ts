// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

/**
 * Only use this for initiating data
 */
const SUBSCAN_CHAIN_MAP: Record<string, string> = {
  polkadot: 'polkadot',
  kusama: 'kusama',
  moonbeam: 'moonbeam',
  pioneer: 'pioneer',
  aleph: 'alephzero',
  astar: 'astar',
  statemint: 'assethub-polkadot',
  acala: 'acala',
  shiden: 'shiden',
  shibuya: 'shibuya',
  westend: 'westend',
  rococo: 'rococo',
  moonbase: 'moonbase',
  moonriver: 'moonriver',
  turing: 'turing',
  bifrost: 'bifrost-kusama',
  bifrost_dot: 'bifrost',
  calamari: 'calamari',
  parallel: 'parallel',
  clover: 'clv',
  hydradx_main: 'hydradx',
  centrifuge: 'centrifuge',
  interlay: 'interlay',
  nodle: 'nodle',
  darwinia2: 'darwinia',
  polkadex: 'polkadex-parachain',
  composableFinance: 'composable',
  phala: 'phala',
  crust: 'crust-parachain',
  statemine: 'assethub-kusama',
  karura: 'karura',
  khala: 'khala',
  kilt: 'spiritnet',
  basilisk: 'basilisk',
  altair: 'altair',
  heiko: 'parallel-heiko',
  kintsugi: 'kintsugi',
  picasso: 'picasso',
  unique_network: 'unique',
  zeitgeist: 'zeitgeist',
  sakura: 'sakura',
  shadow: 'shadow',
  robonomics: 'robonomics',
  integritee: 'integritee',
  crabParachain: 'crab',
  acala_testnet: 'acala-testnet',
  mangatax_para: 'mangatax',
  origintrail: 'origintrail',
  subspace_gemini_3g: 'subspace',
  bajun: 'bajun',
  tanganika: 'datahighway',
  kilt_peregrine: 'kilt-testnet',
  dockPosMainnet: 'dock',
  polymesh: 'polymesh',
  sora_substrate: 'sora',
  joystream: 'joystream',
  vara_network: 'vara',
  krest_network: 'krest',
  crust_mainnet: 'crust',
  manta_network: 'manta'
};

/**
 * Only use this for initiating data
 */
export const SUBSCAN_CHAIN_MAP_REVERSE = Object.fromEntries(Object.entries(SUBSCAN_CHAIN_MAP).map(([k, v]) => [v, k]));
export default SUBSCAN_CHAIN_MAP;
