// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo, _ChainStatus } from '@subwallet/chain-list/types';
import { _ChainState } from '@subwallet/extension-base/services/chain-service/types';
import { _isPureBitcoinChain, _isPureEvmChain } from '@subwallet/extension-base/services/chain-service/utils';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export type ChainInfoWithState = _ChainInfo & _ChainState;

export default function useChainInfoWithState ({ filterStatus = true } = {} as {filterStatus?: boolean}): ChainInfoWithState[] {
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  const chainStateMap = useSelector((state: RootState) => state.chainStore.chainStateMap);

  return useMemo(() => {
    const rs: ChainInfoWithState[] = [];

    // todo: will optimize later
    let bitcoinChain: ChainInfoWithState| undefined;
    let bitcoinTestnetChain: ChainInfoWithState| undefined;
    let ethereumChain: ChainInfoWithState| undefined;

    Object.values(chainInfoMap).forEach((chainInfo) => {
      if (chainInfo.slug === 'bitcoin') {
        bitcoinChain = { ...chainInfo, ...(chainStateMap[chainInfo.slug] || {}) };

        return;
      }

      if (chainInfo.slug === 'bitcoinTestnet') {
        bitcoinTestnetChain = { ...chainInfo, ...(chainStateMap[chainInfo.slug] || {}) };

        return;
      }

      if (chainInfo.slug === 'ethereum') {
        ethereumChain = { ...chainInfo, ...(chainStateMap[chainInfo.slug] || {}) };

        return;
      }

      if (_isPureBitcoinChain(chainInfo) || _isPureEvmChain(chainInfo)) {
        rs.push({ ...chainInfo, ...(chainStateMap[chainInfo.slug] || {}) });
      }
    });

    ethereumChain && rs.unshift(ethereumChain);
    bitcoinTestnetChain && rs.unshift(bitcoinTestnetChain);
    bitcoinChain && rs.unshift(bitcoinChain);

    if (filterStatus) {
      return rs.filter((item) => item.chainStatus === _ChainStatus.ACTIVE);
    } else {
      return rs;
    }
  }, [chainInfoMap, chainStateMap, filterStatus]);
}
