// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtrinsicType, NominationPoolInfo, NominatorMetadata, StakingType, ValidatorInfo } from '@subwallet/extension-base/background/KoniTypes';
import { _STAKING_CHAIN_GROUP } from '@subwallet/extension-base/services/chain-service/constants';
import { _getOriginChainOfAsset } from '@subwallet/extension-base/services/chain-service/utils';
import { SWTransactionResponse } from '@subwallet/extension-base/services/transaction-service/types';
import { isSameAddress } from '@subwallet/extension-base/utils';
import { AccountSelector, AmountInput, MetaInfo, MultiValidatorSelector, PageWrapper, PoolSelector, RadioGroup, StakingNetworkDetailModal, TokenSelector } from '@subwallet/extension-koni-ui/components';
import { ALL_KEY, DEFAULT_STAKE_PARAMS, STAKE_TRANSACTION } from '@subwallet/extension-koni-ui/constants';
import { DataContext } from '@subwallet/extension-koni-ui/contexts/DataContext';
import { useFetchChainAssetInfo, useFetchChainState, useGetBalance, useGetChainStakingMetadata, useGetNativeTokenBasicInfo, useGetNominatorInfo, useGetSupportedStakingTokens, useHandleSubmitTransaction, usePersistTransaction, usePreCheckAction, useSelector } from '@subwallet/extension-koni-ui/hooks';
import { submitBonding, submitPoolBonding } from '@subwallet/extension-koni-ui/messaging';
import { FormCallbacks, FormFieldData, StakeParams, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { convertFieldToObject, isAccountAll, parseNominations, simpleCheckForm } from '@subwallet/extension-koni-ui/utils';
import { Button, Divider, Form, Icon, Input } from '@subwallet/react-ui';
import BigN from 'bignumber.js';
import { PlusCircle } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BN, BN_ZERO } from '@polkadot/util';
import { isEthereumAddress } from '@polkadot/util-crypto';

import { accountFilterFunc, fetchChainValidators } from '../helper';
import { FreeBalance, TransactionContent, TransactionFooter } from '../parts';
import { TransactionContext } from '../Transaction';

type Props = ThemeProps

