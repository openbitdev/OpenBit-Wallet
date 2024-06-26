import type { KeyringInstance, KeyringPair } from '@subwallet/keyring/types';
import type { Prefix } from '@polkadot/util-crypto/address/types';
import type { AddressSubject } from './observable/types';
import type { KeyringOptions, KeyringStore, PasswordStore } from './types';
export declare class Base {
    #private;
    protected _store: KeyringStore;
    protected _password_store: PasswordStore;
    protected _genesisHash?: string;
    protected _genesisHashAdd: string[];
    constructor();
    get accounts(): AddressSubject;
    get addresses(): AddressSubject;
    get contracts(): AddressSubject;
    get keyring(): KeyringInstance;
    get genesisHash(): string | undefined;
    get genesisHashes(): string[];
    decodeAddress: (key: string | Uint8Array, ignoreChecksum?: boolean, ss58Format?: Prefix) => Uint8Array;
    encodeAddress: (key: string | Uint8Array, ss58Format?: Prefix) => string;
    getPair(address: string | Uint8Array): KeyringPair;
    getPairs(): KeyringPair[];
    isAvailable(_address: Uint8Array | string): boolean;
    isPassValid(password: string): boolean;
    setSS58Format(ss58Format?: Prefix): void;
    setDevMode(isDevelopment: boolean): void;
    protected initKeyring(options: KeyringOptions): void;
    protected addAccountPairs(): void;
    protected addTimestamp(pair: KeyringPair): void;
    restoreKeyringPassword(): Promise<void>;
}
