// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _AssetType, _ChainAsset, _ChainInfo, _MultiChainAsset } from '@subwallet/chain-list/types';
import { ExtrinsicType, NotificationType } from '@subwallet/extension-base/background/KoniTypes';
import { AbstractAddressJson, AccountJson } from '@subwallet/extension-base/background/types';
import { _getAssetDecimals, _getTokenMinAmount, _isNativeToken, _isPureBitcoinChain, _isPureEvmChain, _isTokenTransferredByEvm } from '@subwallet/extension-base/services/chain-service/utils';
import { SWTransactionResponse } from '@subwallet/extension-base/services/transaction-service/types';
import { BitcoinFeeDetail, ResponseSubscribeTransfer, TransactionFee } from '@subwallet/extension-base/types';
import { BN_ZERO, detectTranslate } from '@subwallet/extension-base/utils';
import { AccountSelector, AddressInput, AlertBox, AlertModal, AmountInput, BitcoinFeeSelector, HiddenInput, TokenItemType, TokenSelector } from '@subwallet/extension-koni-ui/components';
import { BITCOIN_CHAINS } from '@subwallet/extension-koni-ui/constants';
import { useAlert, useFetchChainAssetInfo, useGetChainPrefixBySlug, useHandleSubmitTransaction, useInitValidateTransaction, useNotification, usePreCheckAction, useRestoreTransaction, useSelector, useSetCurrentPage, useTransactionContext, useWatchTransaction } from '@subwallet/extension-koni-ui/hooks';
import { cancelSubscription, getBitcoinTransactionData, makeCrossChainTransfer, makeTransfer, subscribeMaxTransfer } from '@subwallet/extension-koni-ui/messaging';
import { FreeBalance } from '@subwallet/extension-koni-ui/Popup/Transaction/parts';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { FormCallbacks, Theme, ThemeProps, TransferParams } from '@subwallet/extension-koni-ui/types';
import { findAccountByAddress, formatBalance, noop, reformatAddress } from '@subwallet/extension-koni-ui/utils';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { Button, Form, Icon } from '@subwallet/react-ui';
import { Rule } from '@subwallet/react-ui/es/form';
import BigN from 'bignumber.js';
import CN from 'classnames';
import { PaperPlaneTilt } from 'phosphor-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useIsFirstRender } from 'usehooks-ts';

import { isEthereumAddress } from '@polkadot/util-crypto';

import { TransactionContent, TransactionFooter } from '../parts';

type Props = ThemeProps;

// function checkValidBetweenAddressTypeAndChain (addressType: KeypairType, chain: string): boolean {
//   if (chain === 'bitcoin') {
//     return ['bitcoin-44', 'bitcoin-84'].includes(addressType);
//   }
//
//   if (chain === 'bitcoinTestnet') {
//     return ['bittest-44', 'bittest-84'].includes(addressType);
//   }
//
//   return chain === 'ethereum' && addressType === 'ethereum';
// }

