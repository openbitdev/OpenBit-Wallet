// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Layout } from '@subwallet/extension-koni-ui/components';
import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { EarningEntryView, ThemeProps } from '@subwallet/extension-koni-ui/types';
import CN from 'classnames';
import React, { useCallback } from 'react';
import styled from 'styled-components';

type Props = ThemeProps & {
  hasEarningPositions: boolean;
  setEntryView: React.Dispatch<React.SetStateAction<EarningEntryView>>;
}

function Component ({ className, hasEarningPositions, setEntryView }: Props) {
  const { t } = useTranslation();

  const onBack = useCallback(() => {
    setEntryView(EarningEntryView.POSITIONS);
  }, [setEntryView]);

  return (
    <Layout.Base
      className={CN(className)}
      onBack={onBack}
      showBackButton={hasEarningPositions}
      showSubHeader={true}
      subHeaderBackground={'transparent'}
      subHeaderCenter={false}
      subHeaderPaddingVertical={true}
      title={t<string>('Earning options')}
    >
      Content here
    </Layout.Base>
  );
}

const EarningOptions = styled(Component)<Props>(({ theme: { token } }: Props) => ({

}));

export default EarningOptions;
