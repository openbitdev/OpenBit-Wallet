import NETWORKS from '@polkadot/extension-base/background/pDotApi/networks';

function getNetworkNameByGenesisHashMap(): Record<string, string> {
  const result: Record<string, string> = {};

  Object.keys(NETWORKS).forEach(networkKey => {
    const {genesisHash} = NETWORKS[networkKey];

    if (!genesisHash || genesisHash.toLowerCase() === 'unknown') {
      return;
    }

    result[genesisHash] = networkKey;
  });

  return result;
}

const networkNameByGenesisHashMap = getNetworkNameByGenesisHashMap();

export default networkNameByGenesisHashMap;
