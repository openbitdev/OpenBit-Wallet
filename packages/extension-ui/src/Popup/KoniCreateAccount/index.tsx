// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

import {ActionContext, Dropdown, Loading} from '../../components';
import AccountNamePasswordCreation from '../../components/koni/AccountNamePasswordCreation';
import useGenesisHashOptions from '../../hooks/useGenesisHashOptions';
import useMetadata from '../../hooks/useMetadata';
import useTranslation from '../../hooks/useTranslation';
import { createAccountSuri, createSeed, validateSeed } from '../../messaging';
import { DEFAULT_TYPE } from '../../util/defaultType';
import Mnemonic from './Mnemonic';
import KoniHeaderWithSteps from "@polkadot/extension-ui/partials/KoniHeaderWithSteps";

interface Props {
  className?: string;
  defaultClassName?: string;
}

function KoniCreateAccount ({ className, defaultClassName }: Props): React.ReactElement {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<null | string>(null);
  const [seed, setSeed] = useState<null | string>(null);
  const [type, setType] = useState(DEFAULT_TYPE);
  const [name, setName] = useState('');
  const options = useGenesisHashOptions();
  const [genesisHash, setGenesis] = useState('');
  const chain = useMetadata(genesisHash, true);
  const networkRef = useRef(null);

  useEffect((): void => {
    createSeed(undefined)
      .then(({ address, seed }): void => {
        setAddress(address);
        setSeed(seed);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (seed) {
      const type = chain && chain.definition.chainType === 'ethereum'
        ? 'ethereum'
        : DEFAULT_TYPE;

      setType(type);
      validateSeed(seed, type)
        .then(({ address }) => setAddress(address))
        .catch(console.error);
    }
  }, [seed, chain]);

  const _onCreate = useCallback(
    (name: string, password: string): void => {
      // this should always be the case
      if (name && password && seed) {
        setIsBusy(true);

        createAccountSuri(name, password, seed, type, genesisHash)
          .then(() => onAction('/'))
          .catch((error: Error): void => {
            setIsBusy(false);
            console.error(error);
          });
      }
    },
    [genesisHash, onAction, seed, type]
  );

  const _onNextStep = useCallback(
    () => setStep((step) => step + 1),
    []
  );

  const _onPreviousStep = useCallback(
    () => setStep((step) => step - 1),
    []
  );

  const _onChangeNetwork = useCallback(
    (newGenesisHash: string) => setGenesis(newGenesisHash),
    []
  );

  return (
    <>
      <KoniHeaderWithSteps
        step={step}
        text={t<string>('Create an account')}
        onBackClick={_onPreviousStep}
      />
      <Loading>
        {seed && (
          step === 1
            ? (
              <Mnemonic
                onNextStep={_onNextStep}
                seed={seed}
                address={address}
                genesisHash={genesisHash}
                name={name}
              />
            )
            : (
              <>
                <AccountNamePasswordCreation
                  buttonLabel={t<string>('Add the account with the generated seed')}
                  isBusy={isBusy}
                  onBackClick={_onPreviousStep}
                  onCreate={_onCreate}
                  onNameChange={setName}
                  address={address}
                  genesis={genesisHash}
                >
                  <Dropdown
                    className='create-account-network-select'
                    label={t<string>('Network')}
                    onChange={_onChangeNetwork}
                    options={options}
                    value={genesisHash}
                    reference={networkRef}
                  />
                </AccountNamePasswordCreation>
              </>
            )
        )}
      </Loading>
    </>
  );
}

export default styled(KoniCreateAccount)`
  margin-bottom: 16px;

  .create-account-network-select {
    font-weight: 500;
  }

  .create-account-network-dropdown {
    margin-bottom: 10px;
  }

  label::after {
    right: 36px;
  }
`;
