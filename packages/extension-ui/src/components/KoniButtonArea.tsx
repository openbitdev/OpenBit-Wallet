// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import React from 'react';
import styled from 'styled-components';

interface Props extends ThemeProps {
  className?: string;
  children: React.ReactNode;
}

const KoniButtonArea = function ({ children, className }: Props) {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default styled(KoniButtonArea)(({ theme }: ThemeProps) => `
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  margin-left: 0;
  margin-right: 0;

  & > button:not(:last-of-type) {
    margin-right: 8px;
  }
`);
