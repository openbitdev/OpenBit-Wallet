// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {ResponseJsonGetAccountInfo} from '@polkadot/extension-base/background/types';
import type {KeyringPair$Json} from '@polkadot/keyring/types';
import type {KeyringPairs$Json} from '@polkadot/ui-keyring/types';

import React, {useCallback, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {u8aToString} from '@polkadot/util';
import {AccountContext, ActionContext} from '../components';
import useTranslation from '../hooks/useTranslation';
import {batchRestore, jsonGetAccountInfo, jsonRestore} from '../messaging';
import {DEFAULT_TYPE} from '../util/defaultType';
import {isKeyringPairs$Json} from '../util/typeGuards';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniInputWithLabel from "@polkadot/extension-ui/components/KoniInputWithLabel";
import KoniButton from "@polkadot/extension-ui/components/KoniButton";
import KoniInputFileWithLabel from "@polkadot/extension-ui/components/KoniInputFileWithLabel";
import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import KoniButtonArea from "@polkadot/extension-ui/components/KoniButtonArea";

const acceptedFormats = ['application/json', 'text/plain'].join(', ');

interface Props {
  className?: string;
}

function Upload({className}: Props): React.ReactElement {
  const {t} = useTranslation();
  const {accounts} = useContext(AccountContext);
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [accountsInfo, setAccountsInfo] = useState<ResponseJsonGetAccountInfo[]>([]);
  const [password, setPassword] = useState<string>('');
  const [isFileError, setFileError] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  // don't use the info from the file directly
  // rather use what comes from the background from jsonGetAccountInfo
  const [file, setFile] = useState<KeyringPair$Json | KeyringPairs$Json | undefined>(undefined);

  useEffect((): void => {
    !accounts.length && onAction();
  }, [accounts, onAction]);

  const _onChangePass = useCallback(
    (pass: string): void => {
      setPassword(pass);
      setIsPasswordError(false);
    }, []
  );

  const _onChangeFile = useCallback(
    (file: Uint8Array): void => {
      setAccountsInfo(() => []);

      let json: KeyringPair$Json | KeyringPairs$Json | undefined;

      try {
        json = JSON.parse(u8aToString(file)) as KeyringPair$Json | KeyringPairs$Json;
        setFile(json);
      } catch (e) {
        console.error(e);
        setFileError(true);
      }

      if (json === undefined) {
        return;
      }

      if (isKeyringPairs$Json(json)) {
        setRequirePassword(true);
        json.accounts.forEach((account) => {
          setAccountsInfo((old) => [...old, {
            address: account.address,
            genesisHash: account.meta.genesisHash,
            name: account.meta.name
          } as ResponseJsonGetAccountInfo]);
        });
      } else {
        setRequirePassword(true);
        jsonGetAccountInfo(json)
          .then((accountInfo) => setAccountsInfo((old) => [...old, accountInfo]))
          .catch((e) => {
            setFileError(true);
            console.error(e);
          });
      }
    }, []
  );

  console.log('123', accountsInfo)

  const _onRestore = useCallback(
    (): void => {
      if (!file) {
        return;
      }

      if (requirePassword && !password) {
        return;
      }

      setIsBusy(true);

      (isKeyringPairs$Json(file) ? batchRestore(file, password, accountsInfo[0].address) : jsonRestore(file, password, accountsInfo[0].address))
        .then(() => {
          onAction('/');
        }).catch(
        (e) => {
          console.error(e);
          setIsBusy(false);
          setIsPasswordError(true);
        });
    },
    [file, onAction, password, requirePassword]
  );

  return (
    <>
      <KoniHeader
        showBackArrow
        smallMargin
        showSubHeader
        subHeaderName={t<string>('Restore from JSON')}
      />
      <div className={className}>
        <div className='restore-from-json-wrapper'>
          {accountsInfo.map(({address, genesisHash, name, type = DEFAULT_TYPE}, index) => (
            <KoniAccountInfo
              address={address}
              genesisHash={genesisHash}
              key={`${index}:${address}`}
              name={name}
              type={type}
              className='account-info'
            />
          ))}
          <KoniInputFileWithLabel
            accept={acceptedFormats}
            isError={isFileError}
            label={t<string>('backup file')}
            onChange={_onChangeFile}
            withLabel
          />
          {isFileError && (
            <KoniWarning
              isDanger
            >
              {t<string>('Invalid Json file')}
            </KoniWarning>
          )}
          {requirePassword && (
            <div>
              <KoniInputWithLabel
                isError={isPasswordError}
                label={t<string>('Password for this file')}
                onChange={_onChangePass}
                type='password'
              />
              {isPasswordError && (
                <KoniWarning
                  isBelowInput
                  isDanger
                >
                  {t<string>('Unable to decode using the supplied passphrase')}
                </KoniWarning>
              )}
            </div>
          )}
        </div>
        <KoniButtonArea>
          <KoniButton
            className='restoreButton'
            isBusy={isBusy}
            isDisabled={isFileError || isPasswordError}
            onClick={_onRestore}
          >
            {t<string>('Restore')}
          </KoniButton>
        </KoniButtonArea>
      </div>
    </>
  );
}

export default styled(Upload)`
  padding: 25px 15px 15px;
  flex: 1;
  margin-top: -25px;
  overflow-y: auto;
  .restore-from-json-wrapper {

  }

  .account-info {
    margin-bottom: 10px;
  }

  .restoreButton {
  }
`;
