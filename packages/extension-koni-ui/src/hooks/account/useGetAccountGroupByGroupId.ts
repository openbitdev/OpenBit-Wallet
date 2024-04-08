// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountGroup } from '@subwallet/extension-base/background/types';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { findAccountGroupByGroupId } from '@subwallet/extension-koni-ui/utils/account/account';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetAccountGroupByGroupId = (groupId?: string): AccountGroup | null => {
  const accountGroups = useSelector((state: RootState) => state.accountState.accountGroups);

  return useMemo((): AccountGroup | null => {
    return findAccountGroupByGroupId(accountGroups, groupId);
  }, [accountGroups, groupId]);
};

export default useGetAccountGroupByGroupId;
