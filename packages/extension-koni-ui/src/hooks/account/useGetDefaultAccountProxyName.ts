// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RootState } from '@subwallet/extension-koni-ui/stores';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetDefaultAccountProxyName = () => {
  const accountProxies = useSelector((state: RootState) => state.accountState.accountProxies);

  return useMemo(() => {
    const filtered = accountProxies.filter((ag) => !isAccountAll(ag.proxyId));

    return `Account ${filtered.length + 1}`;
  }, [accountProxies]);
};

export default useGetDefaultAccountProxyName;
