// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _AssetType, _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { APIItemState } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { COMMON_REFRESH_BALANCE_INTERVAL } from '@subwallet/extension-base/constants';
import { _BitcoinApi, _EvmApi, _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { _getChainNativeTokenSlug, _getRuneId, _isPureBitcoinChain, _isPureEvmChain, _isSupportRuneChain } from '@subwallet/extension-base/services/chain-service/utils';
import { BalanceItem } from '@subwallet/extension-base/types';
import { filterAssetsByChainAndType, filteredOutTxsUtxos, filterOutPendingTxsUtxos, getInscriptionUtxos, getRuneTxsUtxos } from '@subwallet/extension-base/utils';
import { getKeypairTypeByAddress, isBitcoinAddress } from '@subwallet/keyring';
import keyring from '@subwallet/ui-keyring';
import BigN from 'bignumber.js';

import { noop } from '@polkadot/util';

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
    addresses.forEach((address) => {
      const bitcoinAddressNetwork = isBitcoinAddress(address);

      if ((bitcoinAddressNetwork === 'mainnet' && chainInfo.slug === 'bitcoin') || (bitcoinAddressNetwork === 'testnet' && chainInfo.slug === 'bitcoinTestnet')) {
        useAddresses.push(address);
      } else {
        notSupportAddresses.push(address);
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

async function getBitcoinBalance (bitcoinApi: _BitcoinApi, addresses: string[]) {

  console.log('[i] start query balance');

  return await Promise.all(addresses.map(async (address) => { // noted: fake an account here to see balance
    try {
      const [utxos, txs, runeTxsUtxos, inscriptionUtxos] = await Promise.all([
        await bitcoinApi.api.getUtxos(address),
        await bitcoinApi.api.getAddressTransaction(address),
        await getRuneTxsUtxos(bitcoinApi, address),
        await getInscriptionUtxos(bitcoinApi, address)
      ]);

      // filter out pending utxos
      let filteredUtxos = filterOutPendingTxsUtxos(address, txs, utxos);

      console.log('--- START LOG ---');
      console.log('[1.1] UTXO after filtering pending UTXO: ', filteredUtxos);
      console.log('[1.2] Rune UTXO: ', runeTxsUtxos);
      console.log('[1.3] Inscription UTXO: ', inscriptionUtxos);
      // filter out rune utxos
      filteredUtxos = filteredOutTxsUtxos(filteredUtxos, runeTxsUtxos);

      console.log('[2.] UTXO after filtering rune UTXO: ', filteredUtxos);
      // filter out inscription utxos
      filteredUtxos = filteredOutTxsUtxos(filteredUtxos, inscriptionUtxos);

      console.log('[3.] UTXO after filtering rune and inscription UTXO: ', filteredUtxos);
      let balanceValue = new BigN(0);

      filteredUtxos.forEach((utxo) => {
        balanceValue = balanceValue.plus(utxo.value);
      });

      // console.log('[4.] Balance before filtering: ', balanceValue.toString()); // Comment 2. and 3. filter out to see balance before
      console.log('[4.] Balance after filtering: ', balanceValue.toString());
      console.log('--- END LOG ---');

      return balanceValue.toString();
    } catch (error) {
      console.log('Error while fetching Bitcoin balances', error);

      return '0';
    }
  }));
}

function subscribeBitcoinBalance (addresses: string[], chainInfo: _ChainInfo, assetMap: Record<string, _ChainAsset>, bitcoinApi: _BitcoinApi, callback: (rs: BalanceItem[]) => void): () => void {
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

    if (!useAddresses.length) {
      return noop;
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
