// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SignerResult } from '@polkadot/api/types';

import { ExternalRequestPromise, ExternalRequestPromiseStatus } from '@subwallet/extension-base/background/KoniTypes';
import { LedgerState, Web3Transaction } from '@subwallet/extension-base/signers/types';
import RLP, { Input } from 'rlp';

import { u8aToHex } from '@polkadot/util';

interface CallbackProps {
  ledgerState: LedgerState
}

interface LedgerSignerProps {
  callback: (state: CallbackProps) => void;
  id: string;
  setState: (promise: ExternalRequestPromise) => void;
}

export default class LedgerSigner {
  readonly #callback: (state: CallbackProps) => void;
  readonly #id: string;
  readonly #setState: (promise: ExternalRequestPromise) => void;

  constructor ({ callback, id, setState }: LedgerSignerProps) {
    this.#callback = callback;
    this.#id = id;
    this.#setState = setState;
  }

  public async signTransaction (tx: Web3Transaction): Promise<SignerResult> {
    return new Promise((resolve, reject): void => {
      const data: Input = [
        tx.nonce,
        tx.gasPrice,
        tx.gasLimit,
        tx.to,
        tx.value,
        tx.data,
        tx.chainId,
        new Uint8Array([0x00]),
        new Uint8Array([0x00])
      ];

      const qrPayload = RLP.encode(data);

      this.#setState({ reject: reject, resolve: resolve, status: ExternalRequestPromiseStatus.PENDING, createdAt: new Date().getTime() });

      this.#callback({
        ledgerState: {
          ledgerPayload: u8aToHex(qrPayload),
          ledgerId: this.#id
        }
      });
    });
  }
}
