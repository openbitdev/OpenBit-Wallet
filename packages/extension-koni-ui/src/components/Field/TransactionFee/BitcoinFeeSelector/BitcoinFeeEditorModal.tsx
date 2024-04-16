// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {BitcoinFeeInfo, FeeDefaultOption} from '@subwallet/extension-base/types';
import { BasicInputEvent, RadioGroup } from '@subwallet/extension-koni-ui/components';
import {FormCallbacks, PhosphorIcon, ThemeProps} from '@subwallet/extension-koni-ui/types';
import { BitcoinFeeOption } from '@subwallet/extension-koni-ui/types/fee';
import {Form, Icon, Input, ModalContext, SwIconProps, SwModal} from '@subwallet/react-ui';
import CN from 'classnames';
import {CaretLeft, CheckCircle, Lightning, Wind, Tree} from 'phosphor-react';
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

interface IconOption {
  icon: PhosphorIcon;
  color: string;
  weight: SwIconProps['weight'];
}

const IconMap: Record<FeeDefaultOption, IconOption> = {
  slow: {
    icon: Tree,
    color: 'green',
    weight: 'bold'
  },
  average: {
    icon: Wind,
    color: 'blue',
    weight: 'bold'
  },
  fast: {
    icon: Lightning,
    color: 'gold',
    weight: 'bold'
  }
};

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
    const iconOption = IconMap[o.option];

    return (
      <div
        className={'__fee-option-item'}
        key={o.option}
        onClick={_onSelectOption(o)}
      >
        <div className={'__left-part-wrapper'}>
        <div className={'__left-part'} style={{backgroundColor: iconOption.color}}>
          <Icon
              phosphorIcon={iconOption.icon}
              weight={iconOption.weight}
          />
        </div>
        </div>
        <div className={'__right-part-wrapper'}>
          <div className={'__right-part'}>
          <div className={'__line-1'}>
            <div className={'__label'}>{o.option}</div>
            <div className={'__value'}>&nbsp;- {feeRate}&nbsp;sats/vB</div>
          </div>
          <div className={'__line-2'}>
            <div className={'__label'}>Time</div>
            <div className={'__value'}>&nbsp;~&nbsp;30 min&nbsp;</div>
          </div>
          <div className={'__line-3'}>
            <div className={'__label'}>Max fee:</div>
            <div className={'__value'}>&nbsp;0.000123 BTC&nbsp;</div>
          </div>
          </div>
          <div className={'__selection-item'}>
            {
                selectedOption.option === o.option && (
                    <div>
                      <Icon
                          phosphorIcon={CheckCircle}
                          weight='fill'
                          iconColor={'#7EE76C'}
                          customSize={'20px'}
                      />
                    </div>
                )
            }
          </div>
        </div>
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
          <div className={'__option-item'}>
            {OPTIONS.map(renderOption)}
          </div>
        )
      }

      {
        currentViewMode === ViewMode.CUSTOM && (
          <div className={'__custom-mode'}>
            <Form
              form={form}
              initialValues={formDefault}
              onValuesChange={onValuesChange}
            >
              <Form.Item
                name={'customValue'}
              >
                <Input
                    label={'sats/vB'}
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
  console.log('token', token);
  return ({
    '.__fee-option-item': {
      backgroundColor: token.colorBgSecondary,
      cursor: 'pointer',
      display: 'flex',
      gap: 12,
      padding: 12,
      borderRadius: 8
    },
    '.__line-1': {
      fontSize: 16,
      fontWeight: token.fontWeightStrong,
      lineHeight: token.lineHeightLG
    },
    '.__line-2 .__label, .__line-3 .__label': {
      fontSize: 14,
      lineHeight: token.lineHeight,
      color: token.colorTextTertiary
    },
    '.__right-part-wrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1
    },
    '.__value': {
      color: token.colorTextLabel
    },
    '.__left-part': {
      display: 'flex',
      borderRadius: '50%',
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },
    '.__left-part-wrapper': {
      display: 'flex',
      alignItems: 'center'
    },
    '.__option-item': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 16
    },
    '.__fee-option-item + .__fee-option-item': {
      marginTop: token.marginXS
    },
    '.__line-1, .__line-2, .__line-3': {
      display: 'flex',
      gap: 8
    },
    '.__custom-mode': {
      marginTop: 16
    },
    '.__selection-ite': {
      display: 'flex',
      alignItems: 'center'
    }
  });
});
