// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { isAccountAll } from '@subwallet/extension-base/utils';
import { AccountProxyAvatar, AccountProxyItem } from '@subwallet/extension-koni-ui/components';
import { BasicInputWrapper } from '@subwallet/extension-koni-ui/components/Field/Base';
import { useSelectModalInputHelper, useSelector, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { groupFuncSortByName } from '@subwallet/extension-koni-ui/utils';
import { InputRef, SelectModal } from '@subwallet/react-ui';
import React, { ForwardedRef, forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { GeneralEmptyList } from '../EmptyList';

interface Props extends ThemeProps, BasicInputWrapper {
  externalAccountProxies?: AccountProxy[];
  filter?: (accountProxy: AccountProxy) => boolean;
  doFilter?: boolean;
}

const renderEmpty = () => <GeneralEmptyList />;

function defaultFiler (accountProxy: AccountProxy): boolean {
  return !isAccountAll(accountProxy.proxyId);
}

const Component = (props: Props, ref: ForwardedRef<InputRef>): React.ReactElement<Props> => {
  const { className = '', disabled, doFilter = true, externalAccountProxies, filter, id = 'account-selector', label, placeholder, readOnly, statusHelp, value } = props;
  const accountProxies = useSelector((state) => state.accountState.accountProxies);

  const items = useMemo(() => {
    let _items = (externalAccountProxies || accountProxies);

    if (doFilter) {
      _items = _items.filter(filter || defaultFiler);
    }

    return _items.sort(groupFuncSortByName);
  }, [accountProxies, doFilter, externalAccountProxies, filter]);

  const { t } = useTranslation();
  const { onSelect } = useSelectModalInputHelper(props, ref);

  const renderSelected = useCallback((item: AccountProxy) => {
    return (
      <div className={'__selected-item'}>
        <div className={'__selected-item-name common-text'}>
          {item.name}
        </div>
      </div>
    );
  }, []);

  const searchFunction = useCallback((item: AccountProxy, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      (item.name
        ? item.name.toLowerCase().includes(searchTextLowerCase)
        : false)
    );
  }, []);

  const renderItem = useCallback((item: AccountProxy, selected: boolean) => {
    return (
      <AccountProxyItem
        accountProxy={item}
        isSelected={selected}
      />
    );
  }, []);

  return (
    <>
      <SelectModal
        className={`${className} account-selector-modal`}
        disabled={disabled || readOnly}
        id={id}
        inputClassName={`${className} account-selector-input`}
        itemKey={'proxyId'}
        items={items}
        label={label}
        onSelect={onSelect}
        placeholder={placeholder || t('Select account')}
        prefix={
          <AccountProxyAvatar
            size={24}
            value={value}
          />
        }
        renderItem={renderItem}
        renderSelected={renderSelected}
        renderWhenEmpty={renderEmpty}
        searchFunction={searchFunction}
        searchMinCharactersCount={1}
        searchPlaceholder={t<string>('Account name')}
        selected={value || ''}
        statusHelp={statusHelp}
        title={label || placeholder || t('Select account')}
      />
    </>
  );
};

export const AccountProxySelector = styled(forwardRef(Component))<Props>(({ theme: { token } }: Props) => {
  return ({
    '&.account-selector-input': {
      '.__selected-item': {
        display: 'flex',
        color: token.colorTextLight1,
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      '.__selected-item-name': {
        textOverflow: 'ellipsis',
        fontWeight: token.headingFontWeight,
        overflow: 'hidden'
      },
      '.__selected-item-address': {
        color: token.colorTextLight4,
        paddingLeft: token.sizeXXS
      }
    }
  });
});
