import { KeypairType } from '../types';
export declare const emvPath = "m/44'/60'/0'/0/{index}";
export declare const bitPath = "m/{proposal}'/{slip44}'/{index}'/0/0";
export declare const getEvmDerivePath: (index: number) => string;
export declare const getBitDerivePathFunction: (slip44: number, proposal: number) => (index: number) => string;
export declare const getDerivePath: (type: KeypairType) => (index: number) => string;
