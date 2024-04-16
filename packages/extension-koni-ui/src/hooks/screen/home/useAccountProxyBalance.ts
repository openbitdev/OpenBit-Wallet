// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _MultiChainAsset } from '@subwallet/chain-list/types';
import { APIItemState } from '@subwallet/extension-base/background/KoniTypes';
import { AccountProxy } from '@subwallet/extension-base/background/types';
import { _getAssetDecimals, _getAssetOriginChain, _getAssetPriceId, _getChainName, _getMultiChainAssetPriceId, _isAssetValuable } from '@subwallet/extension-base/services/chain-service/utils';
import { isAccountAll } from '@subwallet/extension-base/utils';
import { getBalanceValue, getConvertedBalanceValue, getDefaultTokenBalance, getDefaultTokenGroupBalance } from '@subwallet/extension-koni-ui/hooks/screen/home/useAccountBalance';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { AssetRegistryStore, BalanceStore, ChainStore, PriceStore } from '@subwallet/extension-koni-ui/stores/types';
import { TokenBalanceItemType } from '@subwallet/extension-koni-ui/types/balance';
import { AccountBalanceHookType } from '@subwallet/extension-koni-ui/types/hook';
import BigN from 'bignumber.js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function getAddresses (currentGroup: AccountProxy | null, accountProxies: AccountProxy[]): string[] {
  if (!currentGroup) {
    return [];
  }

  if (isAccountAll(currentGroup.proxyId)) {
    const result: string[] = [];

    accountProxies.forEach((ap) => {
      ap.accounts.forEach((a) => result.push(a.address));
    });

    return result;
  }

  return currentGroup.accounts.map((a) => a.address);
}

