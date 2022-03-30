// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { ActionContext, Button, ButtonArea, InputWithLabel, MenuItem } from '@polkadot/extension-koni-ui/components';
import RadioStatus from '@polkadot/extension-koni-ui/components/RadioStatus';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import Header from '@polkadot/extension-koni-ui/partials/Header';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';

interface Props extends ThemeProps {
  className?: string;
}

const iconTypes = [
  {
    key: 'substate',
    name: 'Substate'
  },
  {
    key: 'polkadot',
    name: 'Polkadot'
  }
];

function NetworkEdit ({ className }: Props): React.ReactElement {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [selectedIconType, setSelectedIconType] = useState<string>('');
  const _goBack = useCallback(
    () => {
      window.localStorage.setItem('popupNavigation', '/account/networks');
      onAction('/account/networks');
    },
    [onAction]
  );

  const onSelectIconType = useCallback(() => {
    // setSelectedIconType();
  }, []);

  const _onEditNetwork = useCallback(() => {
    _goBack();
  }, [_goBack]);

  const networkInfo = {
    key: 'polkadot',
    chain: 'Polkadot Relay Chain',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    icon: 'polkadot',
    ss58Format: 0,
    provider: 'wss://polkadot.api.onfinality.io/public-ws',
    groups: ['RELAY_CHAIN'],
    nativeToken: 'DOT',
    decimals: 10,
    rpcUrl: 'http://rpc.moonriver.moonbeam.network',
    chainId: '1285',
    blockExplorerUrl: 'http://blockscout.moonriver.moonbeam.network'
  };

  return (
    <>
      <Header
        showBackArrow
        showSubHeader
        subHeaderName={t<string>('Network Edit')}
      />

      <div className={className}>
        <InputWithLabel
          label={t<string>('Network key')}
          value={networkInfo.key}
        />

        <InputWithLabel
          label={t<string>('Display Name')}
          value={networkInfo.chain}
        />

        <InputWithLabel
          label={t<string>('Genesis Hash')}
          value={networkInfo.genesisHash}
        />

        <InputWithLabel
          label={t<string>('Network prefix')}
          value={String(networkInfo.ss58Format)}
        />

        <InputWithLabel
          label={t<string>('Network prefix')}
          value={String(networkInfo.ss58Format)}
        />

        <MenuItem
          title={t<string>('Icon type')}
        >
          {iconTypes.map((iconType) =>
            <RadioStatus
              checked={selectedIconType === iconType.key}
              key={iconType.key}
              label={iconType.name}
              onChange={onSelectIconType}
            />
          )}
        </MenuItem>

        <ButtonArea>
          <Button
            className='network-edit-button'
            onClick={_goBack}
          >
            <span>{t<string>('Cancel')}</span>
          </Button>
          <Button
            className='network-edit-button'
            onClick={_onEditNetwork}
          >
            {t<string>('Save')}
          </Button>
        </ButtonArea>
      </div>
    </>
  );
}

export default styled(NetworkEdit)(({ theme }: Props) => `
  padding: 0 15px 15px;
  flex: 1;
  overflow-y: auto;

  .network-edit__action-area {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 7px;
  }

  .network-edit-button {
    flex: 1;
  }

  .network-edit-button:first-child {
    margin-right: 8px;
    background-color: ${theme.buttonBackground1};

    span {
      color: ${theme.buttonTextColor2};
    }
  }

  .network-edit-button:last-child {
    margin-left: 8px;
  }


`);
