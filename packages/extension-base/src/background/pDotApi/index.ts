import {BackgroundWindow} from "@polkadot/extension-base/background/types";
import { selectableNetworks } from '@polkadot/networks';
import { assert } from '@polkadot/util';

export * from './api';

export const customGenesisHashMap: Record<string, string> = {
  'koni': '0x7a48390870728092c951aaf4e1632c849a74489d9cee0bf51d3527b33983fc0a'
};

export function getGenesis (name: string): string {
  let network = selectableNetworks.find(({ network }) => network === name);

  if (network && network.genesisHash[0]) {
    return network.genesisHash[0];
  }

  if (customGenesisHashMap[name]) {
    return customGenesisHashMap[name];
  }

  assert(true, `Unable to find genesisHash for ${name}`);

  return `not_available_genesis_hash__${name}`;
}

// todo: each network has some rpc urls, think about how to handle those urls
export const rpcsMap: Record<string, string> = {
  [getGenesis('polkadot')] : 'wss://pub.elara.patract.io/polkadot',
  [getGenesis('kusama')] : 'wss://pub.elara.patract.io/kusama',
  [getGenesis('plasm')] : 'wss://rpc.plasmnet.io/',
  [getGenesis('bifrost')] : 'wss://bifrost-dot.liebi.com/ws',

  [getGenesis('edgeware')] : 'wss://edgeware.api.onfinality.io/public-ws',
  [getGenesis('karura')] : 'wss://karura.api.onfinality.io/public-ws',
  [getGenesis('acala')] : 'wss://acala-rpc-3.aca-api.network/ws',
  [getGenesis('polymesh')] : 'wss://mainnet-rpc.polymesh.network',

  [getGenesis('kulupu')] : 'wss://rpc.kulupu.corepaper.org/ws',
  [getGenesis('stafi')] : 'wss://mainnet-rpc.stafi.io',
  [getGenesis('dock-mainnet')] : 'wss://mainnet-node.dock.io',
  [getGenesis('centrifuge')] : 'wss://fullnode.centrifuge.io',

  [getGenesis('picasso')] : 'wss://picasso-rpc.composable.finance',
  [getGenesis('hydradx')] : 'wss://rpc-01.snakenet.hydradx.io',
  [getGenesis('equilibrium')] : 'wss://node.equilibrium.io',


  [getGenesis('koni')] : 'wss://rpc.koniverse.com',
}

export function initBackgroundWindow(keyring: any) {
  (window as any as BackgroundWindow).pdotApi = {
    keyring,
    apisMap: {}
  };
}
