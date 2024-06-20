// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _getAssetDecimals, _getAssetPriceId, _getAssetSymbol } from '@subwallet/extension-base/services/chain-service/utils';
import { BitcoinFeeDetail, TransactionFee } from '@subwallet/extension-base/types';
import { BN_TEN, BN_ZERO } from '@subwallet/extension-base/utils';
import { useSelector } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BitcoinFeeOption } from '@subwallet/extension-koni-ui/types/fee';
import { ActivityIndicator, Button, Field, Icon, ModalContext, Number } from '@subwallet/react-ui';
import BigN from 'bignumber.js';
import { PencilSimpleLine } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BitcoinFeeEditorModal } from './BitcoinFeeEditorModal';

type Props = ThemeProps & {
  feeDetail: BitcoinFeeDetail | undefined;
  onSelect: (transactionFee: TransactionFee) => void;
  isLoading?: boolean;
  tokenSlug: string;
  resetTrigger?: unknown;
};

// todo: will update dynamic later
const modalId = 'BitcoinFeeSelectorId';

const Component = ({ className, feeDetail, isLoading, onSelect, resetTrigger, tokenSlug }: Props): React.ReactElement<Props> => {
  const { t } = useTranslation();
  const { activeModal } = useContext(ModalContext);
  const assetRegistry = useSelector((root) => root.assetRegistry.assetRegistry);
  const [selectedOption, setSelectedOption] = useState<BitcoinFeeOption | undefined>(undefined);
  const priceMap = useSelector((state) => state.price.priceMap);
  const resetTriggerRef = useRef<unknown>(resetTrigger);
  const [modalRenderKey, setModalRenderKey] = useState<string>(modalId);

  const tokenAsset = (() => {
    return assetRegistry[tokenSlug] || undefined;
  })();

  const decimals = _getAssetDecimals(tokenAsset);
  const priceId = _getAssetPriceId(tokenAsset);
  const symbol = _getAssetSymbol(tokenAsset);

  const tokenFeePriceValue = useMemo(() => {
    if (!feeDetail) {
      return BN_ZERO;
    }

    if (!isLoading && feeDetail.estimatedFee) {
      const price = priceMap[priceId] || 0;

      return new BigN(feeDetail.estimatedFee).div(BN_TEN.pow(decimals || 0)).multipliedBy(price);
    }

    return BN_ZERO;
  }, [feeDetail, isLoading, priceMap, priceId, decimals]);

  const onClickEdit = useCallback(() => {
    setModalRenderKey(`${modalId}_${Date.now()}`);

    setTimeout(() => {
      activeModal(modalId);
    }, 100);
  }, [activeModal]);

  const onSelectOption = useCallback((option: BitcoinFeeOption) => {
    setSelectedOption(option);

    onSelect({
      feeOption: option.option,
      feeCustom: option.option === 'custom'
        ? option.customValue
        : undefined
    });
  }, [onSelect]);

  const feeValue = useMemo(() => {
    if (!selectedOption || !feeDetail) {
      return '0';
    }

    if (selectedOption.option === 'custom') {
      return new BigN(selectedOption.customValue.feeRate).multipliedBy(feeDetail.vSize);
    }

    const feeRate = feeDetail.options[selectedOption.option].feeRate;

    return new BigN(feeRate).multipliedBy(feeDetail.vSize);
  }, [feeDetail, selectedOption]);

  useEffect(() => {
    if (feeDetail && !selectedOption) {
      setSelectedOption({ option: feeDetail.options.default });
    }
  }, [feeDetail, selectedOption]);

  useEffect(() => {
    if (feeDetail && resetTrigger !== resetTriggerRef.current) {
      setSelectedOption({ option: feeDetail.options.default });
      resetTriggerRef.current = resetTrigger;
    }
  }, [feeDetail, resetTrigger]);

  return (
    <>
      <Field
        className={className}
        content={(
          <div>
            {isLoading || !feeDetail || !selectedOption
              ? (
                <ActivityIndicator size={20} />
              )
              : (
                <Number
                  className={'__fee-token-value'}
                  decimal={decimals}
                  size={14}
                  suffix={symbol}
                  value={feeValue}
                />
              )}
          </div>
        )}
        label={'Transaction fee'}
        placeholder={t('Network name')}
        suffix={(
          <div className={'__right-button'}>
            <Number
              className={'__fee-price-value'}
              decimal={0}
              prefix={'$'}
              size={14}
              value={tokenFeePriceValue}
            />
            <Button
              disabled={isLoading || !feeDetail || !selectedOption}
              icon={
                <Icon
                  phosphorIcon={PencilSimpleLine}
                  size='sm'
                />
              }
              onClick={onClickEdit}
              size='xs'
              type='ghost'
            />
          </div>
        )}
        tooltipPlacement='topLeft'
      />

      {
        feeDetail && selectedOption && (
          <BitcoinFeeEditorModal
            feeDetail={feeDetail}
            key={modalRenderKey}
            modalId={modalId}
            onSelectOption={onSelectOption}
            selectedOption={selectedOption}
          />
        )
      }
    </>
  );
};

const BitcoinFeeSelector = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    paddingBottom: 2,
    '.__right-button': {
      display: 'flex',
      alignItems: 'center'
    },
    '.ant-field-wrapper.ant-field-wrapper': {
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 0,
      marginBottom: -2
    },
    '.__fee-price-value': {
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      fontWeight: token.headingFontWeight,
      color: token.colorTextTertiary,

      '.ant-number-integer': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      },

      '.ant-number-decimal, .ant-number-prefix': {
        color: `${token.colorTextTertiary} !important`,
        fontSize: `${token.fontSizeHeading6}px !important`,
        fontWeight: 'inherit !important',
        lineHeight: token.lineHeightHeading6
      }
    },
    '.__fee-token-value': {
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      fontWeight: token.headingFontWeight,
      color: token.colorWhite,

      '.ant-number-integer': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      },

      '.ant-number-suffix': {
        color: `${token.colorTextTertiary} !important`,
        fontSize: `${token.fontSizeHeading6}px !important`,
        fontWeight: 'inherit !important',
        lineHeight: token.lineHeightHeading6
      }
    }

  });
});

export default BitcoinFeeSelector;
