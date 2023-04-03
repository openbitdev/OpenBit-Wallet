// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { _isAssetFungibleToken } from '@subwallet/extension-base/services/chain-service/utils';
import { BasicInputWrapper } from '@subwallet/extension-koni-ui/components/Field/Base';
import { useSelector } from '@subwallet/extension-koni-ui/hooks';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { useSelectModalInputHelper } from '@subwallet/extension-koni-ui/hooks/form/useSelectModalInputHelper';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon, InputRef, Logo, SelectModal } from '@subwallet/react-ui';
import TokenItem from '@subwallet/react-ui/es/web3-block/token-item';
import { CheckCircle } from 'phosphor-react';
import React, { ForwardedRef, forwardRef, useCallback, useEffect, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

import GeneralEmptyList from '../GeneralEmptyList';

export type TokenItemType = {
  name: string;
  slug: string;
  symbol: string;
  originChain: string;
};

interface Props extends ThemeProps, BasicInputWrapper {
  items: TokenItemType[];
  showChainInSelected?: boolean;
  prefixShape?: 'circle' | 'none' | 'squircle' | 'square';
  filterFunction?: (chainAsset: _ChainAsset) => boolean;
}

const renderEmpty = () => <GeneralEmptyList />;

function Component (props: Props, ref: ForwardedRef<InputRef>): React.ReactElement<Props> {
  const { className = '', disabled, id = 'token-select', items, label, placeholder, showChainInSelected = false, statusHelp, value, filterFunction = _isAssetFungibleToken } = props;
  const { t } = useTranslation();
  const { token } = useTheme() as Theme;

  const { assetRegistry } = useSelector((state) => state.assetRegistry);

  const { onSelect } = useSelectModalInputHelper(props, ref);

  const filteredItems = useMemo((): TokenItemType[] => {
    return items.filter((item) => {
      const chainAsset = assetRegistry[item.slug];

      return chainAsset ? filterFunction(chainAsset) : false;
    });
  }, [assetRegistry, filterFunction, items]);

  const chainLogo = useMemo(() => {
    const tokenInfo = filteredItems.find((x) => x.slug === value);

    return tokenInfo &&
      (
        <Logo
          isShowSubLogo={true}
          shape={'square'}
          size={token.controlHeightSM}
          subNetwork={tokenInfo.originChain}
          token={tokenInfo.symbol.toLowerCase()}
        />
      );
  }, [filteredItems, token.controlHeightSM, value]);

  const renderTokenSelected = useCallback((item: TokenItemType) => {
    return (
      <div className={'__selected-item'}>
        {item.symbol}
        {showChainInSelected}
      </div>
    );
  }, [showChainInSelected]);

  const searchFunction = useCallback((item: TokenItemType, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      item.symbol.toLowerCase().includes(searchTextLowerCase)
    );
  }, []);

  const renderItem = useCallback((item: TokenItemType, selected: boolean) => {
    return (
      <TokenItem
        className={'token-item'}
        isShowSubLogo={true}
        name={item.symbol}
        networkMainLogoShape={'circle'}
        networkMainLogoSize={28}
        rightItem={selected && (<div className={'__check-icon'}>
          <Icon
            customSize={'20px'}
            iconColor={token.colorSuccess}
            phosphorIcon={CheckCircle}
            type='phosphor'
            weight={'fill'}
          />
        </div>)}
        subName={''}
        subNetworkKey={item.originChain}
        symbol={item.symbol.toLowerCase()}
      />
    );
  }, [token]);

  useEffect(() => {
    if (!value) {
      onSelect(filteredItems[0]?.slug || '');
    } else {
      const existed = filteredItems.find((item) => item.slug === value);

      if (!existed) {
        onSelect(filteredItems[0]?.slug || '');
      }
    }
  }, [value, filteredItems, onSelect]);

  return (
    <SelectModal
      className={`${className} chain-selector-modal`}
      disabled={disabled}
      id={id}
      inputClassName={`${className} chain-selector-input`}
      itemKey={'slug'}
      items={filteredItems}
      label={label}
      onSelect={onSelect}
      placeholder={placeholder || t('Select token')}
      prefix={value !== '' && chainLogo}
      renderItem={renderItem}
      renderSelected={renderTokenSelected}
      renderWhenEmpty={renderEmpty}
      searchFunction={searchFunction}
      searchPlaceholder={t<string>('Search token')}
      searchableMinCharactersCount={2}
      selected={value || ''}
      statusHelp={statusHelp}
      title={label || placeholder || t('Select token')}
    />
  );
}

export const TokenSelector = styled(forwardRef(Component))<Props>(({ theme: { token } }: Props) => {
  return ({
    '&.chain-selector-input .__selected-item': {
      color: token.colorText
    },

    // TODO: delete this when fix component in ui-base
    '.token-item .ant-network-item-sub-name': {
      display: 'none'
    },

    '.token-item .__check-icon': {
      display: 'flex',
      width: 40,
      justifyContent: 'center'
    }
  });
});