type StakeFormProps = StakeParams;

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;

  const { t } = useTranslation();

  const dataContext = useContext(DataContext);
  const { asset,
    chain,
    from,
    onDone,
    setAsset,
    setChain,
    setDisabledRightBtn,
    setFrom,
    setShowRightBtn } = useContext(TransactionContext);

  const [change, setChange] = useState(0);
  const [form] = Form.useForm<StakeFormProps>();
  const [storage] = usePersistTransaction<StakeFormProps>(form, STAKE_TRANSACTION, DEFAULT_STAKE_PARAMS, change);
  const { chain: persistChain,
    defaultChain: stakingChain,
    defaultType: _stakingType,
    nominate: persistNominate,
    type: persistType } = storage;

  // TODO: should do better to get validators info
  const { nominationPoolInfoMap, validatorInfoMap } = useSelector((state) => state.bonding);

  const chainInfoMap = useSelector((state) => state.chainStore.chainInfoMap);
  const currentAccount = useSelector((state) => state.accountState.currentAccount);
  const chainState = useFetchChainState(chain);
  const assetInfo = useFetchChainAssetInfo(asset);

  const isEthAdr = isEthereumAddress(currentAccount?.address);

  const [isDisable, setIsDisable] = useState(true);

  const stakingType = Form.useWatch('type', form);
  const nominate = Form.useWatch('nominate', form);

  const chainStakingMetadata = useGetChainStakingMetadata(chain);
  const nominatorMetadataList = useGetNominatorInfo(chain, stakingType, from);

  const nominatorMetadata: NominatorMetadata | undefined = useMemo(() => nominatorMetadataList[0], [nominatorMetadataList]);

  const { nativeTokenBalance } = useGetBalance(chain, from);
  const tokenList = useGetSupportedStakingTokens(stakingType, from, stakingChain);

  const isRelayChain = useMemo(() => _STAKING_CHAIN_GROUP.relay.includes(chain), [chain]);

  const [loading, setLoading] = useState(false);
  const [poolLoading, setPoolLoading] = useState(false);
  const [validatorLoading, setValidatorLoading] = useState(false);
  const [isBalanceReady, setIsBalanceReady] = useState(true);
  const [valueChange, setValueChange] = useState(false);
  const [, update] = useState({});
  const [forceFetchValidator, setForceFetchValidator] = useState(false);

  const existentialDeposit = useMemo(() => {
    if (assetInfo) {
      return assetInfo.minAmount || '0';
    }

    return '0';
  }, [assetInfo]);

  const maxValue = useMemo(() => {
    const balance = new BigN(nativeTokenBalance.value);
    const ed = new BigN(existentialDeposit);

    if (ed.gte(balance)) {
      return '0';
    } else {
      return balance.minus(ed).toString();
    }
  }, [existentialDeposit, nativeTokenBalance.value]);

  const { decimals, symbol } = useGetNativeTokenBasicInfo(chain);

  const isAllAccount = isAccountAll(currentAccount?.address || '');

  const defaultStakingType: StakingType = useMemo(() => {
    if (isEthAdr) {
      return StakingType.NOMINATED;
    }

    if (persistType) {
      switch (persistType) {
        case StakingType.POOLED:
          return StakingType.POOLED;
        case StakingType.NOMINATED:
          return StakingType.NOMINATED;
      }
    }

    switch (_stakingType) {
      case StakingType.POOLED:
        return StakingType.POOLED;
      case StakingType.NOMINATED:
        return StakingType.NOMINATED;
      default:
        return StakingType.POOLED;
    }
  }, [_stakingType, isEthAdr, persistType]);

  const formDefault: StakeFormProps = useMemo(() => {
    return {
      ...storage,
      from: from,
      chain: chain,
      type: persistType || defaultStakingType
    };
  }, [storage, from, chain, defaultStakingType, persistType]);

  const getSelectedValidators = useCallback((nominations: string[]) => {
    const validatorList = validatorInfoMap[chain];

    if (!validatorList) {
      return [];
    }

    const result: ValidatorInfo[] = [];

    validatorList.forEach((validator) => {
      if (nominations.some((nomination) => isSameAddress(nomination, validator.address))) { // remember the format of the address
        result.push(validator);
      }
    });

    return result;
  }, [chain, validatorInfoMap]);

  const getValidatorMinStake = useCallback((validatorInfos: ValidatorInfo[]) => {
    let minStake = BN_ZERO;

    validatorInfos.forEach((validatorInfo) => {
      const bnMinBond = new BN(validatorInfo?.minBond);

      if (bnMinBond.gt(minStake)) {
        minStake = bnMinBond;
      }
    });

    return minStake.toString();
  }, []);

  const minStake = useMemo(() => {
    if (stakingType === StakingType.NOMINATED) {
      const validatorInfos = getSelectedValidators(parseNominations(nominate));
      const validatorMinStake = getValidatorMinStake(validatorInfos);

      const nominatedMinStake = BN.max(new BN(validatorMinStake), new BN(chainStakingMetadata?.minStake || '0'));

      return nominatedMinStake.toString();
    }

    return chainStakingMetadata?.minJoinNominationPool || '0';
  }, [chainStakingMetadata?.minJoinNominationPool, chainStakingMetadata?.minStake, getSelectedValidators, getValidatorMinStake, nominate, stakingType]);

  const chainMinStake = useMemo(() => {
    return stakingType === StakingType.NOMINATED ? (chainStakingMetadata?.minStake || '0') : (chainStakingMetadata?.minJoinNominationPool || '0');
  }, [chainStakingMetadata?.minJoinNominationPool, chainStakingMetadata?.minStake, stakingType]);

  const { onError, onSuccess } = useHandleSubmitTransaction(onDone);

  // Detect load asset from storage
  const [firstChangeAsset, setFirstChangeAsset] = useState(true);

  const defaultNominated = useMemo(() => {
    if (firstChangeAsset) {
      return persistNominate || '';
    } else {
      return '';
    }
  }, [persistNominate, firstChangeAsset]);

  const onFieldsChange: FormCallbacks<StakeFormProps>['onFieldsChange'] = useCallback((changedFields: FormFieldData[], allFields: FormFieldData[]) => {
    const { error } = simpleCheckForm(allFields);

    const allMap = convertFieldToObject<StakeFormProps>(allFields);
    const changesMap = convertFieldToObject<StakeFormProps>(changedFields);

    const { asset, from, value } = changesMap;

    if (value) {
      setValueChange(true);
    }

    if (from) {
      setFrom(from);
    }

    if (asset) {
      const chain = _getOriginChainOfAsset(asset);

      setAsset(asset);
      setChain(chain);
      form.setFieldValue('chain', chain);

      if (!firstChangeAsset || chain !== persistChain) {
        form.resetFields(['nominate', 'pool']);
      }

      setFirstChangeAsset(false);
    }

    const checkEmpty: Record<string, boolean> = {};

    const stakingType = allMap.type;

    for (const [key, value] of Object.entries(allMap)) {
      checkEmpty[key] = !!value;
    }

    if (stakingType === StakingType.NOMINATED) {
      checkEmpty.pool = true;
    } else if (stakingType === StakingType.POOLED) {
      checkEmpty.nominate = true;
    }

    setIsDisable(error || Object.values(checkEmpty).some((value) => !value));
    setChange((value) => value + 1);
  }, [firstChangeAsset, form, persistChain, setAsset, setChain, setFrom]);

  const getSelectedPool = useCallback((poolId?: string) => {
    const nominationPoolList = nominationPoolInfoMap[chain];

    for (const pool of nominationPoolList) {
      if (String(pool.id) === poolId) {
        return pool;
      }
    }

    return undefined;
  }, [nominationPoolInfoMap, chain]);

  const onSubmit: FormCallbacks<StakeFormProps>['onFinish'] = useCallback((values: StakeFormProps) => {
    setLoading(true);
    const { from,
      nominate,
      pool,
      type,
      value } = values;
    let bondingPromise: Promise<SWTransactionResponse>;

    if (pool && type === StakingType.POOLED) {
      const selectedPool = getSelectedPool(pool);

      bondingPromise = submitPoolBonding({
        amount: value,
        chain: chain,
        nominatorMetadata: nominatorMetadata,
        selectedPool: selectedPool as NominationPoolInfo,
        address: from
      });
    } else {
      const selectedValidators = getSelectedValidators(parseNominations(nominate));

      bondingPromise = submitBonding({
        amount: value,
        chain: chain,
        nominatorMetadata: nominatorMetadata,
        selectedValidators,
        address: from,
        type: StakingType.NOMINATED
      });
    }

    setTimeout(() => {
      bondingPromise
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          setLoading(false);
        });
    }, 300);
  }, [getSelectedPool, chain, nominatorMetadata, getSelectedValidators, onSuccess, onError]);

  const getMetaInfo = useCallback(() => {
    if (chainStakingMetadata) {
      return (
        <MetaInfo
          className={'meta-info'}
          labelColorScheme={'gray'}
          spaceSize={'xs'}
          valueColorScheme={'light'}
        >
          {
            chainStakingMetadata.expectedReturn &&
            (
              <MetaInfo.Number
                label={t('Estimated earnings:')}
                suffix={'% / year'}
                value={chainStakingMetadata.expectedReturn}
              />
            )
          }

          {
            chainStakingMetadata.minStake &&
            (
              <MetaInfo.Number
                decimals={decimals}
                label={t('Minimum active:')}
                suffix={symbol}
                value={minStake}
                valueColorSchema={'success'}
              />
            )
          }
        </MetaInfo>
      );
    }

    return null;
  }, [chainStakingMetadata, decimals, symbol, t, minStake]);

  const checkAction = usePreCheckAction(from);

  useEffect(() => {
    const address = currentAccount?.address || '';

    if (address) {
      if (!isAccountAll(address)) {
        setFrom(address);
      }
    }
  }, [currentAccount?.address, setFrom]);

  useEffect(() => {
    setShowRightBtn(true);
  }, [setShowRightBtn]);

  useEffect(() => {
    setDisabledRightBtn(!chainStakingMetadata);
  }, [chainStakingMetadata, setDisabledRightBtn]);

  useEffect(() => {
    let unmount = false;

    // fetch validators when change chain
    // _stakingType is predefined form start
    if ((!!chain && !!from && chainState?.active) || forceFetchValidator) {
      fetchChainValidators(chain, _stakingType || ALL_KEY, unmount, setPoolLoading, setValidatorLoading, setForceFetchValidator);
    }

    return () => {
      unmount = true;
    };
  }, [from, _stakingType, chain, chainState?.active, forceFetchValidator]);

  useEffect(() => {
    let cancel = false;

    if (valueChange) {
      if (!cancel) {
        setTimeout(() => {
          form.validateFields(['value']).finally(() => update({}));
        }, 100);
      }
    }

    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, nativeTokenBalance.value]);

  // Load staking type from storage
  useEffect(() => {
    let _type: StakingType;

    if (persistType) {
      _type = persistType;
    } else {
      _type = defaultStakingType;
    }

    form.setFieldValue('type', _type);
  }, [defaultStakingType, form, persistType]);

  return (
    <>
      <TransactionContent>
        <PageWrapper
          className={className}
          resolve={dataContext.awaitStores(['staking'])}
        >
          <Form
            className={'form-container form-space-sm'}
            form={form}
            initialValues={formDefault}
            onFieldsChange={onFieldsChange}
            onFinish={onSubmit}
          >
            <Form.Item
              className='staking-type'
              hidden={!_stakingType}
              name={'type'}
            >
              <RadioGroup
                optionType='button'
                options={[
                  {
                    label: t('Pools'),
                    value: StakingType.POOLED,
                    disabled: isEthAdr
                  },
                  {
                    label: t('Nominate'),
                    value: StakingType.NOMINATED
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              hidden={true}
              name={'chain'}
            >
              <Input />
            </Form.Item>
            <Form.Item
              hidden={!isAllAccount}
              name={'from'}
            >
              <AccountSelector filter={accountFilterFunc(chainInfoMap, stakingType, stakingChain)} />
            </Form.Item>

            {
              !isAllAccount &&
              (
                <Form.Item name={'asset'}>
                  <TokenSelector
                    disabled={stakingChain !== ALL_KEY || !from}
                    items={tokenList}
                    prefixShape='circle'
                  />
                </Form.Item>
              )
            }

            <FreeBalance
              address={from}
              chain={chain}
              className={'account-free-balance'}
              label={t('Available balance:')}
              onBalanceReady={setIsBalanceReady}
            />

            <div className={'form-row'}>
              {
                isAllAccount &&
                (
                  <Form.Item name={'asset'}>
                    <TokenSelector
                      disabled={stakingChain !== ALL_KEY || !from}
                      items={tokenList}
                      prefixShape='circle'
                    />
                  </Form.Item>
                )
              }

              <Form.Item
                name={'value'}
                rules={[
                  { required: true, message: t('Amount is required') },
                  ({ getFieldValue }) => ({
                    validator: (_, value: string) => {
                      const type = getFieldValue('type') as StakingType;
                      const val = new BigN(value);

                      if (type === StakingType.POOLED) {
                        if (val.lte(0)) {
                          return Promise.reject(new Error(t('Amount must be greater than 0')));
                        }
                      } else {
                        if (!nominatorMetadata?.isBondedBefore || !isRelayChain) {
                          if (val.lte(0)) {
                            return Promise.reject(new Error(t('Amount must be greater than 0')));
                          }
                        }
                      }

                      if (val.gt(nativeTokenBalance.value)) {
                        return Promise.reject(t('Amount cannot exceed your balance'));
                      }

                      return Promise.resolve();
                    }
                  })
                ]}
                statusHelpAsTooltip={true}
              >
                <AmountInput
                  decimals={(chain && from) ? decimals : -1}
                  maxValue={maxValue}
                  showMaxButton={false}
                />
              </Form.Item>
            </div>

            <Form.Item
              hidden={stakingType !== StakingType.POOLED}
              name={'pool'}
            >
              <PoolSelector
                chain={chain}
                from={from}
                label={t('Select pool')}
                loading={poolLoading}
                setForceFetchValidator={setForceFetchValidator}
              />
            </Form.Item>

            <Form.Item
              hidden={stakingType !== StakingType.NOMINATED}
              name={'nominate'}
            >
              <MultiValidatorSelector
                chain={asset ? chain : ''}
                defaultValue={defaultNominated}
                from={asset ? from : ''}
                loading={validatorLoading}
                setForceFetchValidator={setForceFetchValidator}
              />
            </Form.Item>
          </Form>
          {
            chainStakingMetadata && (
              <>
                <Divider className='staking-divider' />
                {getMetaInfo()}
              </>
            )
          }
        </PageWrapper>
      </TransactionContent>

      <TransactionFooter
        errors={[]}
        warnings={[]}
      >
        <Button
          disabled={isDisable || !isBalanceReady}
          icon={(
            <Icon
              phosphorIcon={PlusCircle}
              weight={'fill'}
            />
          )}
          loading={loading}
          onClick={checkAction(form.submit, stakingType === StakingType.POOLED ? ExtrinsicType.STAKING_JOIN_POOL : ExtrinsicType.STAKING_BOND)}
        >
          {t('Stake')}
        </Button>
      </TransactionFooter>

      {
        chainStakingMetadata &&
        (
          <StakingNetworkDetailModal
            activeNominators={chainStakingMetadata.nominatorCount}
            estimatedEarning={chainStakingMetadata.expectedReturn}
            inflation={chainStakingMetadata.inflation}
            maxValidatorPerNominator={chainStakingMetadata.maxValidatorPerNominator}
            minimumActive={{ decimals, value: chainMinStake, symbol }}
            stakingType={stakingType}
            unstakingPeriod={chainStakingMetadata.unstakingPeriod}
          />
        )
      }
    </>
  );
};

const Stake = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.staking-type': {
      marginBottom: token.margin
    },

    '.account-free-balance': {
      marginBottom: token.marginXS
    },

    '.meta-info': {
      marginTop: token.paddingSM
    },

    '.react-tabs__tab-list': {
      marginLeft: 0,
      marginRight: 0
    },

    '.staking-divider': {
      marginTop: token.margin + 2,
      marginBottom: token.marginSM
    }
  };
});

export default Stake;
