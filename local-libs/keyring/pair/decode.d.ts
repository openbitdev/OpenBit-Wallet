import type { PairInfo } from '@subwallet/keyring/pair/types';
import type { EncryptedJsonEncoding } from '@polkadot/util-crypto/types';
type DecodeResult = PairInfo & {
    secretKey: Uint8Array;
};
export declare function decodePair(passphrase?: string, encrypted?: Uint8Array | null, _encType?: EncryptedJsonEncoding | EncryptedJsonEncoding[]): DecodeResult;
export {};
