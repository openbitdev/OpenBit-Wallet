// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RootState } from '@subwallet/extension-koni-ui/stores';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetDefaultAccountProxyName = () => {
  const accountProxies = useSelector((state: RootState) => state.accountState.accountProxies);

  return useMemo(() => {
    let accountIndex = 0;
    const filtered = accountProxies
      .filter((ap) => {
        accountIndex = Math.max(Number.parseInt(ap.name?.split(' ')[1] || '0'), accountIndex);

        return !isAccountAll(ap.proxyId);
      });

    return `Account ${Math.max(filtered.length, accountIndex) + 1}`;
  }, [accountProxies]);
};

export default useGetDefaultAccountProxyName;
