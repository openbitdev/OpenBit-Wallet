// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _AssetRef, _AssetType, _ChainAsset, _ChainInfo, _MultiChainAsset } from '@subwallet/chain-list/types';
import { ExtrinsicType, NotificationType } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { _getAssetDecimals, _getOriginChainOfAsset, _getTokenMinAmount, _isAssetFungibleToken, _isChainEvmCompatible, _isNativeToken, _isTokenTransferredByEvm } from '@subwallet/extension-base/services/chain-service/utils';
import { SWTransactionResponse } from '@subwallet/extension-base/services/transaction-service/types';
import { BitcoinFeeDetail, ResponseSubscribeTransfer, TransactionFee } from '@subwallet/extension-base/types';
import { BN_ZERO, detectTranslate } from '@subwallet/extension-base/utils';
import { AccountSelector, AddressInput, AlertBox, AlertModal, AmountInput, BitcoinFeeSelector, ChainSelector, HiddenInput, TokenItemType, TokenSelector } from '@subwallet/extension-koni-ui/components';
import { BITCOIN_CHAINS, SUPPORT_CHAINS } from '@subwallet/extension-koni-ui/constants';
import { useAlert, useFetchChainAssetInfo, useGetChainPrefixBySlug, useGetNativeTokenBasicInfo, useHandleSubmitTransaction, useInitValidateTransaction, useNotification, usePreCheckAction, useRestoreTransaction, useSelector, useSetCurrentPage, useTransactionContext, useWatchTransaction } from '@subwallet/extension-koni-ui/hooks';
import { cancelSubscription, makeCrossChainTransfer, makeTransfer, subscribeMaxTransfer } from '@subwallet/extension-koni-ui/messaging';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ChainItemType, FormCallbacks, Theme, ThemeProps, TransferParams } from '@subwallet/extension-koni-ui/types';
import { findAccountByAddress, formatBalance, noop, reformatAddress } from '@subwallet/extension-koni-ui/utils';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { KeypairType } from '@subwallet/keyring/types';
import { Button, Form, Icon, Number } from '@subwallet/react-ui';
import { Rule } from '@subwallet/react-ui/es/form';
import BigN from 'bignumber.js';
import CN from 'classnames';
import { PaperPlaneRight, PaperPlaneTilt } from 'phosphor-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useIsFirstRender } from 'usehooks-ts';

import { isEthereumAddress } from '@polkadot/util-crypto';

import { TransactionContent, TransactionFooter } from '../parts';

type Props = ThemeProps;

function checkValidBetweenAddressTypeAndChain (addressType: KeypairType, chain: string): boolean {
  if (chain === 'bitcoin') {
    return ['bitcoin-44', 'bitcoin-84'].includes(addressType);
  }

  if (chain === 'bitcoinTestnet') {
    return ['bittest-44', 'bittest-84'].includes(addressType);
  }

  return chain === 'ethereum' && addressType === 'ethereum';
}

function getTokenItems (
  address: string,
  assetRegistry: Record<string, _ChainAsset>,
  multiChainAssetMap: Record<string, _MultiChainAsset>,
  tokenGroupSlug?: string // is ether a token slug or a multiChainAsset slug
): TokenItemType[] {
  if (!address) {
    return [];
  }

  const isSetTokenSlug = !!tokenGroupSlug && !!assetRegistry[tokenGroupSlug];
  const isSetMultiChainAssetSlug = !!tokenGroupSlug && !!multiChainAssetMap[tokenGroupSlug];
  const addressType = getKeypairTypeByAddress(address);

  if (tokenGroupSlug) {
    if (!(isSetTokenSlug || isSetMultiChainAssetSlug)) {
      return [];
    }

    const chainAsset = assetRegistry[tokenGroupSlug];

    if (isSetTokenSlug && chainAsset) {
      const { name, originChain, slug, symbol } = chainAsset;

      if (!checkValidBetweenAddressTypeAndChain(addressType, originChain)) {
        return [];
      }

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
    const isTokenFungible = _isAssetFungibleToken(chainAsset);

    if (!(isTokenFungible && _isNativeToken(chainAsset) && SUPPORT_CHAINS.includes(chainAsset.originChain))) {
      return;
    }

    if (!checkValidBetweenAddressTypeAndChain(addressType, chainAsset.originChain)) {
      return;
    }

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
  });

  return items.sort((a, b) => {
    if (a.originChain.toLowerCase() === 'bitcoin' || a.originChain.toLowerCase() === 'bitcoinTestnet') {
      return -1; // Place 'bitcoin' or 'BitcoinTestnet' at the top
    } else if (b.originChain.toLowerCase() === 'bitcoin' || b.originChain.toLowerCase() === 'bitcoinTestnet') {
      return 1;
    } else {
      return a.originChain.localeCompare(b.originChain);
    }
  });
}

