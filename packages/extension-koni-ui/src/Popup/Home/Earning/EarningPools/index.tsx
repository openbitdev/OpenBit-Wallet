// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Layout } from '@subwallet/extension-koni-ui/components';
import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { EarningEntryParam, EarningEntryView, ThemeProps } from '@subwallet/extension-koni-ui/types';
import CN from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps

function Component ({ className }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    navigate('/home/earning', { state: {
      view: EarningEntryView.OPTIONS
    } as EarningEntryParam });
  }, [navigate]);

  return (
    <Layout.Base
      className={CN(className)}
      onBack={onBack}
      showBackButton={true}
      showSubHeader={true}
      subHeaderBackground={'transparent'}
      subHeaderCenter={false}
      subHeaderPaddingVertical={true}
      title={t<string>('[TOKEN_NAME] earning options')}
    >
      Content here
    </Layout.Base>
  );
}

const EarningPools = styled(Component)<Props>(({ theme: { token } }: Props) => ({

}));

export default EarningPools;
