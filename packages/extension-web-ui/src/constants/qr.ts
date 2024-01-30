// Copyright 2019-2022 @subwallet/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

export * from "@subwallet/extension-koni-ui/constants/qr";
export const SUPPORT_WALLETS = [{
  name: 'SubWallet',
  substrate: 'subwallet-js',
  evm: 'SubWallet',
  icon: '/images/subwallet.png'
}, {
  name: 'Polkadot{.js}',
  substrate: 'polkadot-js',
  evm: null,
  icon: '/images/subwallet.png'
}, {
  name: 'Talisman',
  substrate: 'talisman',
  evm: null,
  icon: '/images/subwallet.png'
}];
