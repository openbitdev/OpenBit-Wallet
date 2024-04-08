// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CloseIcon, Layout, PageWrapper } from '@subwallet/extension-koni-ui/components';
import { useDefaultNavigate, useDeleteAccount, useGetAccountGroupByGroupId, useNotification, useUnlockChecker } from '@subwallet/extension-koni-ui/hooks';
import { deriveAccountGroup, editAccountGroup, forgetAccountGroup } from '@subwallet/extension-koni-ui/messaging';
import { FormCallbacks, FormFieldData, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { convertFieldToObject } from '@subwallet/extension-koni-ui/utils';
import { BackgroundIcon, Button, Form, Icon, Input } from '@subwallet/react-ui';
import CN from 'classnames';
import { CircleNotch, Export, FloppyDiskBack, GitMerge, Trash, User } from 'phosphor-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps;

enum FormFieldName {
  NAME = 'name'
}

enum ActionType {
  EXPORT = 'export',
  DERIVE = 'derive',
  DELETE = 'delete'
}

interface DetailFormState {
  [FormFieldName.NAME]: string;
}

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { goHome } = useDefaultNavigate();
  const notify = useNotification();
  const { accountGroupId } = useParams();

  const [form] = Form.useForm<DetailFormState>();

  const accountGroup = useGetAccountGroupByGroupId(accountGroupId);
  const deleteAccountAction = useDeleteAccount();

  const saveTimeOutRef = useRef<NodeJS.Timer>();

  const [deleting, setDeleting] = useState(false);
  const [deriving, setDeriving] = useState(false);
  const [saving, setSaving] = useState(false);
  const checkUnlock = useUnlockChecker();

  const _canDerive = useMemo((): boolean => {
    return !!accountGroup?.isMaster;
  }, [accountGroup]);

  const onDelete = useCallback(() => {
    if (accountGroup?.groupId) {
      deleteAccountAction()
        .then(() => {
          setDeleting(true);
          forgetAccountGroup(accountGroup.groupId)
            .then(() => {
              goHome();
            })
            .catch((e: Error) => {
              notify({
                message: e.message,
                type: 'error'
              });
            })
            .finally(() => {
              setDeleting(false);
            });
        })
        .catch((e: Error) => {
          if (e) {
            notify({
              message: e.message,
              type: 'error'
            });
          }
        });
    }
  }, [accountGroup?.groupId, deleteAccountAction, goHome, notify]);

  const onDerive = useCallback(() => {
    if (!accountGroup?.groupId) {
      return;
    }

    checkUnlock().then(() => {
      setDeriving(true);

      setTimeout(() => {
        deriveAccountGroup({
          groupId: accountGroup.groupId
        }).then(() => {
          goHome();
        }).catch((e: Error) => {
          notify({
            message: e.message,
            type: 'error'
          });
        }).finally(() => {
          setDeriving(false);
        });
      }, 500);
    }).catch(() => {
      // User cancel unlock
    });
  }, [accountGroup?.groupId, checkUnlock, goHome, notify]);

  const onExport = useCallback(() => {
    //
  }, []);

  const onUpdate: FormCallbacks<DetailFormState>['onFieldsChange'] = useCallback((changedFields: FormFieldData[], allFields: FormFieldData[]) => {
    const changeMap = convertFieldToObject<DetailFormState>(changedFields);

    if (changeMap[FormFieldName.NAME]) {
      clearTimeout(saveTimeOutRef.current);
      setSaving(true);
      saveTimeOutRef.current = setTimeout(() => {
        form.submit();
      }, 1000);
    }
  }, [form]);

  const onSubmit: FormCallbacks<DetailFormState>['onFinish'] = useCallback((values: DetailFormState) => {
    clearTimeout(saveTimeOutRef.current);
    const name = values[FormFieldName.NAME];

    if (!accountGroup || name === accountGroup.name) {
      setSaving(false);

      return;
    }

    if (!accountGroup.groupId) {
      setSaving(false);

      return;
    }

    editAccountGroup(accountGroup.groupId, name.trim())
      .catch(console.error)
      .finally(() => {
        setSaving(false);
      });
  }, [accountGroup]);

  useEffect(() => {
    if (!accountGroup) {
      goHome();
    }
  }, [accountGroup, goHome, navigate]);

  if (!accountGroup) {
    return null;
  }

  return (
    <PageWrapper
      className={CN(className)}
    >

      <Layout.WithSubHeaderOnly
        disableBack={deriving}
        subHeaderIcons={[
          {
            icon: <CloseIcon />,
            onClick: goHome,
            disabled: deriving
          }
        ]}
        title={t('Account details')}
      >
        <div className='body-container'>
          <Form
            className={'account-detail-form'}
            form={form}
            initialValues={{
              [FormFieldName.NAME]: accountGroup.name || ''
            }}
            name='account-detail-form'
            onFieldsChange={onUpdate}
            onFinish={onSubmit}
          >
            <Form.Item
              className={CN('account-field')}
              name={FormFieldName.NAME}
              rules={[
                {
                  message: t('Account name is required'),
                  transform: (value: string) => value.trim(),
                  required: true
                }
              ]}
              statusHelpAsTooltip={true}
            >
              <Input
                className='account-name-input'
                disabled={deriving}
                label={t('Account name')}
                onBlur={form.submit}
                placeholder={t('Account name')}
                prefix={(
                  <BackgroundIcon
                    backgroundColor='var(--wallet-name-icon-bg-color)'
                    className={'user-name-icon'}
                    iconColor='var(--wallet-name-icon-color)'
                    phosphorIcon={User}
                  />
                )}
                suffix={(
                  <Icon
                    className={CN({ loading: saving })}
                    phosphorIcon={saving ? CircleNotch : FloppyDiskBack}
                    size='sm'
                  />
                )}
              />
            </Form.Item>
          </Form>
        </div>

        <div className={CN('account-detail___action-footer')}>
          <Button
            className={CN('account-button')}
            disabled={deriving}
            icon={(
              <Icon
                phosphorIcon={Trash}
                weight='fill'
              />
            )}
            loading={deleting}
            onClick={onDelete}
            schema='error'
          />
          <Button
            className={CN('account-button')}
            disabled={!_canDerive}
            icon={(
              <Icon
                phosphorIcon={GitMerge}
                weight='fill'
              />
            )}
            loading={deriving}
            onClick={onDerive}
            schema='secondary'
          >
            {t('Derive')}
          </Button>
          <Button
            className={CN('account-button')}
            disabled={deriving}
            icon={(
              <Icon
                phosphorIcon={Export}
                weight='fill'
              />
            )}
            onClick={onExport}
            schema='secondary'
          >
            {t('Export')}
          </Button>
        </div>
      </Layout.WithSubHeaderOnly>
    </PageWrapper>
  );
};

