import type { PairInfo } from './types';
export declare function encodePair({ entropy, publicKey, secretKey }: PairInfo, passphrase?: string): Uint8Array;
