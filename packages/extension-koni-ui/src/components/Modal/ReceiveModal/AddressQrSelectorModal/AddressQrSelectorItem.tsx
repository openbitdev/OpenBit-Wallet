// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useNotification, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { toShort } from '@subwallet/extension-koni-ui/utils';
import { Button, Icon, Logo } from '@subwallet/react-ui';
import classNames from 'classnames';
import { Copy, QrCode } from 'phosphor-react';
import React, { useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

interface Props extends ThemeProps {
  logoKey?: string;
  addressTypeName: string;
  address: string;
  onClickQrBtn?: () => void;
}

const Component = (props: Props) => {
  const { address, addressTypeName, className, logoKey, onClickQrBtn } = props;
  const notify = useNotification();
  const { t } = useTranslation();

  const _onClickCopyBtn = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    notify({
      message: t('Copied to clipboard')
    });
  }, [notify, t]);

  return (
    <div
      className={classNames(className)}
      onClick={onClickQrBtn}
    >
      <div className='__item-left-part'>
        <Logo
          className='__item-logo'
          network={logoKey}
          shape='squircle'
          size={40}
        />
      </div>

      <div className='__item-middle-part'>
        <div className='__item-address-type-name'>
          {addressTypeName}
        </div>

        <div className='__item-address'>
          {toShort(address, 4, 5)}
        </div>
      </div>

      <div className='__item-right-part'>
        <CopyToClipboard text={address}>
          <Button
            icon={
              <Icon
                phosphorIcon={Copy}
                size='sm'
              />
            }
            onClick={_onClickCopyBtn}
            size='xs'
            tooltip={t('Copy address')}
            type='ghost'
          />
        </CopyToClipboard>
        <Button
          icon={
            <Icon
              phosphorIcon={QrCode}
              size='sm'
            />
          }
          onClick={onClickQrBtn}
          size='xs'
          tooltip={t('Show QR code')}
          type='ghost'
        />
      </div>
    </div>
  );
};

export const AddressQrSelectorItem = styled(Component)<Props>(({ theme: { extendToken, token } }: Props) => {
  return ({
    backgroundColor: token.colorBgSecondary,
    borderRadius: token.borderRadiusLG,
    minHeight: 68,
    display: 'flex',
    alignItems: 'center',
    transition: `background-color ${token.motionDurationMid} ease-in-out`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: extendToken.colorBgHover1
    },

    '.__item-left-part': {
      paddingLeft: token.paddingSM
    },

    '.__item-middle-part': {
      flex: 1,
      paddingLeft: token.paddingXS,
      paddingRight: token.paddingXS,
      overflow: 'hidden'
    },

    '.__item-right-part': {
      paddingLeft: token.paddingXS,
      paddingRight: token.paddingXS
    },

    '.__item-address-type-name, .__item-address': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap'
    },

    '.__item-address-type-name': {
      fontSize: token.fontSizeHeading5,
      lineHeight: token.lineHeightHeading5,
      fontWeight: token.headingFontWeight
    },

    '.__item-address': {
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
      color: token.colorTextLight4
    }
  });
});
