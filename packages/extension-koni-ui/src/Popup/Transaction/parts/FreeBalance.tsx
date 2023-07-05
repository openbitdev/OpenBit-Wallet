// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AmountData } from '@subwallet/extension-base/background/KoniTypes';
import { AlertBox, NetworkWarningState } from '@subwallet/extension-koni-ui/components';
import { ReConnectNetworkButton } from '@subwallet/extension-koni-ui/components/Network/NetworkWarningState';
import { useGetBalance } from '@subwallet/extension-koni-ui/hooks';
import { GetBalanceErrorType } from '@subwallet/extension-koni-ui/hooks/balance/useGetBalance';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ActivityIndicator, Number, Typography } from '@subwallet/react-ui';
import CN from 'classnames';
import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';

type Props = ThemeProps & {
  address?: string,
  tokenSlug?: string;
  label?: string;
  chain?: string;
  onBalanceReady?: (rs: boolean) => void;
}

type BalanceProps = {
  isLoading?: boolean;
  tokenSlug?: string;
  label?: string;
  nativeTokenSlug?: string;
  nativeTokenBalance: AmountData;
  tokenBalance?: AmountData;
}

type ErrorProps = {
  errorType?: GetBalanceErrorType;
  chain?: string;
  chainName?: string;
}

function BalanceComponent ({ isLoading, label, nativeTokenBalance, nativeTokenSlug, tokenBalance, tokenSlug }: BalanceProps) {
  const { t } = useTranslation();
  const { token } = useTheme() as Theme;

  return (<Typography.Paragraph className={'balance-info'}>
    <span className='__label'>{label || t('Sender available balance:')}</span>
    {isLoading && <LoadingComponent />}
    {!isLoading && <Number
      decimal={nativeTokenBalance.decimals || 18}
      decimalColor={token.colorTextTertiary}
      intColor={token.colorTextTertiary}
      size={14}
      suffix={nativeTokenBalance.symbol}
      unitColor={token.colorTextTertiary}
      value={nativeTokenBalance.value}
    />}
    {
      !isLoading && !!tokenSlug && nativeTokenSlug !== tokenSlug && tokenBalance &&
      <>
        <span className={'__name'}>&nbsp;{t('and')}&nbsp;</span>
        <Number
          decimal={tokenBalance?.decimals || 18}
          decimalColor={token.colorTextTertiary}
          intColor={token.colorTextTertiary}
          size={14}
          suffix={tokenBalance?.symbol}
          unitColor={token.colorTextTertiary}
          value={tokenBalance.value}
        />
      </>
    }
  </Typography.Paragraph>);
}

function LoadingComponent () {
  return (<ActivityIndicator size={14} />);
}

function ErrorComponent ({ chain, chainName, errorType }: ErrorProps) {
  const { t } = useTranslation();

  if (errorType === GetBalanceErrorType.NETWORK_ERROR && chain) {
    return <NetworkWarningState chain={chain} />;
  }

  return <div className={'general-error'}>
    <AlertBox
      className='alert-box'
      description={t('Can\'t not get balance')}
      title={t('Balance warning')}
      type={'warning'}
    />
    {chain && chainName && <ReConnectNetworkButton
      chain={chain}
      chainName={chainName}
    />}
  </div>;
}

const Component = ({ address, chain, className, label, onBalanceReady, tokenSlug }: Props) => {
  const { chainInfo, error, isLoading, nativeTokenBalance, nativeTokenSlug, tokenBalance } = useGetBalance(chain, address, tokenSlug);

  console.log(error);

  useEffect(() => {
    onBalanceReady?.(!isLoading && !error);
  }, [error, isLoading, onBalanceReady]);

  if (!address && !chain) {
    return <></>;
  }

  return (
    <div className={CN(className, 'free-balance')}>
      {error && <ErrorComponent
        chain={chain}
        chainName={chainInfo?.name}
        errorType={error}
      />}
      {!error && <BalanceComponent
        isLoading={isLoading}
        label={label}
        nativeTokenBalance={nativeTokenBalance}
        nativeTokenSlug={nativeTokenSlug}
        tokenBalance={tokenBalance}
        tokenSlug={tokenSlug}
      />}
    </div>
  );
};

const FreeBalance = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    color: token.colorTextTertiary,

    '.general-error': {
      width: '100%',

      '.ant-btn': {
        width: '100%'
      }
    },

    '.__label': {
      marginRight: 3
    },

    '.balance-info > *': {
      display: 'inline-block'
    },

    '&.ant-typography': {
      marginBottom: 0
    }
  };
});

export default FreeBalance;
