// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const HIRO_API = {
  api_status: 'https://ordinals-api.openbit.app/ordinals/v1/',

  list_of_incriptions: 'https://ordinals-api.openbit.app/ordinals/v1/inscriptions',
  transfers_per_block: 'https://ordinals-api.openbit.app/ordinals/v1/inscriptions/transfers',
  specific_inscription: 'https://ordinals-api.openbit.app/ordinals/v1/inscriptions/:id',
  inscription_content: 'https://ordinals-api.openbit.app/ordinals/v1/inscriptions/:id/content',
  inscription_transfers: 'https://ordinals-api.openbit.app/ordinals/v1/inscriptions/:id/transfers',

  satoshi_ordinal: 'https://ordinals-api.openbit.app/ordinals/v1/sats/:ordinal',
  satoshi_inscriptions: 'https://ordinals-api.openbit.app/ordinals/v1/sats/:ordinal/inscriptions',

  inscription_count_per_block: 'https://ordinals-api.openbit.app/ordinals/v1/stats/inscriptions',

  brc20_tokens: 'https://ordinals-api.openbit.app/ordinals/v1/brc-20/tokens',
  brc20_token_details: 'https://ordinals-api.openbit.app/ordinals/v1/brc-20/tokens/:ticker',
  brc20_token_holders: 'https://ordinals-api.openbit.app/ordinals/v1/brc-20/tokens/:ticker/holders',
  brc20_balances: 'https://ordinals-api.openbit.app/ordinals/v1/brc-20/balances/:address',
  brc20_activity: 'https://ordinals-api.openbit.app/ordinals/v1/brc-20/activity'
};

export const ORD_IO_URL = {
  url: 'https://www.ord.io/'
};

export const SUPPORT_SRC_VIEWER = {
  inscription_info_url: 'https://ordinals.hiro.so/inscription/:id',
  frame_preview_url: 'https://ordinals.com/preview/:id'
};
