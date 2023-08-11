// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _AssetType } from '@subwallet/chain-list/types';
import { ExtrinsicType } from '@subwallet/extension-base/background/KoniTypes';
import { _getAssetDecimals, _isChainEvmCompatible, _isTokenTransferredByEvm } from '@subwallet/extension-base/services/chain-service/utils';
import { SWTransactionResponse } from '@subwallet/extension-base/services/transaction-service/types';
import { detectTranslate, isSameAddress } from '@subwallet/extension-base/utils';
import { AccountSelector, AddressInput, AmountInput, ChainSelector, TokenItemType, TokenSelector } from '@subwallet/extension-koni-ui/components';
import { TRANSFER_TRANSACTION } from '@subwallet/extension-koni-ui/constants';
import { useGetChainPrefixBySlug, useHandleSubmitTransaction, useIsMantaPayEnabled, useNotification, usePersistTransaction, usePreCheckAction, useSelector, useSetCurrentPage } from '@subwallet/extension-koni-ui/hooks';
import { getMaxTransfer, makeCrossChainTransfer, makeTransfer } from '@subwallet/extension-koni-ui/messaging';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ChainItemType, FormCallbacks, FormRule, SendFundParam, Theme, ThemeProps, TransactionFormBaseProps } from '@subwallet/extension-koni-ui/types';
import { findAccountByAddress, findNetworkJsonByGenesisHash, formatBalance, noop } from '@subwallet/extension-koni-ui/utils';
import { Button, Form, Icon, Input } from '@subwallet/react-ui';
import BigN from 'bignumber.js';
import CN from 'classnames';
import { PaperPlaneRight, PaperPlaneTilt } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useIsFirstRender } from 'usehooks-ts';

import { BN, BN_ZERO } from '@polkadot/util';
import { isAddress, isEthereumAddress } from '@polkadot/util-crypto';

import { FreeBalance, TransactionContent, TransactionFooter } from '../../parts';
import { TransactionContext } from '../../Transaction';
import { filterAccountFunc, getTokenAvailableDestinations, getTokenItems } from './helper';

interface TransferFormProps extends TransactionFormBaseProps {
  to: string;
  destChain: string;
  value: string;
}

type Props = ThemeProps;

const DEFAULT_FORM_STATE: TransferFormProps = {
  asset: '',
  chain: '',
  destChain: '',
  from: '',
  to: '',
  value: ''
};

