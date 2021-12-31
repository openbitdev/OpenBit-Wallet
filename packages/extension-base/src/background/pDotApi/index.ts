import {BackgroundWindow} from "@polkadot/extension-base/background/types";
import NETWORKS from './networks';

export * from './api';

export function getGenesis (name: string): string {
  if (NETWORKS[name]
    && NETWORKS[name].genesisHash
    && NETWORKS[name].genesisHash.toLowerCase() !== 'unknown') {
    return NETWORKS[name].genesisHash;
  }

  console.log(`Genesis hash of ${name} is not available`);

  return `not_available_genesis_hash__${name}`;
}

function getRpcsMap(): Record<string, string> {
  const result: Record<string, string> = {};

  Object.keys(NETWORKS).forEach(networkKey => {
    const networkInfo = NETWORKS[networkKey];

    if (!networkInfo.genesisHash || networkInfo.genesisHash.toLowerCase() === 'unknown') {
      return;
    }

    result[networkInfo.genesisHash] = networkInfo.provider;
  });

  return result;
}

// todo: each network has some rpc urls, think about how to handle those urls
export const rpcsMap: Record<string, string> = getRpcsMap();

export function initBackgroundWindow(keyring: any) {
  (window as any as BackgroundWindow).pdotApi = {
    keyring,
    apisMap: {}
  };
}
