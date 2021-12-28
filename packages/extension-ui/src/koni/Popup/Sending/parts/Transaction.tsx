// Copyright 2017-2021 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

import React from 'react';
import styled from 'styled-components';

import PaymentInfo from './PaymentInfo';
import {QueueTx} from "@polkadot/extension-ui/koni/react-components/Status/types";

interface Props {
  accountId: string | null;
  className?: string;
  currentItem: QueueTx;
  isSendable: boolean;
  onError: () => void;
  tip?: BN;
}

function Transaction ({ accountId, className, currentItem: { extrinsic, isUnsigned, payload }, isSendable, onError, tip }: Props): React.ReactElement<Props> | null {
  if (!extrinsic) {
    return null;
  }

  return (
    <div className={className}>
      {!isUnsigned && !payload && (
        <PaymentInfo
          accountId={accountId}
          className='tx-details'
          extrinsic={extrinsic}
          isSendable={isSendable}
          tip={tip}
        />
      )}
    </div>
  );
}

export default React.memo(styled(Transaction)`
  // .tx-details {
  //   .highlight {
  //     font-weight: 700;
  //   }
  //
  //   .meta {
  //     margin-bottom: 0.5rem;
  //     margin-left: 2rem;
  //   }
  //
  //   .meta, .mute {
  //     opacity: 0.6;
  //   }
  // }
`);
