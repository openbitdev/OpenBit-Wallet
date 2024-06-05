// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { AccountProxyAvatar, AccountProxyAvatarGroup } from '@subwallet/extension-koni-ui/components';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { Typography } from '@subwallet/react-ui';
import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props extends ThemeProps {
  accountProxy: AccountProxy;
}

const Component: React.FC<Props> = ({ accountProxy, className }: Props) => {
  const { t } = useTranslation();
  const isAll = useMemo((): boolean => isAccountAll(accountProxy.proxyId), [accountProxy.proxyId]);

  return (
    <div className={className}>
      {isAll && <AccountProxyAvatarGroup />}
      {!isAll && (
        <AccountProxyAvatar
          size={24}
          value={accountProxy.proxyId}
        />
      )}
      <Typography.Text
        className='account-name'
        ellipsis={true}
      >
        { isAll ? t('All accounts') : accountProxy.name}
        <div className={'__beta-version'}>Beta version</div>
      </Typography.Text>
    </div>
  );
};

const AccountProxyBriefInfo = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: token.sizeXS,
    alignItems: 'center',
    overflow: 'hidden',

    '&.mr': {
      marginRight: -1
    },

    '.account-name': {
      fontWeight: token.headingFontWeight,
      fontSize: token.fontSizeHeading5,
      lineHeight: token.lineHeightHeading5,
      color: token.colorTextBase
    },

    '.account-address': {
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      color: token.colorTextDescription,
      'white-space': 'nowrap'
    },

    '.__beta-version': {
      marginTop: -2,
      color: token.colorTextTertiary,
      fontSize: token.fontSizeXS,
      lineHeight: token.lineHeightXS,
      fontWeight: token.bodyFontWeight
    }
  };
});

export default AccountProxyBriefInfo;
