// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ResponseAddress, ResponseBase, ResponseSign, ResponseVersion, SubstrateApp } from '@zondax/ledger-substrate';
import type { AccountOptions, LedgerAddress, LedgerSignature, LedgerVersion } from '@polkadot/hw-ledger/types';

import { Ledger, LedgerTypes } from '@subwallet/extension-koni-ui/connector/Ledger/index';

import { LEDGER_DEFAULT_ACCOUNT, LEDGER_DEFAULT_CHANGE, LEDGER_DEFAULT_INDEX, LEDGER_SUCCESS_CODE } from '@polkadot/hw-ledger/constants';
import { ledgerApps } from '@polkadot/hw-ledger/defaults';
import { transports } from '@polkadot/hw-ledger-transports';
import { u8aToBuffer } from '@polkadot/util';

export class SubstrateLedger extends Ledger {
  #app: SubstrateApp | null = null;
  readonly #chain: string;
  readonly #transport: LedgerTypes;

  constructor (transport: LedgerTypes, chain: string) {
    super();

    // u2f is deprecated
    if (!['hid', 'webusb'].includes(transport)) {
      throw new Error(`Unsupported transport ${transport}`);
    } else if (!Object.keys(ledgerApps).includes(chain)) {
      throw new Error(`Unsupported chain ${chain}`);
    }

    this.#chain = chain;
    this.#transport = transport;
  }

  getAddress (confirm?: boolean, accountOffset?: number, addressOffset?: number, accountOptions?: Partial<AccountOptions>): Promise<LedgerAddress> {
    return this.#withApp(async (app): Promise<LedgerAddress> => {
      const account = (accountOptions?.account || LEDGER_DEFAULT_ACCOUNT) + (accountOffset || 0);
      const addressIndex = (accountOptions?.addressIndex || LEDGER_DEFAULT_INDEX) + (addressOffset || 0);
      const change = accountOptions?.change || LEDGER_DEFAULT_CHANGE;
      const { address, pubKey } = await this.#wrapError(app.getAddress(account, change, addressIndex, confirm)) as ResponseAddress;

      return {
        address,
        publicKey: `0x${pubKey}`
      };
    });
  }

  getVersion (): Promise<LedgerVersion> {
    return this.#withApp(async (app): Promise<LedgerVersion> => {
      const { device_locked: isLocked,
        major,
        minor,
        patch,
        test_mode: isTestMode } = await this.#wrapError(app.getVersion()) as ResponseVersion;

      return {
        isLocked,
        isTestMode,
        version: [major, minor, patch]
      };
    });
  }

  async sign (message: Uint8Array, accountOffset = 0, addressOffset = 0, accountOptions: AccountOptions): Promise<LedgerSignature> {
    return this.#withApp(async (app): Promise<LedgerSignature> => {
      const buffer = u8aToBuffer(message);
      const account = (accountOptions?.account || LEDGER_DEFAULT_ACCOUNT) + (accountOffset || 0);
      const addressIndex = (accountOptions?.addressIndex || LEDGER_DEFAULT_INDEX) + (addressOffset || 0);
      const change = accountOptions?.change || LEDGER_DEFAULT_CHANGE;
      const { signature } = await this.#wrapError(app.sign(account, change, addressIndex, buffer)) as ResponseSign;

      return {
        signature: `0x${signature.toString('hex')}`
      };
    });
  }

  signMessage (message: Uint8Array, accountOffset?: number, addressOffset?: number, accountOptions?: Partial<AccountOptions>): Promise<LedgerSignature> {
    throw new Error('No sign message method');
  }

  #getApp = async () => {
    if (!this.#app) {
      const def = transports.find(({ type }) => type === this.#transport);

      if (!def) {
        throw new Error(`Unable to find a transport for ${this.#transport}`);
      }

      const transport = await def.create();

      this.#app = ledgerApps[this.#chain](transport);
    }

    return this.#app;
  };

  #withApp = async<T> (fn: (_app: SubstrateApp) => Promise<T>): Promise<T> => {
    try {
      const app = await this.#getApp();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await fn(app);
    } catch (error) {
      this.#app = null;
      throw error;
    }
  };

  #wrapError = async (promise: Promise<ResponseBase>) => {
    const result = await promise;

    if (result.return_code !== LEDGER_SUCCESS_CODE) {
      throw new Error(result.error_message);
    }

    return result;
  };
}
