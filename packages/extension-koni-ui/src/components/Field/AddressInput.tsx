// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AbstractAddressJson } from '@subwallet/extension-base/background/types';
import { CHAINS_SUPPORTED_DOMAIN, isAzeroDomain } from '@subwallet/extension-base/koni/api/dotsama/domain';
import { reformatAddress } from '@subwallet/extension-base/utils';
import { AccountProxyAvatar, AddressBookModal } from '@subwallet/extension-koni-ui/components';
import { useForwardInputRef, useOpenQrScanner, useSelector, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { resolveAddressToDomain, resolveDomainToAddress } from '@subwallet/extension-koni-ui/messaging';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ScannerResult } from '@subwallet/extension-koni-ui/types/scanner';
import { findAccountByAddress, findContactByAddress, toShort } from '@subwallet/extension-koni-ui/utils';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { Button, Icon, Input, InputRef, ModalContext, SwQrScanner } from '@subwallet/react-ui';
import CN from 'classnames';
import { Book, Scan } from 'phosphor-react';
import React, { ChangeEventHandler, ForwardedRef, forwardRef, SyntheticEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { isEthereumAddress } from '@polkadot/util-crypto';

import { QrScannerErrorNotice } from '../Qr';
import { BasicInputWrapper } from './Base';

interface Props extends BasicInputWrapper, ThemeProps {
  showAddressBook?: boolean;
  showScanner?: boolean;
  addressPrefix?: number;
  saveAddress?: boolean;
  networkGenesisHash?: string;
  chain?: string;
  allowDomain?: boolean;
  fitNetwork?: boolean;
  addressBookFilter?: (addressJson: AbstractAddressJson) => boolean;
  labelStyle?: 'default' | 'horizontal'
}

const defaultScannerModalId = 'input-account-address-scanner-modal';
const defaultAddressBookModalId = 'input-account-address-book-modal';

const addressLength = 9;

const isAddressValid = (address?: string): boolean => {
  const type = address && getKeypairTypeByAddress(address);

  if (type === 'ethereum' || type === 'bitcoin-44' || type === 'bitcoin-84' || type === 'bittest-44' || type === 'bittest-84') {
    return true;
  }

  return false;
};

function Component (props: Props, ref: ForwardedRef<InputRef>): React.ReactElement<Props> {
  const { addressBookFilter, addressPrefix,
    allowDomain, chain, className = '', disabled, fitNetwork, id, label, labelStyle = 'default',
    networkGenesisHash, onBlur, onChange, onFocus, placeholder, readOnly, saveAddress, showAddressBook,
    showScanner, status, statusHelp, value } = props;
  const { t } = useTranslation();

  const [domainName, setDomainName] = useState<string | undefined>(undefined);
  const { activeModal, inactiveModal } = useContext(ModalContext);

  const { accounts, contacts } = useSelector((root) => root.accountState);

  const scannerId = useMemo(() => id ? `${id}-scanner-modal` : defaultScannerModalId, [id]);
  const addressBookId = useMemo(() => id ? `${id}-address-book-modal` : defaultAddressBookModalId, [id]);

  const inputRef = useForwardInputRef(ref);
  const [scanError, setScanError] = useState('');

  const _contacts = useMemo((): AbstractAddressJson[] => [...accounts, ...(showAddressBook ? contacts : [])], [accounts, contacts, showAddressBook]);

  const proxyId = useMemo(() => {
    const account = findAccountByAddress(_contacts, value);

    return account?.proxyId;
  }, [_contacts, value]);

  const accountName = useMemo(() => {
    const account = findAccountByAddress(_contacts, value);

    if (account?.name) {
      return account?.name;
    } else {
      if (allowDomain && domainName) {
        return domainName;
      }
    }

    return undefined;
  }, [_contacts, allowDomain, domainName, value]);

  const formattedAddress = useMemo((): string => {
    const _value = value || '';

    if (addressPrefix === undefined) {
      return _value;
    }

    try {
      return reformatAddress(_value, addressPrefix);
    } catch (e) {
      return _value;
    }
  }, [addressPrefix, value]);

  const parseAndChangeValue = useCallback((value: string, skipClearDomainName?: boolean) => {
    const val = value.trim();

    onChange && onChange({ target: { value: val } });
    !skipClearDomainName && setDomainName(undefined);

    // if (isAddressValid(val) && saveAddress) {
    //   if (isEthereumAddress(val)) {
    //     saveRecentAccount(val, chain).catch(console.error);
    //   } else {
    //     try {
    //       if (decodeAddress(val, true, addressPrefix)) {
    //         saveRecentAccount(val, chain).catch(console.error);
    //       }
    //     } catch (e) {}
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveAddress, chain, addressPrefix]);

  const _onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    parseAndChangeValue(event.target.value);
  }, [parseAndChangeValue]);

  const openScanner = useOpenQrScanner(scannerId);

  const onOpenScanner = useCallback((e?: SyntheticEvent) => {
    e && e.stopPropagation();
    openScanner();
  }, [openScanner]);

  const onScanError = useCallback((error: string) => {
    setScanError(error);
  }, []);

  const onSuccess = useCallback((result: ScannerResult) => {
    inputRef?.current?.focus();
    setScanError('');
    inactiveModal(scannerId);
    parseAndChangeValue(result.text);
    inputRef?.current?.blur();
  }, [inactiveModal, scannerId, parseAndChangeValue, inputRef]);

  const onCloseScan = useCallback(() => {
    inputRef?.current?.focus();
    setScanError('');
    inputRef?.current?.blur();
  }, [inputRef]);

  const onOpenAddressBook = useCallback((e?: SyntheticEvent) => {
    e && e.stopPropagation();
    activeModal(addressBookId);
  }, [activeModal, addressBookId]);

  const onSelectAddressBook = useCallback((value: string) => {
    inputRef?.current?.focus();
    parseAndChangeValue(value);
    inputRef?.current?.blur();
  }, [inputRef, parseAndChangeValue]);

  useEffect(() => {
    if (allowDomain && chain && value && CHAINS_SUPPORTED_DOMAIN.includes(chain)) {
      if (isAzeroDomain(value)) {
        resolveDomainToAddress({
          chain,
          domain: value
        })
          .then((result) => {
            if (result) {
              setDomainName(value);
              parseAndChangeValue(result, true);
              inputRef?.current?.focus();
              inputRef?.current?.blur();
            }
          })
          .catch(console.error);
      } else if (isAddressValid(value)) {
        resolveAddressToDomain({
          chain,
          address: value
        })
          .then((result) => {
            if (result) {
              setDomainName(result);
            }
          })
          .catch(console.error);
      }
    } else {
      setDomainName(undefined);
    }
  }, [allowDomain, chain, inputRef, parseAndChangeValue, value]);

  useEffect(() => {
    if (value) {
      const account = findContactByAddress(_contacts, value);

      if (account) {
        if (!isEthereumAddress(account.address) && !!account.isHardware) {
          const availableGens: string[] = (account.availableGenesisHashes as string[]) || [];

          if (!availableGens.includes(networkGenesisHash || '')) {
            return;
          }
        }

        const address = reformatAddress(account.address, addressPrefix);

        parseAndChangeValue(address);
        inputRef?.current?.focus();
        inputRef?.current?.blur();
      } else {
        if (isAddressValid(value)) {
          parseAndChangeValue(value);
        }
      }
    }
  }, [_contacts, addressPrefix, value, parseAndChangeValue, inputRef, networkGenesisHash]);

  // todo: Will work with "Manage address book" feature later
  return (
    <>
      <Input
        className={CN('address-input', className, `-label-${labelStyle}`, {
          '-is-valid-address': true
        })}
        disabled={disabled}
        id={id}
        label={label || t('Account address')}
        onBlur={onBlur}
        onChange={_onChange}
        onFocus={onFocus}
        placeholder={placeholder || t('Please type or paste an address')}
        prefix={
          <>
            {
              value && isAddressValid(value) && (
                <div className={'__overlay'}>
                  <div className={CN('__name common-text', { 'limit-width': !!accountName })}>
                    {accountName || toShort(value, addressLength, addressLength)}
                  </div>
                  {(fitNetwork ? accountName : (accountName || addressPrefix !== undefined)) &&
                    (
                      <div className={'__address common-text'}>
                        ({toShort(formattedAddress, 4, 4)})
                      </div>
                    )
                  }
                </div>
              )
            }
            <AccountProxyAvatar
              className={'__avatar-account'}
              size={20}
              value={proxyId}
            />
          </>
        }
        readOnly={readOnly}
        ref={inputRef}
        status={status}
        statusHelp={statusHelp}
        suffix={(
          <>
            {
              showAddressBook &&
              (
                <Button
                  icon={(
                    <Icon
                      phosphorIcon={Book}
                      size='sm'
                    />
                  )}
                  onClick={onOpenAddressBook}
                  size='xs'
                  type='ghost'
                />
              )
            }
            {
              showScanner &&
              (
                <Button
                  disabled={disabled}
                  icon={(
                    <Icon
                      phosphorIcon={Scan}
                      size='sm'
                    />
                  )}
                  onClick={onOpenScanner}
                  size='xs'
                  type='ghost'
                />
              )
            }
          </>
        )}
        value={value}
      />

      {
        showScanner &&
        (
          <SwQrScanner
            className={className}
            id={scannerId}
            isError={!!scanError}
            onClose={onCloseScan}
            onError={onScanError}
            onSuccess={onSuccess}
            overlay={scanError && <QrScannerErrorNotice message={scanError} />}
          />
        )
      }
      {
        showAddressBook &&
        (
          <AddressBookModal
            addressBookFilter={addressBookFilter}
            addressPrefix={addressPrefix}
            id={addressBookId}
            networkGenesisHash={networkGenesisHash}
            onSelect={onSelectAddressBook}
            value={value}
          />
        )
      }
    </>
  );
}

