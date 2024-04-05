// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RootState } from '@subwallet/extension-koni-ui/stores';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetDefaultAccountGroupName = () => {
  const accountGroups = useSelector((state: RootState) => state.accountState.accountGroups);

  return useMemo(() => {
    const filtered = accountGroups.filter((ag) => !isAccountAll(ag.groupId));

    return `Account ${filtered.length + 1}`;
  }, [accountGroups]);
};

export default useGetDefaultAccountGroupName;
