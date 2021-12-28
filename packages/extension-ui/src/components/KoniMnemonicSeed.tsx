// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import useTranslation from '../hooks/useTranslation';
import KoniTextAreaWithLabel from "@polkadot/extension-ui/components/KoniTextAreaWithLabel";
import KoniActionText from "@polkadot/extension-ui/components/KoniActionText";
import clone from '../assets/clone.svg';

interface Props {
  seed: string;
  onCopy: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

function KoniMnemonicSeed ({ className, onCopy, seed }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <KoniTextAreaWithLabel
        className='mnemonicDisplay'
        isReadOnly
        label={t<string>('Generated 12-word mnemonic seed:')}
        value={seed}
      />
      <div className='buttonsRow'>
        <KoniActionText
          className='copyBtn'
          data-seed-action='copy'
          img={clone}
          onClick={onCopy}
          text={t<string>('Copy to clipboard')}
        />
      </div>
    </div>
  );
}

export default styled(KoniMnemonicSeed)(({ theme }: ThemeProps) => `
  margin-top: 7px;
  margin-bottom: 12px;

  .buttonsRow {
    display: flex;
    flex-direction: row;
    margin-top: 15px;

    .copyBtn {
      margin-right: 32px;
      display: flex;
      align-items: center;
      > span {
        font-size: 15px;
        line-height: 24px;
        color: ${theme.textColor}
      }
    }
  }

  .mnemonicDisplay {
    textarea {
      color: ${theme.buttonTextColor2};
      font-size: ${theme.fontSize};
      height: unset;
      letter-spacing: -0.01em;
      line-height: ${theme.lineHeight};
      margin-bottom: 10px;
      padding: 9px 16px;
      font-weight: ${theme.fontFamilyRegular};
      background-color: ${theme.backgroundAccountAddress}
    }
  }
`);