function getAccountProxyBalance (
  currentAccountProxy: AccountProxy | null,
  accountProxies: AccountProxy[],
  tokenGroupMap: Record<string, string[]>,
  balanceMap: BalanceStore['balanceMap'],
  priceMap: PriceStore['priceMap'],
  price24hMap: PriceStore['price24hMap'],
  assetRegistryMap: AssetRegistryStore['assetRegistry'],
  multiChainAssetMap: AssetRegistryStore['multiChainAssetMap'],
  chainInfoMap: ChainStore['chainInfoMap'],
  isShowZeroBalance: boolean
): AccountBalanceHookType {
  const totalBalanceInfo: AccountBalanceHookType['totalBalanceInfo'] = {
    convertedValue: new BigN(0),
    converted24hValue: new BigN(0),
    change: {
      value: new BigN(0),
      percent: new BigN(0)
    }
  };
  const tokenBalanceMap: Record<string, TokenBalanceItemType> = {};
  const tokenGroupBalanceMap: Record<string, TokenBalanceItemType> = {};

  const addresses = getAddresses(currentAccountProxy, accountProxies);

  if (!addresses.length) {
    return {
      tokenBalanceMap,
      tokenGroupBalanceMap,
      totalBalanceInfo
    };
  }

  Object.keys(tokenGroupMap).forEach((tokenGroupKey) => {
    const tokenGroupBalanceReady: boolean[] = [];
    const tokenGroupNotSupport: boolean[] = [];
    // note: multiChainAsset may be undefined due to tokenGroupKey may be a tokenSlug
    const multiChainAsset: _MultiChainAsset | undefined = multiChainAssetMap[tokenGroupKey];
    const tokenGroupBalance = getDefaultTokenGroupBalance(tokenGroupKey, assetRegistryMap, multiChainAsset);

    tokenGroupMap[tokenGroupKey].forEach((tokenSlug) => {
      const chainAsset = assetRegistryMap[tokenSlug];

      if (!chainAsset) {
        console.warn('Not found chain asset for token slug: ', tokenSlug);

        return;
      }

      const tokenBalance = getDefaultTokenBalance(tokenSlug, chainAsset);
      const originChain = _getAssetOriginChain(chainAsset);
      const decimals = _getAssetDecimals(chainAsset);

      const tokenBalanceReady: boolean[] = [];
      const tokenBalanceNotSupport: boolean[] = [];

      addresses.forEach((address) => {
        const balanceItem = balanceMap[address]?.[tokenSlug];

        const isReady = !!balanceItem && (balanceItem.state !== APIItemState.PENDING);
        const isNotSupport = !!balanceItem && (balanceItem.state === APIItemState.NOT_SUPPORT);

        tokenBalanceReady.push(isReady);
        tokenBalanceNotSupport.push(isNotSupport);

        if (!isShowZeroBalance && !isNotSupport) {
          return;
        }

        if (isReady) {
          tokenBalance.free.value = tokenBalance.free.value.plus(getBalanceValue(balanceItem.free || '0', decimals));
          tokenBalance.locked.value = tokenBalance.locked.value.plus(getBalanceValue(balanceItem.locked || '0', decimals));
        }
      });

      const isTokenBalanceReady = tokenBalanceReady.some((b) => b);
      const isTokenNotSupport = tokenBalanceNotSupport.every((b) => b);

      tokenGroupNotSupport.push(isTokenNotSupport);
      tokenGroupBalanceReady.push(isTokenBalanceReady);

      if (!isShowZeroBalance && !isTokenBalanceReady) {
        return;
      }

      tokenBalance.isReady = isTokenBalanceReady;
      tokenBalance.isNotSupport = isTokenNotSupport;

      tokenBalance.chain = originChain;
      tokenBalance.chainDisplayName = _getChainName(chainInfoMap[originChain]);
      tokenBalance.isTestnet = !_isAssetValuable(chainAsset);

      if (isTokenBalanceReady) {
        tokenGroupBalance.free.value = tokenGroupBalance.free.value.plus(tokenBalance.free.value);
        tokenGroupBalance.locked.value = tokenGroupBalance.locked.value.plus(tokenBalance.locked.value);

        tokenBalance.total.value = tokenBalance.free.value.plus(tokenBalance.locked.value);

        if (!isShowZeroBalance && tokenBalance.total.value.eq(0)) {
          return;
        }

        tokenGroupBalance.total.value = tokenGroupBalance.total.value.plus(tokenBalance.total.value);
      }

      const priceId = _getAssetPriceId(chainAsset);

      // convert token value to real life currency value
      if (priceId && !tokenBalance.isTestnet) {
        const priceValue = priceMap[priceId] || 0;
        const price24hValue = price24hMap[priceId] || 0;

        tokenBalance.priceValue = priceValue;
        tokenBalance.price24hValue = price24hValue;

        if (priceValue > price24hValue) {
          tokenBalance.priceChangeStatus = 'increase';
        } else if (priceValue < price24hValue) {
          tokenBalance.priceChangeStatus = 'decrease';
        }

        if (isTokenBalanceReady) {
          tokenBalance.free.convertedValue = tokenBalance.free.convertedValue.plus(
            getConvertedBalanceValue(tokenBalance.free.value, priceValue)
          );
          tokenGroupBalance.free.convertedValue = tokenGroupBalance.free.convertedValue.plus(tokenBalance.free.convertedValue);
          tokenBalance.free.pastConvertedValue = tokenBalance.free.pastConvertedValue.plus(
            getConvertedBalanceValue(tokenBalance.free.value, price24hValue)
          );
          tokenGroupBalance.free.pastConvertedValue = tokenGroupBalance.free.pastConvertedValue.plus(tokenBalance.free.pastConvertedValue);

          tokenBalance.locked.convertedValue = tokenBalance.locked.convertedValue.plus(
            getConvertedBalanceValue(tokenBalance.locked.value, priceValue)
          );
          tokenGroupBalance.locked.convertedValue = tokenGroupBalance.locked.convertedValue.plus(tokenBalance.locked.convertedValue);
          tokenBalance.locked.pastConvertedValue = tokenBalance.locked.pastConvertedValue.plus(
            getConvertedBalanceValue(tokenBalance.locked.value, price24hValue)
          );
          tokenGroupBalance.locked.pastConvertedValue = tokenGroupBalance.locked.pastConvertedValue.plus(tokenBalance.locked.pastConvertedValue);

          tokenBalance.total.convertedValue = tokenBalance.total.convertedValue.plus(
            getConvertedBalanceValue(tokenBalance.total.value, priceValue)
          );
          tokenGroupBalance.total.convertedValue = tokenGroupBalance.total.convertedValue.plus(tokenBalance.total.convertedValue);

          tokenBalance.total.pastConvertedValue = tokenBalance.total.pastConvertedValue.plus(
            getConvertedBalanceValue(tokenBalance.total.value, price24hValue)
          );
          tokenGroupBalance.total.pastConvertedValue = tokenGroupBalance.total.pastConvertedValue.plus(tokenBalance.total.pastConvertedValue);
        }
      }

      if (!tokenBalance.isNotSupport) {
        tokenBalanceMap[tokenSlug] = tokenBalance;
      }
    });

    const isTokenGroupBalanceReady = tokenGroupBalanceReady.some((e) => e);

    tokenGroupBalance.isReady = isTokenGroupBalanceReady;
    tokenGroupBalance.isNotSupport = tokenGroupNotSupport.every((e) => e);

    if (!multiChainAsset && tokenGroupMap[tokenGroupKey].length === 1 && tokenBalanceMap[tokenGroupKey]) {
      tokenGroupBalance.isTestnet = tokenBalanceMap[tokenGroupKey].isTestnet;
    }

    // if (!isShowZeroBalance && (!isTokenGroupBalanceReady || tokenGroupBalance.total.value.eq(0))) {
    //   return;
    // }

    const tokenGroupPriceId = multiChainAsset ? _getMultiChainAssetPriceId(multiChainAsset) : _getAssetPriceId(assetRegistryMap[tokenGroupKey]);

    // make sure priceId exists and token group has monetary value
    // todo: check if multiChainAsset has monetary value too (after Nampc updates the background)
    if (!tokenGroupPriceId || (assetRegistryMap[tokenGroupKey] && !_isAssetValuable(assetRegistryMap[tokenGroupKey]))) {
      if (!tokenGroupBalance.isNotSupport) {
        tokenGroupBalanceMap[tokenGroupKey] = tokenGroupBalance;
      }

      return;
    }

    const priceValue = priceMap[tokenGroupPriceId] || 0;
    const price24hValue = price24hMap[tokenGroupPriceId] || 0;

    tokenGroupBalance.priceValue = priceValue;
    tokenGroupBalance.price24hValue = price24hValue;

    if (priceValue > price24hValue) {
      tokenGroupBalance.priceChangeStatus = 'increase';
    } else if (priceValue < price24hValue) {
      tokenGroupBalance.priceChangeStatus = 'decrease';
    }

    if (!tokenGroupBalance.isNotSupport) {
      tokenGroupBalanceMap[tokenGroupKey] = tokenGroupBalance;
      totalBalanceInfo.convertedValue = totalBalanceInfo.convertedValue.plus(tokenGroupBalance.total.convertedValue);
      totalBalanceInfo.converted24hValue = totalBalanceInfo.converted24hValue.plus(tokenGroupBalance.total.pastConvertedValue);
    }
  });

  // Compute total balance change
  if (totalBalanceInfo.convertedValue.gt(totalBalanceInfo.converted24hValue)) {
    totalBalanceInfo.change.value = totalBalanceInfo.convertedValue.minus(totalBalanceInfo.converted24hValue);
    totalBalanceInfo.change.status = 'increase';
  } else if (totalBalanceInfo.convertedValue.lt(totalBalanceInfo.converted24hValue)) {
    totalBalanceInfo.change.value = totalBalanceInfo.converted24hValue.minus(totalBalanceInfo.convertedValue);
    totalBalanceInfo.change.status = 'decrease';
  }

  if (!totalBalanceInfo.change.value.eq(0)) {
    totalBalanceInfo.change.percent = totalBalanceInfo.change.value.multipliedBy(100).dividedBy(totalBalanceInfo.converted24hValue);
  }

  return {
    tokenBalanceMap,
    tokenGroupBalanceMap,
    totalBalanceInfo
  };
}

