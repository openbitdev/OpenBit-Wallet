// Copyright 2019-2022 @subwallet/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ScreenContext } from '@subwallet/extension-web-ui/contexts/ScreenContext';
import { WebUIContext } from '@subwallet/extension-web-ui/contexts/WebUIContext';
import { ThemeProps } from '@subwallet/extension-web-ui/types';
import { SwSubHeader } from '@subwallet/react-ui';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps;

const Component: React.FC<Props> = ({ className }: Props) => {
  const { t } = useTranslation();
  const { setTitle } = useContext(WebUIContext);
  const location = useLocation();
  const { isWebUI } = useContext(ScreenContext);

  useEffect(() => {
    if (location.pathname === '/home/swap') {
      setTitle(t('Swap'));
    }
  }, [location.pathname, setTitle, t]);

  return (
    <div className={className}>
      {
        !isWebUI && (
          <SwSubHeader
            background={'transparent'}
            className={'__header-area'}
            paddingVertical
            showBackButton={false}
            title={t('Swap')}
          />)
      }
    </div>
  );
};

const Swap = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {

  };
});

export default Swap;
