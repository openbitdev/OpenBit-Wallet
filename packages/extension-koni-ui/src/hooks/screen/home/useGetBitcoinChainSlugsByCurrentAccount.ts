// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getChainSlugByBitcoinNetwork, isAccountAll } from '@subwallet/extension-base/utils';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { isBitcoinAddress } from '@subwallet/keyring';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useGetBitcoinChainSlugsByCurrentAccount (): string[] {
  const { accounts, currentAccount } = useSelector((state: RootState) => state.accountState);

  return useMemo<string[]>(() => {
    if (!currentAccount) {
      return [];
    }

    const result: string[] = [];

    if (isAccountAll(currentAccount.address)) {
      accounts.forEach((account) => {
        const bitcoinNetwork = isBitcoinAddress(account.address);

        const chainSlug = getChainSlugByBitcoinNetwork(bitcoinNetwork);

        if (chainSlug && !result.includes(chainSlug)) {
          result.push(chainSlug);
        }
      });
    } else {
      const bitcoinNetwork = isBitcoinAddress(currentAccount.address);

      const chainSlug = getChainSlugByBitcoinNetwork(bitcoinNetwork);

      if (chainSlug) {
        result.push(chainSlug);
      }
    }

    return result;
  }, [accounts, currentAccount]);
}
