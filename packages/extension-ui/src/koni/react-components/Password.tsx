// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import Input from './Input';
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";

interface Props extends ThemeProps {
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  defaultValue?: string;
  help?: string;
  isDisabled?: boolean;
  isError?: boolean;
  isFull?: boolean;
  label?: string;
  labelExtra?: React.ReactNode;
  name?: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  tabIndex?: number;
  value: string;
  withLabel?: boolean;
}

function Password ({ autoFocus, children, className = '', defaultValue, help, isDisabled, isError, isFull, label, labelExtra, name, onChange, onEnter, onEscape, tabIndex, value, withLabel }: Props): React.ReactElement<Props> {
  return (
    <Input
      autoFocus={autoFocus}
      className={`ui--Password ${className}`}
      defaultValue={defaultValue}
      help={help}
      isDisabled={isDisabled}
      isError={isError}
      isFull={isFull}
      label={label}
      labelExtra={labelExtra}
      name={name}
      onChange={onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      tabIndex={tabIndex}
      type='password'
      value={value}
      withLabel={withLabel}
    >
      {children}
    </Input>
  );
}

export default React.memo(styled(Password)(({theme, isError}: Props) => `
  label {
    color: ${theme.textColor2};
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.04em;
    margin-bottom: 12px;
    text-transform: uppercase;
    font-family: ${theme.fontFamilyRegular};
  }

  .ui--Input > input {
    background: ${theme.backgroundAccountAddress};
    border-radius: 8px;
    border: none;
    box-sizing: border-box;
    color: ${isError ? theme.errorColor : theme.textColor2};
    display: block;
    font-family: ${theme.fontFamily};
    font-size: ${theme.fontSize2};
    height: 48px;
    outline: none;
    padding: 0.5rem 0.75rem;
    resize: none;
    width: 100%;
    margin-top: 4px;
  }
`));
