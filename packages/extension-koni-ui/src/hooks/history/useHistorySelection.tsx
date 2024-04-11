// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountGroup } from '@subwallet/extension-base/background/types';
import { useSelector } from '@subwallet/extension-koni-ui/hooks';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useEffect, useRef, useState } from 'react';

function getSelectedAddress (accountGroups: AccountGroup[], currentAccountGroupId: string | undefined): string {
  if (!currentAccountGroupId || !accountGroups.length) {
    return '';
  }

  if (!isAccountAll(currentAccountGroupId)) {
    return currentAccountGroupId;
  }

  return accountGroups.find((ag) => !isAccountAll(ag.groupId))?.groupId || '';
}

export default function useHistorySelection () {
  const { accountGroups, currentAccountGroup } = useSelector((root) => root.accountState);
  const preservedCurrentAccountGroupId = useRef<string>(currentAccountGroup ? currentAccountGroup.groupId : '');
  const [selectedAccountGroupId, setSelectedAccountGroupId] = useState<string>(getSelectedAddress(accountGroups, currentAccountGroup?.groupId));
  const [selectedChain, setSelectedChain] = useState<string>('bitcoin');

  useEffect(() => {
    if (currentAccountGroup?.groupId) {
      if (preservedCurrentAccountGroupId.current !== currentAccountGroup.groupId) {
        preservedCurrentAccountGroupId.current = currentAccountGroup.groupId;
        setSelectedAccountGroupId(getSelectedAddress(accountGroups, currentAccountGroup.groupId));
      }
    } else {
      preservedCurrentAccountGroupId.current = '';
      setSelectedAccountGroupId('');
    }
  }, [accountGroups, currentAccountGroup?.groupId]);

  useEffect(() => {
    const isSelectedAccountExist = accountGroups.some((ag) => ag.groupId === selectedAccountGroupId);

    if (!isSelectedAccountExist) {
      setSelectedAccountGroupId((accountGroups.find((ag) => !isAccountAll(ag.groupId)))?.groupId || '');
    }
  }, [accountGroups, selectedAccountGroupId]);

  return {
    selectedAccountGroupId,
    setSelectedAccountGroupId,
    selectedChain,
    setSelectedChain
  };
}