function getTokenItems (
  chainInfoMap: Record<string, _ChainInfo>,
  assetRegistry: Record<string, _ChainAsset>,
  multiChainAssetMap: Record<string, _MultiChainAsset>,
  tokenGroupSlug?: string // is ether a token slug or a multiChainAsset slug
): TokenItemType[] {
  const isSetTokenSlug = !!tokenGroupSlug && !!assetRegistry[tokenGroupSlug];
  const isSetMultiChainAssetSlug = !!tokenGroupSlug && !!multiChainAssetMap[tokenGroupSlug];

  if (tokenGroupSlug) {
    if (!(isSetTokenSlug || isSetMultiChainAssetSlug)) {
      return [];
    }

    const chainAsset = assetRegistry[tokenGroupSlug];

    if (isSetTokenSlug && chainAsset && (chainAsset.assetType !== 'RUNE' && chainAsset.assetType !== 'BRC20')) {
      const { name, originChain, slug, symbol } = chainAsset;

      return [
        {
          name,
          slug,
          symbol,
          originChain
        }
      ];
    }
  }

  const items: TokenItemType[] = [];

  Object.values(assetRegistry).forEach((chainAsset) => {
    const chainInfo = chainInfoMap[chainAsset.originChain];

    if (chainAsset.assetType === 'RUNE' || chainAsset.assetType === 'BRC20') {
      return;
    }

    if (_isPureBitcoinChain(chainInfo) || _isPureEvmChain(chainInfo)) {
      if (isSetMultiChainAssetSlug) {
        if (chainAsset.multiChainAsset === tokenGroupSlug) {
          items.push({
            name: chainAsset.name,
            slug: chainAsset.slug,
            symbol: chainAsset.symbol,
            originChain: chainAsset.originChain
          });
        }
      } else {
        items.push({
          name: chainAsset.name,
          slug: chainAsset.slug,
          symbol: chainAsset.symbol,
          originChain: chainAsset.originChain
        });
      }
    }
  });

  return items.sort((a, b) => {
    const aChain = a.originChain.toLowerCase();
    const bChain = b.originChain.toLowerCase();

    if (aChain === 'bitcoin') {
      return -1;
    }

    if (bChain === 'bitcoin') {
      return 1;
    }

    if (aChain === 'bitcointestnet') {
      return -1;
    }

    if (bChain === 'bitcointestnet') {
      return 1;
    }

    if (aChain === 'ethereum' && a.name.toLowerCase() === 'ethereum') {
      return -1;
    }

    if (bChain === 'ethereum' && b.name.toLowerCase() === 'ethereum') {
      return 1;
    }

    return a.originChain.localeCompare(b.originChain);
  });
}

const hiddenFields: Array<keyof TransferParams> = ['chain', 'fromProxyId', 'destChain'];
const validateFields: Array<keyof TransferParams> = ['value', 'to'];
const alertModalId = 'confirmation-alert-modal';

