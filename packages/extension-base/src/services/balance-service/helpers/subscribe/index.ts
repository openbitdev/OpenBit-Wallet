// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _AssetType, _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { APIItemState } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { COMMON_REFRESH_BALANCE_INTERVAL } from '@subwallet/extension-base/constants';
import { _EvmApi, _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { _getChainNativeTokenSlug, _isPureBitcoinChain, _isPureEvmChain } from '@subwallet/extension-base/services/chain-service/utils';
import { BalanceItem } from '@subwallet/extension-base/types';
import { filterAssetsByChainAndType } from '@subwallet/extension-base/utils';
import { getKeypairTypeByAddress, isBitcoinAddress } from '@subwallet/keyring';
import keyring from '@subwallet/ui-keyring';

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

export type BitcoinBalanceFunction = (addresses: string[], chain: string) => Promise<string[]>;

function subscribeBitcoinBalance (addresses: string[], chainInfo: _ChainInfo, getAddressesBitcoinBalance: BitcoinBalanceFunction, callback: (rs: BalanceItem[]) => void): () => void {
  const nativeSlug = _getChainNativeTokenSlug(chainInfo);

  const getBalance = () => {
    getAddressesBitcoinBalance(addresses, chainInfo.slug)
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

  return () => {
    clearInterval(interval);
  };
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
  bitcoinBalanceFunction: BitcoinBalanceFunction,
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

    if (_isPureBitcoinChain(chainInfo)) {
      return subscribeBitcoinBalance(
        useAddresses,
        chainInfo,
        bitcoinBalanceFunction,
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
