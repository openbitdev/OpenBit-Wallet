// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getExplorerLink } from '@subwallet/extension-base/services/transaction-service/utils';
import InfoIcon from '@subwallet/extension-koni-ui/components/Icon/InfoIcon';
import { RECEIVE_QR_MODAL } from '@subwallet/extension-koni-ui/constants/modal';
import useNotification from '@subwallet/extension-koni-ui/hooks/common/useNotification';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import useFetchChainInfo from '@subwallet/extension-koni-ui/hooks/screen/common/useFetchChainInfo';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { getScanExplorerAddressInfoUrl, toShort } from '@subwallet/extension-koni-ui/utils';
import { Button, Icon, Logo, ModalContext, SwModal, SwQRCode } from '@subwallet/react-ui';
import CN from 'classnames';
import { CaretLeft, CopySimple, GlobeHemisphereWest } from 'phosphor-react';
import React, { useCallback, useContext, useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

interface Props extends ThemeProps {
  address?: string;
  selectedNetwork?: string;
}

const modalId = RECEIVE_QR_MODAL;

const Component: React.FC<Props> = ({ address, className, selectedNetwork }: Props) => {
  const { t } = useTranslation();
  const { inactiveModal } = useContext(ModalContext);
  const notify = useNotification();
  const chainInfo = useFetchChainInfo(selectedNetwork || '');

  const scanExplorerAddressUrl = useMemo(() => {
    return getExplorerLink(chainInfo, address || '', 'account') || getScanExplorerAddressInfoUrl(selectedNetwork || '', address || '');
  }, [selectedNetwork, address, chainInfo]);

  const handleClickViewOnExplorer = useCallback(() => {
    try {
      if (scanExplorerAddressUrl) {
        // eslint-disable-next-line no-void
        void chrome.tabs.create({ url: scanExplorerAddressUrl, active: true }).then(() => console.log('redirecting'));
      }
    } catch (e) {
      console.log('error redirecting to a new tab');
    }
  }, [scanExplorerAddressUrl]);

  const onClickCopyBtn = useCallback(() => notify({ message: t('Copied to clipboard') }), [notify, t]);

  const onCancel = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal]);

  return (
    <SwModal
      className={CN(className)}
      closeIcon={
        <Icon
          phosphorIcon={CaretLeft}
          size='md'
        />
      }
      id={modalId}
      onCancel={onCancel}
      rightIconProps={{
        icon: <InfoIcon />
      }}
      title={t<string>('Your address')}
    >
      <>
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
              network={selectedNetwork || ''}
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

        <Button
          block
          className={'__view-on-explorer'}
          disabled={!scanExplorerAddressUrl}
          icon={
            <Icon
              customSize={'28px'}
              phosphorIcon={GlobeHemisphereWest}
              size='sm'
              weight={'fill'}
            />
          }
          onClick={handleClickViewOnExplorer}
        >{t('View account on explorer')}</Button>
      </>
    </SwModal>
  );
};

const ReceiveQrModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.__view-on-explorer': {
      fontSize: token.fontSizeLG
    },

    '.ant-sw-qr-code': {
      marginLeft: 'auto',
      marginRight: 'auto'
    },

    '.__qr-code-wrapper': {
      paddingTop: token.padding,
      paddingBottom: token.padding
    },

    '.__qr-account-item-wrapper': {
      marginBottom: token.margin
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

export default ReceiveQrModal;
