// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TransactionContext } from '@subwallet/extension-koni-ui/Popup/Transaction/Transaction';
import { FormInstance, TransactionFormBaseProps } from '@subwallet/extension-koni-ui/types';
import { useContext, useEffect, useState } from 'react';
import { useIsFirstRender, useLocalStorage } from 'usehooks-ts';

const usePersistTransaction = <T extends TransactionFormBaseProps>(form: FormInstance<T>, key: string, initialState: T, valueChange: unknown) => {
  const isFirstRender = useIsFirstRender();
  const [storage, setStorage] = useLocalStorage<T>(key, initialState);
  const [initStorage] = useState(storage);

  const { from, setAsset, setChain, setFrom } = useContext(TransactionContext);

  useEffect(() => {
    if (isFirstRender) {
      // @ts-ignore
      form.setFieldsValue({ ...storage });
      setChain(storage.chain);

      if (storage.from) {
        setFrom(storage.from);
      }

      setAsset(storage.asset);
    }
  }, [form, isFirstRender, setChain, setFrom, storage, setAsset]);

  useEffect(() => {
    if (from) {
      form.setFieldValue('from', from);
    }
  }, [form, from]);

  useEffect(() => {
    if (!isFirstRender) {
      setStorage((values) => ({ ...values, from }));
    }
  }, [from, isFirstRender, setStorage]);

  useEffect(() => {
    if (!isFirstRender && valueChange) {
      const formValue = form.getFieldsValue();

      setStorage((values) => ({ ...values, ...formValue }));
    }
  }, [form, isFirstRender, setStorage, valueChange]);

  return [initStorage];
};

export default usePersistTransaction;
