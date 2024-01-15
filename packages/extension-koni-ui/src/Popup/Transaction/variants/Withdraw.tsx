// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtrinsicType } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { _STAKING_CHAIN_GROUP } from '@subwallet/extension-base/services/earning-service/constants';
import { getAstarWithdrawable } from '@subwallet/extension-base/services/earning-service/handlers/native-staking/astar';
import { RequestYieldWithdrawal, UnstakingInfo, UnstakingStatus, YieldPoolType } from '@subwallet/extension-base/types';
import { isSameAddress } from '@subwallet/extension-base/utils';
import { AccountSelector, HiddenInput, MetaInfo, PageWrapper } from '@subwallet/extension-koni-ui/components';
import { DataContext } from '@subwallet/extension-koni-ui/contexts/DataContext';
import { useGetChainAssetInfo, useHandleSubmitTransaction, useInitValidateTransaction, usePreCheckAction, useRestoreTransaction, useSelector, useSetCurrentPage, useTransactionContext, useWatchTransaction } from '@subwallet/extension-koni-ui/hooks';
import { useYieldPositionDetail } from '@subwallet/extension-koni-ui/hooks/earning';
import { yieldSubmitStakingWithdrawal } from '@subwallet/extension-koni-ui/messaging';
import { accountFilterFunc } from '@subwallet/extension-koni-ui/Popup/Transaction/helper';
import { FormCallbacks, FormFieldData, ThemeProps, WithdrawParams } from '@subwallet/extension-koni-ui/types';
import { convertFieldToObject, isAccountAll, simpleCheckForm } from '@subwallet/extension-koni-ui/utils';
import { Button, Form, Icon } from '@subwallet/react-ui';
import { ArrowCircleRight, XCircle } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FreeBalance, TransactionContent, TransactionFooter } from '../parts';

type Props = ThemeProps;

const hideFields: Array<keyof WithdrawParams> = ['chain', 'asset', 'slug'];
const validateFields: Array<keyof WithdrawParams> = ['from'];

