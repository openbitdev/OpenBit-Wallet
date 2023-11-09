// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountJson } from '@subwallet/extension-base/background/types';
import { useSelector } from '@subwallet/extension-koni-ui/hooks';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { useEffect, useRef, useState } from 'react';

function getSelectedAddress (accounts: AccountJson[], currentAccount: AccountJson | null): string {
  if (!currentAccount || !accounts.length) {
    return '';
  }

  if (!isAccountAll(currentAccount.address)) {
    return currentAccount.address;
  }

  return (accounts.find((a) => !isAccountAll(a.address)))?.address || '';
}

export default function useHistorySelection () {
  const { accounts, currentAccount } = useSelector((root) => root.accountState);
  const preservedCurrentAddress = useRef<string>(currentAccount ? currentAccount.address : '');
  const [selectedAddress, setSelectedAddress] = useState<string>(getSelectedAddress(accounts, currentAccount));
  const [selectedChain, setSelectedChain] = useState<string>('polkadot');

  useEffect(() => {
    if (currentAccount) {
      if (preservedCurrentAddress.current !== currentAccount.address) {
        preservedCurrentAddress.current = currentAccount.address;
        setSelectedAddress(getSelectedAddress(accounts, currentAccount));
      }
    } else {
      preservedCurrentAddress.current = '';
      setSelectedAddress('');
    }
  }, [accounts, currentAccount]);

  return {
    selectedAddress,
    setSelectedAddress,
    selectedChain,
    setSelectedChain
  };
}
