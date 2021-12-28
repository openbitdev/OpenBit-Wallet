// Copyright 2017-2021 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {KeyringPair} from '@polkadot/keyring/types';

import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';


import {useTranslation} from "react-i18next";
import Password from "@polkadot/extension-ui/koni/react-components/Password";
import {Toggle} from "@polkadot/extension-ui/koni/react-components";
import {BackgroundWindow} from "@polkadot/extension-base/background/types";
import {ThemeProps} from "@polkadot/extension-ui/types";

const UNLOCK_MINS = 15;

const bWindow = chrome.extension.getBackgroundPage() as BackgroundWindow;
const {keyring} = bWindow.pdotApi;

interface Props extends ThemeProps {
  address: string;
  className?: string;
  error?: string;
  onChange: (password: string, isUnlockCached: boolean) => void;
  onEnter?: () => void;
  password: string;
  tabIndex?: number;
}

function getPair (address: string): KeyringPair | null {
  try {
    return keyring.getPair(address);
  } catch (error) {
    return null;
  }
}

function Unlock ({ address, className, error, onChange, onEnter, tabIndex }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isUnlockCached, setIsUnlockCached] = useState(false);

  const pair = useMemo(
    () => getPair(address),
    [address]
  );

  useEffect((): void => {
    onChange(password, isUnlockCached);
  }, [onChange, isUnlockCached, password]);

  if (!pair || !pair.isLocked || pair.meta.isInjected) {
    return null;
  }

  return (
    <div className={className}>
      <Password
        autoFocus
        isError={!!error}
        label={t<string>('unlock account with password')}
        onChange={setPassword}
        onEnter={onEnter}
        tabIndex={tabIndex}
        value={password}
      >
      </Password>

      <div className={'kn-toggle-wrapper'}>
        <Toggle
          isOverlay
          label={t<string>('Unlock for {{expiry}} min', { replace: { expiry: UNLOCK_MINS } })}
          onChange={setIsUnlockCached}
          value={isUnlockCached}
        />
      </div>
    </div>
  );
}

export default React.memo(styled(Unlock)(({theme}: Props) => `
  .kn-toggle-wrapper {
      display: flex;
      margin-top: 10px;
      display: none;
      justify-content: flex-end;
  }
`));