export const AddressInput = styled(forwardRef(Component))<Props>(({ theme: { token } }: Props) => {
  return ({
    '.__overlay': {
      position: 'absolute',
      backgroundColor: token.colorBgSecondary,
      top: 0,
      left: 2,
      bottom: 2,
      right: 2,
      borderRadius: token.borderRadiusLG,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 40,
      paddingRight: 84,
      whiteSpace: 'nowrap'
    },
    '.__avatar-account': {
      position: 'relative'
    },

    '.__name': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: token.colorTextLight1,

      '&.limit-width': {
        maxWidth: 136
      }
    },

    '.__address': {
      paddingLeft: token.sizeXXS
    },

    '.ant-input-prefix': {
      pointerEvents: 'none'
    },

    '&.-label-horizontal': {
      display: 'flex',
      gap: 4,
      '&.-has-label .ant-input': {
        borderTopWidth: 2
      },
      '.ant-input-container': {
        display: 'flex',
        flexDirection: 'row',
        gap: 4
      },
      '.ant-input-label': {
        top: 0,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 0,
        paddingRight: 0,
        minWidth: 45
      },
      '.ant-input-wrapper': {
        flex: 1
      },
      '.ant-input-affix-wrapper': {
        paddingLeft: 0
      },
      '.__overlay': {
        paddingLeft: 0,
        top: 2,
        left: 0
      },
      '&.-status-error .ant-input': {
        borderTopWidth: 2
      },
      '.__avatar-account': {
        display: 'none'
      },
      '.ant-input-prefix': {
        paddingRight: 0
      }

    },

    '&.-status-error': {
      '.__overlay': {
        pointerEvents: 'none',
        opacity: 0
      }
    },

    // Not support firefox
    '&:has(input:focus)': {
      '.__overlay': {
        pointerEvents: 'none',
        opacity: 0
      }
    },

    // Support firefox
    '.ant-input-affix-wrapper-focused': {
      '.__overlay': {
        pointerEvents: 'none',
        opacity: 0
      }
    }
  });
});