const AccountGroupDetail = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '.account-detail-form': {
      marginTop: token.margin
    },

    '.ant-sw-screen-layout-body': {
      display: 'flex',
      flexDirection: 'column'
    },

    '.body-container': {
      overflow: 'scroll',
      flex: 1,
      padding: `0 ${token.padding}px`,
      '--wallet-name-icon-bg-color': token['geekblue-6'],
      '--wallet-name-icon-color': token.colorWhite,

      '.ant-background-icon': {
        width: token.sizeMD,
        height: token.sizeMD,

        '.user-name-icon': {
          span: {
            height: token.sizeSM,
            width: token.sizeSM
          }
        }
      },

      '.account-qr': {
        marginTop: token.margin,
        marginBottom: token.marginLG,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      },

      '.account-field': {
        marginBottom: token.marginXS,

        '.single-icon-only': {
          color: token['gray-4']
        },

        '.ant-input-label': {
          marginBottom: token.marginXS - 2
        },

        '.ant-input-suffix': {
          marginRight: 0,
          marginLeft: token.marginXS
        },

        '.ant-btn': {
          height: 'auto',
          marginRight: -(token.marginSM - 2)
        }
      },

      '.mb-lg': {
        marginBottom: token.marginLG
      },

      '.account-button': {
        marginBottom: token.marginXS,
        gap: token.sizeXS,
        color: token.colorTextLight1,

        '&:disabled': {
          color: token.colorTextLight1,
          opacity: 0.4
        }
      },

      [`.action-type-${ActionType.DERIVE}`]: {
        '--icon-bg-color': token['magenta-7']
      },

      [`.action-type-${ActionType.EXPORT}`]: {
        '--icon-bg-color': token['green-6']
      },

      [`.action-type-${ActionType.DELETE}`]: {
        '--icon-bg-color': token['colorError-6'],
        color: token['colorError-6'],

        '.ant-background-icon': {
          color: token.colorTextLight1
        },

        '&:disabled': {
          color: token['colorError-6'],

          '.ant-background-icon': {
            color: token.colorTextLight1
          }
        }
      }
    },

    '.account-name-input': {
      '.loading': {
        color: token['gray-5'],
        animation: 'spinner-loading 1s infinite linear'
      }
    },

    '.footer__button': {
      flexGrow: 1
    },

    '.account-detail___action-footer': {
      backgroundColor: token.colorBgDefault,
      position: 'sticky',
      bottom: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      gap: token.marginSM,
      padding: token.padding,
      paddingBottom: '33px',

      button: {
        flex: 2
      },

      'button:nth-child(1)': {
        flex: 1
      }
    }
  };
});

export default AccountGroupDetail;
