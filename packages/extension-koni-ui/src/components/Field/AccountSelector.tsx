// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountJson } from '@subwallet/extension-base/background/types';
import { isAccountAll } from '@subwallet/extension-base/utils';
import { AccountProxyAvatar } from '@subwallet/extension-koni-ui/components';
import { BasicInputWrapper } from '@subwallet/extension-koni-ui/components/Field/Base';
import { useSelectModalInputHelper, useSelector, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { funcSortByName, toShort } from '@subwallet/extension-koni-ui/utils';
import { InputRef, SelectModal } from '@subwallet/react-ui';
import CN from 'classnames';
import React, { ForwardedRef, forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { AccountItemWithName } from '../Account';
import { GeneralEmptyList } from '../EmptyList';

interface Props extends ThemeProps, BasicInputWrapper {
  externalAccounts?: AccountJson[];
  filter?: (account: AccountJson) => boolean;
  doFilter?: boolean;
  addressPrefix?: number;
  labelStyle?: 'default' | 'horizontal'
}

const renderEmpty = () => <GeneralEmptyList />;

function defaultFiler (account: AccountJson): boolean {
  return !isAccountAll(account.address);
}

const Component = (props: Props, ref: ForwardedRef<InputRef>): React.ReactElement<Props> => {
  const { className = '', disabled, doFilter = true, externalAccounts, filter, id = 'account-selector', label, labelStyle = 'default', placeholder, readOnly, statusHelp, title, value } = props;
  const accounts = useSelector((state) => state.accountState.accounts);

  const items = useMemo(() => {
    let _items = (externalAccounts || accounts);

    if (doFilter) {
      _items = _items.filter(filter || defaultFiler);
    }

    return _items.sort(funcSortByName);
  }, [accounts, doFilter, externalAccounts, filter]);

  const { t } = useTranslation();
  const { onSelect } = useSelectModalInputHelper(props, ref);

  const renderSelected = useCallback((item: AccountJson) => {
    return (
      <div className={'__selected-item'}>
        <div className={'__selected-item-name common-text'}>
          {item.name}
        </div>

        <div className={'__selected-item-address common-text'}>
        ({toShort(item.address, 4, 4)})
        </div>
      </div>
    );
  }, []);

  const searchFunction = useCallback((item: AccountJson, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      item.address.toLowerCase().includes(searchTextLowerCase) ||
      (item.name
        ? item.name.toLowerCase().includes(searchTextLowerCase)
        : false)
    );
  }, []);

  const renderItem = useCallback((item: AccountJson, selected: boolean) => {
    return (
      <AccountItemWithName
        accountName={item.name}
        address={item.address}
        avatarSize={24}
        isSelected={selected}
        proxyId={item.proxyId}
      />
    );
  }, []);

  const selectedItem = useMemo(() => {
    return items.find((a) => a.address === value);
  }, [items, value]);

  return (
    <>
      <SelectModal
        className={`${className} account-selector-modal`}
        disabled={disabled || readOnly}
        id={id}
        inputClassName={CN(className, 'account-selector-input', `-label-${labelStyle}`)}
        itemKey={'address'}
        items={items}
        label={label}
        onSelect={onSelect}
        placeholder={placeholder || t('Select account')}
        prefix={
          <AccountProxyAvatar
            size={20}
            value={selectedItem?.proxyId}
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
        title={title || label || placeholder || t('Select account')}
      />
    </>
  );
};

export const AccountSelector = styled(forwardRef(Component))<Props>(({ theme: { token } }: Props) => {
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
    },
    '.ant-sw-modal-header': {
      borderBottomColor: token.colorBgSecondary
    },
    '&.-label-horizontal': {
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      height: 48,
      '.-status-error .ant-input': {
        maxWidth: 160
      },
      '.ant-select-modal-input-container': {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        height: 48
      },
      '.ant-select-modal-input-label': {
        top: 0,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 0
      },
      '.ant-select-modal-input-wrapper': {
        flex: 1,
        paddingLeft: 0
      },
      '.ant-select-modal-input-prefix': {
        display: 'none'
      }
    }
  });
});
