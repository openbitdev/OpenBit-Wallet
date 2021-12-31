// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { AccountContext, ActionContext } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { deriveAccount } from '../../messaging';
import SelectParent from './SelectParent';
import KoniHeaderWithSteps from "@polkadot/extension-ui/partials/KoniHeaderWithSteps";
import AccountNamePasswordCreation from "@polkadot/extension-ui/components/koni/AccountNamePasswordCreation";
import styled from "styled-components";

interface Props {
  isLocked?: boolean;
  className?: string;
}

interface AddressState {
  address: string;
}

interface PathState extends AddressState {
  suri: string;
}

interface ConfirmState {
  account: PathState;
  parentPassword: string;
}

function Derive ({ isLocked, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const { accounts } = useContext(AccountContext);
  const { address: parentAddress } = useParams<AddressState>();
  const [isBusy, setIsBusy] = useState(false);
  const [account, setAccount] = useState<null | PathState>(null);
  const [name, setName] = useState<string | null>(null);
  const [parentPassword, setParentPassword] = useState<string | null>(null);

  const parentGenesis = useMemo(
    () => accounts.find((a) => a.address === parentAddress)?.genesisHash || null,
    [accounts, parentAddress]
  );

  const _onCreate = useCallback((name: string, password: string) => {
    if (!account || !name || !password || !parentPassword) {
      return;
    }

    setIsBusy(true);
    deriveAccount(parentAddress, account.suri, parentPassword, name, password, parentGenesis)
      .then(() => onAction('/'))
      .catch((error): void => {
        setIsBusy(false);
        console.error(error);
      });
  }, [account, onAction, parentAddress, parentGenesis, parentPassword]);

  const _onDerivationConfirmed = useCallback(({ account, parentPassword }: ConfirmState) => {
    setAccount(account);
    setParentPassword(parentPassword);
  }, []);

  const _onBackClick = useCallback(() => {
    setAccount(null);
  }, []);

  return (
    <>
      <KoniHeaderWithSteps
        step={account ? 2 : 1}
        text={t<string>('Add new account')}
        onBackClick={_onBackClick}
      />
      {!account && (
        <SelectParent
          isLocked={isLocked}
          onDerivationConfirmed={_onDerivationConfirmed}
          parentAddress={parentAddress}
          parentGenesis={parentGenesis}
        />
      )}
      {account && (
        <>
          <AccountNamePasswordCreation
            buttonLabel={t<string>('Create derived account')}
            isBusy={isBusy}
            onBackClick={_onBackClick}
            onCreate={_onCreate}
            onNameChange={setName}
            address={account?.address}
            genesis={parentGenesis}
            className='koni-import-seed-content'
          />
        </>
      )}
    </>
  );
}

export default styled(React.memo(Derive))`
`;
