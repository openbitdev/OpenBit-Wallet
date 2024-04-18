// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxyAvatar } from '@subwallet/extension-koni-ui/components';
import ChainItem from '@subwallet/extension-koni-ui/components/MetaInfo/parts/ChainItem';
import { ChainInfo } from '@subwallet/extension-koni-ui/types/chain';
import { toShort } from '@subwallet/extension-koni-ui/utils';
import { Logo } from '@subwallet/react-ui';
import CN from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import AccountItem from './AccountItem';
import { InfoItemBase } from './types';

export interface TransferInfoItem extends Omit<InfoItemBase, 'label'> {
  senderAddress: string;
  senderName?: string;
  senderLabel?: string;
  senderProxyId?: string;
  recipientAddress: string;
  recipientName?: string;
  recipientProxyId?: string;
  recipientLabel?: string;
  originChain?: ChainInfo;
  destinationChain?: ChainInfo;
}

const Component: React.FC<TransferInfoItem> = (props: TransferInfoItem) => {
  const { className,
    destinationChain,
    originChain,
    recipientAddress,
    recipientLabel,
    recipientName,
    recipientProxyId,
    senderAddress, senderLabel, senderName, senderProxyId,
    valueColorSchema = 'default' } = props;

  const { t } = useTranslation();

  const genAccountBlock = (address: string, proxyId?: string, name?: string) => {
    return (
      <div className={`__account-item __value -is-wrapper -schema-${valueColorSchema}`}>
        <AccountProxyAvatar
          className={'__account-avatar'}
          size={24}
          value={proxyId}
        />
        <div className={'__account-name ml-xs'}>
          {name || toShort(address)}
        </div>
      </div>
    );
  };

  const genChainBlock = (chain: ChainInfo) => {
    return (
      <div className={`__chain-item __value -is-wrapper -schema-${valueColorSchema}`}>
        <Logo
          className={'__chain-logo'}
          network={chain.slug}
          size={24}
        />

        <div className={'__chain-name ml-xs'}>
          {chain.name}
        </div>
      </div>
    );
  };

  if (!recipientAddress) {
    return (
      <>
        <AccountItem
          address={senderAddress}
          label={senderLabel || t('Sender')}
          name={senderName}
        />

        {!!originChain && !!destinationChain && originChain.slug === destinationChain.slug
          ? (
            <ChainItem
              chain={originChain.slug}
              label={t('Networks')}
            />
          )
          : (
            <>
              {!!originChain && (
                <ChainItem
                  chain={originChain.slug}
                  label={t('Origin Chain')}
                />
              )}

              {!!destinationChain && (
                <ChainItem
                  chain={destinationChain.slug}
                  label={t('Destination Chain')}
                />
              )}
            </>
          )}
      </>
    );
  }

  return (
    <div className={CN(className, '__row -type-transfer')}>
      <div className={'__col'}>
        <div className={'__label'}>{senderLabel || t('Sender')}</div>

        {genAccountBlock(senderAddress, senderProxyId, senderName)}
        {!!originChain && genChainBlock(originChain)}
      </div>
      <div className={'__col'}>
        <div className={'__label'}>{recipientLabel || t('Recipient')}</div>

        {genAccountBlock(recipientAddress, recipientProxyId, recipientName)}
        {!!destinationChain && genChainBlock(destinationChain)}
      </div>
    </div>
  );
};

const TransferItem = styled(Component)<TransferInfoItem>(({ theme: { token } }: TransferInfoItem) => {
  return {};
});

export default TransferItem;
