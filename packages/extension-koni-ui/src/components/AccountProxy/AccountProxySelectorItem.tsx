// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { AccountProxyAvatar } from '@subwallet/extension-koni-ui/components';
import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { Theme } from '@subwallet/extension-koni-ui/themes';
import { PhosphorIcon, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button, Icon } from '@subwallet/react-ui';
import CN from 'classnames';
import { CheckCircle, Copy, GitMerge, PencilSimpleLine } from 'phosphor-react';
import { IconWeight } from 'phosphor-react/src/lib';
import React, { Context, useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

type Props = ThemeProps & {
  className?: string;
  onClickMoreButton?: VoidFunction;
  isSelected?: boolean;
  onClickQrButton?: VoidFunction;
  accountProxy: AccountProxy;
}

type AccountProxyTypeIcon = {
  type: 'icon' | 'node',
  value: PhosphorIcon | React.ReactNode,
  weight?: IconWeight
}

function Component (props: Props): React.ReactElement<Props> {
  const { accountProxy,
    isSelected,
    onClickMoreButton,
    onClickQrButton } = props;

  const token = useContext<Theme>(ThemeContext as Context<Theme>).token;

  const { t } = useTranslation();

  const accountProxyTypeIcon = useMemo<AccountProxyTypeIcon | undefined>(() => {
    if (!accountProxy.isMaster) {
      return {
        type: 'icon',
        value: GitMerge,
        weight: 'fill'
      };
    }

    return undefined;
  }, [accountProxy.isMaster]);

  const _onClickMore: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = React.useCallback((event) => {
    event.stopPropagation();
    onClickMoreButton && onClickMoreButton();
  }, [onClickMoreButton]);

  const _onClickQrButton: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = React.useCallback((event) => {
    event.stopPropagation();
    onClickQrButton && onClickQrButton();
  }, [onClickQrButton]);

  return (
    <>
      <div className={CN(props.className)}>
        <div className='__item-left-part'>
          <AccountProxyAvatar
            size={40}
            value={accountProxy.proxyId}
          />
        </div>
        <div className='__item-center-part'>
          <div className='__item-name'>{accountProxy.name}</div>
          <div className='__item-address'>{accountProxy.name}</div>
        </div>
        <div className='__item-right-part'>
          <div className='__item-actions'>
            <Button
              className='-show-on-hover'
              icon={
                <Icon
                  phosphorIcon={Copy}
                  size='sm'
                />
              }
              onClick={_onClickQrButton}
              size='xs'
              tooltip={t('Copy address')}
              type='ghost'
            />
            <Button
              icon={
                <Icon
                  phosphorIcon={PencilSimpleLine}
                  size='sm'
                />
              }
              onClick={_onClickMore}
              size='xs'
              type='ghost'

            />
          </div>
          <div className='__item-actions-overlay'>
            {isSelected && (
              <Button
                icon={
                  <Icon
                    iconColor={token.colorSuccess}
                    phosphorIcon={CheckCircle}
                    size='sm'
                    weight='fill'
                  />
                }
                size='xs'
                type='ghost'
              />
            )}
            {accountProxyTypeIcon && (
              <Button
                icon={
                  accountProxyTypeIcon.type === 'icon'
                    ? (
                      <Icon
                        phosphorIcon={accountProxyTypeIcon.value as PhosphorIcon}
                        size='sm'
                        weight={accountProxyTypeIcon.weight}
                      />
                    )
                    : accountProxyTypeIcon.value as React.ReactNode
                }
                size='xs'
                type='ghost'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const AccountProxySelectorItem = styled(Component)<Props>(({ theme }) => {
  const { token } = theme as Theme;

  return {
    height: 68,
    background: token.colorBgSecondary,
    padding: token.paddingSM,
    paddingRight: token.paddingXXS,
    borderRadius: token.borderRadiusLG,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    transition: `background ${token.motionDurationMid} ease-in-out`,

    '.__item-left-part': {
      paddingRight: token.paddingXS
    },
    '.__item-center-part': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flex: 1
    },
    '.__item-name': {
      fontSize: token.fontSizeLG,
      color: token.colorTextLight1,
      lineHeight: token.lineHeightLG,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap'
    },
    '.__item-address': {
      fontSize: token.fontSizeSM,
      color: token.colorTextLight4,
      lineHeight: token.lineHeightSM,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap'
    },
    '.__item-right-part': {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative'
    },
    '.__item-actions-overlay': {
      display: 'flex',
      flexDirection: 'row',
      pointerEvents: 'none',
      position: 'absolute',
      inset: 0,
      opacity: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: 40,
      transition: `opacity ${token.motionDurationMid} ease-in-out`
    },
    '.-show-on-hover': {
      opacity: 0,
      transition: `opacity ${token.motionDurationMid} ease-in-out`
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

export default AccountProxySelectorItem;
