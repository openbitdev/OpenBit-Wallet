// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinFeeInfo } from '@subwallet/extension-base/types';
import { BasicInputEvent, RadioGroup } from '@subwallet/extension-koni-ui/components';
import { FormCallbacks, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BitcoinFeeOption } from '@subwallet/extension-koni-ui/types/fee';
import { Form, Icon, Input, ModalContext, SwModal } from '@subwallet/react-ui';
import CN from 'classnames';
import { CaretLeft, CheckCircle } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Props = ThemeProps & {
  modalId: string;
  feeDetailOptions: BitcoinFeeInfo['options'];
  selectedOption: BitcoinFeeOption;
  onSelectOption: (option: BitcoinFeeOption) => void
};

enum ViewMode {
  RECOMMENDED = 'recommended',
  CUSTOM = 'custom'
}

interface ViewOption {
  label: string;
  value: ViewMode;
}

interface FormProps {
  customValue: number;
}

const OPTIONS: BitcoinFeeOption[] = [
  {
    option: 'slow'
  },
  {
    option: 'average'
  },
  {
    option: 'fast'
  }
];

function getCustomValue (selectedOption: BitcoinFeeOption, feeDetailOptions: BitcoinFeeInfo['options']) {
  if (selectedOption.option === 'custom') {
    return {
      customValue: selectedOption.customValue.feeRate
    };
  }

  return {
    customValue: feeDetailOptions[selectedOption.option].feeRate
  };
}

const Component = ({ className, feeDetailOptions, modalId, onSelectOption, selectedOption }: Props): React.ReactElement<Props> => {
  const { t } = useTranslation();
  const { inactiveModal } = useContext(ModalContext);
  const [currentViewMode, setViewMode] = useState<ViewMode>(selectedOption.option === 'custom' ? ViewMode.CUSTOM : ViewMode.RECOMMENDED);

  const onCancelModal = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal, modalId]);

  const [form] = Form.useForm<FormProps>();

  const formDefault = useMemo((): FormProps => {
    return getCustomValue(selectedOption, feeDetailOptions);
  }, [feeDetailOptions, selectedOption]);

  useEffect(() => {
    setViewMode(selectedOption.option === 'custom' ? ViewMode.CUSTOM : ViewMode.RECOMMENDED);
  }, [selectedOption.option]);

  const viewOptions = useMemo((): ViewOption[] => {
    return [
      {
        label: t('Recommended'),
        value: ViewMode.RECOMMENDED
      },
      {
        label: t('Custom'),
        value: ViewMode.CUSTOM
      }
    ];
  }, [t]);

  const onChaneViewMode = useCallback((event: BasicInputEvent) => {
    setViewMode(event.target.value as ViewMode);
  }, []);

  const _onSelectOption = useCallback((o: BitcoinFeeOption) => {
    return () => {
      onSelectOption(o);
      form.setFieldValue('customValue', getCustomValue(o, feeDetailOptions).customValue);
      inactiveModal(modalId);
    };
  }, [feeDetailOptions, form, inactiveModal, modalId, onSelectOption]);

  const renderOption = (o: BitcoinFeeOption) => {
    if (o.option === 'custom') {
      return null;
    }

    const feeRate = feeDetailOptions[o.option].feeRate;

    return (
      <div
        className={'__fee-option-item'}
        key={o.option}
        onClick={_onSelectOption(o)}
      >
        <div>
          {o.option} - {feeRate}
        </div>
        {
          selectedOption.option === o.option && (
            <div>
              <Icon
                phosphorIcon={CheckCircle}
                weight='fill'
              />
            </div>
          )
        }
      </div>
    );
  };

  const onValuesChange: FormCallbacks<FormProps>['onValuesChange'] = useCallback((changes: Partial<FormProps>, values: FormProps) => {

  }, []);

  return (
    <SwModal
      className={CN(className)}
      closeIcon={(
        <Icon
          phosphorIcon={CaretLeft}
          size='md'
        />
      )}
      id={modalId}
      onCancel={onCancelModal}
      title={t('Choose fee')}
    >
      <div className={'__switcher-box'}>
        <RadioGroup
          onChange={onChaneViewMode}
          optionType='button'
          options={viewOptions}
          value={currentViewMode}
        />
      </div>

      {
        currentViewMode === ViewMode.RECOMMENDED && (
          <div>
            {OPTIONS.map(renderOption)}
          </div>
        )
      }

      {
        currentViewMode === ViewMode.CUSTOM && (
          <div>
            <Form
              form={form}
              initialValues={formDefault}
              onValuesChange={onValuesChange}
            >
              <Form.Item
                name={'customValue'}
              >
                <Input
                  min={0}
                  placeholder={'0.1 - 2'}
                  type={'number'}
                />
              </Form.Item>
            </Form>
          </div>
        )
      }
    </SwModal>
  );
};

export const BitcoinFeeEditorModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    '.__fee-option-item': {
      backgroundColor: token.colorBgSecondary,
      cursor: 'pointer'
    },

    '.__fee-option-item + .__fee-option-item': {
      marginTop: token.marginXS
    }
  });
});
