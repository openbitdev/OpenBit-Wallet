// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { BitcoinSendTransactionRequest, ConfirmationsQueueItem } from '@subwallet/extension-base/background/KoniTypes';
import { BitcoinFeeDetail, RequestSubmitTransferWithId, ResponseSubscribeTransfer, TransactionFee } from '@subwallet/extension-base/types';
import { BN_ZERO, getDomainFromUrl } from '@subwallet/extension-base/utils';
import { BitcoinFeeSelector, MetaInfo } from '@subwallet/extension-koni-ui/components';
import { RenderFieldNodeParams } from '@subwallet/extension-koni-ui/components/Field/TransactionFee/BitcoinFeeSelector';
import { useGetAccountByAddress } from '@subwallet/extension-koni-ui/hooks';
import { cancelSubscription, subscribeMaxTransfer } from '@subwallet/extension-koni-ui/messaging';
import { BitcoinSignArea } from '@subwallet/extension-koni-ui/Popup/Confirmations/parts';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { BitcoinSignatureSupportType, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ActivityIndicator, Button, Icon, Number } from '@subwallet/react-ui';
import BigN from 'bignumber.js';
import CN from 'classnames';
import { PencilSimpleLine } from 'phosphor-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface Props extends ThemeProps {
  type: BitcoinSignatureSupportType
  request: ConfirmationsQueueItem<BitcoinSendTransactionRequest>
}

const convertToBigN = (num: BitcoinSendTransactionRequest['value']): string | number | undefined => {
  if (typeof num === 'object') {
    return num.toNumber();
  } else {
    return num;
  }
};

