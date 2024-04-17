import { KeypairType } from '../../../types';
type TypeAddressFunction = (p: Uint8Array) => Uint8Array;
export declare const TYPE_ADDRESS: Record<KeypairType, TypeAddressFunction>;
export {};
