// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../../types';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ActionContext } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import addAccountImg from '../../assets/add-account.svg';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";

interface Props extends ThemeProps {
  className?: string;
}

function AddAccount ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const _onClick = useCallback(
    () => onAction('/account/create'),
    [onAction]
  );

  return (
    <>
      <KoniHeader
        showAdd
        showSettings
        showSubHeader
        isNotHaveAccount
        subHeaderName={t<string>("Add Account")}
      />
      <div className={className}>
        <div className='koni-add-account-image-wrapper'>
          <div className='koni-add-account-image' onClick={_onClick}>
            <img src={addAccountImg} alt="add-account"/>
          </div>
        </div>
        <div className='no-accounts'>
          <p>{t<string>("You currently don't have any accounts. Create your first account to get started.")}</p>
        </div>
      </div>
    </>
  );
}

export default React.memo(styled(AddAccount)(({ theme }: Props) => `
  color: ${theme.textColor};
  height: 100%;

  .koni-add-account-image-wrapper {
    display: flex;
    justify-content: center;
    margin: 35px 0 40px 0;
  }

  .koni-add-account-image {
    width: 172px;
    height: 172px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  h3 {
    color: ${theme.textColor};
    margin-top: 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
  }

  > .image {
    display: flex;
    justify-content: center;
  }

  > .no-accounts p {
    text-align: center;
    font-size: 15px;
    line-height: 24px;
    margin: 0 51px;
    color: ${theme.textColor};
  }
`));
