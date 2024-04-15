import { BitcoinAddressInfo, BitcoinNetwork, KeypairType } from '../../types';
export declare const getBitcoinAddressInfo: (address: string) => BitcoinAddressInfo;
export declare const validateBitcoinAddress: (address: string, network?: BitcoinNetwork) => boolean;
export declare const validateP2TRAddress: (address: string) => BitcoinNetwork;
export declare const validateP2PKHAddress: (address: string) => BitcoinNetwork;
export declare const validateP2WPKHAddress: (address: string) => BitcoinNetwork;
export declare const isBitcoinAddress: (address: string) => BitcoinNetwork;
export declare const getKeypairTypeByAddress: (address: string) => KeypairType;
