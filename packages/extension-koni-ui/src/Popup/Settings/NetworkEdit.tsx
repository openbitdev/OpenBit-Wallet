// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import {
  ActionContext,
  Button,
  ButtonArea,
  Dropdown,
  InputWithLabel,
  MenuItem
} from '@polkadot/extension-koni-ui/components';
import RadioStatus from '@polkadot/extension-koni-ui/components/RadioStatus';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import Header from '@polkadot/extension-koni-ui/partials/Header';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import Toggle from "@polkadot/extension-koni-ui/components/Toggle";

interface Props extends ThemeProps {
  className?: string;
}

const iconTypes = [
  {
    text: 'Polkadot',
    value: 'polkadot'
  },
  {
    text: 'Substate',
    value: 'substate'
  }
];

const networkGroups = [
  {
    text: 'Relay Chain',
    value: 'RELAY_CHAIN'
  },
  {
    text: 'Polkadot Parachain',
    value: 'POLKADOT_PARACHAIN'
  },
  {
    text: 'Kusama Parachain',
    value: 'KUSAMA_PARACHAIN'
  },
  {
    text: 'Mainnet',
    value: 'MAIN_NET'
  }
];

const rpcUrl = [
  {
    text: 'via Parity',
    value: '1'
  },
  {
    text: 'via OnFinality',
    value: '2'
  },
  {
    text: 'via Dwellir',
    value: '3'
  },
  {
    text: 'light client',
    value: '4'
  },
]

function NetworkEdit ({ className }: Props): React.ReactElement {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [selectedIconType, setSelectedIconType] = useState<string>('');
  const [selectedRpc, setSelectedRpc] = useState<string>('');
  const [selectedNetworkGr, setSelectedNetworkGr] = useState<string>('RELAY_CHAIN');
  const [isEtherium, setIsEtherium] = useState<boolean>(false);
  const [isTestnet, setIsTestnet] = useState<boolean>(false);
  const _goBack = useCallback(
    () => {
      window.localStorage.setItem('popupNavigation', '/account/networks');
      onAction('/account/networks');
    },
    [onAction]
  );

  const onSelectIconType = useCallback((value: string) => {
      setSelectedIconType(value);
  }, []);

  const onSelectRpc = useCallback((value: string) => {
    return () => setSelectedRpc(value);
  }, []);

  const onSelectNetworkGr = useCallback((value: string) => {
    setSelectedNetworkGr(value);
  }, []);

  const _onEditNetwork = useCallback(() => {
    _goBack();
  }, [_goBack]);

  const onChangeIsEtherium = useCallback((isEtherium: boolean) => {
    return () => setIsEtherium(isEtherium)
  }, []);

  const onChangeIsTestnet = useCallback((isTestnet: boolean) => {
    return () => setIsTestnet(isTestnet)
  }, []);

  const networkInfo = {
    key: 'acala',
    chain: 'Acala',
    genesisHash: '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
    ss58Format: 10,
    provider: 'wss://acala-polkadot.api.onfinality.io/public-ws',
    groups: ['POLKADOT_PARACHAIN'],
    paraId: 2000,
    nativeToken: 'ACA',
    crowdloanUrl: 'https://distribution.acala.network/'
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
          value={networkInfo.ss58Format}
        />

        <MenuItem
          className='network-edit-menu-item'
          title={t<string>('Is Etherium')}
        >
          <Toggle
            label={''}
            onChange={onChangeIsEtherium(!isEtherium)}
            value={isEtherium}

          />
        </MenuItem>

        <MenuItem
          className='network-edit-menu-item'
          title={t<string>('Icon type')}
        >
          <Dropdown
            options={iconTypes}
            onChange={onSelectIconType}
            value={selectedIconType}
          />
        </MenuItem>

        <MenuItem
          className='network-edit-menu-item'
          title={t<string>('Network group')}
        >
          <Dropdown
            options={networkGroups}
            onChange={onSelectNetworkGr}
            value={selectedNetworkGr}
          />
        </MenuItem>

        {selectedNetworkGr === 'RELAY_CHAIN' &&
          <MenuItem
            className='network-edit-menu-item'
            title={t<string>('Is Testnet')}
          >
            <Toggle
              label={''}
              onChange={onChangeIsTestnet(!isTestnet)}
              value={isTestnet}

            />
          </MenuItem>
        }

        {(selectedNetworkGr === 'POLKADOT_PARACHAIN' || selectedNetworkGr === 'KUSAMA_PARACHAIN') &&
          <InputWithLabel
            label={t<string>('Para Id')}
            value={networkInfo.paraId || ''}
          />
        }

        <InputWithLabel
          label={t<string>('Native Token')}
          value={networkInfo.nativeToken}
        />

        {(selectedNetworkGr === 'POLKADOT_PARACHAIN' || selectedNetworkGr === 'KUSAMA_PARACHAIN') &&
          <InputWithLabel
            label={t<string>('Crowdloan page URL')}
            value={networkInfo.crowdloanUrl || ''}
          />
        }

        <InputWithLabel
          label={t<string>('Decimals')}
          value={10}
        />

        <MenuItem
          className='network-edit-menu-item'
          title={t<string>('Providers')}
        >
          {rpcUrl.map((item) =>
            <RadioStatus
              label={item.text}
              onChange={onSelectRpc(item.text)}
              checked={item.text === selectedRpc}
            />
          )}

          {selectedRpc === 'light client' &&
            <InputWithLabel
              className='custom-rpc-input'
              label={''}
              value={''}
            />
          }
        </MenuItem>

        <InputWithLabel
          label={t<string>('Scan Explorer Endpoint')}
          value={''}
        />

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

  .network-edit-menu-item {
    padding: 0;
  }

  .custom-rpc-input {
    margin-top: 0;
  }

`);
