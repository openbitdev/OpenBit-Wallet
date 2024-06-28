// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { AccountProxyAvatar } from '@subwallet/extension-koni-ui/components';
import { Theme } from '@subwallet/extension-koni-ui/themes';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon } from '@subwallet/react-ui';
import CN from 'classnames';
import { CheckCircle } from 'phosphor-react';
import React, { Context, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

type Props = ThemeProps & {
  accountProxy: AccountProxy;
  isSelected?: boolean;
  showUnselectIcon?: boolean;
  renderRightPart?: (existNode: React.ReactNode) => React.ReactNode;
  rightPartNode?: React.ReactNode;
  leftPartNode?: React.ReactNode;
  onClick?: VoidFunction;
  accountProxyName?: string;
};

function Component (props: Props): React.ReactElement<Props> {
  const { accountProxy, accountProxyName, className, isSelected, leftPartNode, onClick, renderRightPart, rightPartNode, showUnselectIcon } = props;
  const token = useContext<Theme>(ThemeContext as Context<Theme>).token;

  const checkedIconNode = ((showUnselectIcon || isSelected) && (
    <div className='__checked-icon-wrapper'>
      <Icon
        iconColor={isSelected ? token.colorSuccess : token.colorTextLight4}
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
        {
          leftPartNode || (
            <AccountProxyAvatar
              size={24}
              value={accountProxy.proxyId}
            />
          )
        }
      </div>
      <div className='__item-middle-part'>
        {accountProxyName || accountProxy.name}
      </div>
      <div className='__item-right-part'>
        {rightPartNode || (renderRightPart ? renderRightPart(checkedIconNode) : checkedIconNode)}
      </div>
    </div>
  );
}

const AccountProxyItem = styled(Component)<Props>(({ theme }) => {
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
    gap: token.sizeSM,

    '.__item-middle-part': {
      flex: 1,
      textAlign: 'left'
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

export default AccountProxyItem;