const _SendFund = ({ className = '' }: Props): React.ReactElement<Props> => {
  useSetCurrentPage('/transaction/send-fund');
  const { t } = useTranslation();
  const notification = useNotification();

  const { defaultData, persistData } = useTransactionContext<TransferParams>();
  const { defaultSlug: sendFundSlug, fromProxyId } = defaultData;
  const isFirstRender = useIsFirstRender();

  const [form] = Form.useForm<TransferParams>();
  const formDefault = useMemo((): TransferParams => {
    return {
      ...defaultData
    };
  }, [defaultData]);

  const destChainValue = useWatchTransaction('destChain', form, defaultData);
  const transferAmountValue = useWatchTransaction('value', form, defaultData);
  const fromValue = useWatchTransaction('from', form, defaultData);
  const toValue = useWatchTransaction('to', form, defaultData);
  const chainValue = useWatchTransaction('chain', form, defaultData);
  const assetValue = useWatchTransaction('asset', form, defaultData);

  const assetInfo = useFetchChainAssetInfo(assetValue);
  const { alertProps, closeAlert, openAlert } = useAlert(alertModalId);
  const { chainInfoMap, chainStatusMap } = useSelector((root) => root.chainStore);
  const { assetRegistry, multiChainAssetMap } = useSelector((root) => root.assetRegistry);
  const { accounts } = useSelector((state: RootState) => state.accountState);

  const destChainNetworkPrefix = useGetChainPrefixBySlug(destChainValue);
  const destChainGenesisHash = chainInfoMap[destChainValue]?.substrateInfo?.genesisHash || '';
  const checkAction = usePreCheckAction(fromValue, true, detectTranslate('The account you are using is {{accountTitle}}, you cannot send assets with it'));

  const [feeResetTrigger, setFeeResetTrigger] = useState<unknown>({});
  const assetRef = useRef<string | undefined>('');
  const proxyIdRef = useRef<string | undefined>('');

  // @ts-ignore
  const hideMaxButton = useMemo(() => {
    const chainInfo = chainInfoMap[chainValue];

    return !!chainInfo && !!assetInfo && _isPureEvmChain(chainInfo) && destChainValue === chainValue && _isNativeToken(assetInfo);
  }, [chainInfoMap, chainValue, destChainValue, assetInfo]);

  const chainStatus = useMemo(() => chainStatusMap[chainValue]?.connectionStatus, [chainValue, chainStatusMap]);

  const currentChainAsset = useMemo(() => {
    const _asset = isFirstRender ? defaultData.asset : assetValue;

    return _asset ? assetRegistry[_asset] : undefined;
  }, [isFirstRender, defaultData.asset, assetValue, assetRegistry]);

  const decimals = useMemo(() => {
    return currentChainAsset ? _getAssetDecimals(currentChainAsset) : 0;
  }, [currentChainAsset]);

  const extrinsicType = useMemo((): ExtrinsicType => {
    if (!currentChainAsset) {
      return ExtrinsicType.UNKNOWN;
    } else {
      if (chainValue !== destChainValue) {
        return ExtrinsicType.TRANSFER_XCM;
      } else {
        if (currentChainAsset.assetType === _AssetType.NATIVE) {
          return ExtrinsicType.TRANSFER_BALANCE;
        } else {
          return ExtrinsicType.TRANSFER_TOKEN;
        }
      }
    }
  }, [chainValue, currentChainAsset, destChainValue]);

  const tokenItems = useMemo<TokenItemType[]>(() => {
    return getTokenItems(
      chainInfoMap,
      assetRegistry,
      multiChainAssetMap,
      sendFundSlug
    );
  }, [assetRegistry, chainInfoMap, multiChainAssetMap, sendFundSlug]);

  const [loading, setLoading] = useState(false);
  const [isTransferAll, setIsTransferAll] = useState(false);
  const [, update] = useState({});
  // @ts-ignore
  const [isBalanceReady, setIsBalanceReady] = useState(false);
  const [forceUpdateMaxValue, setForceUpdateMaxValue] = useState<object|undefined>(undefined);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [transferInfo, setTransferInfo] = useState<ResponseSubscribeTransfer | undefined>();
  const [transactionFeeInfo, setTransactionFeeInfo] = useState<TransactionFee | undefined>(undefined);

  const handleTransferAll = useCallback((value: boolean) => {
    setForceUpdateMaxValue({});
    setIsTransferAll(value);
  }, []);

  const { onError, onSuccess } = useHandleSubmitTransaction(handleTransferAll);

  // todo: will support XCM, ledger, ... later
  const validateRecipientAddress = useCallback((rule: Rule, _recipientAddress: string): Promise<void> => {
    if (!_recipientAddress) {
      return Promise.reject(t('Recipient address is required'));
    }

    const { chain, from } = form.getFieldsValue();

    if (!chain || !from) {
      return Promise.resolve();
    }

    if (from === _recipientAddress) {
      return Promise.reject(t('The recipient address can not be the same as the sender address'));
    }

    const addressType = getKeypairTypeByAddress(_recipientAddress);

    const chainInfo = chainInfoMap[chainValue];

    if (addressType === 'ethereum' && _isPureEvmChain(chainInfo)) {
      return Promise.resolve();
    }

    if (['bitcoin-84'].includes(addressType) && chain === 'bitcoin') {
      return Promise.resolve();
    }

    if (['bittest-84'].includes(addressType) && chain === 'bitcoinTestnet') {
      return Promise.resolve();
    }

    return Promise.reject(t('Invalid recipient address'));
  }, [chainInfoMap, chainValue, form, t]);

  const validateAmount = useCallback((rule: Rule, amount: string): Promise<void> => {
    if (!amount) {
      return Promise.reject(t('Amount is required'));
    }

    if (transferInfo && (new BigN(transferInfo.maxTransferable)).lte(BN_ZERO)) {
      return Promise.reject(t('You don\'t have enough tokens to proceed'));
    }

    if ((new BigN(amount)).eq(0)) {
      return Promise.reject(t('Amount must be greater than 0'));
    }

    if (transferInfo && (new BigN(amount)).gt(new BigN(transferInfo.maxTransferable))) {
      const maxString = formatBalance(transferInfo.maxTransferable, decimals);

      return Promise.reject(t('Amount must be equal or less than {{number}}', { replace: { number: maxString } }));
    }

    return Promise.resolve();
  }, [decimals, t, transferInfo]);

  const onValuesChange: FormCallbacks<TransferParams>['onValuesChange'] = useCallback(
    (part: Partial<TransferParams>, values: TransferParams) => {
      const validateField: string[] = [];

      if (part.from) {
        form.validateFields(['to']).catch((e) => {
          console.log('Error when validating', e);
        });
      }

      if (part.from || part.asset || part.destChain) {
        setTransactionFeeInfo(undefined);

        if (values.chain && BITCOIN_CHAINS.includes(values.chain)) {
          setFeeResetTrigger({});
        }
      }

      if (part.destChain) {
        setForceUpdateMaxValue(isTransferAll ? {} : undefined);

        if (values.to) {
          validateField.push('to');
        }
      }

      if (part.asset) {
        const chain = assetRegistry[part.asset].originChain;

        if (values.value) {
          validateField.push('value');
        }

        form.setFieldsValue({
          chain: chain,
          destChain: chain
        });

        if (values.to) {
          validateField.push('to');
        }

        setIsTransferAll(false);
        setForceUpdateMaxValue(undefined);
      }

      if (validateField.length) {
        form.validateFields(validateField).catch(noop);
      }

      persistData(form.getFieldsValue());
    },
    [form, assetRegistry, isTransferAll, persistData]
  );

  // Submit transaction
  const onSubmit: FormCallbacks<TransferParams>['onFinish'] = useCallback((values: TransferParams) => {
    setLoading(true);
    const { asset, chain, destChain, from: _from, to, value } = values;

    let sendPromise: Promise<SWTransactionResponse>;

    const account = findAccountByAddress(accounts, _from);

    if (!account) {
      setLoading(false);
      notification({
        message: t("Can't find account"),
        type: 'error'
      });

      return;
    }

    const chainInfo = chainInfoMap[chain];
    const addressPrefix = chainInfo?.substrateInfo?.addressPrefix ?? 42;
    const from = reformatAddress(_from, addressPrefix);

    const isLedger = !!account.isHardware;
    const isEthereum = isEthereumAddress(account.address);
    const chainAsset = assetRegistry[asset];

    if (chain === destChain) {
      if (isLedger) {
        if (isEthereum) {
          if (!_isTokenTransferredByEvm(chainAsset)) {
            setLoading(false);
            notification({
              message: t('Ledger does not support transfer for this token'),
              type: 'warning'
            });

            return;
          }
        }
      }

      // Transfer token or send fund
      sendPromise = makeTransfer({
        from,
        chain,
        to: to,
        tokenSlug: asset,
        value: value,
        transferAll: isTransferAll,
        feeOption: transactionFeeInfo?.feeOption,
        feeCustom: transactionFeeInfo?.feeCustom
      });
    } else {
      if (isLedger) {
        setLoading(false);
        notification({
          message: t('This feature is not available for Ledger account'),
          type: 'warning'
        });

        return;
      }

      // Make cross chain transfer
      sendPromise = makeCrossChainTransfer({
        destinationNetworkKey: destChain,
        from,
        originNetworkKey: chain,
        tokenSlug: asset,
        to,
        value,
        transferAll: isTransferAll
      });
    }

    setTimeout(() => {
      // Handle transfer action
      sendPromise
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          setLoading(false);
        })
      ;
    }, 300);
  }, [accounts, chainInfoMap, assetRegistry, notification, t, isTransferAll, onSuccess, onError, transactionFeeInfo]);

  const onSetMaxTransferable = useCallback((value: boolean) => {
    const bnMaxTransfer = new BigN(transferInfo?.maxTransferable || '0');

    if (!bnMaxTransfer.isZero()) {
      setIsTransferAll(value);
    }
  }, [transferInfo]);

  const onPreSubmit = useCallback(() => {
    if (_isNativeToken(assetInfo)) {
      const minAmount = _getTokenMinAmount(assetInfo);
      const bnMinAmount = new BigN(minAmount);

      if (bnMinAmount.gt(BN_ZERO) && isTransferAll && chainValue === destChainValue) {
        openAlert({
          type: NotificationType.WARNING,
          content: t('Transferring all will remove all assets on this network. Are you sure?'),
          title: t('Pay attention!'),
          okButton: {
            text: t('Transfer'),
            onClick: () => {
              closeAlert();
              form.submit();
            }
          },
          cancelButton: {
            text: t('Cancel'),
            onClick: closeAlert
          }
        });

        return;
      }
    }

    form.submit();
  }, [assetInfo, chainValue, closeAlert, destChainValue, form, isTransferAll, openAlert, t]);

  const addressBookFilter = useCallback((addressJson: AbstractAddressJson): boolean => {
    const addressType = getKeypairTypeByAddress(addressJson.address);

    const chainInfo = chainInfoMap[chainValue];

    if (chainValue === 'bitcoin') {
      return 'bitcoin-84'.includes(addressType) && addressJson.address !== fromValue;
    } else if (chainValue === 'bitcoinTestnet') {
      return 'bittest-84'.includes(addressType) && addressJson.address !== fromValue;
    } else if (!!chainInfo && _isPureEvmChain(chainInfo)) {
      return 'ethereum'.includes(addressType) && addressJson.address !== fromValue;
    }

    return false;
  }, [chainInfoMap, chainValue, fromValue]);

  const onSelectTransactionFeeInfo = useCallback((value: TransactionFee | undefined) => {
    if (value) {
      setForceUpdateMaxValue(isTransferAll ? {} : undefined);
    }

    setTransactionFeeInfo(value);
  }, [isTransferAll]);

  // TODO: Need to review
  // Auto fill logic
  useEffect(() => {
    const { asset } = form.getFieldsValue();

    const updateInfoWithTokenSlug = (tokenSlug: string) => {
      const tokenInfo = assetRegistry[tokenSlug];

      form.setFieldsValue({
        asset: tokenSlug,
        chain: tokenInfo.originChain,
        destChain: tokenInfo.originChain
      });
    };

    if (tokenItems.length) {
      if (!asset || !tokenItems.some((i) => i.slug === asset)) {
        updateInfoWithTokenSlug(tokenItems[0].slug);
      }
    }
  }, [assetRegistry, form, tokenItems]);

  // Get max transfer value
  useEffect(() => {
    let cancel = false;
    let id = '';
    let timeout: NodeJS.Timeout;

    setIsFetchingInfo(true);

    const validate = () => {
      const value = form.getFieldValue('value') as string;

      if (value) {
        setTimeout(() => {
          form.validateFields(['value']).finally(() => update({}));
        }, 100);
      }
    };

    const callback = (transferInfo: ResponseSubscribeTransfer) => {
      if (!cancel) {
        setTransferInfo(transferInfo);
        id = transferInfo.id;

        validate();
      } else {
        cancelSubscription(transferInfo.id).catch(console.error);
      }
    };

    if (fromValue && assetValue && destChainValue) {
      timeout = setTimeout(() => {
        subscribeMaxTransfer({
          address: fromValue,
          chain: assetRegistry[assetValue].originChain,
          token: assetValue,
          isXcmTransfer: chainValue !== destChainValue,
          destChain: destChainValue,
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
            validate();
          })
          .finally(() => {
            setIsFetchingInfo(false);
          });
      }, 800);
    }

    return () => {
      cancel = true;
      clearTimeout(timeout);
      id && cancelSubscription(id).catch(console.error);
    };
  }, [assetRegistry, assetValue, chainValue, destChainValue, chainStatus, form, fromValue, toValue, transactionFeeInfo, transferAmountValue, isTransferAll]);

  const accountsFilter = useCallback((account: AccountJson) => {
    if (fromProxyId) {
      if (account.proxyId !== fromProxyId) {
        return false;
      }
    }

    if (account.isReadOnly) {
      return false;
    }

    const accountType = account.type || getKeypairTypeByAddress(account.address);
    const chainInfo = chainInfoMap[chainValue];

    if (chainValue === 'bitcoin') {
      return 'bitcoin-84'.includes(accountType);
    } else if (chainValue === 'bitcoinTestnet') {
      return 'bittest-84'.includes(accountType);
    } else if (!!chainInfo && _isPureEvmChain(chainInfo)) {
      return 'ethereum'.includes(accountType);
    }

    return false;
  }, [chainInfoMap, chainValue, fromProxyId]);

  const accountList = useMemo(() => {
    return accounts.filter(accountsFilter);
  }, [accounts, accountsFilter]);

  const getTransactionData = useCallback(() => {
    const { asset, chain, from, to, value } = form.getFieldsValue();

    getBitcoinTransactionData({
      from,
      chain,
      to: to,
      tokenSlug: asset,
      value: value,
      transferAll: false,
      feeOption: transactionFeeInfo?.feeOption,
      feeCustom: transactionFeeInfo?.feeCustom
    }).then((rs) => {
      console.log('getBitcoinTransactionData', rs);
    }).catch((e) => {
      console.log('getBitcoinTransactionData E', e);
    });
  }, [form, transactionFeeInfo?.feeCustom, transactionFeeInfo?.feeOption]);

  useEffect(() => {
    const bnTransferAmount = new BigN(transferAmountValue || '0');
    const bnMaxTransfer = new BigN(transferInfo?.maxTransferable || '0');

    if (bnTransferAmount.gt(BN_ZERO) && bnTransferAmount.eq(bnMaxTransfer)) {
      setIsTransferAll(true);
    }
  }, [transferInfo, transferAmountValue]);

  useEffect(() => {
    if (accountList.length === 1) {
      const addressType = accountList?.[0]?.type;

      form.setFieldsValue({
        from: accountList?.[0]?.address || ''
      });

      const oldToAccount = accounts.find((item) => item.address === toValue);

      if (!!oldToAccount && oldToAccount?.type !== addressType) {
        const newToAccount = accounts.find((item) => item.proxyId === oldToAccount?.proxyId && item.type === addressType);

        form.setFieldsValue({
          to: newToAccount?.address || ''
        });
      }
    }

    if (accountList.length > 1 && !!fromValue && !!assetValue && assetRef.current !== assetValue) {
      assetRef.current = assetValue;
      const currentFromAccount = accountList.find((item) => (item.address === fromValue) || (item.proxyId === proxyIdRef.current));

      proxyIdRef.current = currentFromAccount?.proxyId;

      form.setFieldsValue({
        from: currentFromAccount?.address || ''
      });
      const currentToAccount = accounts.find((item) => item.address === toValue);

      if (toValue && !!currentToAccount) {
        const newToAccount = accountList.find((item) => item.proxyId === currentToAccount?.proxyId);

        form.setFieldsValue({
          to: newToAccount?.address || ''
        });
      }
    }
  }, [accountList, accounts, assetValue, form, fromProxyId, fromValue, toValue]);

  useRestoreTransaction(form);
  useInitValidateTransaction(validateFields, form, defaultData);

  return (
    <>
      <TransactionContent className={CN(`${className} -transaction-content`)}>
        <div className={'__brief common-text text-light-4 text-center'}>
          {t('You are performing a transfer of a fungible token')}
        </div>

        <Form
          className={'form-container form-space-sm'}
          form={form}
          initialValues={formDefault}
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
        >
          <div className={'form-row'}>
            <Form.Item name={'asset'}>
              <TokenSelector
                disabled={!tokenItems.length}
                items={tokenItems}
                placeholder={t('Select token')}
                showChainInSelected
                tooltip={t('Select token')}
              />
            </Form.Item>
          </div>

          <HiddenInput fields={hiddenFields} />

          <div className={'form-row sender-receiver-row'}>
            <Form.Item
              className={CN('__sender-field', {
                hidden: accountList.length === 1
              })}
              name={'from'}
            >
              <AccountSelector
                disabled={accountList.length === 1}
                externalAccounts={accountList}
                label={t('From:')}
                labelStyle={'horizontal'}
                title={t('From')}
              />
            </Form.Item>

            <Form.Item
              className={'__receiver-field'}
              name={'to'}
              rules={[
                {
                  validator: validateRecipientAddress
                }
              ]}
              statusHelpAsTooltip={true}
              validateTrigger='onBlur'
            >
              <AddressInput
                addressBookFilter={addressBookFilter}
                addressPrefix={destChainNetworkPrefix}
                allowDomain={true}
                chain={destChainValue}
                fitNetwork={true}
                label={t('To:')}
                labelStyle={'horizontal'}
                networkGenesisHash={destChainGenesisHash}
                placeholder={t('Account address')}
                saveAddress={true}
                showAddressBook={true}
                showScanner={true}
              />
            </Form.Item>
          </div>

          {!!fromValue && <FreeBalance
            address={fromValue}
            chain={chainValue}
            className={'__free-balance-block'}
            onBalanceReady={setIsBalanceReady}
            tokenSlug={assetValue}
          />}

          <Form.Item
            name={'value'}
            rules={[
              {
                validator: validateAmount
              }
            ]}
            statusHelpAsTooltip={true}
            validateTrigger='onBlur'
          >
            <AmountInput
              decimals={decimals}
              forceUpdateMaxValue={forceUpdateMaxValue}
              maxValue={transferInfo?.maxTransferable || '0'}
              onSetMax={onSetMaxTransferable}
              showMaxButton={!hideMaxButton && !!transferInfo}
              tooltip={t('Amount')}
            />
          </Form.Item>
        </Form>

        {
          BITCOIN_CHAINS.includes(chainValue) && !!transferInfo && !!assetValue && (
            <BitcoinFeeSelector
              className={'__bitcoin-fee-selector'}
              feeDetail={transferInfo.feeOptions as BitcoinFeeDetail}
              isLoading={isFetchingInfo}
              onSelect={onSelectTransactionFeeInfo}
              resetTrigger={feeResetTrigger}
              tokenSlug={assetValue}
            />
          )
        }

        {
          chainValue !== destChainValue && (
            <div className={'__warning_message_cross_chain'}>
              <AlertBox
                description={t('Cross-chain transfer to an exchange (CEX) will result in loss of funds. Make sure the receiving address is not an exchange address.')}
                title={t('Pay attention!')}
                type={'warning'}
              />
            </div>
          )
        }
        {
          !!alertProps && (
            <AlertModal
              modalId={alertModalId}
              {...alertProps}
            />
          )
        }
      </TransactionContent>
      <TransactionFooter
        className={`${className} -transaction-footer`}
      >
        {
          BITCOIN_CHAINS.includes(chainValue) && (
            <Button
              className={'hidden'}
              disabled={!fromValue || isFetchingInfo || !isBalanceReady || !transferInfo}
              onClick={getTransactionData}
            >
              Get transaction data
            </Button>
          )
        }

        <Button
          className={'__transfer-button'}
          disabled={!fromValue || isFetchingInfo || !isBalanceReady || !transferInfo}
          icon={(
            <Icon
              phosphorIcon={PaperPlaneTilt}
              weight={'fill'}
            />
          )}
          loading={loading}
          onClick={checkAction(onPreSubmit, extrinsicType)}
          schema={isTransferAll ? 'warning' : undefined}
        >
          {isTransferAll ? t('Transfer all') : t('Transfer')}
        </Button>
      </TransactionFooter>
    </>
  );
};

