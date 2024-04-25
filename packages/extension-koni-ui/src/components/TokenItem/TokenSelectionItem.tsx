// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { _MANTA_ZK_CHAIN_GROUP, _ZK_ASSET_PREFIX } from '@subwallet/extension-base/services/chain-service/constants';
import { useFetchChainInfo, useNotification, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button, Icon } from '@subwallet/react-ui';
import TokenItem, { TokenItemProps } from '@subwallet/react-ui/es/web3-block/token-item';
import classNames from 'classnames';
import { Copy, QrCode } from 'phosphor-react';
import React, { useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

interface Props extends ThemeProps, Omit<TokenItemProps, 'name' | 'subName' | 'slug' | 'subNetworkKey' | 'symbol'> {
  address?: string;
  item: _ChainAsset;
  onClickCopyBtn?: () => void;
  onClickQrBtn?: () => void;
}

const Component = (props: Props) => {
  const { address, className, item, onClickCopyBtn, onClickQrBtn, onPressItem, ...restProps } = props;
  const { name, originChain: chain, slug, symbol } = item;
  const chainInfo = useFetchChainInfo(chain || '');
  const notify = useNotification();
  const { t } = useTranslation();

  const _onCLickCopyBtn = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    notify({
      message: t('Copied to clipboard')
    });
    onClickCopyBtn && onClickCopyBtn();
  }, [notify, onClickCopyBtn, t]);

  return (
    <div className={classNames('token-selection-item', className)}>
      <TokenItem
        {...restProps}
        isShowSubLogo
        middleItem={
          (
            <>
              <div className='token-info'>
                <span>{symbol}</span>
                {/* { name && ( */}
                {/*  <span className='__token-name'> */}
                {/*    &nbsp;( */}
                {/*    <span className='name'>{name}</span> */}
                {/*    ) */}
                {/*  </span> */}
                {/* ) } */}
              </div>
              <div className={'__chain-name'}>
                {chainInfo.name}
              </div>
            </>
          )
        }
        name={name}
        networkMainLogoShape='squircle'
        networkMainLogoSize={40}
        onPressItem={_MANTA_ZK_CHAIN_GROUP.includes(chainInfo.slug) && symbol?.startsWith(_ZK_ASSET_PREFIX) ? undefined : onPressItem }
        rightItem={
          (
            <>
              <CopyToClipboard text={address || ''}>
                <Button
                  icon={
                    <Icon
                      phosphorIcon={Copy}
                      size='sm'
                    />
                  }
                  onClick={_onCLickCopyBtn}
                  size='xs'
                  tooltip={t('Copy address')}
                  type='ghost'
                />
              </CopyToClipboard>
              <Button
                disabled={_MANTA_ZK_CHAIN_GROUP.includes(chainInfo.slug) && symbol?.startsWith(_ZK_ASSET_PREFIX)}
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
            </>
          )
        }
        subName={chainInfo.name}
        subNetworkKey={chain}
        symbol={slug.toLowerCase()}
      />
    </div>
  );
};

export const TokenSelectionItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    '.ant-web3-block': {
      padding: token.paddingSM
    },

    '.ant-web3-block-middle-item': {
      '.ant-number': {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM
      }
    },

    '.token-info': {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      'white-space': 'nowrap',

      fontSize: token.fontSizeHeading5,
      lineHeight: token.lineHeightHeading5,
      fontWeight: token.fontWeightStrong,
      color: token.colorWhite,

      '.__token-name': {
        color: token.colorTextTertiary,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',

        '.name': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }
      }
    },

    '.__chain-name': {
      color: token.colorTextLight4,
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM
    },

    '.ant-loading-icon': {
      color: 'inherit !important'
    },

    '.__icon-wrapper': {
      width: 40,
      display: 'flex',
      justifyContent: 'center',
      color: token.colorTextLight4
    },

    '.ant-btn-ghost': {
      color: token.colorTextLight3
    },

    '.ant-btn-ghost:hover': {
      color: token.colorTextLight2
    },

    '.ant-balance-item-content:hover': {
      '.__icon-wrapper': {
        color: token.colorTextLight2
      }
    }
  });
});
