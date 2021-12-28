// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import { saveAs } from 'file-saver';
import React, { useCallback, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { ActionContext } from '../components';
import useTranslation from '../hooks/useTranslation';
import { exportAccount } from '../messaging';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniButton from "@polkadot/extension-ui/components/KoniButton";
import KoniActionBar from "@polkadot/extension-ui/components/KoniActionBar";
import KoniActionText from "@polkadot/extension-ui/components/KoniActionText";
import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import KoniInputWithLabel from "@polkadot/extension-ui/components/KoniInputWithLabel";

const MIN_LENGTH = 6;

interface Props extends RouteComponentProps<{address: string}>, ThemeProps {
  className?: string;
}

function KoniExportAccount ({ className, match: { params: { address } } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
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

  const _onExportButtonClick = useCallback(
    (): void => {
      setIsBusy(true);

      exportAccount(address, pass)
        .then(({ exportedJson }) => {
          const blob = new Blob([JSON.stringify(exportedJson)], { type: 'application/json; charset=utf-8' });

          saveAs(blob, `${address}.json`);

          onAction('/');
        })
        .catch((error: Error) => {
          console.error(error);
          setError(error.message);
          setIsBusy(false);
        });
    },
    [address, onAction, pass]
  );

  return (
    <>
      <KoniHeader
        showBackArrow
        showSubHeader
        subHeaderName='Export account'
        text={t<string>('Export account')}
      />
      <div className={className}>
        <KoniAccountInfo address={address}>
          <KoniWarning className='movedWarning'>
            {t<string>("You are exporting your account. Keep it safe and don't share it with anyone.")}
          </KoniWarning>

          <div className='passwordArea'>
            <KoniInputWithLabel
              className='koni-export-input-label'
              data-export-password
              disabled={isBusy}
              isError={pass.length < MIN_LENGTH || !!error}
              label={t<string>('password for this account')}
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
          </div>

          <div className='actionArea'>

            <KoniButton
              className='export-button'
              data-export-button
              isBusy={isBusy}
              isDisabled={pass.length === 0 || !!error}
              onClick={_onExportButtonClick}
            >
              {t<string>('I want to export this account')}
            </KoniButton>
            <KoniActionBar className='withMarginTop'>
              <KoniActionText
                className='cancel-button'
                onClick={_goHome}
                text={t<string>('Cancel')}
              />
            </KoniActionBar>
          </div>
        </KoniAccountInfo>
      </div>
    </>
  );
}

export default withRouter(styled(KoniExportAccount)(({ theme }: Props) => `
  margin: 0 15px;

  .passwordArea {
    padding-top: 13px;
  }
  .actionArea {
    padding: 0 70px;
  }

  .export-button {
    margin-bottom: 4px;
  }

  .movedWarning {
    margin-top: 8px;
  }

  .withMarginTop {
    margin-top: 12px;
  }

  .koni-export-input-label {
    margin-bottom: 20px;
  }

  .cancel-button {
    margin-top: 10px;
    margin: auto;
    > span {
      color: ${theme.textColor3};
      font-weight: 700;
      font-size: 16px;
      line-height: 26px;
  }
`));
