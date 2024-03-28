import type { DeriveJunction } from '@polkadot/util-crypto/key/DeriveJunction';
import type { KeypairType } from '../types';
import { Keypair } from '@polkadot/util-crypto/types';
export declare function keyFromPath(pair: Keypair, path: DeriveJunction[], type: KeypairType): Keypair;
