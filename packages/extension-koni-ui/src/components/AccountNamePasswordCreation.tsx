// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React, { useCallback, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import useIsPopup from '@polkadot/extension-koni-ui/hooks/useIsPopup';
import Password from '@polkadot/extension-koni-ui/partials/Password';
import { EVM_ACCOUNT_TYPE, SUBSTRATE_ACCOUNT_TYPE } from '@polkadot/extension-koni-ui/Popup/CreateAccount';
import { Theme, ThemeProps } from '@polkadot/extension-koni-ui/types';
import { KeypairType } from '@polkadot/util-crypto/types';

import { AccountInfoEl, ButtonArea, NextStepButton } from '../components';

interface Props {
  buttonLabel?: string;
  isBusy: boolean;
  onCreate: (name: string, password: string) => void | Promise<void | boolean>;
  className?: string;
  children?: any;
  evmAddress?: string | null;
  address?: string | null;
  onPasswordChange?: (password: string) => void;
  name: string;
  keyTypes: KeypairType[];
  selectedGenesis?: string;
}

function AccountNamePasswordCreation ({ address, buttonLabel, children, className, evmAddress, isBusy, keyTypes, name, onCreate, selectedGenesis }: Props): React.ReactElement<Props> {
  const [password, setPassword] = useState<string | null>(null);
  const themeContext = useContext(ThemeContext as React.Context<Theme>);
  const isPopup = useIsPopup();

  const _onCreate = useCallback(
    () => {
      name && password && onCreate(name, password);
    },
    [name, password, onCreate]
  );

  return (
    <>
      <div className={CN(className, { full: !isPopup })}>
        <div className='account-info-wrapper'>
          <div className={`account-info-container ${themeContext.id === 'dark' ? '-dark' : '-light'} account-name-and-password-creation-wrapper`}>
            {keyTypes.includes(SUBSTRATE_ACCOUNT_TYPE) &&
              <AccountInfoEl
                address={address}
                genesisHash={selectedGenesis}
                name={name}
              />
            }

            {keyTypes.includes(EVM_ACCOUNT_TYPE) &&
              <AccountInfoEl
                address={evmAddress}
                genesisHash={selectedGenesis}
                name={`${name} - EVM`}
                type={EVM_ACCOUNT_TYPE}
              />
            }
            <div className={ children ? 'children-wrapper' : ''}>
              {children}
            </div>
            <Password onChange={setPassword} />
          </div>
        </div>
        <ButtonArea className='kn-button-area'>
          <NextStepButton
            className='next-step-btn'
            data-button-action='add new root'
            isBusy={isBusy}
            isDisabled={!password || !name}
            onClick={_onCreate}
          >
            {buttonLabel}
          </NextStepButton>
        </ButtonArea>
      </div>
    </>
  );
}

export default styled(AccountNamePasswordCreation)(({ theme }: ThemeProps) => `
  padding: 25px 15px 15px;
  flex: 1;
  overflow-y: auto;

  &.full{
    padding: 25px 0;
    background-color: ${theme.layoutBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden auto;
    flex-wrap: wrap;

    .account-info-wrapper{
      width: 560px;
      background-color: ${theme.background};
      border-radius: 5px 5px 0 0;
      border: 1px solid ${theme.background};

      .account-info-container{
        border: none;
      }
    }

    .kn-button-area{
      width: 560px;
      border-radius: 0 0 5px 5px;
    }
  }

  .account-name-and-password-creation-wrapper {
    padding-bottom: 15px;
  }

  .children-wrapper {
    margin-top: 6px;
  }

  .next-step-btn > .children {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
  }
`);
