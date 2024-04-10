// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BackIcon } from '@subwallet/extension-koni-ui/components';
import useNotification from '@subwallet/extension-koni-ui/hooks/common/useNotification';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { toShort } from '@subwallet/extension-koni-ui/utils';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { Button, Icon, Logo, SwModal, SwQRCode } from '@subwallet/react-ui';
import CN from 'classnames';
import { CopySimple } from 'phosphor-react';
import React, { useCallback, useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

interface Props extends ThemeProps {
  id: string;
  address?: string;
  onBack?: () => void;
}

const Component: React.FC<Props> = ({ address, className, id: modalId, onBack }: Props) => {
  const { t } = useTranslation();
  const notify = useNotification();
  const onClickCopyBtn = useCallback(() => notify({ message: t('Copied to clipboard') }), [notify, t]);

  const logoKey = useMemo(() => {
    if (!address) {
      return undefined;
    }

    const type = getKeypairTypeByAddress(address);

    if (type === 'ethereum') {
      return 'ethereum';
    }

    if (['bitcoin-44', 'bitcoin-84', 'bitcoin-86', 'bittest-44', 'bittest-84', 'bittest-86'].includes(type)) {
      return 'bitcoin';
    }

    return undefined;
  }, [address]);

  return (
    <SwModal
      className={CN(className)}
      closeIcon={(<BackIcon />)}
      id={modalId}
      onCancel={onBack}
      title={t<string>('Your QR code')}
    >
      <div className='__qr-code-wrapper'>
        <SwQRCode
          color='#000'
          errorLevel='H'
          icon={''}
          logoPadding={6}
          size={264}
          value={address || ''}
        />
      </div>

      <div className={'__qr-account-item-wrapper'}>
        <div className='__qr-account-item'>
          <Logo
            className='__qr-account-item-logo'
            network={logoKey}
            shape='squircle'
            size={24}
          />

          <div className='__qr-account-item-address'>
            {toShort(address || '', 7, 7)}
          </div>

          <CopyToClipboard text={address || ''}>
            <Button
              className='__copy-button'
              icon={
                <Icon
                  phosphorIcon={CopySimple}
                  size='sm'
                />
              }
              onClick={onClickCopyBtn}
              size='xs'
              tooltip={t('Copy address')}
              type='ghost'
            />
          </CopyToClipboard>
        </div>
      </div>
    </SwModal>
  );
};

const SimpleQrModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.ant-sw-qr-code': {
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    '.__qr-code-wrapper': {
      paddingTop: token.padding,
      paddingBottom: token.padding
    },

    '.__qr-account-item': {
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: token.paddingSM,
      paddingRight: token.paddingXXS,
      minHeight: 48,
      maxWidth: 232,
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    '.__qr-account-item-address': {
      paddingLeft: token.paddingXS,
      paddingRight: token.paddingXS,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap',
      color: token.colorTextLight4,
      flex: 1
    },

    '.__copy-button': {
      color: token.colorTextLight3,

      '&:hover': {
        color: token.colorTextLight2
      }
    }
  };
});

export default SimpleQrModal;
