export * from './support';
export * from './chainBalancesApi';

export const subscanByNetworkName: Record<string, string> = {
  'acala': 'https://acala.subscan.io',
  // 'altair': 'https://altair.subscan.io',
  'astar': 'https://astar.subscan.io',
  // 'basilisk': 'https://basilisk.subscan.io',
  'bifrost': 'https://bifrost.subscan.io',
  'calamari': 'https://calamari.subscan.io',
  'clover': 'https://clover.subscan.io',
  // 'genshiro': 'https://genshiro.subscan.io',
  'heiko': 'https://parallel-heiko.subscan.io',
  'hydradx': 'https://hydradx.subscan.io',
  'karura': 'https://karura.subscan.io',
  'khala': 'https://khala.subscan.io',
  'kilt': 'https://spiritnet.subscan.io',
  // 'kintsugi': 'https://kintsugi.subscan.io',
  'kusama': 'https://kusama.subscan.io',
  'moonbeam': 'https://moonbeam.subscan.io',
  'moonriver': 'https://moonriver.subscan.io',
  'parallel': 'https://parallel.subscan.io',
  // 'picasso': 'https://picasso.subscan.io',
  // 'pioneer': 'https://pioneer.subscan.io',
  'polkadot': 'https://polkadot.subscan.io',
  'quartz': 'https://quartz.subscan.io',
  'sakura': 'https://sakura.subscan.io',
  // 'shadow': 'https://shadow.subscan.io',
  'shiden': 'https://shiden.subscan.io',
  'statemine': 'https://statemine.subscan.io',
  // 'statemint': 'https://statemint.subscan.io',
  // 'subsocial': 'https://subsocial.subscan.io',
  // 'zeitgeist': 'https://zeitgeist.subscan.io',
  'westend': 'https://westend.subscan.io',
};

export function isSupportSubscan(networkName: string): boolean {
  return !!subscanByNetworkName[networkName];
}
