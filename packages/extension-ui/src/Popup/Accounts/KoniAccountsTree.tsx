// Copyright 2019-2021 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountWithChildren } from '@polkadot/extension-base/background/types';

import React from 'react';
import KoniAccount from "@polkadot/extension-ui/Popup/Accounts/KoniAccount";

interface Props extends AccountWithChildren {
  parentName?: string;
  closeSetting?: () => void;
}

export default function KoniAccountsTree ({ parentName, suri, closeSetting, ...account }: Props): React.ReactElement<Props> {
  return (
    <>
      <KoniAccount
        {...account}
        parentName={parentName}
        suri={suri}
        closeSetting={closeSetting}
      />
      {account?.children?.map((child, index) => (
        <KoniAccountsTree
          closeSetting={closeSetting}
          key={`${index}:${child.address}`}
          {...child}
          parentName={account.name}
        />
      ))}
    </>
  );
}
