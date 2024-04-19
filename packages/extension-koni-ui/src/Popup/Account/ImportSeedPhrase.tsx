// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CloseIcon, Layout, PageWrapper, PhraseNumberSelector, SeedPhraseInput } from '@subwallet/extension-koni-ui/components';
import { SELECT_ACCOUNT_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useAutoNavigateToCreatePassword, useCompleteCreateAccount, useDefaultNavigate, useFocusFormItem, useGetDefaultAccountProxyName, useGoBackFromCreateAccount, useNotification, useTranslation, useUnlockChecker } from '@subwallet/extension-koni-ui/hooks';
import { createAccountProxySuri, validateSeedV2 } from '@subwallet/extension-koni-ui/messaging';
import { FormCallbacks, FormFieldData, FormRule, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { convertFieldToObject, noop, simpleCheckForm } from '@subwallet/extension-koni-ui/utils';
import { Button, Form, Icon, Input } from '@subwallet/react-ui';
import { wordlists } from 'bip39';
import CN from 'classnames';
import { Eye, EyeSlash, FileArrowDown } from 'phosphor-react';
import React, {ClipboardEventHandler, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';

type Props = ThemeProps;

const FooterIcon = (
  <Icon
    phosphorIcon={FileArrowDown}
    weight='fill'
  />
);

const formName = 'import-seed-phrase-form';
const fieldNamePrefix = 'seed-phrase-';

interface FormState extends Record<`seed-phrase-${number}`, string> {
  phraseNumber: string;
  trigger: string; // Use for trigger validate when change phraseNumber
}

const words = wordlists.english;

const Component: React.FC<Props> = ({ className }: Props) => {
  useAutoNavigateToCreatePassword();

  const { t } = useTranslation();
  const { goHome } = useDefaultNavigate();
  const notification = useNotification();

  const onComplete = useCompleteCreateAccount();
  const onBack = useGoBackFromCreateAccount(SELECT_ACCOUNT_MODAL);

  const accountName = useGetDefaultAccountProxyName();

  const [form] = Form.useForm<FormState>();

  const phraseNumber = Form.useWatch('phraseNumber', form);

  const [submitting, setSubmitting] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [showSeed, setShowSeed] = useState(false);
  const checkUnlock = useUnlockChecker();

  const phraseNumberItems = useMemo(() => [12, 24].map((value) => ({
    label: t('{{number}} words', { replace: { number: value } }),
    value: String(value)
  })), [t]);

  const formDefault: FormState = useMemo(() => ({
    phraseNumber: '24',
    trigger: 'trigger'
  }), []);

  const onFieldsChange: FormCallbacks<FormState>['onFieldsChange'] = useCallback((changedFields: FormFieldData[], allFields: FormFieldData[]) => {
    const { empty, error } = simpleCheckForm(allFields);

    const { phraseNumber } = convertFieldToObject<FormState>(changedFields);

    if (phraseNumber) {
      form.validateFields(['trigger']).finally(noop);
    }

    setDisabled(empty || error);
  }, [form]);

  const allPhraseNumber = useMemo(() => {
    return phraseNumberItems.map(item => item.value);
  },[phraseNumberItems])

  const onPasteData: ClipboardEventHandler<HTMLInputElement> = useCallback((event) => {
    const value = event.clipboardData.getData('text');

    const data = value.trim().split(' ');

    if (data.length > 1) {
      event.preventDefault();
    } else {
      return;
    }

    const wordCount = String(data.length);
    if (allPhraseNumber.includes(wordCount)) {
      try {
        form.setFieldValue('phraseNumber', wordCount);
      } catch (error) {
        console.error('Error updating phraseNumber field:', error);
      }
    }
  }, [form])

  const onFinish: FormCallbacks<FormState>['onFinish'] = useCallback((values: FormState) => {
    const { phraseNumber: _phraseNumber } = values;
    const seedKeys = Object.keys(values).filter((key) => key.startsWith(fieldNamePrefix));
    const phraseNumber = parseInt(_phraseNumber);

    if (![12, 15, 18, 21, 24].includes(seedKeys.length)) {
      throw Error(t('Mnemonic needs to contain 12, 15, 18, 21, 24 words'));
    }

    const seeds: string[] = [];

    for (let i = 0; i < phraseNumber; i++) {
      seeds.push(values[`${fieldNamePrefix}${i}`]);
    }

    if (seeds.some((value) => !value)) {
      throw Error(t('Mnemonic needs to contain 12, 15, 18, 21, 24 words'));
    }

    const seed = seeds.join(' ');

    if (seed) {
      checkUnlock()
        .then(() => {
          setSubmitting(true);
          validateSeedV2(seed, [])
            .then(() => {
              return createAccountProxySuri({
                name: accountName,
                suri: seed
              });
            })
            .then(() => {
              onComplete();
            })
            .catch((error: Error): void => {
              notification({
                type: 'error',
                message: error.message
              });
            })
            .finally(() => {
              setSubmitting(false);
            });
        })
        .catch(() => {
          // Unlock is cancelled
        });
    }
  }, [t, checkUnlock, accountName, onComplete, notification]);

  const seedValidator = useCallback((rule: FormRule, value: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!value) {
        reject(new Error(t('This field is required')));
      }

      if (!words.includes(value)) {
        reject(new Error(t('Invalid word')));
      }

      resolve();
    });
  }, [t]);

  const toggleShow = useCallback(() => {
    setShowSeed((value) => !value);
  }, []);

  useFocusFormItem(form, `${fieldNamePrefix}0`);

  return (
    <PageWrapper className={CN(className)}>
      <Layout.WithSubHeaderOnly
        onBack={onBack}
        rightFooterButton={{
          children: t('Import account'),
          icon: FooterIcon,
          onClick: form.submit,
          disabled: disabled,
          loading: submitting
        }}
        subHeaderIcons={[
          {
            icon: <CloseIcon />,
            onClick: goHome
          }
        ]}
        title={t<string>('Import from seed phrase')}
      >
        <div className='container'>
          <div className='description'>
            {t('Enter seed phrase to import an existing account')}
          </div>
          <Form
            className='form-container form-space-xs'
            form={form}
            initialValues={formDefault}
            name={formName}
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
          >
            <Form.Item name={'phraseNumber'}>
              <PhraseNumberSelector
                items={phraseNumberItems}
              />
            </Form.Item>
            <Form.Item
              hidden={true}
              name='trigger'
            >
              <Input />
            </Form.Item>
            <div className='content-container'>
              <div className='button-container'>
                <Button
                  icon={(
                    <Icon
                      phosphorIcon={showSeed ? EyeSlash : Eye}
                      size='sm'
                    />
                  )}
                  onClick={toggleShow}
                  size='xs'
                  type='ghost'
                >
                  {showSeed ? t('Hide seed phrase') : t('Show seed phrase')}
                </Button>
              </div>
              <div className='seed-container'>
                {
                  new Array(parseInt(phraseNumber || '12')).fill(null).map((value, index) => {
                    const name = fieldNamePrefix + String(index);

                    return (
                      <Form.Item
                        key={index}
                        name={name}
                        rules={[{
                          validator: seedValidator
                        }]}
                        statusHelpAsTooltip={true}
                        validateTrigger={['onChange']}
                      >
                        <SeedPhraseInput
                          form={form}
                          formName={formName}
                          hideText={!showSeed}
                          index={index}
                          prefix={fieldNamePrefix}
                          onPasteData = {onPasteData}

                        />
                      </Form.Item>
                    );
                  })
                }
              </div>
            </div>
          </Form>
        </div>
      </Layout.WithSubHeaderOnly>
    </PageWrapper>
  );
};

const ImportSeedPhrase = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.container': {
      padding: token.padding
    },

    '.ant-form-item:last-child': {
      marginBottom: 0
    },

    '.description': {
      padding: `0 ${token.padding}px`,
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      color: token.colorTextDescription,
      textAlign: 'center',
      whiteSpaceCollapse: 'break-spaces'
    },

    '.form-container': {
      marginTop: token.margin
    },

    '.content-container': {
      padding: token.paddingXS,
      display: 'flex',
      flexDirection: 'column',
      gap: token.sizeXS,
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG
    },

    '.button-container': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    '.seed-container': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: token.sizeXS,

      '.ant-form-item': {
        minWidth: 0,
        marginBottom: 0
      }
    }
  };
});

export default ImportSeedPhrase;
