import { _BitcoinApi } from '@subwallet/extension-base/services/chain-service/types';
import { BalanceItem } from '@subwallet/extension-base/types';
import { APIItemState } from '@subwallet/extension-base/background/KoniTypes';
import { _ChainAsset } from '@subwallet/chain-list/types';
import { ASTAR_REFRESH_BALANCE_INTERVAL } from '@subwallet/extension-base/constants';

// export async function subscribeBitcoinBalance(
//   chain: string,
//   addresses: string[],
//   bitcoinApi: Record<string, _BitcoinApi>,
//   callback: (rs: BalanceItem[]) => void,
//   tokenInfo: _ChainAsset
// ): Promise<() => void> {
//   const bitcoinInstance = bitcoinApi[chain] ;
//   if (!bitcoinInstance || !bitcoinInstance.api || !bitcoinInstance.api.setBaseUrl ) {
//     console.error(`API proxy for Bitcoin is not available or does not have necessary properties`);
//     return () => {};
//   }

//   bitcoinInstance.api.setBaseUrl(bitcoinInstance.apiUrl); // Sử dụng apiUrl từ bitcoinInstance

//   const unsub = setInterval(async () => {
//     try {
//       const promises = addresses.map(address => {
//         const url = `/address/${address}`;
//         return bitcoinInstance.api.getRequest(url);
//       });

//       const responses = await Promise.all(promises);

//       const items: BalanceItem[] = responses.map(async (response, index) => {
//         if (response.status !== 200) {
//           console.error(`Error while fetching Bitcoin balance for addres`);
//           return {
//             address: addresses[index],
//             tokenSlug: tokenInfo.slug,
//             state: APIItemState.READY,
           
//           };
//         }

//         const jsonData = await response.json();
//         const balance = jsonData.chain_stats.funded_txo_sum - jsonData.chain_stats.spent_txo_sum;

//         return {
//           address: addresses[index],
//           tokenSlug: tokenInfo.slug,
//           state: APIItemState.READY,
//           free: balance.toString(),
//           locked: '0'
//         };
//       });

//       callback(items);
//     } catch (error) {
//       console.error(`Error while fetching Bitcoin balances: ${error}`);
//     }
//   }, bitcoinInstance.refreshInterval);

//   return () => {
//     clearInterval(unsub);
//   };
// }


export async function getBitcoinBalance(chain: string, addresses: string[], bitcoinApiMap: Record<string, _BitcoinApi>): Promise<string[]> {
  const bitcoinInstance = bitcoinApiMap[chain];

  if (!bitcoinInstance || !bitcoinInstance.api || !bitcoinInstance.api.getRequest) {
    console.error(`API proxy for Bitcoin is not available or does not have necessary methods`);
    return [];
  }

  try {
    const promises = addresses.map(address => {
      const url = `/address/${address}`;
      return bitcoinInstance.api.getRequest(url);
    });

    const responses = await Promise.all(promises);

    return Promise.all(responses.map(async (response) => {
      if (response.status !== 200) {
        console.error(`Error while fetching Bitcoin balance: ${await response.text()}`);
        return '0';
      }

      const jsonData = await response.json();
      const balance = jsonData.chain_stats.funded_txo_sum - jsonData.chain_stats.spent_txo_sum;

      return balance.toString();
    }));
  } catch (error) {
    console.error(`Error while fetching Bitcoin balances: ${error}`);
    return [];
  }
}

export function subscribeBitcoinBalance(chain: string, addresses: string[], bitcoinApiMap: Record<string, _BitcoinApi>, callback: (rs: BalanceItem[]) => void, tokenInfo: _ChainAsset): () => void {
  function getBalance() {
    getBitcoinBalance(chain, addresses, bitcoinApiMap)
      .then((balances) => {
        return balances.map((balance, index): BalanceItem => {
          return {
            address: addresses[index],
            tokenSlug: tokenInfo.slug,
            state: APIItemState.READY,
            free: balance,
            locked: '0'
          };
        });
      })
      .catch((e) => {
        console.error(`Error on get Bitcoin balance with token ${tokenInfo.slug}`, e);

        return addresses.map((address): BalanceItem => {
          return {
            address: address,
            tokenSlug: tokenInfo.slug,
            state: APIItemState.READY,
            free: '0',
            locked: '0'
          };
        });
      })
      .then((items) => {
        callback(items);
      })
      .catch(console.error);
  }

  getBalance();
  const interval = setInterval(getBalance, ASTAR_REFRESH_BALANCE_INTERVAL);

  return () => {
    clearInterval(interval);
  };
}