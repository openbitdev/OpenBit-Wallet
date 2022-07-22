// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

const LogosMap: Record<string, string> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  acala: require('./acala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  acala_testnet: require('./acala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ausd: require('./ausd.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  dot: require('./dot.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ldot: require('./ldot.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  lcdot: require('./lcdot.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  altair: require('./altair.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  air: require('./altair.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  astar: require('./astar.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  astarEvm: require('./astar.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shibuya: require('./astar.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shibuyaEvm: require('./astar.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  basilisk: require('./basilisk.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bifrost: require('./bifrost.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bifrost_dot: require('./bifrost.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bifrost_testnet: require('./bifrost.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  calamari: require('./calamari.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  centrifuge: require('./centrifuge.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  clover: require('./clover.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  coinversation: require('./coinversation.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  composableFinance: require('./composableFinance.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  crab: require('./crab.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  crabParachain: require('./crab.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  crabEvm: require('./crab.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  crust: require('./crust.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  darwinia: require('./darwinia.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  edgeware: require('./edgeware.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  efinity: require('./efinity.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  equilibrium: require('./equilibrium.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  equilibrium_parachain: require('./equilibrium.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  genshiro_testnet: require('./genshiro.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  genshiro: require('./genshiro.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  heiko: require('./heiko.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  hydradx: require('./hydradx.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  integritee: require('./integritee.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  interlay: require('./interlay.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  karura: require('./karura.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  khala: require('./khala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kilt: require('./kilt.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kintsugi: require('./kintsugi.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kintsugi_test: require('./kintsugi.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kusama: require('./kusama.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  litentry: require('./litentry.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  manta: require('./manta.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  dolphin: require('./dolphin.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  moonbeam: require('./moonbeam.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  moonriver: require('./moonriver.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  nodle: require('./nodle.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  parallel: require('./parallel.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pangolin: require('./pangolin.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pangolinEvm: require('./pangolin.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  phala: require('./phala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pha: require('./phala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  picasso: require('./picasso.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pichiu: require('./pichiu.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pioneer: require('./pioneer.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  polkadot: require('./polkadot.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  quartz: require('./quartz.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  rmrk: require('./rmrk.jpg'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  sakura: require('./sakura.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shadow: require('./shadow.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shiden: require('./shiden.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shidenEvm: require('./shiden.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  sora: require('./sora-substrate.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  statemine: require('./statemine.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subgame: require('./subgame.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  statemint: require('./statemine.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subsocial_x: require('./subsocial.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subsocial: require('./subsocial.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  zeitgeist: require('./zeitgeist.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  koni: require('./koni.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  westend: require('./westend.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  rococo: require('./rococo.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  robonomics: require('./robonomics.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  odyssey: require('./odyssey.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  polkadex: require('./polkadex.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  aleph: require('./aleph.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  alephTest: require('./aleph.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  opal: require('./opal.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  moonbase: require('./moonbase.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ukraine: require('./ukraine.jpg'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bitcountry: require('./bitcountry.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  unique_network: require('./unique.network.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bnc: require('./bnc.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kbtc: require('./kbtc.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kint: require('./kint.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kusd: require('./kusd.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  lksm: require('./lksm.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  tai: require('./tai.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  vsksm: require('./vsksm.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ksm: require('./kusama.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kar: require('./karura.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  zlk: require('./zenlink.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  neumann: require('./oak_network.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  turing: require('./turing.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  mangatax: require('./mangatax.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  mangatax_para: require('./mangatax.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  chainx: require('./chainx.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  litmus: require('./litmus.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  encointer: require('./encointer.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  btc: require('./btc.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  eth: require('./eth.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bnb: require('./bnb.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  usdt: require('./usdt.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  usdc: require('./usdc.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  busd: require('./busd.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pkex: require('./pkex.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shib: require('./shib.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  dai: require('./dai.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  sdn: require('./shiden.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  wbtc: require('./wbtc.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  weth: require('./eth.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  jpyc: require('./jpyc.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  glint: require('./glint.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  share: require('./glint.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  beans: require('./beans.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  stella: require('./stella.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xstella: require('./xstella.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  vesolar: require('./flare.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  flare: require('./flare.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  mfam: require('./mfam.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  solar: require('./solar.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  frax: require('./frax.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fxs: require('./frax.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  cws: require('./cws.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  rib: require('./rib.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  csg: require('./csg.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  movr: require('./moonriver.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  qtz: require('./quartz.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  csm: require('./csm.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  aris: require('./aris.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kico: require('./kico.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  hko: require('./hko.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bill: require('./bill.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  chaos: require('./chaosdao.jpeg'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  chrwna: require('./chrwna.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcrmrk: require('./rmrk.jpg'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xckint: require('./kintsugi.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcksm: require('./kusama.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xckar: require('./karura.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcbnc: require('./bifrost.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcausd: require('./ausd.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  kma: require('./kma.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  taiKSM: require('./taiKSM.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  bsx: require('./bsx.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  polarisdao: require('./polarisdao.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  arsw: require('./arthswaplogo.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  oru: require('./orulogo.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  srs: require('./siriusfinance.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  atid: require('./astrid_dao.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  lay: require('./starlay.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subspace: require('./subspace.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subspace_test: require('./subspace.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcpara: require('./parallel.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcdot: require('./polkadot.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcaca: require('./acala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xchko: require('./heiko.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcpha: require('./phala.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  xcusdt: require('./usdt.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  imbue_network: require('./imbue.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  tinkernet: require('./tinker.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  hydradx_main: require('./hydradx.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  tdot: require('./tdot.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  taiksm: require('./taiksm.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  '3usd': require('./3usd.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  default: require('./default.png')
};

export default LogosMap;