function Component ({ className, request, type }: Props) {
  const { id, payload: { account, fee, inputs, networkKey, outputs, to, tokenSlug, value } } = request;
  const { t } = useTranslation();

  const [transactionInfo, setTransactionInfo] = useState<RequestSubmitTransferWithId>({
    id,
    chain: networkKey as string,
    from: account.address,
    to: to as string,
    tokenSlug: tokenSlug as string,
    transferAll: false,
    value: value?.toString() || '0'
  });
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [isTransferAll, setIsTransferAll] = useState(false);
  const [transferInfo, setTransferInfo] = useState<ResponseSubscribeTransfer | undefined>();
  const [transactionFeeInfo, setTransactionFeeInfo] = useState<TransactionFee | undefined>({
    feeOption: fee?.options.default
  });

  const chainInfoMap = useSelector((root: RootState) => root.chainStore.chainInfoMap);
  const assetRegistry = useSelector((root: RootState) => root.assetRegistry.assetRegistry);

  const transferAmountValue = value?.toString() as string;
  const fromValue = account.address;
  const toValue = to as string;
  const chainValue = networkKey as string;
  const assetValue = tokenSlug as string;

  console.log(request);

  const chainInfo = useMemo(
    () => chainInfoMap[networkKey as string],
    [chainInfoMap, networkKey]
  );

  const assetInfo: _ChainAsset | undefined = useMemo(() => {
    return assetRegistry[assetValue];
  }, [assetRegistry, assetValue]);

  console.log(assetInfo);
  const recipient = useGetAccountByAddress(toValue);

  // console.log(transactionRequest);
  const amount = useMemo((): number => {
    return new BigN(convertToBigN(request.payload.value) || 0).toNumber();
  }, [request.payload.value]);

  const renderFeeSelectorNode = useCallback((params: RenderFieldNodeParams) => {
    return (
      <MetaInfo.Default
        className='__fee-editor'
        label={t('Estimated fee')}
      >
        {params.isLoading
          ? (
            <div className={'__fee-editor-loading-wrapper'}>
              <ActivityIndicator size={20} />
            </div>
          )
          : (
            <div className={'__fee-editor-value-wrapper'}>
              <Number
                className={'__fee-editor-value'}
                decimal={params.feeInfo.decimals}
                size={14}
                suffix={params.feeInfo.symbol}
                value={params.feeInfo.value}
              />
              <Button
                disabled={params.disableEdit}
                icon={
                  <Icon
                    phosphorIcon={PencilSimpleLine}
                    size='sm'
                  />
                }
                onClick={params.onClickEdit}
                size='xs'
                type='ghost'
              />
            </div>
          )}
      </MetaInfo.Default>
    );
  }, [t]);

  useEffect(() => {
    setTransactionInfo((prevState) => ({ ...prevState, ...transactionFeeInfo }));
  }, [transactionFeeInfo]);

  useEffect(() => {
    const bnTransferAmount = new BigN(transferAmountValue || '0');
    const bnMaxTransfer = new BigN(transferInfo?.maxTransferable || '0');

    if (bnTransferAmount.gt(BN_ZERO) && bnTransferAmount.eq(bnMaxTransfer)) {
      setIsTransferAll(true);
    }
  }, [transferInfo, transferAmountValue]);

  useEffect(() => {
    let cancel = false;
    let id = '';
    let timeout: NodeJS.Timeout;

    setIsFetchingInfo(true);

    const callback = (transferInfo: ResponseSubscribeTransfer) => {
      if (!cancel) {
        setTransferInfo(transferInfo);
        id = transferInfo.id;
      } else {
        cancelSubscription(transferInfo.id).catch(console.error);
      }
    };

    if (fromValue && assetValue) {
      timeout = setTimeout(() => {
        subscribeMaxTransfer({
          address: fromValue,
          chain: chainValue,
          token: assetValue,
          isXcmTransfer: false,
          destChain: chainValue,
          feeOption: transactionFeeInfo?.feeOption,
          feeCustom: transactionFeeInfo?.feeCustom,
          value: transferAmountValue || '0',
          transferAll: isTransferAll,
          to: toValue
        }, callback)
          .then(callback)
          .catch((e) => {
            console.error(e);

            setTransferInfo(undefined);
          })
          .finally(() => {
            setIsFetchingInfo(false);
          });
      }, 100);
    }

    return () => {
      cancel = true;
      clearTimeout(timeout);
      id && cancelSubscription(id).catch(console.error);
    };
  }, [assetRegistry, assetValue, chainValue, fromValue, toValue, transactionFeeInfo, transferAmountValue, isTransferAll]);

  return (
    <>
      <div className={CN('confirmation-content', className)}>
        <div className={'__origin-url'}>{getDomainFromUrl(request.url)}</div>

        <MetaInfo hasBackgroundWrapper>
          <MetaInfo.Account
            address={account.address}
            label={t('From account')}
            name={account.name}
          />
          <MetaInfo.Account
            address={recipient?.address || toValue || ''}
            className='to-account'
            label={t('To account')}
            name={recipient?.name}
          />

          <MetaInfo.Chain
            chain={chainValue}
            label={t('Network')}
          />
        </MetaInfo>

        <MetaInfo hasBackgroundWrapper>
          <MetaInfo.Number
            decimals={assetInfo?.decimals || 0}
            label={t('Amount')}
            suffix={assetInfo?.symbol || ''}
            value={amount}
          />

          <BitcoinFeeSelector
            className={'__bitcoin-fee-selector'}
            feeDetail={transferInfo?.feeOptions as BitcoinFeeDetail | undefined}
            isLoading={isFetchingInfo}
            onSelect={setTransactionFeeInfo}
            renderFieldNode={renderFeeSelectorNode}
            tokenSlug={assetValue}
          />
        </MetaInfo>

        {/* {!!transaction.estimateFee?.tooHigh && ( */}
        {/*  <AlertBox */}
        {/*    className='network-box' */}
        {/*    description={t('Gas fees on {{networkName}} are high due to high demands, so gas estimates are less accurate.', { replace: { networkName: chainInfo?.name } })} */}
        {/*    title={t('Pay attention!')} */}
        {/*    type='warning' */}
        {/*  /> */}
        {/* )} */}
      </div>
      <BitcoinSignArea
        canSign={!isFetchingInfo}
        editedPayload={transactionInfo}
        id={id}
        payload={request}
        type={type}
      />
    </>
  );
}

const BitcoinSendTransactionRequestConfirmation = styled(Component)<Props>(({ theme: { token } }: ThemeProps) => ({
  '&.confirmation-content.confirmation-content': {
    display: 'block'
  },

  '.__origin-url': {
    marginBottom: token.margin
  },

  '.__fee-editor-loading-wrapper': {
    minWidth: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  '.__fee-editor.__fee-editor.__fee-editor': {
    marginTop: 4,
    marginRight: -10
  },

  '.__fee-editor-value-wrapper': {
    display: 'flex',
    alignItems: 'center'
  },

  '.account-list': {
    '.__prop-label': {
      marginRight: token.marginMD,
      width: '50%',
      float: 'left'
    }
  },

  '.network-box': {
    marginTop: token.margin
  },

  '.to-account': {
    marginTop: token.margin - 2
  },

  '.__label': {
    textAlign: 'left'
  }
}));

export default BitcoinSendTransactionRequestConfirmation;
