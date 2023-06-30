// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainConnectionStatus } from '@subwallet/extension-base/services/chain-service/types';
import { AlertBox } from '@subwallet/extension-koni-ui/components';
import useChainInfo from '@subwallet/extension-koni-ui/hooks/chain/useChainInfo';
import useChainState from '@subwallet/extension-koni-ui/hooks/chain/useChainState';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { enableChain, reconnectChain } from '@subwallet/extension-koni-ui/messaging';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button, Icon } from '@subwallet/react-ui';
import { ButtonProps } from '@subwallet/react-ui/es/button/button';
import CN from 'classnames';
import { ArrowClockwise, Plus } from 'phosphor-react';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

interface Props extends ThemeProps {
  chain: string;
}

type NetworkButtonProps = ButtonProps & {
  chain: string;
  chainName: string;
}

export function EnableNetworkButton (props: NetworkButtonProps) {
  const { t } = useTranslation();
  const { chain, chainName , ...btnProps} = props;
  const [loading, setLoading] = useState(false);
  const enableNetwork = useCallback(() => {
    setLoading(true);
    enableChain(chain).finally(() => {
      setLoading(false);
    });
  }, [chain]);

  return <Button
    className={'action-button'}
    size={'xs'}
    icon={<Icon phosphorIcon={Plus} />}
    loading={loading}
    onClick={enableNetwork}
    type={'ghost'}
    {...btnProps}
  >
    {t('Enable "{{network}}"', { replace: { network: chainName } })}
  </Button>;
}

export function ReConnectNetworkButton (props: NetworkButtonProps) {
  const { t } = useTranslation();
  const { chain, chainName, ...btnProps } = props;
  const [loading, setLoading] = useState(false);
  const enableNetwork = useCallback(() => {
    setLoading(true);
    reconnectChain(chain).finally(() => {
      setLoading(false);
    });
  }, [chain]);

  return <Button
    className={'action-button'}
    size={'xs'}
    icon={<Icon phosphorIcon={ArrowClockwise} />}
    loading={loading}
    onClick={enableNetwork}
    type={'ghost'}
    {...btnProps}
  >
    {t('Reconnect "{{network}}"', { replace: { network: chainName } })}
  </Button>;
}

interface AlertInfo {
  title: string;
  description: string;
  type: 'info' | 'warning';
  button?: React.ReactNode;
}

function Component ({ chain, className }: Props) {
  const { t } = useTranslation();
  const chainInfo = useChainInfo(chain);
  const chainState = useChainState(chain);
  const chainName = chainInfo?.name || '';

  const alertInfo = useMemo<AlertInfo | null>(() => {
    if (!chainInfo || !chainState) {
      return null;
    }

    if (!chainState.active) {
      return {
        title: t('Inactive network'),
        description: t('"{{networkName}}" has not been enabled', { replace: { networkName: chainName } }),
        type: 'warning',
        button: <EnableNetworkButton
          chain={chainState.slug}
          chainName={chainName}
        />
      };
    } else if (chainState.connectionStatus === _ChainConnectionStatus.UNSTABLE) {
      return {
        title: t('Unstable network'),
        description: t('"{{networkName}}" is unstable', { replace: { networkName: chainName } }),
        type: 'warning',
        button: <ReConnectNetworkButton
          chain={chainState.slug}
          chainName={chainName}
        />
      };
    } else if (chainState.connectionStatus === _ChainConnectionStatus.DISCONNECTED) {
      return {
        title: t('Disconnected network'),
        description: t('"{{networkName}}" is disconnected', { replace: { networkName: chainName } }),
        type: 'warning',
        button: <ReConnectNetworkButton
          chain={chainState.slug}
          chainName={chainName}
        />
      };
    } else if (chainState.connectionStatus === _ChainConnectionStatus.CONNECTING) {
      return {
        title: t('Connecting network'),
        description: t('"{{networkName}}" is connecting...', { replace: { networkName: chainName } }),
        type: 'info',
        button: <></>
      };
    } else {
      return null;
    }
  }, [chainInfo, chainName, chainState, t]);

  return <div className={CN(className, 'network-warning-state')}>
    {alertInfo && <AlertBox
      className='alert-box'
      description={alertInfo.description}
      title={alertInfo.title}
      type={alertInfo.type}
    />}
    {alertInfo && alertInfo.button}
  </div>;
}

const NetworkWarningState = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    width: '100%',

    '.alert-box, .action-button': {
      width: '100%',
      marginBottom: token.marginSM
    },

    '.action-button .ant-btn-content-wrapper': {
      maxWidth: 300,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };
});

export default NetworkWarningState;
