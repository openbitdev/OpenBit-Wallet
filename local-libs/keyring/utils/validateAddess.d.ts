import { BitcoinNetwork, KeypairType } from '../types';
export declare const validateP2TRAddress: (address: string) => BitcoinNetwork;
export declare const validateP2PKHAddress: (address: string) => BitcoinNetwork;
export declare const validateP2WPKHAddress: (address: string) => BitcoinNetwork;
export declare const isBitcoinAddress: (address: string) => BitcoinNetwork;
export declare const getKeypairTypeByAddress: (address: string) => KeypairType;