const _SendFund = ({ className = '' }: Props): React.ReactElement<Props> => {
  useSetCurrentPage('/transaction/send-fund');
  const { t } = useTranslation();
  const notification = useNotification();
  const isFirstRender = useIsFirstRender();

  const locationState = useLocation().state as SendFundParam;
  const [sendFundSlug] = useState<string | undefined>(locationState?.slug);

  const { asset, chain, from, onDone, setAsset, setChain, setFrom } = useContext(TransactionContext);

  const { chainInfoMap, chainStateMap } = useSelector((root) => root.chainStore);
  const { assetRegistry, assetSettingMap, multiChainAssetMap, xcmRefMap } = useSelector((root) => root.assetRegistry);
  const { accounts, isAllAccount } = useSelector((state: RootState) => state.accountState);
  const [maxTransfer, setMaxTransfer] = useState<string>('0');
  const checkAction = usePreCheckAction(from, true, detectTranslate('The account you are using is {{accountTitle}}, you cannot send assets with it'));
  const isZKModeEnabled = useIsMantaPayEnabled(from);

  const [loading, setLoading] = useState(false);
  const [isTransferAll, setIsTransferAll] = useState(false);
  const [, update] = useState({});
  const [isBalanceReady, setIsBalanceReady] = useState(true);
  const [forceUpdateMaxValue, setForceUpdateMaxValue] = useState<object|undefined>(undefined);
  const chainStatus = useMemo(() => chainStateMap[chain]?.connectionStatus, [chain, chainStateMap]);
  const [valueChange, setValueChange] = useState({});

  const handleTransferAll = useCallback((value: boolean) => {
    setForceUpdateMaxValue({});
    setIsTransferAll(value);
  }, []);

  const { onError, onSuccess } = useHandleSubmitTransaction(onDone, handleTransferAll);

  const [form] = Form.useForm<TransferFormProps>();

  const [storage] = usePersistTransaction<TransferFormProps>(form, TRANSFER_TRANSACTION, DEFAULT_FORM_STATE, valueChange);

  const formDefault = useMemo((): TransferFormProps => {
    return {
      ...storage,
      from: from,
      chain: chain
    };
  }, [chain, from, storage]);

  const destChain = Form.useWatch('destChain', form);
  const transferAmount = Form.useWatch('value', form);

  const destChainItems = useMemo<ChainItemType[]>(() => {
    return getTokenAvailableDestinations(asset, xcmRefMap, chainInfoMap);
  }, [chainInfoMap, asset, xcmRefMap]);

  const currentChainAsset = useMemo(() => {
    if (isFirstRender) {
      const _asset = storage.asset || asset;

      return _asset ? assetRegistry[_asset] : undefined;
    } else {
      return asset ? assetRegistry[asset] : undefined;
    }
  }, [isFirstRender, storage.asset, asset, assetRegistry]);

  const decimals = useMemo(() => {
    return currentChainAsset ? _getAssetDecimals(currentChainAsset) : 0;
  }, [currentChainAsset]);

  const extrinsicType = useMemo((): ExtrinsicType => {
    if (!currentChainAsset) {
      return ExtrinsicType.UNKNOWN;
    } else {
      if (chain !== destChain) {
        return ExtrinsicType.TRANSFER_XCM;
      } else {
        if (currentChainAsset.assetType === _AssetType.NATIVE) {
          return ExtrinsicType.TRANSFER_BALANCE;
        } else {
          return ExtrinsicType.TRANSFER_TOKEN;
        }
      }
    }
  }, [chain, currentChainAsset, destChain]);

  const fromChainNetworkPrefix = useGetChainPrefixBySlug(chain);
  const destChainNetworkPrefix = useGetChainPrefixBySlug(destChain);
  const destChainGenesisHash = chainInfoMap[destChain]?.substrateInfo?.genesisHash || '';

  const tokenItems = useMemo<TokenItemType[]>(() => {
    return getTokenItems(
      from,
      accounts,
      chainInfoMap,
      assetRegistry,
      assetSettingMap,
      multiChainAssetMap,
      sendFundSlug,
      isZKModeEnabled
    );
  }, [accounts, assetRegistry, assetSettingMap, chainInfoMap, from, isZKModeEnabled, multiChainAssetMap, sendFundSlug]);

  const validateRecipientAddress = useCallback((rule: FormRule, _recipientAddress: string): Promise<void> => {
    if (!_recipientAddress) {
      return Promise.reject(t('Recipient address is required'));
    }

    if (!isAddress(_recipientAddress)) {
      return Promise.reject(t('Invalid Recipient address'));
    }

    const { chain, destChain, from, to } = form.getFieldsValue();

    if (!from || !chain || !destChain) {
      return Promise.resolve();
    }

    const isOnChain = chain === destChain;

    const account = findAccountByAddress(accounts, _recipientAddress);

    if (isOnChain) {
      if (isSameAddress(from, _recipientAddress)) {
        // todo: change message later
        return Promise.reject(t('The recipient address can not be the same as the sender address'));
      }

      const isNotSameAddressType = (isEthereumAddress(from) && !!_recipientAddress && !isEthereumAddress(_recipientAddress)) ||
        (!isEthereumAddress(from) && !!_recipientAddress && isEthereumAddress(_recipientAddress));

      if (isNotSameAddressType) {
        // todo: change message later
        return Promise.reject(t('The recipient address must be same type as the current account address.'));
      }
    } else {
      const isDestChainEvmCompatible = _isChainEvmCompatible(chainInfoMap[destChain]);

      if (isDestChainEvmCompatible !== isEthereumAddress(to)) {
        // todo: change message later
        return Promise.reject(t(`The recipient address must be ${isDestChainEvmCompatible ? 'EVM' : 'substrate'} type`));
      }
    }

    if (account?.isHardware) {
      const destChainInfo = chainInfoMap[destChain];
      const availableGen: string[] = account.availableGenesisHashes || [];

      if (!isEthereumAddress(account.address) && !availableGen.includes(destChainInfo?.substrateInfo?.genesisHash || '')) {
        const destChainName = destChainInfo?.name || 'Unknown';

        return Promise.reject(t('Wrong network. Your Ledger account is not supported by {{network}}. Please choose another receiving account and try again.', { replace: { network: destChainName } }));
      }
    }

    return Promise.resolve();
  }, [accounts, chainInfoMap, form, t]);

  const validateAmount = useCallback((rule: FormRule, amount: string): Promise<void> => {
    if (!amount) {
      return Promise.reject(t('Amount is required'));
    }

    if ((new BigN(amount)).eq(new BigN(0))) {
      return Promise.reject(t('Amount must be greater than 0'));
    }

    if ((new BigN(amount)).gt(new BigN(maxTransfer))) {
      const maxString = formatBalance(maxTransfer, decimals);

      return Promise.reject(t('Amount must be equal or less than {{number}}', { replace: { number: maxString } }));
    }

    return Promise.resolve();
  }, [decimals, maxTransfer, t]);

  const onValuesChange: FormCallbacks<TransferFormProps>['onValuesChange'] = useCallback(
    (part: Partial<TransferFormProps>, values: TransferFormProps) => {
      const validateField: string[] = [];

      if (part.from) {
        setFrom(part.from);
        setForceUpdateMaxValue(undefined);
        form.resetFields(['asset']);
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

        setChain(chain);
        setAsset(part.asset);
        setIsTransferAll(false);
        setForceUpdateMaxValue(undefined);
      }

      if (validateField.length) {
        form.validateFields(validateField).catch(noop);
      }

      setValueChange({});
    },
    [setFrom, form, assetRegistry, setChain, setAsset, isTransferAll]
  );

  // Submit transaction
  const onSubmit: FormCallbacks<TransferFormProps>['onFinish'] = useCallback((values: TransferFormProps) => {
    setLoading(true);
    const { destChain, to, value } = values;

    let sendPromise: Promise<SWTransactionResponse>;

    const account = findAccountByAddress(accounts, from);

    if (!account) {
      setLoading(false);
      notification({
        message: t("Can't find account"),
        type: 'error'
      });

      return;
    }

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
        networkKey: chain,
        to: to,
        tokenSlug: asset,
        value: value,
        transferAll: isTransferAll
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
  }, [accounts, from, assetRegistry, asset, chain, notification, t, isTransferAll, onSuccess, onError]);

  const onFilterAccountFunc = useMemo(() => filterAccountFunc(chainInfoMap, assetRegistry, multiChainAssetMap, sendFundSlug), [assetRegistry, chainInfoMap, multiChainAssetMap, sendFundSlug]);

  const onSetMaxTransferable = useCallback((value: boolean) => {
    const bnMaxTransfer = new BN(maxTransfer);

    if (!bnMaxTransfer.isZero()) {
      setIsTransferAll(value);
    }
  }, [maxTransfer]);

  // TODO: Need to review
  // Auto fill logic
  useEffect(() => {
    const { asset, from } = form.getFieldsValue();

    const updateInfoWithTokenSlug = (tokenSlug: string) => {
      const tokenInfo = assetRegistry[tokenSlug];

      form.setFieldsValue({
        asset: tokenSlug,
        chain: tokenInfo.originChain,
        destChain: tokenInfo.originChain
      });
      setChain(tokenInfo.originChain);
    };

    if (tokenItems.length) {
      let isApplyDefaultAsset = true;

      if (!asset) {
        const account = findAccountByAddress(accounts, from);

        if (account?.originGenesisHash) {
          const network = findNetworkJsonByGenesisHash(chainInfoMap, account.originGenesisHash);

          if (network) {
            const token = tokenItems.find((item) => item.originChain === network.slug);

            if (token) {
              updateInfoWithTokenSlug(token.slug);
              isApplyDefaultAsset = false;
            }
          }
        }
      } else {
        // Apply default asset if current asset is not in token list
        isApplyDefaultAsset = !tokenItems.some((i) => i.slug === asset);
      }

      if (isApplyDefaultAsset) {
        updateInfoWithTokenSlug(tokenItems[0].slug);
      }
    }
  }, [accounts, tokenItems, assetRegistry, form, setChain, chainInfoMap]);

  // Get max transfer value
  useEffect(() => {
    let cancel = false;

    if (from && asset) {
      getMaxTransfer({
        address: from,
        networkKey: assetRegistry[asset].originChain,
        token: asset,
        isXcmTransfer: chain !== destChain,
        destChain
      })
        .then((balance) => {
          !cancel && setMaxTransfer(balance.value);
        })
        .catch(() => {
          !cancel && setMaxTransfer('0');
        })
        .finally(() => {
          if (!cancel) {
            const value = form.getFieldValue('value') as string;

            if (value) {
              setTimeout(() => {
                form.validateFields(['value']).finally(() => update({}));
              }, 100);
            }
          }
        });
    }

    return () => {
      cancel = true;
    };
  }, [asset, assetRegistry, chain, chainStatus, destChain, form, from]);

  useEffect(() => {
    const bnTransferAmount = new BN(transferAmount || '0');
    const bnMaxTransfer = new BN(maxTransfer || '0');

    if (bnTransferAmount.gt(BN_ZERO) && bnTransferAmount.eq(bnMaxTransfer)) {
      setIsTransferAll(true);
    }
  }, [maxTransfer, transferAmount]);

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
            className={CN({ hidden: !isAllAccount })}
            name={'from'}
          >
            <AccountSelector
              addressPrefix={fromChainNetworkPrefix}
              disabled={!isAllAccount}
              filter={onFilterAccountFunc}
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

          <Form.Item
            className={'hidden'}
            name={'chain'}
          >
            <Input
              placeholder={t('value')}
            />
          </Form.Item>

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
              chain={chain}
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
              maxValue={maxTransfer}
              onSetMax={onSetMaxTransferable}
              showMaxButton={true}
              tooltip={t('Amount')}
            />
          </Form.Item>
        </Form>

        <FreeBalance
          address={from}
          chain={chain}
          onBalanceReady={setIsBalanceReady}
          tokenSlug={asset}
        />
      </TransactionContent>
      <TransactionFooter
        className={`${className} -transaction-footer`}
        errors={[]}
        warnings={[]}
      >
        <Button
          disabled={!isBalanceReady}
          icon={(
            <Icon
              phosphorIcon={PaperPlaneTilt}
              weight={'fill'}
            />
          )}
          loading={loading}
          onClick={checkAction(form.submit, extrinsicType)}
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
