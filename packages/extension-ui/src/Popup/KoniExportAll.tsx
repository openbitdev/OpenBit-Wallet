// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import { saveAs } from 'file-saver';
import React, { useCallback, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import { AccountContext, ActionContext} from '../components';
import useTranslation from '../hooks/useTranslation';
import { exportAccounts } from '../messaging';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import KoniInputWithLabel from "@polkadot/extension-ui/components/KoniInputWithLabel";
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniButton from "@polkadot/extension-ui/components/KoniButton";
import KoniActionBar from "@polkadot/extension-ui/components/KoniActionBar";
import KoniActionText from "@polkadot/extension-ui/components/KoniActionText";

const MIN_LENGTH = 6;

interface Props extends RouteComponentProps, ThemeProps {
  className?: string;
}

function KoniExportAll ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { accounts } = useContext(AccountContext);
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const _goHome = useCallback(
    () => onAction('/'),
    [onAction]
  );

  const onPassChange = useCallback(
    (password: string) => {
      setPass(password);
      setError('');
    }
    , []);

  const _onExportAllButtonClick = useCallback(
    (): void => {
      setIsBusy(true);

      exportAccounts(accounts.map((account) => account.address), pass)
        .then(({ exportedJson }) => {
          const blob = new Blob([JSON.stringify(exportedJson)], { type: 'application/json; charset=utf-8' });

          saveAs(blob, `batch_exported_account_${Date.now()}.json`);

          onAction('/');
        })
        .catch((error: Error) => {
          console.error(error);
          setError(error.message);
          setIsBusy(false);
        });
    },
    [accounts, onAction, pass]
  );

  return (
    <>
      <KoniHeader
        showBackArrow
        showSubHeader
        subHeaderName={t<string>('All account')}
      />
      <div className={className}>
        <div className='actionArea'>
          <KoniInputWithLabel
            data-export-all-password
            disabled={isBusy}
            isError={pass.length < MIN_LENGTH || !!error}
            label={t<string>('password for encrypting all accounts')}
            onChange={onPassChange}
            type='password'
          />
          {error && (
            <KoniWarning
              isBelowInput
              isDanger
            >
              {error}
            </KoniWarning>
          )}
          <div className='forget-button-wrapper'>
            <KoniButton
              className='export-button'
              data-export-button
              isBusy={isBusy}
              isDisabled={pass.length === 0 || !!error}
              onClick={_onExportAllButtonClick}
            >
              {t<string>('I want to export all my accounts')}
            </KoniButton>
          </div>

          <KoniActionBar className='withMarginTop'>
            <KoniActionText
              className='center'
              onClick={_goHome}
              text={t<string>('Cancel')}
            />
          </KoniActionBar>
        </div>
      </div>
    </>
  );
}

export default withRouter(styled(KoniExportAll)(({ theme }: Props) => `
  .actionArea {
    padding: 0 15px 10px 15px;
  }

  .center {
    margin: auto;
    margin-top: 10px;
    > span {
      color: ${theme.textColor3};
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
    }
  }

  .forget-button-wrapper {
    padding: 0 70px;
  }

  .export-button {
    margin-top: 6px;
  }

  .movedWarning {
    margin-top: 8px;
  }

  .withMarginTop {
    margin-top: 4px;
  }
`));
