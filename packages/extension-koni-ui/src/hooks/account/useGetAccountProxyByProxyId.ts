// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { findAccountProxyByProxyId } from '@subwallet/extension-koni-ui/utils/account/account';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetAccountProxyByProxy = (proxyId?: string): AccountProxy | null => {
  const accountProxies = useSelector((state: RootState) => state.accountState.accountProxies);

  return useMemo((): AccountProxy | null => {
    return findAccountProxyByProxyId(accountProxies, proxyId) || null;
  }, [accountProxies, proxyId]);
};

export default useGetAccountProxyByProxy;
