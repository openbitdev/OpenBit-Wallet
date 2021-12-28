// Copyright 2017-2021 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0


import React, {useCallback, useEffect, useMemo, useState} from 'react';

import Password from './Password';
import {AddressFlags, AddressProxy} from "@polkadot/extension-ui/koni/Popup/Sending/types";
import {extractExternal} from "@polkadot/extension-ui/koni/Popup/Sending/util";
import {InputAddress} from "@polkadot/extension-ui/koni/react-components";
import {useTranslation} from "react-i18next";
import {QueueTx} from "@polkadot/extension-ui/koni/react-components/Status/types";
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";

interface Props extends ThemeProps {
  className?: string;
  currentItem: QueueTx;
  onChange: (address: AddressProxy) => void;
  onEnter?: () => void;
  passwordError: string | null;
  requestAddress: string;
}

interface PasswordState {
  isUnlockCached: boolean;
  signPassword: string;
}

function Address({className, currentItem, onChange, onEnter, passwordError, requestAddress}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const [{isUnlockCached, signPassword}, setSignPassword] = useState<PasswordState>(() => ({
    isUnlockCached: false,
    signPassword: ''
  }));

  const [signAddress, flags] = useMemo(
    (): [string, AddressFlags] => {
      const signAddress = requestAddress;

      try {
        return [signAddress, extractExternal(signAddress)];
      } catch {
        return [signAddress, {} as AddressFlags];
      }
    },
    [requestAddress]
  );

  const _updatePassword = useCallback(
    (signPassword: string, isUnlockCached: boolean) => setSignPassword({isUnlockCached, signPassword}),
    []
  );

  useEffect((): void => {
    onChange({
      isMultiCall: false,
      isUnlockCached,
      multiRoot: null,
      proxyRoot: null,
      signAddress,
      signPassword
    });
  }, [isUnlockCached, onChange, signAddress, signPassword]);

  return (
    <div className={className}>
      <InputAddress
        withEllipsis
        className='full'
        defaultValue={requestAddress}
        isDisabled
        isInput
        label={t('Sending from my account')}
        withLabel
      />
      {signAddress && !currentItem.isUnsigned && flags.isUnlockable && (
        <div className={'kn-l-password-wrapper'}>
          <Password
            address={signAddress}
            error={passwordError}
            onChange={_updatePassword}
            onEnter={onEnter}
          />
        </div>
      )}
      {passwordError && (
        <KoniWarning isDanger className={'kn-l-warning'}>
          {passwordError}
        </KoniWarning>
      )}
    </div>
  );
}

export default React.memo(styled(Address)(({ theme }: ThemeProps) => `
  .kn-l-password-wrapper {
    margin-top: 10px;
  }

  .kn-l-warning {
    margin-top: 10px;
  }
`));
