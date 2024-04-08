// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { Theme } from '@subwallet/extension-koni-ui/themes';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button, Icon } from '@subwallet/react-ui';
import SwAvatar from '@subwallet/react-ui/es/sw-avatar';
import CN from 'classnames';
import { CheckCircle, PencilSimpleLine, QrCode } from 'phosphor-react';
import React, { Context, useCallback, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

type Props = ThemeProps & {
  className?: string;
  onClickMoreButton?: () => void;
  isSelected?: boolean;
  onClickQrButton?: (address: string) => void;
  accountName?: string;
}

function Component (props: Props): React.ReactElement<Props> {
  const { accountName,
    isSelected,
    onClickMoreButton } = props;

  const token = useContext<Theme>(ThemeContext as Context<Theme>).token;

  const { t } = useTranslation();

  const _onClickMore: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = React.useCallback((event) => {
    event.stopPropagation();
    onClickMoreButton && onClickMoreButton();
  }, [onClickMoreButton]);

  const _onClickQrBtn = useCallback(() => {
    //
  }, []);

  return (
    <>
      <div className={CN(props.className)}>
        <div className='__item-left-part'>
          <SwAvatar
            isShowSubIcon={true}
            size={40}
            value={''}
          />
        </div>
        <div className='__item-center-part'>
          <div className='__item-name'>{accountName}</div>
          <div className='__item-address'>{accountName}</div>
        </div>
        <div className='__item-right-part'>
          <div className='__item-actions'>
            <Button
              className='-show-on-hover'
              icon={
                <Icon
                  phosphorIcon={QrCode}
                  size='sm'
                />
              }
              onClick={_onClickQrBtn}
              size='xs'
              tooltip={t('Show QR code')}
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
          </div>
        </div>
      </div>
    </>
  );
}

const AccountGroupSelectorItem = styled(Component)<Props>(({ theme }) => {
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

export default AccountGroupSelectorItem;
