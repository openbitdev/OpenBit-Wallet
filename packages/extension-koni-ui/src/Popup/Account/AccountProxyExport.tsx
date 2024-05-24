// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Layout, PageWrapper } from '@subwallet/extension-koni-ui/components';
import AlertBox from '@subwallet/extension-koni-ui/components/Alert';
import CloseIcon from '@subwallet/extension-koni-ui/components/Icon/CloseIcon';
import WordPhrase from '@subwallet/extension-koni-ui/components/WordPhrase';
import { DEFAULT_ROUTER_PATH } from '@subwallet/extension-koni-ui/constants/router';
import { useGetAccountProxyByProxyId } from '@subwallet/extension-koni-ui/hooks';
import useCopy from '@subwallet/extension-koni-ui/hooks/common/useCopy';
import useFocusFormItem from '@subwallet/extension-koni-ui/hooks/form/useFocusFormItem';
import useDefaultNavigate from '@subwallet/extension-koni-ui/hooks/router/useDefaultNavigate';
import { keyringExportAccountProxyMnemonic } from '@subwallet/extension-koni-ui/messaging';
import { PhosphorIcon, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { FormCallbacks, FormFieldData } from '@subwallet/extension-koni-ui/types/form';
import { KeyringPair$Json } from '@subwallet/keyring/types';
import { BackgroundIcon, Button, Field, Form, Icon, Input, PageIcon, SettingItem } from '@subwallet/react-ui';
import CN from 'classnames';
import { CheckCircle, CopySimple, FileJs, Leaf, QrCode, Wallet } from 'phosphor-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps;

enum ExportType {
  JSON_FILE = 'json-file',
  PRIVATE_KEY = 'private-key',
  QR_CODE = 'qr-code',
  SEED_PHRASE = 'seed-phrase'
}

interface ExportItem {
  disable: boolean;
  hidden: boolean;
  icon: PhosphorIcon;
  label: string;
  type: ExportType;
}

enum FormFieldName {
  PASSWORD = 'password',
  TYPES = 'types',
}

interface ExportFormState {
  [FormFieldName.PASSWORD]: string;
  [FormFieldName.TYPES]: ExportType[];
}

const FinishIcon = (
  <Icon
    phosphorIcon={CheckCircle}
    weight='fill'
  />
);

const formName = 'account-export-form';

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { goHome } = useDefaultNavigate();
  const { accountProxyId } = useParams();

  const accountProxy = useGetAccountProxyByProxyId(accountProxyId);

  const [form] = Form.useForm<ExportFormState>();

  const [exportTypes, setExportTypes] = useState<ExportType[]>([]);
  const exportSingle = exportTypes.length <= 1;

  const [firstStep, setFirstStep] = useState(true);

  const [isDisabled, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const [privateKey, setPrivateKey] = useState<string>('');
  // @ts-ignore
  const [publicKey, setPublicKey] = useState<string>('');
  // @ts-ignore
  const [jsonData, setJsonData] = useState<null | KeyringPair$Json>(null);
  const [seedPhrase, setSeedPhrase] = useState<string>('');

  const titleMap = useMemo((): Record<ExportType, string> => ({
    [ExportType.JSON_FILE]: t('Successful'),
    [ExportType.QR_CODE]: t('Your QR code'),
    [ExportType.PRIVATE_KEY]: t('Your private key'),
    [ExportType.SEED_PHRASE]: t('Your seed phrase')
  }), [t]);

  const onCopyPrivateKey = useCopy(privateKey);

  const onUpdate: FormCallbacks<ExportFormState>['onFieldsChange'] = useCallback((changedFields: FormFieldData[], allFields: FormFieldData[]) => {
    const error = allFields.map((data) => data.errors || [])
      .reduce((old, value) => [...old, ...value])
      .some((value) => !!value);

    const empty = allFields.map((data) => data.value as unknown).some((value) => !value);

    setIsDisable(error || empty);
  }, []);

  const onSubmit: FormCallbacks<ExportFormState>['onFinish'] = useCallback((values: ExportFormState) => {
    const password = values[FormFieldName.PASSWORD];
    const exportTypes = values[FormFieldName.TYPES];

    if (!exportTypes.length) {
      return;
    }

    if (!accountProxy) {
      return;
    }

    const proxyId = accountProxy.proxyId;

    if (!proxyId) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const promise = new Promise<void>((resolve, reject) => {
        const result = {
          seedPhrase: false
          // privateKey: false,
          // jsonFile: false
        };

        const checkDone = () => {
          if (Object.values(result).every((value) => value)) {
            resolve();
          }
        };

        if (exportTypes.includes(ExportType.SEED_PHRASE) && accountProxy?.isMaster) {
          keyringExportAccountProxyMnemonic({ proxyId: proxyId, password })
            .then((res) => {
              setSeedPhrase(res.result);
              result.seedPhrase = true;
              checkDone();
            })
            .catch((e: Error) => {
              reject(new Error(e.message));
            });
        } else {
          result.seedPhrase = true;
        }
      });

      promise
        .then(() => {
          setFirstStep(false);
        })
        .catch((e: Error) => {
          let message = e.message;

          if (message === 'Unable to decode using the supplied passphrase') {
            message = t('Wrong password');
          }

          form.setFields([{ name: FormFieldName.PASSWORD, errors: [message] }]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  }, [accountProxy, form, t]);

  const onPressType = useCallback((value: ExportType) => {
    return () => {
      const types = form.getFieldValue(FormFieldName.TYPES) as ExportType[];
      const exists = types.includes(value);
      let result: ExportType[];

      if (exists) {
        result = types.filter((i) => i !== value);
      } else {
        result = [...types, value];
      }

      form.setFieldValue(FormFieldName.TYPES, result);
      setExportTypes(result);
    };
  }, [form]);

  // @ts-ignore
  const items = useMemo((): ExportItem[] => {
    return [
      {
        disable: !accountProxy || !accountProxy.isMaster,
        hidden: false,
        icon: Leaf,
        label: t('Export seed phrase'),
        type: ExportType.SEED_PHRASE
      },
      {
        disable: true,
        hidden: false,
        icon: FileJs,
        label: t('Export JSON file'),
        type: ExportType.JSON_FILE
      },
      {
        disable: true,
        hidden: true,
        icon: Wallet,
        label: t('Export private key'),
        type: ExportType.PRIVATE_KEY
      },
      {
        disable: true,
        hidden: false,
        icon: QrCode,
        label: t('Export QR Code'),
        type: ExportType.QR_CODE
      }
    ];
  }, [accountProxy, t]);

  const onBack = useCallback(() => {
    if (accountProxy?.proxyId) {
      navigate(`/accounts/detail/${accountProxy?.proxyId}`);
    } else {
      navigate(DEFAULT_ROUTER_PATH);
    }
  }, [accountProxy?.proxyId, navigate]);

  useEffect(() => {
    if (!accountProxy) {
      goHome();
    }
  }, [accountProxy, goHome, navigate]);

  useEffect(() => {
    if (accountProxy?.proxyId) {
      form.resetFields();
    }
  }, [accountProxy?.proxyId, form]);

  useFocusFormItem(form, FormFieldName.PASSWORD);

  if (!accountProxy) {
    return null;
  }

  return (
    <PageWrapper className={CN(className)}>
      <Layout.WithSubHeaderOnly
        disableBack={loading}
        onBack={onBack}
        rightFooterButton={{
          children: firstStep ? t('Confirm') : t('Finish'),
          icon: firstStep ? undefined : FinishIcon,
          disabled: isDisabled || !exportTypes.length,
          loading: loading,
          onClick: firstStep ? form.submit : goHome
        }}
        subHeaderIcons={[
          {
            icon: <CloseIcon />,
            onClick: goHome,
            disabled: loading
          }
        ]}
        title={
          firstStep
            ? t('Export account')
            : !exportSingle
              ? t('Export successful')
              : titleMap[exportTypes[0]]
        }
      >
        <div className='body-container'>
          <div className={CN('notice', { 'mb-large': !firstStep })}>
            <AlertBox
              description={t('Anyone with your key can use any assets held in your account')}
              title={t('Warning: Never disclose this key')}
              type='warning'
            />
          </div>
          {
            firstStep && (
              <Form
                form={form}
                initialValues={{
                  [FormFieldName.PASSWORD]: '',
                  [FormFieldName.TYPES]: []
                }}
                name={formName}
                onFieldsChange={onUpdate}
                onFinish={onSubmit}
              >
                <Form.Item
                  name={FormFieldName.PASSWORD}
                  rules={[
                    {
                      message: t('Password is required'),
                      required: true
                    }
                  ]}
                  statusHelpAsTooltip={true}
                >
                  <Input
                    disabled={loading}
                    placeholder={t('Type your OpenBit password')}
                    suffix={<span />}
                    type='password'
                  />
                </Form.Item>
                <Form.Item
                  className='mb-0'
                  name={FormFieldName.TYPES}
                >
                  <div className='export-types-container'>
                    {
                      items.map((item) => {
                        const _selected = exportTypes?.includes(item.type);

                        if (item.hidden) {
                          return null;
                        }

                        return (
                          <SettingItem
                            className={CN(
                              'export-item',
                              `export-${item.type}`,
                              {
                                selected: _selected,
                                disabled: item.disable
                              }
                            )}
                            key={item.type}
                            leftItemIcon={(
                              <BackgroundIcon
                                backgroundColor='var(--icon-bg-color)'
                                phosphorIcon={item.icon}
                                size='sm'
                                weight='fill'
                              />
                            )}
                            name={item.label}
                            onPressItem={(item.disable || loading) ? undefined : onPressType(item.type)}
                            rightItem={(
                              <Icon
                                className='setting-item-right-icon'
                                iconColor='var(--selected-icon-color)'
                                phosphorIcon={CheckCircle}
                                size='sm'
                                weight='fill'
                              />
                            )}
                          />
                        );
                      })
                    }
                  </div>
                </Form.Item>
              </Form>
            )
          }
          {
            !firstStep && (
              <div
                className={CN(
                  'result-container',
                  { 'export-single': exportSingle }
                )}
              >
                {
                  exportTypes.includes(ExportType.PRIVATE_KEY) && (
                    <div className='result-content'>
                      <div className='result-title'>{titleMap[ExportType.PRIVATE_KEY]}</div>
                      <Field
                        className='private-key-field'
                        content={privateKey}
                        maxLine={10}
                      />
                      <Button
                        icon={(
                          <Icon phosphorIcon={CopySimple} />
                        )}
                        onClick={onCopyPrivateKey}
                        type='ghost'
                      >
                        {t('Copy to clipboard')}
                      </Button>
                    </div>
                  )
                }
                {
                  exportTypes.includes(ExportType.SEED_PHRASE) && (
                    <div className='result-content'>
                      <div className='result-title'>{titleMap[ExportType.SEED_PHRASE]}</div>
                      <WordPhrase seedPhrase={seedPhrase} />
                    </div>
                  )
                }
                {
                  exportTypes.includes(ExportType.JSON_FILE) && jsonData && (
                    <div className='result-content'>
                      <div className='result-title'>{t('Your json file')}</div>
                      {
                        exportSingle && (
                          <>
                            <div className='page-icon'>
                              <PageIcon
                                color='var(--page-icon-color)'
                                iconProps={{
                                  phosphorIcon: CheckCircle,
                                  weight: 'fill'
                                }}
                              />
                            </div>
                            <div className='json-done-tile'>
                              {t('Success!')}
                            </div>
                            <div className='json-done-description'>
                              {t('You have successfully exported JSON file for this account')}
                            </div>
                          </>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </Layout.WithSubHeaderOnly>
    </PageWrapper>
  );
};

const AccountExport = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.body-container': {
      padding: `0 ${token.padding}px`
    },

    '.notice': {
      marginTop: token.margin,
      marginBottom: token.margin,

      '&.mb-large': {
        marginBottom: token.marginLG
      }
    },

    '.export-types-container': {
      display: 'flex',
      flexDirection: 'column',
      gap: token.sizeXS
    },

    '.export-item': {
      '--selected-icon-color': token['gray-4'],
      textAlign: 'start',

      '&.selected': {
        '--selected-icon-color': token.colorSuccess
      },

      '&.disabled': {
        opacity: 0.4,

        '.ant-web3-block': {
          cursor: 'not-allowed',

          '&:hover': {
            backgroundColor: token['gray-1']
          }
        }
      }
    },

    '.setting-item-right-icon': {
      paddingRight: 8
    },

    '.download-json': {
      '.ant-web3-block-middle-item': {
        overflow: 'hidden',

        '.ant-setting-item-name': {
          textOverflow: 'ellipsis',
          width: '100%',
          overflow: 'hidden',
          paddingRight: token.paddingXS
        }
      }
    },

    [`.export-${ExportType.SEED_PHRASE}`]: {
      '--icon-bg-color': token['green-7']
    },

    [`.export-${ExportType.JSON_FILE}, .download-json`]: {
      '--icon-bg-color': token['orange-7']
    },

    [`.export-${ExportType.PRIVATE_KEY}`]: {
      '--icon-bg-color': token['gray-3']
    },

    [`.export-${ExportType.QR_CODE}`]: {
      '--icon-bg-color': token['geekblue-7']
    },

    '.result-container': {
      display: 'flex',
      flexDirection: 'column',
      gap: token.sizeLG
    },

    '.result-content': {
      display: 'flex',
      flexDirection: 'column',
      gap: token.size,

      '.result-title': {
        fontWeight: token.fontWeightStrong,
        fontSize: token.fontSizeHeading6,
        lineHeight: token.lineHeightHeading6,
        color: token.colorTextLabel,
        textTransform: 'uppercase'
      },

      '.private-key-field': {
        '.ant-field-wrapper': {
          alignItems: 'start',
          textAlign: 'center'
        }
      },

      '.qr-area': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }
    },

    '.export-single': {
      '.result-title': {
        display: 'none'
      }
    },

    '.page-icon': {
      display: 'flex',
      justifyContent: 'center',
      '--page-icon-color': token.colorSuccess
    },

    '.json-done-tile': {
      color: token.colorTextHeading,
      textAlign: 'center',
      fontWeight: token.fontWeightStrong,
      fontSize: token.fontSizeHeading3,
      lineHeight: token.lineHeightHeading3
    },

    '.json-done-description': {
      padding: `0 ${token.controlHeightLG - token.padding}px`,
      color: token.colorTextLabel,
      textAlign: 'center',
      fontSize: token.fontSizeHeading5,
      lineHeight: token.lineHeightHeading5
    }
  };
});

export default AccountExport;
