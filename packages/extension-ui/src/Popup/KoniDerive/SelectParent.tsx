// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { canDerive } from '@polkadot/extension-base/utils';

import { AccountContext, ActionContext } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import { validateAccount, validateDerivationPath } from '../../messaging';
import { nextDerivationPath } from '../../util/nextDerivationPath';
import AddressDropdown from './AddressDropdown';
import DerivationPath from './DerivationPath';
import KoniLabel from "@polkadot/extension-ui/components/KoniLabel";
import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import KoniInputWithLabel from "@polkadot/extension-ui/components/KoniInputWithLabel";
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniButtonArea from "@polkadot/extension-ui/components/KoniButtonArea";
import KoniNextStepButton from "@polkadot/extension-ui/components/KoniNextStepButton";
import styled from "styled-components";

interface Props {
  className?: string;
  isLocked?: boolean;
  parentAddress: string;
  parentGenesis: string | null;
  onDerivationConfirmed: (derivation: { account: { address: string; suri: string }; parentPassword: string }) => void;
}

// match any single slash
const singleSlashRegex = /([^/]|^)\/([^/]|$)/;

function SelectParent ({ className, isLocked, onDerivationConfirmed, parentAddress, parentGenesis }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const { accounts, hierarchy } = useContext(AccountContext);
  const defaultPath = useMemo(() => nextDerivationPath(accounts, parentAddress), [accounts, parentAddress]);
  const [suriPath, setSuriPath] = useState<null | string>(defaultPath);
  const [parentPassword, setParentPassword] = useState<string>('');
  const [isProperParentPassword, setIsProperParentPassword] = useState(false);
  const [pathError, setPathError] = useState('');
  const passwordInputRef = useRef<HTMLDivElement>(null);
  const allowSoftDerivation = useMemo(() => {
    const parent = accounts.find(({ address }) => address === parentAddress);

    return parent?.type === 'sr25519';
  }, [accounts, parentAddress]);

  // reset the password field if the parent address changes
  useEffect(() => {
    setParentPassword('');
  }, [parentAddress]);

  useEffect(() => {
    // forbid the use of password since Keyring ignores it
    if (suriPath?.includes('///')) {
      setPathError(t('`///password` not supported for derivation'));
    }

    if (!allowSoftDerivation && suriPath && singleSlashRegex.test(suriPath)) {
      setPathError(t('Soft derivation is only allowed for sr25519 accounts'));
    }
  }, [allowSoftDerivation, suriPath, t]);

  const allAddresses = useMemo(
    () => hierarchy
      .filter(({ isExternal }) => !isExternal)
      .filter(({ type }) => canDerive(type))
      .map(({ address, genesisHash }): [string, string | null] => [address, genesisHash || null]),
    [hierarchy]
  );

  const _onParentPasswordEnter = useCallback(
    (parentPassword: string): void => {
      setParentPassword(parentPassword);
      setIsProperParentPassword(!!parentPassword);
    },
    []
  );

  const _onSuriPathChange = useCallback(
    (path: string): void => {
      setSuriPath(path);
      setPathError('');
    },
    []
  );

  const _onParentChange = useCallback(
    (address: string) => onAction(`/account/derive/${address}`),
    [onAction]
  );

  const _onSubmit = useCallback(
    async (): Promise<void> => {
      if (suriPath && parentAddress && parentPassword) {
        setIsBusy(true);

        const isUnlockable = await validateAccount(parentAddress, parentPassword);

        if (isUnlockable) {
          try {
            const account = await validateDerivationPath(parentAddress, suriPath, parentPassword);

            onDerivationConfirmed({ account, parentPassword });
          } catch (error) {
            setIsBusy(false);
            setPathError(t('Invalid derivation path'));
            console.error(error);
          }
        } else {
          setIsBusy(false);
          setIsProperParentPassword(false);
        }
      }
    },
    [parentAddress, parentPassword, onDerivationConfirmed, suriPath, t]
  );

  useEffect(() => {
    setParentPassword('');
    setIsProperParentPassword(false);

    passwordInputRef.current?.querySelector('input')?.focus();
  }, [_onParentPasswordEnter]);

  return (
    <>
      <div className={className}>
        <div className='koni-derive-account'>
          {isLocked
            ? (
              <KoniAccountInfo
                address={parentAddress}
                genesisHash={parentGenesis}
              />
            )
            : (
              <KoniLabel label={t<string>('Choose Parent Account:')}>
                <AddressDropdown
                  allAddresses={allAddresses}
                  onSelect={_onParentChange}
                  selectedAddress={parentAddress}
                  selectedGenesis={parentGenesis}
                />
              </KoniLabel>
            )
          }
          <div ref={passwordInputRef}>
            <KoniInputWithLabel
              data-input-password
              isError={!!parentPassword && !isProperParentPassword}
              isFocused
              label={t<string>('enter the password for the account you want to derive from')}
              onChange={_onParentPasswordEnter}
              type='password'
              value={parentPassword}
            />
            {!!parentPassword && !isProperParentPassword && (
              <KoniWarning
                isBelowInput
                isDanger
              >
                {t('Wrong password')}
              </KoniWarning>
            )}
          </div>
          {isProperParentPassword && (
            <>
              <DerivationPath
                defaultPath={defaultPath}
                isError={!!pathError}
                onChange={_onSuriPathChange}
                parentAddress={parentAddress}
                parentPassword={parentPassword}
                withSoftPath={allowSoftDerivation}
              />
              {(!!pathError) && (
                <KoniWarning
                  isBelowInput
                  isDanger
                >
                  {pathError}
                </KoniWarning>
              )}
            </>
          )}
        </div>

        <KoniButtonArea>
          <KoniNextStepButton
            className='next-step-btn'
            data-button-action='create derived account'
            isBusy={isBusy}
            isDisabled={!isProperParentPassword || !!pathError}
            onClick={_onSubmit}
          >
            {t<string>('Create a derived account')}
          </KoniNextStepButton>
        </KoniButtonArea>
      </div>
    </>
  );
}

export default styled(React.memo(SelectParent))`
  margin: 0 15px;

  .koni-derive-account {
    height: 382px;
    overflow: auto;
  }

  .next-step-btn {
    > .children {
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
    }
  }
`
