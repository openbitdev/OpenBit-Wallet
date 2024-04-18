// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountJson, AccountProxy } from '@subwallet/extension-base/background/types';
import { useSelector } from '@subwallet/extension-koni-ui/hooks';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

function getSelectedAccountProxyId (accountProxies: AccountProxy[], currentAccountProxyId: string | undefined): string {
  if (!currentAccountProxyId || !accountProxies.length) {
    return '';
  }

  if (!isAccountAll(currentAccountProxyId)) {
    return currentAccountProxyId;
  }

  return accountProxies.find((ap) => !isAccountAll(ap.proxyId))?.proxyId || '';
}

function getSelectedAccountProxyIdByAddress (accounts: AccountJson[], address?: string): string {
  if (!address || !accounts.length) {
    return '';
  }

  return accounts.find((a) => a.address === address)?.proxyId || '';
}

export default function useHistorySelection () {
  const { address: propAddress, chain: propChain } = useParams<{address: string, chain: string}>();
  const { accountProxies, accounts, currentAccountProxy } = useSelector((root) => root.accountState);
  const preservedCurrentAccountProxyId = useRef<string>(currentAccountProxy ? currentAccountProxy.proxyId : '');
  const [selectedAccountProxyId, setSelectedAccountProxyId] = useState<string>(getSelectedAccountProxyIdByAddress(accounts, propAddress) || getSelectedAccountProxyId(accountProxies, currentAccountProxy?.proxyId));
  const [selectedChain, setSelectedChain] = useState<string>(propChain || 'bitcoin');

  useEffect(() => {
    if (currentAccountProxy?.proxyId) {
      if (preservedCurrentAccountProxyId.current !== currentAccountProxy.proxyId) {
        preservedCurrentAccountProxyId.current = currentAccountProxy.proxyId;
        setSelectedAccountProxyId(getSelectedAccountProxyId(accountProxies, currentAccountProxy.proxyId));
      }
    } else {
      preservedCurrentAccountProxyId.current = '';
      setSelectedAccountProxyId('');
    }
  }, [accountProxies, currentAccountProxy?.proxyId]);

  useEffect(() => {
    const isSelectedAccountExist = accountProxies.some((ap) => ap.proxyId === selectedAccountProxyId);

    if (!isSelectedAccountExist) {
      setSelectedAccountProxyId((accountProxies.find((ap) => !isAccountAll(ap.proxyId)))?.proxyId || '');
    }
  }, [accountProxies, selectedAccountProxyId]);

  return {
    selectedAccountProxyId,
    setSelectedAccountProxyId,
    selectedChain,
    setSelectedChain
  };
}