function getTokenAvailableDestinations (tokenSlug: string, xcmRefMap: Record<string, _AssetRef>, chainInfoMap: Record<string, _ChainInfo>): ChainItemType[] {
  if (!tokenSlug) {
    return [];
  }

  const result: ChainItemType[] = [];
  const originChain = chainInfoMap[_getOriginChainOfAsset(tokenSlug)];

  // Firstly, push the originChain of token
  result.push({
    name: originChain.name,
    slug: originChain.slug
  });

  Object.values(xcmRefMap).forEach((xcmRef) => {
    if (xcmRef.srcAsset === tokenSlug) {
      const destinationChain = chainInfoMap[xcmRef.destChain];

      result.push({
        name: destinationChain.name,
        slug: destinationChain.slug
      });
    }
  });

  return result;
}

const hiddenFields: Array<keyof TransferParams> = ['chain', 'fromProxyId'];
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
  const { assetRegistry, multiChainAssetMap, xcmRefMap } = useSelector((root) => root.assetRegistry);
  const { accounts } = useSelector((state: RootState) => state.accountState);

  const destChainNetworkPrefix = useGetChainPrefixBySlug(destChainValue);
  const destChainGenesisHash = chainInfoMap[destChainValue]?.substrateInfo?.genesisHash || '';
  const checkAction = usePreCheckAction(fromValue, true, detectTranslate('The account you are using is {{accountTitle}}, you cannot send assets with it'));
  const nativeTokenBasicInfo = useGetNativeTokenBasicInfo(chainValue);

  const [feeResetTrigger, setFeeResetTrigger] = useState<unknown>({});

  const hideMaxButton = useMemo(() => {
    const chainInfo = chainInfoMap[chainValue];

    return !!chainInfo && !!assetInfo && _isChainEvmCompatible(chainInfo) && destChainValue === chainValue && _isNativeToken(assetInfo);
  }, [chainInfoMap, chainValue, destChainValue, assetInfo]);

  const chainStatus = useMemo(() => chainStatusMap[chainValue]?.connectionStatus, [chainValue, chainStatusMap]);

  const destChainItems = useMemo<ChainItemType[]>(() => {
    return getTokenAvailableDestinations(assetValue, xcmRefMap, chainInfoMap);
  }, [chainInfoMap, assetValue, xcmRefMap]);

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
      fromValue,
      assetRegistry,
      multiChainAssetMap,
      sendFundSlug
    );
  }, [assetRegistry, fromValue, multiChainAssetMap, sendFundSlug]);

  const [loading, setLoading] = useState(false);
  const [isTransferAll, setIsTransferAll] = useState(false);
  const [, update] = useState({});
  // @ts-ignore
  const [isBalanceReady, setIsBalanceReady] = useState(true);
  const [forceUpdateMaxValue, setForceUpdateMaxValue] = useState<object|undefined>(undefined);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [transferInfo, setTransferInfo] = useState<ResponseSubscribeTransfer | undefined>();
  const [transactionFeeInfo, setTransactionFeeInfo] = useState<TransactionFee | undefined>(undefined);

  const estimatedFee = useMemo((): string => transferInfo?.feeOptions.estimatedFee || '0', [transferInfo]);

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

    if (addressType === 'ethereum' && chain === 'ethereum') {
      return Promise.resolve();
    }

    if (['bitcoin-44', 'bitcoin-84'].includes(addressType) && chain === 'bitcoin') {
      return Promise.resolve();
    }

    if (['bittest-44', 'bittest-84'].includes(addressType) && chain === 'bitcoinTestnet') {
      return Promise.resolve();
    }

    return Promise.reject(t('Invalid recipient address'));
  }, [form, t]);

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

      if (part.from || part.asset || part.destChain) {
        setTransactionFeeInfo(undefined);

        if (values.chain && BITCOIN_CHAINS.includes(values.chain)) {
          setFeeResetTrigger({});
        }
      }

      if (part.from) {
        setForceUpdateMaxValue(undefined);
        form.resetFields(['asset']);
        // Because cache data, so next data may be same with default data
        form.setFields([{ name: 'asset', value: '' }]);
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

    if (fromValue && assetValue && destChainValue && toValue && transferAmountValue) {
      timeout = setTimeout(() => {
        subscribeMaxTransfer({
          address: fromValue,
          chain: assetRegistry[assetValue].originChain,
          token: assetValue,
          isXcmTransfer: chainValue !== destChainValue,
          destChain: destChainValue,
          feeOption: transactionFeeInfo?.feeOption,
          feeCustom: transactionFeeInfo?.feeCustom
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
  }, [assetRegistry, assetValue, chainValue, destChainValue, chainStatus, form, fromValue, toValue, transferAmountValue, transactionFeeInfo?.feeCustom, transactionFeeInfo?.feeOption]);

  const accountsFilter = useCallback((account: AccountJson) => {
    if (fromProxyId) {
      if (account.proxyId !== fromProxyId) {
        return false;
      }
    }

    const accountType = account.type || getKeypairTypeByAddress(account.address);

    return ['ethereum', 'bitcoin-44', 'bitcoin-84', 'bittest-44', 'bittest-84'].includes(accountType);
  }, [fromProxyId]);

  useEffect(() => {
    const bnTransferAmount = new BigN(transferAmountValue || '0');
    const bnMaxTransfer = new BigN(transferInfo?.maxTransferable || '0');

    if (bnTransferAmount.gt(BN_ZERO) && bnTransferAmount.eq(bnMaxTransfer)) {
      setIsTransferAll(true);
    }
  }, [transferInfo, transferAmountValue]);

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
          <Form.Item
            name={'from'}
          >
            <AccountSelector
              filter={accountsFilter}
              label={t('Send from')}
            />
          </Form.Item>

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

            <Icon
              className={'middle-item'}
              phosphorIcon={PaperPlaneRight}
              size={'md'}
            />

            <Form.Item name={'destChain'}>
              <ChainSelector
                disabled={!destChainItems.length}
                items={destChainItems}
                title={t('Select destination chain')}
                tooltip={t('Select destination chain')}
              />
            </Form.Item>
          </div>

          <HiddenInput fields={hiddenFields} />

          <Form.Item
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
              addressPrefix={destChainNetworkPrefix}
              allowDomain={true}
              chain={destChainValue}
              fitNetwork={true}
              label={t('Send to')}
              networkGenesisHash={destChainGenesisHash}
              placeholder={t('Account address')}
              saveAddress={true}
              showAddressBook={true}
              showScanner={true}
            />
          </Form.Item>

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
              showMaxButton={!hideMaxButton}
              tooltip={t('Amount')}
            />
          </Form.Item>

          {
            BITCOIN_CHAINS.includes(chainValue) && !!transferInfo && !!assetValue && (
              <Form.Item>
                <BitcoinFeeSelector
                  feeDetail={transferInfo.feeOptions as BitcoinFeeDetail}
                  isLoading={isFetchingInfo}
                  onSelect={setTransactionFeeInfo}
                  resetTrigger={feeResetTrigger}
                  tokenSlug={assetValue}
                />
              </Form.Item>
            )
          }
        </Form>

        {/* <FreeBalance */}
        {/*  address={from} */}
        {/*  chain={chain} */}
        {/*  onBalanceReady={setIsBalanceReady} */}
        {/*  tokenSlug={asset} */}
        {/* /> */}
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
        <Number
          decimal={nativeTokenBasicInfo.decimals}
          suffix={nativeTokenBasicInfo.symbol}
          value={estimatedFee}
        />
      </TransactionContent>
      <TransactionFooter
        className={`${className} -transaction-footer`}
      >
        <Button
          disabled={!fromValue || isFetchingInfo || !isBalanceReady}
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
      marginBottom: token.marginMD
    },

    '.form-row': {
      gap: 8
    },

    '.middle-item': {
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
    }
  });
});

export default SendFund;
