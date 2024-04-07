// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Theme } from '@subwallet/extension-koni-ui/themes';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon } from '@subwallet/react-ui';
import CN from 'classnames';
import { CheckCircle } from 'phosphor-react';
import React, { Context, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

type Props = ThemeProps & {
  name?: string;
  isSelected?: boolean;
  renderRightPart?: (existNode: React.ReactNode) => React.ReactNode;
  onClick?: VoidFunction;
};

function Component (props: Props): React.ReactElement<Props> {
  const { className, isSelected, name, onClick, renderRightPart } = props;
  const token = useContext<Theme>(ThemeContext as Context<Theme>).token;

  const checkedIconNode = (isSelected && (
    <div className='__checked-icon-wrapper'>
      <Icon
        iconColor={token.colorSuccess}
        phosphorIcon={CheckCircle}
        size='sm'
        weight='fill'
      />
    </div>
  ));

  return (
    <div
      className={CN(className)}
      onClick={onClick}
    >
      <div className='__item-left-part'>
        {name}
      </div>
      <div className='__item-right-part'>
        {renderRightPart ? renderRightPart(checkedIconNode) : checkedIconNode}
      </div>
    </div>
  );
}

const AccountGroupItem = styled(Component)<Props>(({ theme }) => {
  const { token } = theme as Theme;

  return {
    background: token.colorBgSecondary,
    padding: token.paddingSM,
    paddingRight: token.paddingXXS,
    borderRadius: token.borderRadiusLG,
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    transition: `background ${token.motionDurationMid} ease-in-out`,

    '.__item-left-part': {
      flex: 1
    },

    '.__item-right-part': {
      display: 'flex'
    },

    '.__checked-icon-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      minWidth: 40
    },

    '&:hover': {
      background: token.colorBgInput,
      '.__item-actions-overlay': {
        opacity: 0
      },
      '.-show-on-hover': {
        opacity: 1
      }
    }
  };
});

export default AccountGroupItem;
