// Copyright 2017-2021 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {DeriveBalancesAll} from '@polkadot/api-derive/types';
import type {AccountId, AccountIndex, Address} from '@polkadot/types/interfaces';

import React from 'react';

import {useApi, useCall} from '../react-hooks';

import FormatBalance from './FormatBalance';
import {apiWrap} from "@polkadot/extension-ui/koni/react-components/util/apiWrap";

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function Wrapper(props: Props): React.ReactElement<Props> {
  return apiWrap(props)(AvailableDisplay);
}

function AvailableDisplay ({ children, className = '', label, params }: Props): React.ReactElement<Props> {
  const { api, apiUrl } = useApi();

  const allBalances = useCall<DeriveBalancesAll>(api.derive.balances?.all, [params], undefined, apiUrl);

  return (
    <FormatBalance
      className={className}
      label={label}
      value={allBalances?.availableBalance}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(Wrapper);
