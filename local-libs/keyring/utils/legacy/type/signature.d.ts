import type { Keypair } from '@polkadot/util-crypto/types';
import { KeypairType } from '../../../types';
type a = (message: Uint8Array, { publicKey, secretKey }: Partial<Keypair>, onlyJs?: boolean) => Uint8Array;
export declare const TYPE_SIGNATURE: Record<KeypairType, a>;
export {};
