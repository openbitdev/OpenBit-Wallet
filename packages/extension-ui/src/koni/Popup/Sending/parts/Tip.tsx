// Copyright 2017-2021 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import React, {useEffect, useState} from 'react';

import {BN_ZERO} from '@polkadot/util';
import {useTranslation} from "react-i18next";
import {Toggle} from "@polkadot/extension-ui/koni/react-components";
import InputBalance from "@polkadot/extension-ui/koni/react-components/InputBalance";
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";

interface Props extends ThemeProps {
  className?: string;
  onChange: (tip: BN) => void;
}

function Tip({className, onChange}: Props): React.ReactElement<Props> | null {
  const {t} = useTranslation();
  const [tip, setTip] = useState(BN_ZERO);
  const [showTip, setShowTip] = useState(false);

  useEffect((): void => {
    onChange(showTip ? tip : BN_ZERO);
  }, [onChange, showTip, tip]);

  return (
    <div className={className}>
      <div className={'kn-l-toggle'}>
        <Toggle
          className='tipToggle'
          label={
            showTip
              ? t<string>('Include an optional tip for faster processing')
              : t<string>('Do not include a tip for the block author')
          }
          onChange={setShowTip}
          value={showTip}
        />
      </div>
      {showTip && (
        <div className={'kn-l-InputBalance'}>
          <InputBalance
            help={t<string>('Add a tip to this extrinsic, paying the block author for greater priority')}
            isZeroable
            label={t<string>('Tip (optional)')}
            onChange={setTip}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(styled(Tip)(({ theme }: ThemeProps) => `
  .kn-l-toggle {
    display: flex;
    justify-content: flex-end;
  }

  .kn-l-InputBalance {
    margin-top: 10px;
  }
`));
