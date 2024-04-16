// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _AssetType, _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { APIItemState } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { COMMON_REFRESH_BALANCE_INTERVAL } from '@subwallet/extension-base/constants';
import { _BitcoinApi, _EvmApi, _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { _getChainNativeTokenSlug, _getRuneId, _isPureBitcoinChain, _isPureEvmChain, _isSupportRuneChain } from '@subwallet/extension-base/services/chain-service/utils';
import { BalanceItem } from '@subwallet/extension-base/types';
import { filterAssetsByChainAndType } from '@subwallet/extension-base/utils';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import keyring from '@subwallet/ui-keyring';
import BigN from 'bignumber.js';

import { subscribeEVMBalance } from './evm';
import { subscribeSubstrateBalance } from './substrate';

/**
 * @function getAccountJsonByAddress
 * @desc Get account info by address
 * <p>
 *   Note: Use on the background only
 * </p>
 * @param {string} address - Address
 * @returns {AccountJson|null}  - Account info or null if not found
 */
export const getAccountJsonByAddress = (address: string): AccountJson | null => {
  try {
    const pair = keyring.getPair(address);

    if (pair) {
      return {
        address: pair.address,
        type: pair.type,
        ...pair.meta
      };
    } else {
      return null;
    }
  } catch (e) {
    console.warn(e);

    return null;
  }
};

/** Filter addresses to subscribe by chain info */
const filterAddress = (addresses: string[], chainInfo: _ChainInfo): [string[], string[]] => {
  const isEvmChain = _isPureEvmChain(chainInfo);
  const isBitcoinChain = _isPureBitcoinChain(chainInfo);
  const useAddresses: string[] = [];
  const notSupportAddresses: string[] = [];

  if (isEvmChain) {
    addresses.forEach((a) => {
      getKeypairTypeByAddress(a) === 'ethereum' ? useAddresses.push(a) : notSupportAddresses.push(a);
    });
  } else if (isBitcoinChain) {
    addresses.forEach((a) => {
      const addressType = getKeypairTypeByAddress(a);

      if ((addressType === 'bitcoin-84' && chainInfo.slug === 'bitcoin') || (addressType === 'bittest-84' && chainInfo.slug === 'bitcoinTestnet')) {
        useAddresses.push(a);
      } else {
        notSupportAddresses.push(a);
      }
    });
  } else {
    notSupportAddresses.push(...addresses);
  }

  return [useAddresses, notSupportAddresses];
};

// todo: update bitcoin params
function subscribeAddressesRuneInfo (bitcoinApi: _BitcoinApi, addresses: string[], assetMap: Record<string, _ChainAsset>, chainInfo: _ChainInfo, callback: (rs: BalanceItem[]) => void) {
  // todo: currently set decimal of runes on chain list to zero because the amount api return is after decimal
  const chain = chainInfo.slug;
  const tokenList = filterAssetsByChainAndType(assetMap, chain, [_AssetType.LOCAL]);

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
    await Promise.all(['bc1pw98myh924tpzpy5npxx6u599gnknf0fq5k4m76esz3w6xdh7ezcs2we5k0'].map(async (address) => {
      try {
        const runes = await bitcoinApi.api.getRunes(address);

        runes.forEach((rune) => {
          const runeId = rune.rune_id;

          const item = {
            address: 'bc1pesavjkzf9e87kzluptcdyh286mceu8xxymrz2uxmle7t726qhnfq09fcz9',
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

async function getAddressesSummaryInfo (bitcoinApi: _BitcoinApi, addresses: string[]) {
  return await Promise.all(addresses.map(async (address) => {
    try {
      const accountSummaryInfo = await bitcoinApi.api.getAddressSummaryInfo(address);

      // todo: update balance interface
      return new BigN(accountSummaryInfo.chain_stats.funded_txo_sum).minus(accountSummaryInfo.chain_stats.spent_txo_sum).toString();
    } catch (error) {
      console.log('Error while fetching Bitcoin balances', error);

      return '0';
    }
  }));
}

function subscribeBitcoinBalance (addresses: string[], chainInfo: _ChainInfo, assetMap: Record<string, _ChainAsset>, bitcoinApi: _BitcoinApi, callback: (rs: BalanceItem[]) => void): () => void {
  const nativeSlug = _getChainNativeTokenSlug(chainInfo);

  const getBalance = () => {
    getAddressesSummaryInfo(bitcoinApi, addresses)
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

  if (_isSupportRuneChain(chainInfo.slug)) {
    const unsub = subscribeAddressesRuneInfo(bitcoinApi, addresses, assetMap, chainInfo, callback);

    return () => {
      clearInterval(interval);
      unsub && unsub();
    };
  } else {
    return () => {
      clearInterval(interval);
    };
  }
}

// main subscription, use for multiple chains, multiple addresses and multiple tokens
export function subscribeBalance (
  addresses: string[],
  chains: string[],
  tokens: string[],
  _chainAssetMap: Record<string, _ChainAsset>,
  _chainInfoMap: Record<string, _ChainInfo>,
  substrateApiMap: Record<string, _SubstrateApi>,
  evmApiMap: Record<string, _EvmApi>,
  bitcoinApiMap: Record<string, _BitcoinApi>,
  callback: (rs: BalanceItem[]) => void) {
  // Filter chain and token
  const chainAssetMap: Record<string, _ChainAsset> = Object.fromEntries(Object.entries(_chainAssetMap).filter(([token]) => tokens.includes(token)));
  const chainInfoMap: Record<string, _ChainInfo> = Object.fromEntries(Object.entries(_chainInfoMap).filter(([chain]) => chains.includes(chain)));

  // Looping over each chain
  const unsubList = Object.values(chainInfoMap).map(async (chainInfo) => {
    const chainSlug = chainInfo.slug;
    const [useAddresses, notSupportAddresses] = filterAddress(addresses, chainInfo);

    if (notSupportAddresses.length) {
      const tokens = filterAssetsByChainAndType(chainAssetMap, chainSlug, [_AssetType.NATIVE, _AssetType.ERC20, _AssetType.PSP22, _AssetType.LOCAL]);

      const now = new Date().getTime();

      Object.values(tokens).forEach((token) => {
        const items: BalanceItem[] = notSupportAddresses.map((address): BalanceItem => ({
          address,
          tokenSlug: token.slug,
          free: '0',
          locked: '0',
          state: APIItemState.NOT_SUPPORT,
          timestamp: now
        }));

        callback(items);
      });
    }

    const evmApi = evmApiMap[chainSlug];

    if (_isPureEvmChain(chainInfo)) {
      return subscribeEVMBalance({
        addresses: useAddresses,
        assetMap: chainAssetMap,
        callback,
        chainInfo,
        evmApi
      });
    }

    const bitcoinApi = bitcoinApiMap[chainSlug];

    if (_isPureBitcoinChain(chainInfo)) {
      return subscribeBitcoinBalance(
        useAddresses,
        chainInfo,
        chainAssetMap,
        bitcoinApi,
        callback
      );
    }

    const substrateApi = await substrateApiMap[chainSlug].isReady;

    return subscribeSubstrateBalance(useAddresses, chainInfo, chainAssetMap, substrateApi, evmApi, callback);
  });

  return () => {
    unsubList.forEach((subProm) => {
      subProm.then((unsub) => {
        unsub && unsub();
      }).catch(console.error);
    });
  };
}