const SendFund = styled(_SendFund)(({ theme }) => {
  const token = (theme as Theme).token;

  return ({
    '.__brief': {
      paddingLeft: token.padding,
      paddingRight: token.padding,
      marginBottom: token.marginSM
    },

    '.__transfer-button': {
      fontWeight: token.fontWeightStrong
    },

    '.form-row': {
      gap: 8
    },

    '.middle-icon': {
      marginBottom: token.marginSM
    },

    '.__warning_message_cross_chain': {
      marginTop: token.marginXS
    },

    '&.-transaction-content.-is-zero-balance': {
      '.free-balance .ant-number': {
        '.ant-number-integer, .ant-number-decimal': {
          color: `${token.colorError} !important`
        }
      }
    },
    '.ant-form-item': {
      marginBottom: token.marginXS
    },

    '.form-row.sender-receiver-row': {
      flexDirection: 'column',
      gap: 0
    },

    '.__free-balance-block + .__bitcoin-fee-selector': {
      marginTop: 11
    },
    '.__free-balance-block': {
      marginBottom: 8,
      justifyContent: 'end'
    },

    '.max-btn-text': {
      color: '#F0D030'
    },

    '.__fee-display': {
      display: 'flex',
      flexWrap: 'wrap',
      color: token.colorTextTertiary,
      lineHeight: token.lineHeight
    },

    '.__fee-display-value': {
      '.ant-typography': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      }
    }
  });
});

export default SendFund;
