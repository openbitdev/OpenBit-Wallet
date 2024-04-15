// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 *
 *
 * */

export let BitcoinAddressType;
(function (BitcoinAddressType) {
  BitcoinAddressType["p2pkh"] = "p2pkh";
  BitcoinAddressType["p2sh"] = "p2sh";
  BitcoinAddressType["p2wpkh"] = "p2wpkh";
  BitcoinAddressType["p2wsh"] = "p2wsh";
  BitcoinAddressType["p2tr"] = "p2tr";
})(BitcoinAddressType || (BitcoinAddressType = {}));