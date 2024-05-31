// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { fetchJson, fetchText } from '@subwallet/extension-base/utils/fetch';
import { staticData, StaticKey } from '@subwallet/extension-base/utils/staticData';

const PRODUCTION_BRANCHES = ['master', 'webapp', 'webapp-dev'];
const branchName = process.env.BRANCH_NAME || 'koni-dev';
const fetchTarget = PRODUCTION_BRANCHES.indexOf(branchName) > -1 ? 'list.json' : 'preview.json';

const swStaticDomain = 'https://static-data.subwallet.app';
const obStaticDomain = 'https://static-data.openbit.app';
const swSlugList = ['chains', 'chain-assets/disabled-xcm-channels', 'chain-assets/price-map'];

export async function fetchStaticData<T> (slug: string, targetFile?: string, isJson = true) {
  const fetchFile = targetFile || fetchTarget;

  // If targetFile in swSlugList, fetch from swStaticDomain
  const staticDomain = swSlugList.includes(slug) ? swStaticDomain : obStaticDomain;

  try {
    if (isJson) {
      return await fetchJson<T>(`${staticDomain}/${slug}/${fetchFile}`);
    } else {
      return await fetchText<T>(`${staticDomain}/${slug}/${fetchFile}`);
    }
  } catch (e) {
    return staticData[slug as StaticKey] as T;
  }
}
