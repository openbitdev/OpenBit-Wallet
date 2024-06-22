// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AuthorizeRequest } from '@subwallet/extension-base/background/types';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-base/constants';
import { AccountProxyAvatarGroup, AccountProxyItem, ConfirmationGeneralInfo } from '@subwallet/extension-koni-ui/components';
import { approveAuthRequestV2, cancelAuthRequestV2, rejectAuthRequestV2 } from '@subwallet/extension-koni-ui/messaging';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { isAccountAll } from '@subwallet/extension-koni-ui/utils';
import { Button, Icon } from '@subwallet/react-ui';
import CN from 'classnames';
import { ShieldSlash } from 'phosphor-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface Props extends ThemeProps {
  request: AuthorizeRequest
}

async function handleConfirm ({ id }: AuthorizeRequest, selectedAccounts: string[]) {
  return await approveAuthRequestV2(id, selectedAccounts.filter((item) => !isAccountAll(item)));
}

async function handleCancel ({ id }: AuthorizeRequest) {
  return await cancelAuthRequestV2(id);
}

async function handleBlock ({ id }: AuthorizeRequest) {
  return await rejectAuthRequestV2(id);
}

function Component ({ className, request }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { allowedAccounts } = request.request;
  const accountProxies = useSelector((state: RootState) => state.accountState.accountProxies);

  const visibleAccountProxies = useMemo(() => {
    return accountProxies.filter((ap) => !isAccountAll(ap.proxyId) && !ap.isReadOnly);
  },
  [accountProxies]);

  // Selected map with default values is map of all accounts
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});

  const isDisableConnect = useMemo(() => {
    return !visibleAccountProxies.filter((ap) => selectedMap[ap.proxyId]).length;
  }, [selectedMap, visibleAccountProxies]);

  // Handle buttons actions
  const onBlock = useCallback(() => {
    setLoading(true);
    handleBlock(request).finally(() => {
      setLoading(false);
    });
  }, [request]);

  const onCancel = useCallback(() => {
    setLoading(true);
    handleCancel(request).finally(() => {
      setLoading(false);
    });
  }, [request]);

  const onConfirm = useCallback(() => {
    setLoading(true);
    const selectedAccountProxies = Object.keys(selectedMap).filter((key) => !isAccountAll(key) && selectedMap[key]);

    const selectedAccounts: string[] = [];

    visibleAccountProxies.forEach((ap) => {
      if (selectedAccountProxies.includes(ap.proxyId)) {
        ap.accounts.forEach((a) => {
          selectedAccounts.push(a.address);
        });
      }
    });

    handleConfirm(request, selectedAccounts).finally(() => {
      setLoading(false);
    });
  }, [request, selectedMap, visibleAccountProxies]);

  const onAccountSelect = useCallback((address: string) => {
    const isAll = isAccountAll(address);

    return () => {
      const visibleAPs = visibleAccountProxies.map((item) => item.proxyId);

      setSelectedMap((map) => {
        const isChecked = !map[address];
        const newMap = { ...map };

        if (isAll) {
          // Select/deselect all accounts
          visibleAPs.forEach((key) => {
            newMap[key] = isChecked;
          });
          newMap[ALL_ACCOUNT_KEY] = isChecked;
        } else {
          // Select/deselect single account and trigger all account
          newMap[address] = isChecked;
          newMap[ALL_ACCOUNT_KEY] = visibleAPs
            .filter((i) => !isAccountAll(i))
            .every((item) => newMap[item]);
        }

        return newMap;
      });
    };
  }, [visibleAccountProxies]);

  // Create selected map by default
  useEffect(() => {
    setSelectedMap((map) => {
      const existedKey = Object.keys(map);

      accountProxies.forEach((item) => {
        if (!existedKey.includes(item.proxyId)) {
          map[item.proxyId] = item.accounts.some((a) => allowedAccounts && allowedAccounts.includes(a.address));
        }
      });

      map[ALL_ACCOUNT_KEY] = visibleAccountProxies.every((item) => map[item.proxyId]);

      return { ...map };
    });
  }, [accountProxies, allowedAccounts, visibleAccountProxies]);

  return (
    <>
      <div className={CN('confirmation-content', className)}>
        <ConfirmationGeneralInfo request={request} />
        <div
          className={CN(
            'title',
            {
              'sub-title': visibleAccountProxies.length > 0
            }
          )}
        >
          {
            visibleAccountProxies.length === 0
              ? t('No available account')
              : t('Choose the account(s) you’d like to connect')
          }
        </div>
        {
          !!visibleAccountProxies.length && (
            <div className='account-list'>
              {
                visibleAccountProxies.length > 1 &&
                  (
                    <AccountProxyItem
                      accountProxy={{
                        accounts: [],
                        name: t('All accounts'),
                        proxyId: ALL_ACCOUNT_KEY
                      }}
                      isSelected={selectedMap[ALL_ACCOUNT_KEY]}
                      leftPartNode={
                        <AccountProxyAvatarGroup accountProxies={visibleAccountProxies} />
                      }
                      onClick={onAccountSelect(ALL_ACCOUNT_KEY)}
                      showUnselectIcon
                    />
                  )
              }
              {visibleAccountProxies.map((item) => (
                <AccountProxyItem
                  accountProxy={item}
                  isSelected={selectedMap[item.proxyId]}
                  key={item.proxyId}
                  onClick={onAccountSelect(item.proxyId)}
                  showUnselectIcon
                />
              ))}
            </div>
          )
        }
        <div className='description'>
          {
            visibleAccountProxies.length === 0
              ? t("You don't have any account to connect. Please create one or skip this step by hitting Cancel.")
              : t('Make sure you trust this site before connecting')
          }
        </div>
      </div>
      <div className='confirmation-footer'>
        {
          visibleAccountProxies.length > 0 &&
          (
            <>
              <Button
                className={'icon-btn'}
                danger={true}
                disabled={loading}
                icon={<Icon phosphorIcon={ShieldSlash} />}
                onClick={onBlock}
              />
              <Button
                disabled={loading}
                onClick={onCancel}
                schema={'secondary'}
              >
                {t('Cancel')}
              </Button>
              <Button
                disabled={isDisableConnect}
                loading={loading}
                onClick={onConfirm}
              >
                {t('Connect')}
              </Button>
            </>
          )
        }
      </div>
    </>
  );
}

const AuthorizeConfirmation = styled(Component)<Props>(({ theme: { token } }: ThemeProps) => ({
  '--content-gap': `${token.size}px`,

  '.title.sub-title': {
    fontSize: token.fontSizeHeading6,
    lineHeight: token.lineHeightHeading6,
    textAlign: 'start'
  },

  '.account-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: token.sizeXS
  }
}));

export default AuthorizeConfirmation;