const Component: React.FC<Props> = (props: Props) => {
  useSetCurrentPage('/transaction/withdraw');
  const { className = '' } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const dataContext = useContext(DataContext);
  const { defaultData, onDone, persistData } = useTransactionContext<WithdrawParams>();
  const { slug } = defaultData;

  const [form] = Form.useForm<WithdrawParams>();
  const formDefault = useMemo((): WithdrawParams => ({ ...defaultData }), [defaultData]);

  const { accounts, isAllAccount } = useSelector((state) => state.accountState);
  const { chainInfoMap } = useSelector((state) => state.chainStore);
  const { poolInfoMap } = useSelector((state) => state.earning);

  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isBalanceReady, setIsBalanceReady] = useState(true);

  const chainValue = useWatchTransaction('chain', form, defaultData);
  const fromValue = useWatchTransaction('from', form, defaultData);

  const { list: allPositionInfos } = useYieldPositionDetail(slug);
  const { list: yieldPositions } = useYieldPositionDetail(slug, fromValue);
  const yieldPosition = yieldPositions[0];
  const type = yieldPosition.type;

  const poolInfo = useMemo(() => poolInfoMap[slug], [poolInfoMap, slug]);
  const stakingChain = useMemo(() => poolInfo?.chain || '', [poolInfo?.chain]);

  const inputAsset = useGetChainAssetInfo(poolInfo.metadata.inputAsset);
  const decimals = inputAsset?.decimals || 0;
  const symbol = inputAsset?.symbol || '';

  const unstakingInfo = useMemo((): UnstakingInfo | undefined => {
    if (fromValue && !isAccountAll(fromValue) && !!yieldPosition) {
      if (_STAKING_CHAIN_GROUP.astar.includes(yieldPosition.chain)) {
        return getAstarWithdrawable(yieldPosition);
      }

      return yieldPosition.unstakings.filter((data) => data.status === UnstakingStatus.CLAIMABLE)[0];
    }

    return undefined;
  }, [fromValue, yieldPosition]);

  const goHome = useCallback(() => {
    navigate('/home/earning');
  }, [navigate]);

  const onFieldsChange: FormCallbacks<WithdrawParams>['onFieldsChange'] = useCallback((changedFields: FormFieldData[], allFields: FormFieldData[]) => {
    // TODO: field change
    const { empty, error } = simpleCheckForm(allFields, ['--asset']);

    const values = convertFieldToObject<WithdrawParams>(allFields);

    setIsDisable(empty || error);
    persistData(values);
  }, [persistData]);

  const { onError, onSuccess } = useHandleSubmitTransaction(onDone);

  const onSubmit: FormCallbacks<WithdrawParams>['onFinish'] = useCallback((values: WithdrawParams) => {
    setLoading(true);

    if (!unstakingInfo) {
      setLoading(false);

      return;
    }

    const params: RequestYieldWithdrawal = {
      address: values.from,
      slug: values.slug,
      unstakingInfo: unstakingInfo
    };

    setTimeout(() => {
      yieldSubmitStakingWithdrawal(params)
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          setLoading(false);
        });
    }, 300);
  }, [onError, onSuccess, unstakingInfo]);

  const onPreCheck = usePreCheckAction(fromValue);

  const filterAccount = useCallback((account: AccountJson): boolean => {
    const nomination = allPositionInfos.find((data) => isSameAddress(data.address, account.address));

    return (
      (nomination
        ? nomination.unstakings.filter((data) => data.status === UnstakingStatus.CLAIMABLE).length > 0
        : false) && accountFilterFunc(chainInfoMap, poolInfo.type)(account)
    );
  }, [allPositionInfos, chainInfoMap, poolInfo.type]);

  const accountList = useMemo(() => {
    return accounts.filter(filterAccount);
  }, [accounts, filterAccount]);

  useRestoreTransaction(form);
  useInitValidateTransaction(validateFields, form, defaultData);

  useEffect(() => {
    form.setFieldValue('chain', stakingChain);
  }, [form, stakingChain]);

  return (
    <>
      <TransactionContent>
        <PageWrapper resolve={dataContext.awaitStores(['staking'])}>
          <Form
            className={`${className} form-container form-space-sm`}
            form={form}
            initialValues={formDefault}
            onFieldsChange={onFieldsChange}
            onFinish={onSubmit}
          >

            <HiddenInput fields={hideFields} />
            <Form.Item
              name={'from'}
            >
              <AccountSelector
                disabled={loading || !isAllAccount}
                doFilter={false}
                externalAccounts={accountList}
                filter={filterAccount}
              />
            </Form.Item>
            <FreeBalance
              address={fromValue}
              chain={chainValue}
              className={'free-balance'}
              label={t('Available balance:')}
              onBalanceReady={setIsBalanceReady}
            />
            <Form.Item>
              <MetaInfo
                className='withdraw-meta-info'
                hasBackgroundWrapper={true}
              >
                <MetaInfo.Chain
                  chain={chainValue}
                  label={t('Network')}
                />
                {
                  unstakingInfo && (
                    <MetaInfo.Number
                      decimals={decimals}
                      label={t('Amount')}
                      suffix={symbol}
                      value={unstakingInfo.claimable}
                    />
                  )
                }
              </MetaInfo>
            </Form.Item>
          </Form>
        </PageWrapper>
      </TransactionContent>
      <TransactionFooter
        errors={[]}
        warnings={[]}
      >
        <Button
          disabled={loading}
          icon={(
            <Icon
              phosphorIcon={XCircle}
              weight='fill'
            />
          )}
          onClick={goHome}
          schema={'secondary'}
        >
          {t('Cancel')}
        </Button>

        <Button
          disabled={isDisable || !isBalanceReady}
          icon={(
            <Icon
              phosphorIcon={ArrowCircleRight}
              weight='fill'
            />
          )}
          loading={loading}
          onClick={onPreCheck(form.submit, type === YieldPoolType.NOMINATION_POOL ? ExtrinsicType.STAKING_POOL_WITHDRAW : ExtrinsicType.STAKING_WITHDRAW)}
        >
          {t('Continue')}
        </Button>
      </TransactionFooter>
    </>
  );
};

const Withdraw = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.free-balance': {
      marginBottom: token.marginXS
    },

    '.meta-info': {
      marginTop: token.paddingSM
    }
  };
});

export default Withdraw;
