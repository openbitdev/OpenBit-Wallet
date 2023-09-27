// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SubmitYieldStepData } from '@subwallet/extension-base/background/KoniTypes';
import { _getAssetDecimals, _getAssetSymbol } from '@subwallet/extension-base/services/chain-service/utils';
import CommonTransactionInfo from '@subwallet/extension-koni-ui/components/Confirmation/CommonTransactionInfo';
import MetaInfo from '@subwallet/extension-koni-ui/components/MetaInfo/MetaInfo';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import CN from 'classnames';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { BaseTransactionConfirmationProps } from './Base';

type Props = BaseTransactionConfirmationProps;

const Component: React.FC<Props> = (props: Props) => {
  const { className, transaction } = props;
  const txParams = transaction.data as SubmitYieldStepData;
  const tokenInfoMap = useSelector((state: RootState) => state.assetRegistry.assetRegistry);

  const { t } = useTranslation();

  const { inputTokenDecimals, inputTokenSymbol } = useMemo(() => {
    const rewardTokenInfo = tokenInfoMap[txParams.rewardTokenSlug];

    return {
      inputTokenSymbol: _getAssetSymbol(rewardTokenInfo),
      inputTokenDecimals: _getAssetDecimals(rewardTokenInfo)
    };
  }, [tokenInfoMap, txParams.rewardTokenSlug]);

  const { rewardTokenDecimals, rewardTokenSymbol } = useMemo(() => {
    const rewardTokenInfo = tokenInfoMap[txParams.rewardTokenSlug];

    return {
      rewardTokenSymbol: _getAssetSymbol(rewardTokenInfo),
      rewardTokenDecimals: _getAssetDecimals(rewardTokenInfo)
    };
  }, [txParams.rewardTokenSlug, tokenInfoMap]);

  const { feeTokenDecimals, feeTokenSymbol } = useMemo(() => {
    const feeTokenInfo = tokenInfoMap[txParams.feeTokenSlug];

    return {
      feeTokenSymbol: _getAssetSymbol(feeTokenInfo),
      feeTokenDecimals: _getAssetDecimals(feeTokenInfo)
    };
  }, [txParams.feeTokenSlug, tokenInfoMap]);

  const estimatedReceivables = useMemo(() => {
    return Math.floor(parseInt(txParams.amount) * txParams.exchangeRate);
  }, [txParams.amount, txParams.exchangeRate]);

  return (
    <div className={CN(className)}>
      <CommonTransactionInfo
        address={transaction.address}
        network={transaction.chain}
      />
      <MetaInfo
        className={'meta-info'}
        hasBackgroundWrapper
      >
        <MetaInfo.Number
          decimals={inputTokenDecimals}
          label={t('Amount')}
          suffix={inputTokenSymbol}
          value={txParams.amount}
        />

        <MetaInfo.Number
          decimals={rewardTokenDecimals}
          label={t('Estimated receivables')}
          suffix={rewardTokenSymbol}
          value={estimatedReceivables.toString()}
        />

        <MetaInfo.Number
          decimals={feeTokenDecimals}
          label={t('Estimated fee')}
          suffix={feeTokenSymbol}
          value={transaction.estimateFee?.value || 0}
        />
      </MetaInfo>
    </div>
  );
};

const JoinYieldPoolConfirmation = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {};
});

export default JoinYieldPoolConfirmation;