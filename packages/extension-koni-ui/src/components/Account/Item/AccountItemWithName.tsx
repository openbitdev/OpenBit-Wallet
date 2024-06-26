// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AbstractAddressJson } from '@subwallet/extension-base/background/types';
import { AccountProxyAvatar, AccountProxyAvatarGroup } from '@subwallet/extension-koni-ui/components';
import AccountItemBase, { AccountItemBaseProps } from '@subwallet/extension-koni-ui/components/Account/Item/AccountItemBase';
import { isAccountAll, toShort } from '@subwallet/extension-koni-ui/utils';
import CN from 'classnames';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface Props extends AccountItemBaseProps {
  direction?: 'vertical' | 'horizontal';
  accounts?: AbstractAddressJson[];
  fallbackName?: boolean;
  proxyId?: string;
}

const Component: React.FC<Props> = (props: Props) => {
  const { accountName, accounts, address, addressPreLength = 4, addressSufLength = 4, direction = 'horizontal', fallbackName = true, proxyId } = props;
  const isAll = isAccountAll(address);
  const { t } = useTranslation();

  const accountProxies = useMemo(() => {
    if (!accounts) {
      return undefined;
    }

    const proxies: string[] = [];

    accounts.forEach((a) => {
      if (a.proxyId && !proxies.includes(a.proxyId)) {
        proxies.push(a.proxyId);
      }
    });

    return proxies.map((p) => ({
      proxyId: p
    }));
  }, [accounts]);

  const showFallback = useMemo(() => {
    if (isAll) {
      return false;
    } else {
      if (fallbackName) {
        return true;
      } else {
        return !!accountName;
      }
    }
  }, [accountName, fallbackName, isAll]);

  return (
    <AccountItemBase
      {...props}
      address={address}
      className={CN('account-item-with-name', props.className)}
      leftItem={isAll
        ? <AccountProxyAvatarGroup accountProxies={accountProxies} />
        : <AccountProxyAvatar
          size={24}
          value={proxyId}
        />}
      middleItem={(
        <div className={CN('account-item-content-wrapper', `direction-${direction}`)}>
          <div className={'account-item-name'}>{isAll ? t('All accounts') : (accountName || toShort(address, addressPreLength, addressSufLength))}</div>
          {showFallback && <div className={'account-item-address-wrapper'}>{toShort(address, addressPreLength, addressSufLength)}</div>}
        </div>
      )}
    />
  );
};

const AccountItemWithName = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.account-item-content-wrapper': {
      fontWeight: token.fontWeightStrong,
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      display: 'flex',

      '&.direction-horizontal': {
        flexDirection: 'row',

        '.account-item-address-wrapper:before': {
          content: "'('",
          marginLeft: token.marginXXS
        },

        '.account-item-address-wrapper:after': {
          content: "')'"
        }
      },

      '&.direction-vertical': {
        flexDirection: 'column'
      }
    },

    '.account-item-name': {
      color: token.colorTextBase
    },

    '.account-item-address-wrapper': {
      color: token.colorTextDescription,
      whiteSpace: 'nowrap'
    },

    '.ant-account-item-icon': {
      height: 'auto'
    }
  };
});

export default AccountItemWithName;
