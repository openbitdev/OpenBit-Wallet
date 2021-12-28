// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useState } from 'react';

import { QrScanAddress } from '@polkadot/react-qr';

import { ActionContext, Address, ButtonArea, NextStepButton, VerticalSpace } from '../components';
import useTranslation from '../hooks/useTranslation';
import { createAccountExternal } from '../messaging';
import { Name } from '../partials';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";

interface QrAccount {
  content: string;
  genesisHash: string;
  name?: string;
}

interface Props extends ThemeProps{
  className?: string;

}

function KoniImportQr ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [account, setAccount] = useState<QrAccount | null>(null);
  const [name, setName] = useState<string | null>(null);

  const _setAccount = useCallback(
    (qrAccount: QrAccount) => {
      setAccount(qrAccount);
      setName(qrAccount?.name || null);
    },
    []
  );

  const _onCreate = useCallback(
    (): void => {
      if (account && name) {
        createAccountExternal(name, account.content, account.genesisHash)
          .then(() => onAction('/'))
          .catch((error: Error) => console.error(error));
      }
    },
    [account, name, onAction]
  );

  return (
    <>
      <KoniHeader
        showBackArrow
        showSubHeader
        subHeaderName={t<string>('Scan Address Qr')}
      />
      <div className={className}>
        {!account && (
          <div className='qr-scan-address'>
            <QrScanAddress onScan={_setAccount} />
          </div>
        )}
        {account && (
          <>
            <div>
              <Address
                {...account}
                address={account.content}
                isExternal={true}
                name={name}
              />
            </div>
            <Name
              isFocused
              onChange={setName}
              value={name || ''}
            />
            <VerticalSpace />
            <ButtonArea>
              <NextStepButton
                isDisabled={!name}
                onClick={_onCreate}
              >
                {t<string>('Add the account with identified address')}
              </NextStepButton>
            </ButtonArea>
          </>
        )}
      </div>
    </>
  );
}

export default styled(KoniImportQr)`
  .qr-scan-address {
    margin: 0 30px 55px 30px;

    section {
      border-radius: 8px;
    }
  }
`
