// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../../types';

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { AuthUrlInfo } from '@polkadot/extension-base/background/handlers/State';

import useTranslation from '../../hooks/useTranslation';
import Switch from "@polkadot/extension-ui/components/koni/Switch";

interface Props extends ThemeProps {
  className?: string;
  info: AuthUrlInfo;
  toggleAuth: (url: string) => void
  url: string;
}

function WebsiteEntry ({ className = '', info, toggleAuth, url }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const switchAccess = useCallback(() => {
    toggleAuth(url);
  }, [toggleAuth, url]);

  return (
    <div className={`${className} ${info.isAllowed ? 'allowed' : 'denied'}`}>
      <div className='url'>
        {url}
      </div>
      <Switch
        checked={info.isAllowed}
        checkedLabel={t<string>('allowed')}
        className='info'
        onChange={switchAccess}
        uncheckedLabel={t<string>('denied')}
      />
    </div>
  );
}

export default styled(WebsiteEntry)(({ theme }: Props) => `
  display: flex;
  align-items: center;

  .url{
    flex: 1;
    color: ${theme.manageWebsiteAccessColor};
    font-family: ${theme.fontFamilyRegular};
  }

  .info {
    .lightLabel {
      font-size: 15px;
      line-height: 32px;
      color: ${theme.textColor2};
    }

    .darkLabel {
      font-size: 15px;
      line-height: 32px;
      color: ${theme.textColor};
    }

    label {
      width: 43px;
      height: 24px;
    }

    .slider {
      background-color: #04C1B7;
    }

    .slider:before {
      width: 18px;
      height: 18px;
      left: 4px;
      background-color: #FFF;
    }

    .checkbox:checked + .slider:before {
      transform: translateX(18px);
    }
  }
`);
