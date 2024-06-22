// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _AssetType, _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { APIItemState } from '@subwallet/extension-base/background/KoniTypes';
import { COMMON_REFRESH_BALANCE_INTERVAL } from '@subwallet/extension-base/constants';
import { Brc20BalanceItem } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { _BitcoinApi } from '@subwallet/extension-base/services/chain-service/types';
import { _getChainNativeTokenSlug, _getRuneId } from '@subwallet/extension-base/services/chain-service/utils';
import { BalanceItem, UtxoResponseItem } from '@subwallet/extension-base/types';
import { filterAssetsByChainAndType, filteredOutTxsUtxos, getInscriptionUtxos, getRuneUtxos } from '@subwallet/extension-base/utils';

// todo: update bitcoin params
function subscribeRuneBalance (bitcoinApi: _BitcoinApi, addresses: string[], assetMap: Record<string, _ChainAsset>, chainInfo: _ChainInfo, callback: (rs: BalanceItem[]) => void) {
  const chain = chainInfo.slug;
  const tokenList = filterAssetsByChainAndType(assetMap, chain, [_AssetType.RUNE]);

  // todo: check await asset ready before subscribe
  if (Object.keys(tokenList).length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {
    };
  }

  const getRunesBalance = async () => {
    const runeIdToSlugMap: Record<string, string> = {};
    const runeIdToAllItemsMap: Record<string, BalanceItem[]> = {};

    Object.values(tokenList).forEach((token) => {
      runeIdToSlugMap[_getRuneId(token)] = token.slug;
    });

    // get runeId -> BalanceItem[] mapping
    await Promise.all(addresses.map(async (address) => {
      try {
        const runes = await bitcoinApi.api.getRunes(address);

        runes.forEach((rune) => {
          const runeId = rune.rune_id;

          if (!Object.keys(runeIdToSlugMap).includes(runeId)) {
            return;
          }

          const item = {
            address: address,
            tokenSlug: runeIdToSlugMap[runeId],
            free: rune.amount,
            locked: '0',
            state: APIItemState.READY
          } as BalanceItem;

          if (!runeIdToAllItemsMap[runeId]) {
            runeIdToAllItemsMap[runeId] = [];
          }

          runeIdToAllItemsMap[runeId].push(item);
        });
      } catch (error) {
        console.log(`Error on get runes balance of account ${address}`);
      }
    }));

    // callback balance batch items by tokenList
    Object.values(runeIdToAllItemsMap).forEach((balanceItems) => {
      callback(balanceItems);
    });
  };

  const fetchRuneBalances = () => {
    getRunesBalance().catch(console.error);
  };

  fetchRuneBalances();
  const interval = setInterval(fetchRuneBalances, COMMON_REFRESH_BALANCE_INTERVAL);

  return () => {
    clearInterval(interval);
  };
}

function subscribeBRC20Balance (bitcoinApi: _BitcoinApi, addresses: string[], assetMap: Record<string, _ChainAsset>, chainInfo: _ChainInfo, callback: (rs: BalanceItem[]) => void) {
  const chain = chainInfo.slug;
  const tokenList = filterAssetsByChainAndType(assetMap, chain, [_AssetType.BRC20]);

  const getBRC20Balance = () => {
    Object.values(tokenList).map(async (token) => {
      try {
        const ticker = token.symbol;
        const balances: Brc20BalanceItem[] = await Promise.all(addresses.map(async (address) => {
          try {
            return await bitcoinApi.api.getAddressBRC20FreeLockedBalance(address, ticker);
          } catch (error) {
            console.error(`Error on get BRC balance of account ${address} for token ${token.slug}`, error);

            return {
              free: '0',
              locked: '0'
            };
          }
        }));

        const items: BalanceItem[] = balances.map((balance, index): BalanceItem => {
          return {
            address: addresses[index],
            tokenSlug: token.slug,
            free: balance.free || '0',
            locked: balance.locked || '0',
            state: APIItemState.READY
          };
        });

        callback(items);
      } catch (error) {
        console.log(token.slug, error);
      }
    });
  };

  getBRC20Balance();

  const interval = setInterval(getBRC20Balance, COMMON_REFRESH_BALANCE_INTERVAL);

  return () => {
    clearInterval(interval);
  };
}

export const getTransferableBitcoinUtxos = async (bitcoinApi: _BitcoinApi, address: string) => {
  try {
    const [utxos, runeTxsUtxos, inscriptionUtxos] = await Promise.all([
      await bitcoinApi.api.getUtxos(address),
      await getRuneUtxos(bitcoinApi, address),
      await getInscriptionUtxos(bitcoinApi, address)
    ]);

    let filteredUtxos: UtxoResponseItem[];

    if (!utxos || !utxos.length) {
      return [];
    }

    // filter out pending utxos
    // filteredUtxos = filterOutPendingTxsUtxos(utxos);

    // filter out rune utxos
    filteredUtxos = filteredOutTxsUtxos(utxos, runeTxsUtxos);

    // filter out inscription utxos
    filteredUtxos = filteredOutTxsUtxos(filteredUtxos, inscriptionUtxos);

    return filteredUtxos;
  } catch (error) {
    console.log('Error while fetching Bitcoin balances', error);

    return [];
  }
};

async function getBitcoinBalance (bitcoinApi: _BitcoinApi, addresses: string[]) {
  return await Promise.all(addresses.map(async (address) => {
    try {
      const addressInfo = await bitcoinApi.api.getAddressSummaryInfo(address);

      return addressInfo.balance.toString();
    } catch (error) {
      console.log(`Error while fetching Bitcoin balances for address ${address}`, error);

      return '0';
    }
  }));
}

export function subscribeBitcoinBalance (addresses: string[], chainInfo: _ChainInfo, assetMap: Record<string, _ChainAsset>, bitcoinApi: _BitcoinApi, callback: (rs: BalanceItem[]) => void): () => void {
  const nativeSlug = _getChainNativeTokenSlug(chainInfo);

  const getBalance = () => {
    getBitcoinBalance(bitcoinApi, addresses)
      .then((balances) => {
        return balances.map((balance, index): BalanceItem => {
          return {
            address: addresses[index],
            tokenSlug: nativeSlug,
            state: APIItemState.READY,
            free: balance,
            locked: '0'
          };
        });
      })
      .catch((e) => {
        console.error(`Error on get Bitcoin balance with token ${nativeSlug}`, e);

        return addresses.map((address): BalanceItem => {
          return {
            address: address,
            tokenSlug: nativeSlug,
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
  };

  getBalance();

  const interval = setInterval(getBalance, COMMON_REFRESH_BALANCE_INTERVAL);

  const unsub = subscribeRuneBalance(bitcoinApi, addresses, assetMap, chainInfo, callback);
  const unsub2 = subscribeBRC20Balance(bitcoinApi, addresses, assetMap, chainInfo, callback);

  return () => {
    clearInterval(interval);
    unsub && unsub();
    unsub2 && unsub2();
  };
}
