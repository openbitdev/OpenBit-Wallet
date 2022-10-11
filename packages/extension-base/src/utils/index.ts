// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

export { canDerive } from './canDerive';

export const isManifestV3 = (): boolean => chrome.runtime.getManifest().manifest_version === 3;

export const getUrl = (page: string) => {
  return isManifestV3() ? chrome.runtime.getURL(page) : chrome.extension.getURL(page);
};
