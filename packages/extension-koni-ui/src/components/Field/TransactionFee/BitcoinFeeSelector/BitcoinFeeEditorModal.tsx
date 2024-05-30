// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinFeeDetail, FeeDefaultOption } from '@subwallet/extension-base/types';
import { balanceFormatter, BN_ZERO, formatNumber } from '@subwallet/extension-base/utils';
import { BasicInputEvent, RadioGroup } from '@subwallet/extension-koni-ui/components';
import { FormCallbacks, PhosphorIcon, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BitcoinFeeOption } from '@subwallet/extension-koni-ui/types/fee';
import { Button, Form, Icon, Input, ModalContext, Number, SwIconProps, SwModal } from '@subwallet/react-ui';
import { Rule } from '@subwallet/react-ui/es/form';
import BigN from 'bignumber.js';
import CN from 'classnames';
import { CaretLeft, CheckCircle, Lightning, Tree, Wind } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Props = ThemeProps & {
  modalId: string;
  feeDetail: BitcoinFeeDetail;
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
  customValue: string;
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

function validateCustomValue (value: string) {
  return /^\d+$/.test(value) && !value.includes('e');
}

const Component = ({ className, feeDetail, modalId, onSelectOption, selectedOption }: Props): React.ReactElement<Props> => {
  const { t } = useTranslation();
  const { inactiveModal } = useContext(ModalContext);
  const [currentViewMode, setViewMode] = useState<ViewMode>(selectedOption.option === 'custom' ? ViewMode.CUSTOM : ViewMode.RECOMMENDED);

  const [form] = Form.useForm<FormProps>();

  const customValue = Form.useWatch('customValue', form);

  const formDefault = useMemo((): FormProps => {
    if (selectedOption.option === 'custom') {
      return {
        customValue: `${selectedOption.customValue.feeRate}`
      };
    }

    return {
      customValue: ''
    };
  }, [selectedOption]);

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

  const onCancelModal = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal, modalId]);

  const _onSelectOption = useCallback((o: BitcoinFeeOption) => {
    return () => {
      onSelectOption(o);
      inactiveModal(modalId);
    };
  }, [inactiveModal, modalId, onSelectOption]);

  const convertTime = useCallback((milliseconds?: number): string => {
    if (milliseconds !== undefined && milliseconds >= 0) {
      const seconds = milliseconds / 1000;

      const days = Math.floor(seconds / 86400); // 86400 seconds in a day
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      let timeString = '';

      if (days > 0) {
        timeString += `${days} ${days === 1 ? 'day' : 'days'}`;
      }

      if (hours > 0) {
        timeString += ` ${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
      }

      if (minutes > 0) {
        timeString += ` ${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
      }

      return timeString.trim() || '0 min'; // Return '0 minutes' if time is 0
    } else {
      return 'unknown time';
    }
  }, []);

  const renderOption = (o: BitcoinFeeOption) => {
    if (o.option === 'custom') {
      return null;
    }

    const feeRate = feeDetail.options[o.option].feeRate;
    const iconOption = IconMap[o.option];
    const timeOption = feeDetail.options[o.option].time;
    const name = (() => {
      if (o.option === 'slow') {
        return t('Low');
      }

      if (o.option === 'average') {
        return t('Average');
      }

      return t('High');
    })();

    return (
      <div
        className={'__fee-option-item'}
        key={o.option}
        onClick={_onSelectOption(o)}
      >
        <div className={'__left-part-wrapper'}>
          <div
            className={'__left-part'}
            style={{ backgroundColor: iconOption.color }}
          >
            <Icon
              customSize={'16px'}
              phosphorIcon={iconOption.icon}
              weight={'fill'}
            />
          </div>
        </div>
        <div className={'__right-part-wrapper'}>
          <div className={'__right-part'}>
            <div className={'__line-1'}>{name}&nbsp;<span className={'__label'}>- {feeRate}&nbsp;sats/vB</span></div>
            <div className={'__line-2'}>
              <div className={'__label'}>Time</div>
              <div className={'__value'}>~&nbsp;{convertTime(timeOption)}</div>
            </div>
            <div className={'__line-3'}>
              <div className={'__label'}>Fee</div>
              <div className={'__value'}>
                <Number
                  className={'__fee-value'}
                  decimal={8} // decimals of bitcoin is 8, will update dynamic value later
                  suffix={'BTC'} // will update dynamic value later
                  value={feeRate * feeDetail.vSize}
                />
              </div>
            </div>
          </div>

          <div className={'__selection-item'}>
            {
              selectedOption.option === o.option && (
                <Icon
                  customSize={'20px'}
                  iconColor={'#7EE76C'}
                  phosphorIcon={CheckCircle}
                  weight='fill'
                />
              )
            }
          </div>
        </div>
      </div>
    );
  };

  const customValueValidator = useCallback((rule: Rule, value: string): Promise<void> => {
    if (value && !validateCustomValue(value)) {
      return Promise.reject(t('Invalid value'));
    }

    const low = feeDetail.options.slow.feeRate;
    const val = parseFloat(value);

    if (low > val) {
      const minString = formatNumber(low, 0, balanceFormatter);

      return Promise.reject(t('Custom fee should be greater than {{min}} sats/vB', { min: minString }));
    }

    return Promise.resolve();
  }, [feeDetail, t]);

  const convertedCustomValue = useMemo<BigN>(() => {
    if (validateCustomValue(customValue)) {
      return new BigN(customValue).multipliedBy(feeDetail.vSize);
    }

    return BN_ZERO;
  }, [customValue, feeDetail.vSize]);

  const canSubmitCustom = useMemo((): boolean => {
    if (validateCustomValue(customValue)) {
      return new BigN(customValue).gt(0);
    } else {
      return false;
    }
  }, [customValue]);

  const onSubmitCustomValue: FormCallbacks<FormProps>['onFinish'] = useCallback(({ customValue }: FormProps) => {
    inactiveModal(modalId);
    onSelectOption({
      option: 'custom',
      customValue: { feeRate: +customValue }
    });
  }, [inactiveModal, modalId, onSelectOption]);

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
              onFinish={onSubmitCustomValue}
            >
              <Form.Item
                name={'customValue'}
                rules={[
                  {
                    validator: customValueValidator
                  }
                ]}
              >
                <Input
                  label={'sats/vB'}
                  min={1}
                  placeholder={'Enter sats/vB'}
                  suffix={(
                    <Number
                      className={'__converted-value'}
                      decimal={8} // decimals of bitcoin is 8, will update dynamic value later
                      suffix={'BTC'} // will update dynamic value later
                      value={convertedCustomValue}
                    />
                  )}
                  type={'number'}
                />
              </Form.Item>
            </Form>

            <Button
              block={true}
              disabled={!canSubmitCustom}
              onClick={form.submit}
            >
              Use custom fee
            </Button>
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
      cursor: 'pointer',
      display: 'flex',
      gap: 12,
      padding: 12,
      borderRadius: 8,
      overflow: 'hidden'
    },
    '.__fee-option-item: hover': {
      backgroundColor: token.colorBgInput,
      transition: 'backgroundColor 0.2s ease-in-out'
    },
    '.__line-1 .__label': {
      color: token.colorTextSecondary,
      overflow: 'hidden',
      'white-space': 'nowrap',
      textOverflow: 'ellipsis'
    },
    '.__converted-value': {
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      fontWeight: token.headingFontWeight,
      color: token.colorTextTertiary,
      paddingLeft: 8,
      paddingRight: 8,

      '.ant-number-integer': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      },

      '.ant-number-decimal, .ant-number-suffix': {
        color: `${token.colorTextTertiary} !important`,
        fontSize: `${token.fontSizeHeading6}px !important`,
        fontWeight: 'inherit !important',
        lineHeight: token.lineHeightHeading6
      }
    },
    '.__line-1': {
      display: 'flex',
      fontSize: 16,
      fontWeight: token.fontWeightStrong,
      lineHeight: token.lineHeightLG,
      'white-space': 'nowrap'
    },
    '.__line-2 .__label, .__line-3 .__label': {
      minWidth: 68,
      fontSize: 14,
      lineHeight: token.lineHeight,
      color: token.colorTextTertiary
    },
    '.__right-part-wrapper': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      overflow: 'hidden'
    },
    '.__right-part': {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      overflow: 'hidden'
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
    '.__line-2, .__line-3': {
      display: 'flex',
      gap: 8
    },
    '.__line-2 .__value': {
      color: token.colorTextLight2,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      fontWeight: token.bodyFontWeight
    },
    '.__fee-value': {
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      fontWeight: token.bodyFontWeight,
      color: token.colorTextLight2,

      '.ant-number-integer': {
        color: 'inherit !important',
        fontSize: 'inherit !important',
        fontWeight: 'inherit !important',
        lineHeight: 'inherit'
      },

      '.ant-number-decimal, .ant-number-suffix': {
        color: `${token.colorTextLight2} !important`,
        fontSize: `${token.fontSize}px !important`,
        fontWeight: 'inherit !important',
        lineHeight: token.lineHeight
      }
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
