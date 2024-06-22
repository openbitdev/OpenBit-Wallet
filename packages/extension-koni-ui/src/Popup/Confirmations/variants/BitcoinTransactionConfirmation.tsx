// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinSendTransactionRequest, ConfirmationsQueueItem } from '@subwallet/extension-base/background/KoniTypes';
import { SWTransactionResult } from '@subwallet/extension-base/services/transaction-service/types';
import { TransactionFee } from '@subwallet/extension-base/types';
import { AlertBox, ConfirmationGeneralInfo, MetaInfo, ViewDetailIcon } from '@subwallet/extension-koni-ui/components';
import { useGetAccountByAddress, useOpenDetailModal } from '@subwallet/extension-koni-ui/hooks';
import { BitcoinSignArea } from '@subwallet/extension-koni-ui/Popup/Confirmations/parts';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { BitcoinSignatureSupportType, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button } from '@subwallet/react-ui';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { BaseDetailModal } from '../parts';

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
  const { id, payload: { account, to } } = request;
  const { t } = useTranslation();

  const { transactionRequest } = useSelector((state: RootState) => state.requestState);

  // request.payload.fee
  const transaction = useMemo(() => transactionRequest[id], [transactionRequest, id]);
  const [transactionInfo, setTransactionInfo] = useState<SWTransactionResult>(transaction);
  const [transactionFeeInfo, setTransactionFeeInfo] = useState<TransactionFee | undefined>({
    feeOption: request.payload.fee?.options.default
  });

  const chainInfoMap = useSelector((root: RootState) => root.chainStore.chainInfoMap);

  const chainInfo = useMemo(
    () => chainInfoMap[transaction.chain],
    [chainInfoMap, transaction.chain]
  );

  const recipientAddress = to;
  const recipient = useGetAccountByAddress(recipientAddress);
  const onClickDetail = useOpenDetailModal();

  // console.log(transactionRequest);
  const amount = useMemo((): number => {
    return new BigN(convertToBigN(request.payload.value) || 0).toNumber();
  }, [request.payload.value]);

  useEffect(() => {
    setTransactionInfo((prevState) => ({ ...prevState, ...transactionFeeInfo }));
  }, [transactionFeeInfo]);

  return (
    <>
      <div className={CN('confirmation-content', className)}>
        <ConfirmationGeneralInfo request={request} />
        <div className='title'>
          {t('Transaction request')}
        </div>
        <MetaInfo>
          <MetaInfo.Account
            address={account.address}
            label={t('From account')}
            name={account.name}
          />
          <MetaInfo.Account
            address={recipient?.address || recipientAddress || ''}
            className='to-account'
            label={t('To account')}
            name={recipient?.name}
          />
        </MetaInfo>
        {!!transaction.estimateFee?.tooHigh && (
          <AlertBox
            className='network-box'
            description={t('Gas fees on {{networkName}} are high due to high demands, so gas estimates are less accurate.', { replace: { networkName: chainInfo?.name } })}
            title={t('Pay attention!')}
            type='warning'
          />
        )}
        <div>
          <Button
            icon={<ViewDetailIcon />}
            onClick={onClickDetail}
            size='xs'
            type='ghost'
          >
            {t('View details')}
          </Button>
        </div>
      </div>
      <BitcoinSignArea
        editedPayload={transactionInfo}
        id={id}
        payload={request}
        type={type}
      />
      <BaseDetailModal
        title={t('Transaction details')}
      >
        {/* <EvmTransactionDetail */}
        {/*  account={account} */}
        {/*  request={request.payload} */}
        {/* /> */}
      </BaseDetailModal>
    </>
  );
}

const BitcoinTransactionConfirmation = styled(Component)<Props>(({ theme: { token } }: ThemeProps) => ({
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

export default BitcoinTransactionConfirmation;
