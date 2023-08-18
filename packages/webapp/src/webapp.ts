// Copyright 2017-2022 @subwallet/webapp authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { WebWindow } from '@subwallet/extension-koni-ui/messaging';

const webWorker = new Worker(new URL('./worker.ts', import.meta.url), { name: 'worker' });

const win = window as Window & WebWindow;

win.worker = webWorker;
