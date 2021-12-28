// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import useToast from '../../hooks/useToast';
import useTranslation from '../../hooks/useTranslation';
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import KoniNextStepButton from "@polkadot/extension-ui/components/KoniNextStepButton";
import KoniButtonArea from "@polkadot/extension-ui/components/KoniButtonArea";
import KoniMnemonicSeed from "@polkadot/extension-ui/components/KoniMnemonicSeed";
import styled from "styled-components";
import {ThemeProps} from "@polkadot/extension-ui/types";
import Checkbox from "@polkadot/extension-ui/components/koni/Checkbox";

interface Props extends ThemeProps {
  onNextStep: () => void;
  seed: string;
  address?: any;
  genesisHash?: any;
  name?: any;
  className?: string;
}

const onCopy = (): void => {
  const mnemonicSeedTextElement = document.querySelector('textarea');

  if (!mnemonicSeedTextElement) {
    return;
  }

  mnemonicSeedTextElement.select();
  document.execCommand('copy');
};

function Mnemonic ({ onNextStep, seed, address, genesisHash, name, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isMnemonicSaved, setIsMnemonicSaved] = useState(false);
  const { show } = useToast();

  const _onCopy = useCallback((): void => {
    onCopy();
    show(t('Copied'));
  }, [show, t]);

  return (
    <>
      <div className={className}>
        <div className='account-info-wrapper'>
          <KoniAccountInfo address={address} genesisHash={genesisHash} name={name}>
            <KoniMnemonicSeed
              onCopy={_onCopy}
              seed={seed}
            />
            <KoniWarning className='create-account-warning'>
              {t<string>("Please write down your wallet's mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your wallet. Keep it carefully to not lose your assets.")}
            </KoniWarning>
            <Checkbox
              checked={isMnemonicSaved}
              label={t<string>('I have saved my mnemonic seed safely.')}
              onChange={setIsMnemonicSaved}
            />
          </KoniAccountInfo>
        </div>

        <KoniButtonArea>
          <KoniNextStepButton
            isDisabled={!isMnemonicSaved}
            onClick={onNextStep}
            className='next-step-btn'
          >
            {t<string>('Next step')}
          </KoniNextStepButton>
        </KoniButtonArea>
      </div>
    </>
  );
}

export default React.memo(styled(Mnemonic)(({ theme }: Props) => `
  margin: 0 15px;
  .account-info-wrapper {
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
`));
