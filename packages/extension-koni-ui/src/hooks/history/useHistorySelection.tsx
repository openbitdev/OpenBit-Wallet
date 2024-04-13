// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { useSelector } from '@subwallet/extension-koni-ui/hooks';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useEffect, useRef, useState } from 'react';

function getSelectedAddress (accountProxies: AccountProxy[], currentAccountProxyId: string | undefined): string {
  if (!currentAccountProxyId || !accountProxies.length) {
    return '';
  }

  if (!isAccountAll(currentAccountProxyId)) {
    return currentAccountProxyId;
  }

  return accountProxies.find((ap) => !isAccountAll(ap.proxyId))?.proxyId || '';
}

export default function useHistorySelection () {
  const { accountProxies, currentAccountProxy } = useSelector((root) => root.accountState);
  const preservedCurrentAccountProxyId = useRef<string>(currentAccountProxy ? currentAccountProxy.proxyId : '');
  const [selectedAccountProxyId, setSelectedAccountProxyId] = useState<string>(getSelectedAddress(accountProxies, currentAccountProxy?.proxyId));
  const [selectedChain, setSelectedChain] = useState<string>('bitcoin');

  useEffect(() => {
    if (currentAccountProxy?.proxyId) {
      if (preservedCurrentAccountProxyId.current !== currentAccountProxy.proxyId) {
        preservedCurrentAccountProxyId.current = currentAccountProxy.proxyId;
        setSelectedAccountProxyId(getSelectedAddress(accountProxies, currentAccountProxy.proxyId));
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
