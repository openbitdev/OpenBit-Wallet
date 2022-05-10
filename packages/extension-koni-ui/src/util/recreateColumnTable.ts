// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';

import { AbstractColumnData } from '@polkadot/extension-base/background/KoniTypes';

export const recreateColumnTable = <DataRecord>(_columns: AbstractColumnData<DataRecord>[]): AbstractColumnData<DataRecord>[] => {
  return _columns.map((col) => {
    const result: AbstractColumnData<DataRecord> = { ...col };
    const className: string[] = result.className ? [result.className] : [];

    if (result.align) {
      className.push(`text-${result.align}`);
    } else {
      className.push('text-left');
    }

    result.className = CN(className);

    return result;
  });
};
