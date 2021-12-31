// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { ThemeProps } from '../../types';
import type { AccountInfo } from '.';

import {faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { validateSeed } from '@polkadot/extension-ui/messaging';
import { objectSpread } from '@polkadot/util';

import useGenesisHashOptions from '../../hooks/useGenesisHashOptions';
import useTranslation from '../../hooks/useTranslation';
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniDropdown from "@polkadot/extension-ui/components/KoniDropdown";
import KoniTextAreaWithLabel from "@polkadot/extension-ui/components/KoniTextAreaWithLabel";
import KoniInputWithLabel from "@polkadot/extension-ui/components/KoniInputWithLabel";
import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import KoniButtonArea from "@polkadot/extension-ui/components/KoniButtonArea";
import KoniNextStepButton from "@polkadot/extension-ui/components/KoniNextStepButton";

interface Props {
  className?: string;
  onNextStep: () => void;
  onAccountChange: (account: AccountInfo | null) => void;
  type: KeypairType;
  account: any;
  name: string | null;
}

function KoniSeedAndPath ({ className, onAccountChange, onNextStep, type, account, name }: Props): React.ReactElement {
  const { t } = useTranslation();
  const genesisOptions = useGenesisHashOptions();
  const [address, setAddress] = useState('');
  const [seed, setSeed] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);
  const [advanced, setAdvances] = useState(false);
  const [error, setError] = useState('');
  const [genesis, setGenesis] = useState('');

  useEffect(() => {
    // No need to validate an empty seed
    // we have a dedicated error for this
    if (!seed) {
      onAccountChange(null);

      return;
    }

    const suri = `${seed || ''}${path || ''}`;

    validateSeed(suri, type)
      .then((validatedAccount) => {
        setError('');
        setAddress(validatedAccount.address);
        onAccountChange(
          objectSpread<AccountInfo>({}, validatedAccount, { genesis, type })
        );
      })
      .catch(() => {
        setAddress('');
        onAccountChange(null);
        setError(path
          ? t<string>('Invalid mnemonic seed or derivation path')
          : t<string>('Invalid mnemonic seed')
        );
      });
  }, [t, genesis, seed, path, onAccountChange, type]);

  const _onToggleAdvanced = useCallback(() => {
    setAdvances(!advanced);
  }, [advanced]);

  return (
    <>
      <div className={className}>
        <div className='account-info-wrapper'>
          <KoniAccountInfo address={account?.address} genesisHash={account?.genesis} name={name} className='account-info'>
            <KoniTextAreaWithLabel
              className='seedInput'
              isError={!!error}
              isFocused
              label={t<string>('existing 12 or 24-word mnemonic seed')}
              onChange={setSeed}
              rowsCount={2}
              value={seed || ''}
            />
            {!!error && !seed && (
              <KoniWarning
                className='seedError'
                isBelowInput
                isDanger
              >
                {t<string>('Mnemonic needs to contain 12, 15, 18, 21, 24 words')}
              </KoniWarning>
            )}
            <KoniDropdown
              className='genesisSelection'
              label={t<string>('Network')}
              onChange={setGenesis}
              options={genesisOptions}
              value={genesis}
            />
            <div
              className='advancedToggle'
              onClick={_onToggleAdvanced}
            >
              <FontAwesomeIcon icon={advanced ? faChevronDown : faChevronRight} color='#888888'/>
              <span>{t<string>('advanced')}</span>
            </div>
            { advanced && (
              <KoniInputWithLabel
                className='derivationPath'
                isError={!!path && !!error}
                label={t<string>('derivation path')}
                onChange={setPath}
                value={path || ''}
              />
            )}
            {!!error && !!seed && (
              <KoniWarning
                isDanger
              >
                {error}
              </KoniWarning>
            )}
          </KoniAccountInfo>
        </div>
        <KoniButtonArea>
          <KoniNextStepButton
            isDisabled={!address || !!error}
            onClick={onNextStep}
            className='next-step-btn'
          >
            {t<string>('Next Step')}
          </KoniNextStepButton>
        </KoniButtonArea>
      </div>
    </>
  );
}

export default styled(KoniSeedAndPath)(({ theme }: ThemeProps) => `
  padding: 25px 15px 15px;
  flex: 1;
  margin-top: -25px;
  overflow-y: auto;

  .advancedToggle {
    color: ${theme.textColor};
    cursor: pointer;
    line-height: ${theme.lineHeight};
    letter-spacing: 0.04em;
    opacity: 0.65;
    text-transform: uppercase;
    margin-top: 13px;

    > span {
      font-size: ${theme.inputLabelFontSize};
      line-height: 26px;
      margin-left: .5rem;
      vertical-align: middle;
      color: ${theme.textColor2};
      font-family: ${theme.fontFamilyRegular};
    }
  }

  .account-info-wrapper {
  }

  .account-info {
    padding-bottom: 23px;
  }

  .next-step-btn {
    > .children {
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
    }
  }

  .genesisSelection {
    line-height: 26px;
    label {
      color: ${theme.textColor2};
    }
  }

  .seedInput {
    margin-bottom: 16px;
    color: ${theme.textColor2};
    textarea {
      height: 80px;
      margin-top: 4px;
    }
  }

  .seedError {
    margin-bottom: 1rem;
  }
`);
