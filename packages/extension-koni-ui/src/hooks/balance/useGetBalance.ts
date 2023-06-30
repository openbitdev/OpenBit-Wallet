// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { AmountData } from '@subwallet/extension-base/background/KoniTypes';
import { _ChainConnectionStatus, _ChainState } from '@subwallet/extension-base/services/chain-service/types';
import { _getChainNativeTokenSlug } from '@subwallet/extension-base/services/chain-service/utils';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { getFreeBalance, updateAssetSetting } from '@subwallet/extension-koni-ui/messaging';
import { useEffect, useMemo, useState } from 'react';

import { useSelector } from '../common';

const DEFAULT_BALANCE = {
  value: '0',
  symbol: '',
  decimals: 18
};

export enum GetBalanceErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  METHOD_ERROR = 'METHOD_ERROR'
}

const GET_BALANCE_TIMEOUT = 10000;

const useGetBalance = (chain = '', address = '', tokenSlug = '') => {
  const { t } = useTranslation();
  const { chainInfoMap,
    chainStateMap } = useSelector((state) => state.chainStore);
  const { assetRegistry,
    assetSettingMap } = useSelector((state) => state.assetRegistry);

  const chainInfo = useMemo((): _ChainInfo | undefined => (chainInfoMap[chain]), [chainInfoMap, chain]);
  const nativeTokenSlug = useMemo(() => chainInfo ? _getChainNativeTokenSlug(chainInfo) : undefined, [chainInfo]);

  const [nativeTokenBalance, setNativeTokenBalance] = useState<AmountData>(DEFAULT_BALANCE);
  const [tokenBalance, setTokenBalance] = useState<AmountData>(DEFAULT_BALANCE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<GetBalanceErrorType | null>(null);
  const chainState = useMemo<_ChainState | undefined>(() => {
    return chainStateMap[chain];
  }, [chain, chainStateMap]);
  const [timeoutFlag, setTimeoutFlag] = useState<number>(0);

  useEffect(() => {
    let cancel = false;
    // Add small delay to void enable before context is changed
    let enableTokenTimeout: NodeJS.Timeout | undefined;
    // Renew fetch action when after timeout match
    let getBalanceTimeout: NodeJS.Timeout | undefined;

    setIsLoading(true);
    setTokenBalance(DEFAULT_BALANCE);

    if (address && chain) {
      const promiseList = [] as Promise<any>[];
      const nativeTokenActive = nativeTokenSlug && assetSettingMap[nativeTokenSlug]?.visible;
      let childTokenActive = true;

      if (tokenSlug && tokenSlug !== nativeTokenSlug && !assetSettingMap[tokenSlug]?.visible) {
        childTokenActive = false;
      }

      if (chainState?.active && chainState?.connectionStatus === _ChainConnectionStatus.CONNECTED) {
        setError(null);

        // Auto enable token if it is not active
        enableTokenTimeout = setTimeout(() => {
          if (!childTokenActive) {
            updateAssetSetting({
              tokenSlug,
              assetSetting: {
                visible: true
              },
              autoEnableNativeToken: true
            }).catch(console.error);
          } else if (nativeTokenSlug && !nativeTokenActive) {
            updateAssetSetting({
              tokenSlug: nativeTokenSlug,
              assetSetting: {
                visible: true
              }
            }).catch(console.error);
          }
        }, 1000);

        // Get balance for native token and child token
        promiseList.push(getFreeBalance({
          address,
          networkKey: chain
        })
          .then((balance) => {
            !cancel && setNativeTokenBalance(balance);
          })
          .catch((e: Error) => {
            !cancel && setError(GetBalanceErrorType.METHOD_ERROR);
            !cancel && setNativeTokenBalance(DEFAULT_BALANCE);
            console.error(e);
          }));

        if (tokenSlug && tokenSlug !== nativeTokenSlug) {
          promiseList.push(getFreeBalance({
            address,
            networkKey: chain,
            token: tokenSlug
          })
            .then((balance) => {
              !cancel && setTokenBalance(balance);
            })
            .catch((e: Error) => {
              !cancel && setError(GetBalanceErrorType.METHOD_ERROR);
              !cancel && setTokenBalance(DEFAULT_BALANCE);
              console.error(e);
            }));
        }

        // Increase timeout flag to renew fetch action
        getBalanceTimeout = setTimeout(() => {
          console.log('Re-fetch balance with timeout flag', timeoutFlag);
          setTimeoutFlag((x) => (x + 1));
        }, GET_BALANCE_TIMEOUT);

        Promise.all(promiseList).finally(() => {
          !cancel && setIsLoading(false);
          clearTimeout(getBalanceTimeout);
        });
      } else {
        !cancel && setNativeTokenBalance(DEFAULT_BALANCE);
        !cancel && setTokenBalance(DEFAULT_BALANCE);
        !cancel && setIsLoading(false);
        !cancel && setError(GetBalanceErrorType.NETWORK_ERROR);
      }
    }

    return () => {
      cancel = true;
      setIsLoading(true);
      setError(null);
      clearTimeout(enableTokenTimeout);
      clearTimeout(getBalanceTimeout);
    };
  }, [address, chain, nativeTokenSlug, tokenSlug, assetSettingMap, t, assetRegistry, chainState?.active, chainState?.connectionStatus, timeoutFlag]);

  return {
    tokenBalance,
    nativeTokenBalance,
    nativeTokenSlug,
    isLoading,
    error,
    chainState,
    chainInfo
  };
};

export default useGetBalance;
