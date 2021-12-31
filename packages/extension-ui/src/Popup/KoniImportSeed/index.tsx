// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useEffect, useState } from 'react';

import {AccountContext, ActionContext } from '../../components';
import AccountNamePasswordCreation from '../../components/koni/AccountNamePasswordCreation';
import useMetadata from '../../hooks/useMetadata';
import useTranslation from '../../hooks/useTranslation';
import { createAccountSuri } from '../../messaging';
import { DEFAULT_TYPE } from '../../util/defaultType';
import KoniSeedAndPath from './KoniSeedAndPath';
import KoniHeaderWithSteps from "@polkadot/extension-ui/partials/KoniHeaderWithSteps";
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";

export interface AccountInfo {
  address: string;
  genesis?: string;
  suri: string;
}

interface Props extends ThemeProps {
  className?: string;
}

function KoniImportSeed ({ className = '' }: Props): React.ReactElement {
  const { t } = useTranslation();
  const { accounts } = useContext(AccountContext);
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [step1, setStep1] = useState(true);
  const [type, setType] = useState(DEFAULT_TYPE);
  const chain = useMetadata(account && account.genesis, true);

  useEffect((): void => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  useEffect((): void => {
    setType(
      chain && chain.definition.chainType === 'ethereum'
        ? 'ethereum'
        : DEFAULT_TYPE
    );
  }, [chain]);

  const _onCreate = useCallback((name: string, password: string): void => {
    // this should always be the case
    if (name && password && account) {
      setIsBusy(true);

      createAccountSuri(name, password, account.suri, type, account.genesis)
        .then(() => onAction('/'))
        .catch((error): void => {
          setIsBusy(false);
          console.error(error);
        });
    }
  }, [account, onAction, type]);

  const _onNextStep = useCallback(
    () => setStep1(false),
    []
  );

  const _onBackClick = useCallback(
    () => setStep1(true),
    []
  );

  return (
    <>
      <KoniHeaderWithSteps
        step={step1 ? 1 : 2}
        text={t<string>('Import account')}
        onBackClick={_onBackClick}
      />
      {step1
        ? (
          <KoniSeedAndPath
            account={account}
            className='import-seed-content-wrapper'
            onAccountChange={setAccount}
            onNextStep={_onNextStep}
            type={type}
            name={name}
          />
        )
        : (
          <AccountNamePasswordCreation
            buttonLabel={t<string>('Add the account with the supplied seed')}
            isBusy={isBusy}
            onBackClick={_onBackClick}
            onCreate={_onCreate}
            onNameChange={setName}
            address={account?.address}
            genesis={account?.genesis}
            className='koni-import-seed-content'
          />
        )
      }
    </>

  );
}

export default styled(KoniImportSeed)`
`;
