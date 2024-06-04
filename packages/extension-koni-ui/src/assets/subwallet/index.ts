// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DefaultLogosMap } from '@subwallet/extension-koni-ui/assets/logo';

const SwLogosMap: Record<string, string> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  openbit: require('./openbit.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  subwallet: require('./subwallet.png'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  avatar_placeholder: require('./avatar_placeholder.png'),
  default: DefaultLogosMap.default,
  transak: DefaultLogosMap.transak,
  onramper: DefaultLogosMap.onramper,
  moonpay: DefaultLogosMap.moonpay,
  banxa: DefaultLogosMap.banxa,
  coinbase: DefaultLogosMap.coinbase,
  stellaswap: DefaultLogosMap.stellaswap,
  rune: DefaultLogosMap.rune,
  ordinal_rune: DefaultLogosMap.ordinal_rune,
  default_placeholder: DefaultLogosMap.default_placeholder
};

export default SwLogosMap;
