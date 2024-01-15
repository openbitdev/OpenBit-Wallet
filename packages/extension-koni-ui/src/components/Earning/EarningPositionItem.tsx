// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import EarningTypeTag from '@subwallet/extension-koni-ui/components/Earning/EarningTypeTag';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon, Logo, Number } from '@subwallet/react-ui';
import CN from 'classnames';
import { CaretRight } from 'phosphor-react';
import React from 'react';
import styled from 'styled-components';

type Props = ThemeProps

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;

  return (
    <div className={CN(className, '__item-upper-part')}>
      <Logo
        className={'__item-logo'}
        network={'polkadot'}
        size={38}
      />

      <div className='__item-lines-container'>
        <div className='__item-line-1'>
          <div className='__item-name'>DOT</div>
          <div className='__item-upto-value'>
            <Number
              decimal={0}
              value={1.39}
            />
            <div className={'__item-token'}>DOT</div>
          </div>
        </div>
        <div className='__item-line-2'>
          <div className='__item-tags-container'>
            <EarningTypeTag
              className={'__item-tag'}
              comingSoon={true}
            />
          </div>
          <div className='__item-duration'>
            <Number
              decimal={0}
              prefix={'$'}
              value={11.12}
            />
          </div>
        </div>
      </div>
      <div className={'__item-right-part'}>
        <Icon
          phosphorIcon={CaretRight}
          size='sm'
        />
      </div>
    </div>
  );
};

const EarningPositionItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    cursor: 'pointer',
    backgroundColor: token.colorBgSecondary,
    borderRadius: token.borderRadiusLG,
    padding: `${token.paddingXL}px ${token.paddingLG}px ${token.padding}px`,
    paddingTop: token.sizeSM,
    paddingLeft: token.sizeSM,
    paddingRight: token.sizeSM,
    paddingBottom: 0,
    display: 'flex',

    '.earning-option-item-not-available-info': {
      color: token.colorSuccess,
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM
    },

    '.__item-logo': {
      marginRight: token.marginSM
    },

    '.__item-lines-container': {
      flex: 1,
      overflow: 'hidden'
    },

    '.__item-line-1, .__item-line-2': {
      'white-space': 'nowrap',
      display: 'flex',
      justifyContent: 'space-between',
      gap: token.sizeSM
    },

    '.__item-line-1': {
      marginBottom: token.marginXXS
    },

    '.__item-upto-label, .__item-available-label': {
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
      color: token.colorTextLight4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'flex'
    },

    '.__item-name': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      color: token.colorTextLight1,
      fontWeight: token.headingFontWeight,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.__item-token': {
      paddingLeft: 2
    },
    '.__item-upto': {
      display: 'flex',
      alignItems: 'baseline',
      'white-space': 'nowrap',
      gap: token.sizeXXS
    },

    '.__item-upto-value': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      color: token.colorTextLight1,
      fontWeight: token.headingFontWeight,
      display: 'flex'
    },

    '.__item-duration': {
      color: token.colorSuccess,
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM
    },

    '.__item-upto-value, .__item-duration': {
      '.ant-number, .ant-typography': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      }
    },

    '.__item-tags-container': {
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
      gap: token.sizeXS
    },

    '.__item-tag': {
      marginRight: 0,
      'white-space': 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 70
    },

    '.__item-upper-part': {
      display: 'flex',
      paddingBottom: token.sizeXS
    },

    '.__item-lower-part': {
      borderTop: '2px solid rgba(33, 33, 33, 0.80)',
      display: 'flex',
      alignItems: 'center'
    },

    '.__item-available-value': {
      fontSize: 12
    },

    '.__item-right-part': {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 6
    }
  });
});

export default EarningPositionItem;
