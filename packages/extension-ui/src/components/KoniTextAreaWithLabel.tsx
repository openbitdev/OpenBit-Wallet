// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';
import KoniLabel from "@polkadot/extension-ui/components/KoniLabel";
import {KoniTextArea} from "@polkadot/extension-ui/components/KoniTextInputs";

interface Props {
  className?: string;
  isError?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  rowsCount?: number;
  label: string;
  onChange?: (value: string) => void;
  value?: string;
}

export default function KoniTextAreaWithLabel ({ className, isError, isFocused, isReadOnly, label, onChange, rowsCount, value }: Props): React.ReactElement<Props> {
  const _onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void => {
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <KoniLabel
      className={className}
      label={label}
    >
      <KoniTextArea
        autoCapitalize='off'
        autoCorrect='off'
        autoFocus={isFocused}
        onChange={_onChange}
        readOnly={isReadOnly}
        rows={rowsCount || 2}
        spellCheck={false}
        value={value}
        withError={isError}
      />
    </KoniLabel>
  );
}
