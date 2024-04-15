import type { Keypair } from '@polkadot/util-crypto/types';
import { KeypairType } from '../../../types';
type FromSeedFunction = (seed: Uint8Array, onlyJs?: boolean) => Keypair;
export declare const TYPE_FROM_SEED: Record<KeypairType, FromSeedFunction>;
export {};
