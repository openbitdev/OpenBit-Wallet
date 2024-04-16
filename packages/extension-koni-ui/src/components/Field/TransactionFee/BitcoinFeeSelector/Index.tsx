// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinFeeDetail, TransactionFee } from '@subwallet/extension-base/types';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BitcoinFeeOption } from '@subwallet/extension-koni-ui/types/fee';
import {Button, Field, Icon, ModalContext, Number} from '@subwallet/react-ui';
import { PencilSimpleLine } from 'phosphor-react';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BitcoinFeeEditorModal } from './BitcoinFeeEditorModal';

type Props = ThemeProps & {
  feeDetail: BitcoinFeeDetail;
  onSelect: (transactionFee: TransactionFee) => void;
  isLoading?: boolean;
};

const modalId = 'BitcoinFeeSelectorId';

const Component = ({ className, feeDetail }: Props): React.ReactElement<Props> => {
  const { t } = useTranslation();
  const { activeModal } = useContext(ModalContext);
  const [selectedOption, setSelectedOption] = useState<BitcoinFeeOption>({ option: feeDetail.options.default });

  const onClickEdit = useCallback(() => {
    activeModal(modalId);
  }, [activeModal]);

  return (
    <>
      <Field
        className={className}
        content={(
          <div>
              <Number
                  className={'__fee-token-value'}
                  decimal={2}
                  size={14}
                  suffix={'DOT'}
                  value={'0.2'}
              />
          </div>
        )}
        label={'Transaction fee'}
        placeholder={t('Network name')}
        suffix={(
          <div className={'__right-button'}>
              <Number
                  className={'__fee-value'}
                  decimal={2}
                  size={14}
                  prefix={'$'}
                  value={'1.60'}
              />
            <Button
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

      <BitcoinFeeEditorModal
        feeDetailOptions={feeDetail.options}
        modalId={modalId}
        onSelectOption={setSelectedOption}
        selectedOption={selectedOption}
      />
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
      '.__right-button .ant-btn-ghost': {
          width: 20,
          height: 20,
          alignItems: 'end',
          marginRight: -10
      },
      '.ant-field-wrapper': {
          paddingBottom: 12
      },
          '.__fee-value': {
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
