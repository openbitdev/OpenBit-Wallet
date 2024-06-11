// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { AssetSetting } from '@subwallet/extension-base/background/KoniTypes';
import { _isChainEvmCompatible } from '@subwallet/extension-base/services/chain-service/utils';
import TokenItemFooter from '@subwallet/extension-koni-ui/Popup/Settings/Tokens/component/TokenItemFooter';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Logo } from '@subwallet/react-ui';
import TokenItem from '@subwallet/react-ui/es/web3-block/token-item';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps & {
  assetSettingMap: Record<string, AssetSetting>,
  tokenInfo: _ChainAsset,
  chainInfoMap: Record<string, _ChainInfo>
}

const Component: React.FC<Props> = (props: Props) => {
  const { assetSettingMap, chainInfoMap, className, tokenInfo } = props;
  const navigate = useNavigate();

  const renderTokenRightItem = useCallback((tokenInfo: _ChainAsset) => {
    const assetSetting = assetSettingMap[tokenInfo.slug];

    return (
      <TokenItemFooter
        assetSetting={assetSetting}
        navigate={navigate}
        tokenInfo={tokenInfo}
      />
    );
  }, [assetSettingMap, navigate]);

  let logoKey: string | undefined;

  if (tokenInfo.icon) {
    // do nothing
  } else if (tokenInfo.metadata?.runeId) {
    logoKey = 'default_rune';
  } else if (chainInfoMap[tokenInfo.originChain] && _isChainEvmCompatible(chainInfoMap[tokenInfo.originChain])) {
    logoKey = 'default_evm';
  }

  return (
    <TokenItem
      className={className}
      dividerPadding={56}
      isShowSubLogo={true}
      key={tokenInfo.slug}
      leftItem={
        logoKey
          ? (
            <Logo
              isShowSubLogo
              shape={'squircle'}
              size={36}
              subLogoShape={'circle'}
              subNetwork={tokenInfo.originChain}
              token={logoKey}
            />
          )
          : undefined
      }
      name={tokenInfo.symbol}
      rightItem={renderTokenRightItem(tokenInfo)}
      subName={''}
      subNetworkKey={tokenInfo.originChain}
      symbol={tokenInfo.slug.toLowerCase()}
      withDivider={true}
    />
  );
};

const TokenToggleItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.ant-web3-block': {
      cursor: 'default',
      padding: `${token.padding - 2}px ${token.paddingSM}px ${token.paddingXS - 2}px`,

      '.ant-web3-block-right-item': {
        marginRight: `-${token.padding + 2}px`
      }
    },
    '.ant-web3-block-middle-item': {
      paddingRight: token.paddingSM,
      overflow: 'hidden'
    },
    '.ant-network-item-name': {
      overflow: 'hidden',
      whitespace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    '.ant-logo': {
      marginRight: token.marginXXS
    },

    '.-sub-logo .ant-image-img': {
      width: `${token.size}px !important`,
      height: `${token.size}px !important`
    },

    '.ant-network-item-sub-name': {
      display: 'none'
    },

    '.manage_tokens__right_item_container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    '.ant-divider': {
      borderBlockStartColor: token.colorBgDivider
    }
  };
});

export default TokenToggleItem;
