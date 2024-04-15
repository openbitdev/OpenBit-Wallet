import { Prefix } from '@polkadot/util-crypto/types';
export declare const decodeAddress: (encoded?: string | Uint8Array | null, ignoreChecksum?: boolean, ss58Format?: Prefix) => Uint8Array;
