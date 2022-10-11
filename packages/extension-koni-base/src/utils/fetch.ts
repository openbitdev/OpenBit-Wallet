// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import crossFetch from 'cross-fetch';

const getFetch = () => {
  try {
    return fetch;
  } catch (e) {
    return crossFetch;
  }
};

const _fetch = getFetch();

global.fetch = _fetch;

export default _fetch;
