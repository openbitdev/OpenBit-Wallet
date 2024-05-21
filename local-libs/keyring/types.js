// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 *
 *
 * */

export const SubstrateKeypairTypes = ['sr25519', 'ed25519', 'ecdsa'];
export const EthereumKeypairTypes = ['ethereum'];
export const BitcoinKeypairTypes = ['bitcoin-44', 'bitcoin-84', 'bitcoin-86', 'bittest-44', 'bittest-84', 'bittest-86'];
export let BitcoinAddressType;
(function (BitcoinAddressType) {
  BitcoinAddressType["p2pkh"] = "p2pkh";
  BitcoinAddressType["p2sh"] = "p2sh";
  BitcoinAddressType["p2wpkh"] = "p2wpkh";
  BitcoinAddressType["p2wsh"] = "p2wsh";
  BitcoinAddressType["p2tr"] = "p2tr";
})(BitcoinAddressType || (BitcoinAddressType = {}));