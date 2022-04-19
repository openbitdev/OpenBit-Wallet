// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceJson } from '@koniverse/extension-koni-base/background/types';
import { subscribeBalance } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateBalance (balanceData: BalanceJson): void {
  store.dispatch({ type: 'balance/update', payload: balanceData });
}

export default function useSetupBalance (): void {
  useEffect((): void => {
    console.log('--- Setup redux: balance');
    subscribeBalance(null, updateBalance)
      .then(updateBalance)
      .catch(console.error);
  }, []);
}
