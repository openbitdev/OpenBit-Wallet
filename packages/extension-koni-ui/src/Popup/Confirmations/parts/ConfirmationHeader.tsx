// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon, SwSubHeader } from '@subwallet/react-ui';
import CN from 'classnames';
import { CaretRight } from 'phosphor-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface Props extends ThemeProps {
  index: number,
  numberOfConfirmations: number,
  onClickPrev: () => void,
  onClickNext: () => void,
  title?: string,
}

function Component ({ className, index, numberOfConfirmations, onClickNext, onClickPrev, title }: Props) {
  const { t } = useTranslation();

  return (
    <SwSubHeader
      background='transparent'
      center={true}
      className={CN(className, 'confirmation-header')}
      onBack={onClickPrev}
      paddingVertical={true}
      rightButtons={(index === (numberOfConfirmations - 1) || numberOfConfirmations === 1)
        ? undefined
        : [
          {
            className: CN('__right-block'),
            onClick: onClickNext,
            size: 'xs',
            icon: (
              <Icon
                phosphorIcon={CaretRight}
                size='md'
              />
            )
          }
        ]}
      showBackButton={index > 0}
      title={
        <div className={'__title-wrapper'}>
          <div>{t(title || '')}</div>
          <div className={'__beta-version'}>Beta version</div>
        </div>
      }
    />
  );
}

const ConfirmationHeader = styled(Component)<Props>(({ theme: { token } }: ThemeProps) => {
  return {
    '.__beta-version': {
      color: token.colorTextTertiary,
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
      fontWeight: token.bodyFontWeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    '.__title-wrapper': {
      fontSize: token.fontSizeXL,
      lineHeight: token.lineHeightHeading4,
      fontWeight: token.fontWeightStrong

    }
  };
});

export default ConfirmationHeader;
