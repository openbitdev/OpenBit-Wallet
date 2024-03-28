import type { HexString } from '@polkadot/util/types';
import { Prefix } from '@polkadot/util-crypto/types';
import { KeypairType } from '../types';
export declare const encodeAddress: (key: HexString | Uint8Array | string, ss58Format?: Prefix, type?: KeypairType) => string;
