import type { HexString } from '@polkadot/util/types';
import type { EncryptedJson, Keypair, Prefix } from '@polkadot/util-crypto/types';
import { TypedTransaction } from '@ethereumjs/tx';
import { Psbt as BitcoinTransaction } from 'bitcoinjs-lib';
import { SignatureOptions } from 'bitcoinjs-message';
/**
 *
 *
 * */
export type KeypairType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum' | 'bitcoin-44' | 'bitcoin-84' | 'bitcoin-86' | 'bittest-44' | 'bittest-84' | 'bittest-86';
export type BitcoinNetwork = 'mainnet' | 'testnet' | 'regtest' | 'unknown';
export type BitcoinMainnetKeypairType = 'bitcoin-44' | 'bitcoin-84' | 'bitcoin-86';
export type BitcoinTestnetKeypairType = 'bittest-44' | 'bittest-84' | 'bittest-86';
export interface KeyringOptions {
    /**
     * @description The ss58Format to use for address encoding (defaults to 42)
     */
    ss58Format?: Prefix;
    /**
     * @description The type of keyring to create (defaults to ed25519)
     */
    type?: KeypairType;
}
export type KeyringPair$Meta = Record<string, unknown>;
export interface KeyringPair$Json extends EncryptedJson {
    /** The ss58 encoded address or the hex-encoded version (the latter is for ETH-compat chains) */
    address: string | HexString;
    /** The underlying metadata associated with the keypair */
    meta: KeyringPair$Meta;
}
type evm_message_method = 'eth_sign' | 'personal_sign' | 'eth_signTypedData' | 'eth_signTypedData_v1' | 'eth_signTypedData_v3' | 'eth_signTypedData_v4';
export interface EvmSigner {
    signMessage: (payload: any, method: evm_message_method) => Promise<string>;
    signTransaction: (transaction: TypedTransaction) => string;
    derive: (index: number, meta?: KeyringPair$Meta) => KeyringPair;
}
export interface SubstrateSigner {
    sign: (message: HexString | string | Uint8Array, options?: SignOptions) => Uint8Array;
    derive: (suri: string, meta?: KeyringPair$Meta) => KeyringPair;
}
export interface BitcoinSigner {
    derive: (index: number, meta?: KeyringPair$Meta) => KeyringPair;
    signMessage: (message: HexString | string | Uint8Array, compressed?: boolean, options?: SignatureOptions) => string;
    signTransaction: (transaction: BitcoinTransaction) => string;
}
export interface SignOptions {
    /**
     * @description Create a MultiSignature-compatible output with an indicator type
     **/
    withType?: boolean;
}
export interface KeyringPair {
    readonly address: string;
    readonly addressRaw: Uint8Array;
    readonly meta: KeyringPair$Meta;
    readonly isLocked: boolean;
    readonly publicKey: Uint8Array;
    readonly type: KeypairType;
    readonly haveEntropy: boolean;
    readonly evm: EvmSigner;
    readonly substrate: SubstrateSigner;
    readonly bitcoin: BitcoinSigner;
    decodePkcs8(passphrase?: string, encoded?: Uint8Array): void;
    encodePkcs8(passphrase?: string): Uint8Array;
    exportMnemonic(passphrase: string): string;
    changePkcs8(newPassphrase: string, oldPassphrase?: string): Uint8Array;
    lock(): void;
    setMeta(meta: KeyringPair$Meta): void;
    /** Must have, be used on signing interface of substrate */
    sign(message: HexString | string | Uint8Array, options?: SignOptions): Uint8Array;
    toJson(passphrase?: string): KeyringPair$Json;
    unlock(passphrase?: string): void;
    verify(message: HexString | string | Uint8Array, signature: Uint8Array, signerPublic: HexString | string | Uint8Array): boolean;
    vrfSign(message: HexString | string | Uint8Array, context?: HexString | string | Uint8Array, extra?: HexString | string | Uint8Array): Uint8Array;
    vrfVerify(message: HexString | string | Uint8Array, vrfResult: Uint8Array, signerPublic: HexString | Uint8Array | string, context?: HexString | string | Uint8Array, extra?: HexString | string | Uint8Array): boolean;
}
export interface KeyringPairs {
    add: (pair: KeyringPair) => KeyringPair;
    all: () => KeyringPair[];
    get: (address: string | Uint8Array) => KeyringPair;
    remove: (address: string | Uint8Array) => void;
}
export interface KeyringPasswordJson {
    passwordHash: string;
}
export interface KeyringInstance {
    readonly pairs: KeyringPair[];
    readonly publicKeys: Uint8Array[];
    readonly type: KeypairType;
    readonly isLocked: boolean;
    readonly hasMasterPassword: boolean;
    decodeAddress(encoded: string | Uint8Array, ignoreChecksum?: boolean, ss58Format?: Prefix): Uint8Array;
    encodeAddress(key: Uint8Array | string, ss58Format?: Prefix): string;
    setSS58Format(ss58Format: Prefix): void;
    addPairWithMasterPassword(pair: KeyringPair): KeyringPair$Json;
    addPair(pair: KeyringPair): KeyringPair;
    addFromAddress(address: string | Uint8Array, meta?: KeyringPair$Meta, encoded?: Uint8Array | null, type?: KeypairType, ignoreChecksum?: boolean): KeyringPair;
    addFromJson(pair: KeyringPair$Json, ignoreChecksum?: boolean, fromMulti?: boolean): KeyringPair;
    addFromMnemonic(mnemonic: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
    addFromPair(pair: Keypair, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
    addFromSeed(seed: Uint8Array, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
    addFromUri(suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
    createFromJson(json: KeyringPair$Json, ignoreChecksum?: boolean, fromMulti?: boolean): KeyringPair;
    createFromPair(pair: Keypair, meta: KeyringPair$Meta, type: KeypairType): KeyringPair;
    createFromUri(suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
    getPair(address: string | Uint8Array): KeyringPair;
    getPairs(): KeyringPair[];
    getPublicKeys(): Uint8Array[];
    removePair(address: string | Uint8Array): void;
    toJson(address: string | Uint8Array, passphrase?: string): KeyringPair$Json;
    changeMasterPassword(newPassphrase: string, oldPassphrase?: string): KeyringPasswordJson;
    migrateWithMasterPassword(address: string, oldPassphrase: string): KeyringPair$Json;
    setupMasterPassword(passwordHash?: string): void;
    getJsonPairsWithMasterPassword(): KeyringPair$Json[];
    resetPassword(): void;
    unlockKeyring(passphrase: string): void;
    unlockPair(address: string): void;
    lockALl(): void;
}
export {};
