// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountOptions, LedgerAddress, LedgerSignature, LedgerVersion } from '@polkadot/hw-ledger/types';

import EthApp from '@ledgerhq/hw-app-eth';
import { Ledger, LedgerTypes } from '@subwallet/extension-koni-ui/connector/Ledger/index';
import { PredefinedLedgerNetwork } from '@subwallet/extension-koni-ui/constants/ledger';

import { transports } from '@polkadot/hw-ledger-transports';
import { hexStripPrefix, u8aToHex } from '@polkadot/util';

export class EVMLedger extends Ledger {
  #app: EthApp | null = null;
  // readonly #chainId: number;
  readonly #transport: LedgerTypes;

  constructor (transport: LedgerTypes, chainId: number) {
    super();

    // u2f is deprecated
    if (!['hid', 'webusb'].includes(transport)) {
      throw new Error(`Unsupported transport ${transport}`);
    } else if (!PredefinedLedgerNetwork.find((_chain) => _chain.isEthereum && _chain.chainId === chainId)) {
      throw new Error(`Unsupported chain ${chainId}`);
    }

    // this.#chainId = chainId;
    this.#transport = transport;
  }

  getAddress (confirm?: boolean, accountOffset?: number, addressOffset?: number, accountOptions?: Partial<AccountOptions>): Promise<LedgerAddress> {
    return this.#withApp(async (app): Promise<LedgerAddress> => {
      const path = this.#serializePath(accountOffset, addressOffset, accountOptions);

      console.log('Get address path', path);

      const { address, publicKey } = await this.#wrapError(app.getAddress(path, confirm));

      return {
        address,
        publicKey: `0x${publicKey}`
      };
    });
  }

  getVersion (): Promise<LedgerVersion> {
    return this.#withApp(async (app): Promise<LedgerVersion> => {
      const { version } = await this.#wrapError(app.getAppConfiguration());

      const [_major, _minor, _patch] = version.split('.');

      const major = parseInt(_major);
      const minor = parseInt(_minor);
      const patch = parseInt(_patch);

      return {
        isLocked: false,
        isTestMode: false,
        version: [major, minor, patch]
      };
    });
  }

  async sign (message: Uint8Array, accountOffset = 0, addressOffset = 0, accountOptions: AccountOptions): Promise<LedgerSignature> {
    return this.#withApp(async (app): Promise<LedgerSignature> => {
      const hex = hexStripPrefix(u8aToHex(message));
      //
      // const tx: Transaction | null = createTransactionFromRLP(hex);
      //
      // if (!tx) {
      //   throw new Error('Invalid params');
      // }
      //
      // const type = TRANSACTION_ENVELOPE_TYPES.FEE_MARKET;
      //
      // const txParams: AccessListEIP2930TxData = {
      //   type: type,
      //   nonce: anyNumberToBN(tx.nonce).toNumber(),
      //   gasPrice: anyNumberToBN(tx.gasPrice).toNumber(),
      //   gasLimit: anyNumberToBN(tx.gas).toNumber(),
      //   to: tx.action !== undefined ? tx.action : '',
      //   value: anyNumberToBN(tx.value).toNumber(),
      //   data: tx.data ? tx.data : '',
      //   chainId: anyNumberToBN(tx.ethereumChainId).toNumber() || 1
      // };
      //
      // const common = Common.forCustomChain('mainnet', {
      //   name: this.#chain,
      //   networkId: parseInt(tx.ethereumChainId, 16),
      //   chainId: parseInt(tx.ethereumChainId, 16)
      // }, 'petersburg');
      //
      // const unsignedEthTx = TransactionFactory.fromTxData(txParams, { common });
      //
      // console.log(txParams);
      // console.log(u8aToHex(unsignedEthTx.serialize()));

      const path = this.#serializePath(accountOffset, addressOffset, accountOptions);

      console.log('Sign path', path);

      const { r, s, v } = await this.#wrapError(app.signTransaction(path, hex));

      console.log(v)

      const hexR = r.length % 2 === 1 ? `0${r}` : r;
      const hexS = s.length % 2 === 1 ? `0${s}` : s;
      const hexV = v.length % 2 === 1 ? `0${v}` : v;

      console.log('r, s, v:', r, s, v);

      return {
        signature: `0x${hexR + hexS + hexV}`
      };
    });
  }

  signMessage (message: Uint8Array, accountOffset?: number, addressOffset?: number, accountOptions?: Partial<AccountOptions>): Promise<LedgerSignature> {
    throw new Error('No sign message method');
  }

  #serializePath (accountOffset = 0, addressOffset = 0, accountOptions?: Partial<AccountOptions>): string {
    const account = (accountOptions?.account || 0) + (accountOffset || 0);
    const addressIndex = (accountOptions?.addressIndex || 0) + (addressOffset || 0);
    const change = accountOptions?.change || 0;

    return `44'/60'/${account}'/${change}/${addressIndex}`;
  }

  #getApp = async (): Promise<EthApp> => {
    if (!this.#app) {
      const def = transports.find(({ type }) => type === this.#transport);

      if (!def) {
        throw new Error(`Unable to find a transport for ${this.#transport}`);
      }

      const transport = await def.create();

      this.#app = new EthApp(transport);
    }

    return this.#app;
  };

  #withApp = async<T> (fn: (_app: EthApp) => Promise<T>): Promise<T> => {
    try {
      const app = await this.#getApp();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await fn(app);
    } catch (error) {
      this.#app = null;
      throw error;
    }
  };

  #wrapError = async<T> (promise: Promise<T>): Promise<T> => {
    try {
      return await promise;
    } catch (e) {
      const error = (e as Error).message;
      const message = mappingError(error);

      throw new Error(message);
    }
  };
}

const mappingError = (error: string): string => {
  if (error.includes('(0x6511)')) {
    return 'App does not seem to be open';
  }

  if (error.includes('(0x6985)')) {
    return 'User rejected';
  }

  if (error.includes('(0x6b0c)')) {
    return 'Your ledger is locked';
  }

  return error;
};