export default function useAccountProxyBalance (tokenGroupMap: Record<string, string[]>, showZeroBalance?: boolean): AccountBalanceHookType {
  const balanceMap = useSelector((state: RootState) => state.balance.balanceMap);
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  const priceMap = useSelector((state: RootState) => state.price.priceMap);
  const price24hMap = useSelector((state: RootState) => state.price.price24hMap);
  const assetRegistryMap = useSelector((state: RootState) => state.assetRegistry.assetRegistry);
  const multiChainAssetMap = useSelector((state: RootState) => state.assetRegistry.multiChainAssetMap);
  const isShowZeroBalanceSetting = useSelector((state: RootState) => state.settings.isShowZeroBalance);
  const currentAccountProxy = useSelector((state: RootState) => state.accountState.currentAccountProxy);
  const accountProxies = useSelector((state: RootState) => state.accountState.accountProxies);

  const isShowZeroBalance = useMemo(() => {
    return showZeroBalance || isShowZeroBalanceSetting;
  }, [isShowZeroBalanceSetting, showZeroBalance]);

  return getAccountProxyBalance(
    currentAccountProxy,
    accountProxies,
    tokenGroupMap,
    balanceMap,
    priceMap,
    price24hMap,
    assetRegistryMap,
    multiChainAssetMap,
    chainInfoMap,
    isShowZeroBalance
  );
}
