// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxyAvatar } from '@subwallet/extension-koni-ui/components';
import useAccountAvatarInfo from '@subwallet/extension-koni-ui/hooks/account/useAccountAvatarInfo';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { KeypairType } from '@subwallet/keyring/types';
import { Icon } from '@subwallet/react-ui';
import AccountItem, { AccountItemProps } from '@subwallet/react-ui/es/web3-block/account-item';
import { CheckCircle } from 'phosphor-react';
import React from 'react';
import styled, { useTheme } from 'styled-components';

export interface AccountItemBaseProps extends Omit<AccountItemProps, 'avatarIdentPrefix'>, ThemeProps {
  genesisHash?: string | null;
  type?: KeypairType;
  accountName?: string;
  showUnselectIcon?: boolean;
  preventPrefix?: boolean;
  proxyId?: string;
}

const Component: React.FC<AccountItemBaseProps> = (props: AccountItemBaseProps) => {
  const { address, genesisHash, isSelected, onClick, preventPrefix, proxyId, rightItem, showUnselectIcon, type: givenType } = props;
  const { address: avatarAddress } = useAccountAvatarInfo(address ?? '', preventPrefix, genesisHash, givenType);
  const { token } = useTheme() as Theme;

  const _rightItem = rightItem || (
    <>
      {(showUnselectIcon || isSelected) && (
        <div className={'ant-account-item-icon'}>
          <Icon
            iconColor={isSelected ? token.colorSuccess : token.colorTextLight4}
            phosphorIcon={CheckCircle}
            size='sm'
            type='phosphor'
            weight='fill'
          />
        </div>
      )}
    </>);

  return (
    <div className={props.className}>
      <AccountItem
        avatarIdentPrefix={0}
        {...props}
        address={avatarAddress ?? ''}
        leftItem={(
          <AccountProxyAvatar
            size={24}
            value={proxyId}
          />
        )}
        onPressItem={onClick}
        rightItem={_rightItem}
      />
    </div>
  );
};

const AccountItemBase = styled(Component)<AccountItemBaseProps>(({ theme: { token } }: AccountItemBaseProps) => {
  return {
    '.ant-account-item': {
      minHeight: 52,
      paddingTop: 0,
      paddingBottom: 0,
      alignItems: 'center'
    },

    '.ant-web3-block-middle-item': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },

    '.account-item-content-wrapper': {
      overflow: 'hidden',
      paddingRight: token.sizeXS
    },

    '.account-item-name': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };
});

export default AccountItemBase;
