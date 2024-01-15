// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import EarningTypeTag from '@subwallet/extension-koni-ui/components/Earning/EarningTypeTag';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Logo, Number } from '@subwallet/react-ui';
import CN from 'classnames';
import React from 'react';
import styled from 'styled-components';

type Props = ThemeProps

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;

  return (
    <div
      className={CN(className, 'earning-pool')}
    >
      <div className={'__item-upper-part'}>
        <Logo
          className={'__item-logo'}
          network={'polkadot'}
          size={38}
        />

        <div className='__item-lines-container'>
          <div className='__item-line-1'>
            <div className={'__item-name'}>
              <div className='__item-name-token'>DOT</div>
              <div className='__item-name-chain'>(Polkadot)</div>
            </div>
            <div className='__item-rewards'>
              <div className='__item-rewards-label'>
                {('Rewards')}:
              </div>
              <div className='__item-rewards-value'>
                <Number
                  decimal={0}
                  suffix={'%'}
                  value={14.82}
                />
              </div>
            </div>
          </div>
          <div className='__item-line-2'>
            <div className='__item-total-staked-label'>
              {('Total value staked')}:
            </div>
            <div className='__item-total-staked-value'>
              <Number
                decimal={2}
                prefix={'$'}
                value={583909}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={'__item-lower-part'}>
        <div className='__item-tags-container'>
          <EarningTypeTag
            className={'__item-tag'}
            comingSoon={true}
          />
        </div>
      </div>
    </div>
  );
};

const EarningPoolItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    cursor: 'pointer',
    backgroundColor: token.colorBgSecondary,
    borderRadius: token.borderRadiusLG,
    paddingTop: token.sizeSM,
    paddingLeft: token.sizeSM,
    paddingRight: token.sizeSM,
    paddingBottom: 0,

    '.earning-item-not-available-title': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      paddingBottom: 0,
      fontWeight: token.headingFontWeight
    },

    '.earning-item-not-available-info': {
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

    '.__item-rewards-label, .__item-total-staked-label': {
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
      color: token.colorTextLight4,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '.__item-name': {
      display: 'flex',
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      color: token.colorTextLight1,
      fontWeight: token.headingFontWeight,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.__item-name-chain': {
      color: token.colorTextLight4,
      paddingLeft: 4
    },

    '.__item-rewards': {
      display: 'flex',
      alignItems: 'baseline',
      'white-space': 'nowrap',
      gap: token.sizeXXS
    },

    '.__item-rewards-value': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      color: token.colorTextLight1,
      fontWeight: token.headingFontWeight
    },

    '.__item-total-staked-value': {
      color: token.colorSuccess,
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM
    },

    '.__item-rewards-value, .__item-total-staked-value': {
      '.ant-number, .ant-typography': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      }
    },

    '.__item-tags-container': {
      paddingTop: 8,
      paddingBottom: 8,
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
    }
  });
});

export default EarningPoolItem;
