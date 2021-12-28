// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useCallback, useContext, useState} from 'react';

import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import styled from "styled-components";
import KoniButtonArea from "@polkadot/extension-ui/components/KoniButtonArea";
import KoniNextStepButton from "@polkadot/extension-ui/components/KoniNextStepButton";
import Name from "@polkadot/extension-ui/partials/koni/Name";
import Password from "@polkadot/extension-ui/partials/koni/Password";
import {AccountContext, CurrentAccountContext} from "@polkadot/extension-ui/components";
import {AccountJson} from "@polkadot/extension-base/background/types";

interface Props {
  buttonLabel: string;
  isBusy: boolean;
  onBackClick: () => void;
  onCreate: (name: string, password: string) => void | Promise<void | boolean>;
  onNameChange: (name: string) => void;
  className?: string;
  children?: any;
  address?: any;
  genesis?: any;
}

function findAccountByAddress (accounts: AccountJson[], _address: string): AccountJson | null {
  return accounts.find(({ address }): boolean =>
    address === _address
  ) || null;
}

function AccountNamePasswordCreation ({ buttonLabel, isBusy, onBackClick, onCreate, onNameChange, address, genesis, className, children }: Props): React.ReactElement<Props> {
  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { setCurrentAccount} = useContext(CurrentAccountContext);
  const { accounts } = useContext(AccountContext);

  const _onCreate = useCallback(
    () => {
      name && password && onCreate(name, password);
      localStorage.setItem('selectedAccAddress', address);
      const accountByAddress = findAccountByAddress(accounts, address);
      setCurrentAccount(accountByAddress);
    },
    [name, password, onCreate]
  );

  const _onNameChange = useCallback(
    (name: string | null) => {
      onNameChange(name || '');
      setName(name);
    },
    [onNameChange]
  );

  return (
    <>
      <div className={className}>
        <div className='account-info-wrapper'>

          <KoniAccountInfo address={address} genesisHash={genesis} name={name} className='account-info'>
            <div className={ children? 'children-wrapper': ''}>
              {children}
            </div>
            <Name
              isFocused
              onChange={_onNameChange}
            />
            <Password onChange={setPassword} />
          </KoniAccountInfo>
        </div>
        <KoniButtonArea>
          <KoniNextStepButton
            data-button-action='add new root'
            isBusy={isBusy}
            isDisabled={!password || !name}
            onClick={_onCreate}
            className='next-step-btn'
          >
            {buttonLabel}
          </KoniNextStepButton>
        </KoniButtonArea>
      </div>
    </>
  );
}

export default styled(AccountNamePasswordCreation)`
  margin: 0 15px;
  .account-info-wrapper {
    height: 382px;
    overflow: auto;
  }

  .account-info {
    padding-bottom: 15px;
  }

  .children-wrapper {
    margin-top: 6px;
  }

  .next-step-btn {
    > .children {
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
    }
  }
`;
