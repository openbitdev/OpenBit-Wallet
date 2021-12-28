// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../../types';
import React from 'react';
import styled from 'styled-components';
import next from "@polkadot/extension-ui/assets/caret-right.svg";
import Button from './Button';
import KoniButton from "@polkadot/extension-ui/components/KoniButton";

type Props = React.ComponentProps<typeof Button>;

function KoniNextStepButton ({ children, ...props }: Props): React.ReactElement<Props> {
  return (
    <KoniButton {...props}>
      {children}
      <img src={next} alt='next'
        className='arrowRight'
      />
    </KoniButton>
  );
}

export default styled(KoniNextStepButton)(({ theme }: ThemeProps) => `

  .arrowRight{
    position: absolute;
    top: 4px;
    right: 0;
    color: ${theme.buttonTextColor};
  }
`);
