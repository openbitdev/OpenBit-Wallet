/* eslint-disable react-hooks/exhaustive-deps */
// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line header/header
import { TransactionHistoryItemType } from '@koniverse/extension-koni-base/background/types';
import { subscribeHistory } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateTransactionHistory (historyMap: Record<string, TransactionHistoryItemType[]>): void {
  store.dispatch({ type: 'transactionHistory/update', payload: historyMap });
}

export default function useSetupTransactionHistory (): void {
  useEffect((): void => {
    console.log('--- Setup redux: transactionHistory');

    subscribeHistory(updateTransactionHistory)
      .then(updateTransactionHistory)
      .catch(console.error);
  }, []);
}
