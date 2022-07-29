// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message } from '@subwallet/extension-base/types';

import { MESSAGE_ORIGIN_CONTENT, MESSAGE_ORIGIN_PAGE, PORT_CONTENT } from '@subwallet/extension-base/defaults';
import { redirectIfPhishing } from '@subwallet/extension-base/page';
import { chrome } from '@subwallet/extension-inject/chrome';

// connect to the extension
let port: chrome.runtime.Port | null;

function connect () {
  if (!port) {
    port = chrome.runtime.connect({ name: PORT_CONTENT });
    port.onDisconnect.addListener(() => {
      port = null;
      console.log(`Port [${PORT_CONTENT}] is disconnected.`);
    });

    // const port = chrome.runtime.connect({ name: PORT_CONTENT });

    // send any messages from the extension back to the page
    port.onMessage.addListener((data): void => {
      window.postMessage({ ...data, origin: MESSAGE_ORIGIN_CONTENT }, '*');
    });
  }
}

connect();

async function makeSurePortConnected () {
  const poll = (resolve: (value: unknown) => void) => {
    if (port) {
      resolve(true);
    } else {
      console.log(`Port [${PORT_CONTENT}] is connecting...`);
      setTimeout(() => poll(resolve), 400);
    }
  };

  return new Promise(poll);
}

// all messages from the page, pass them to the extension
window.addEventListener('message', ({ data, source }: Message): void => {
  // only allow messages from our window, by the inject
  if (source !== window || data.origin !== MESSAGE_ORIGIN_PAGE) {
    return;
  }

  if (!port) {
    connect();
  }

  makeSurePortConnected().then(() => {
    port && port.postMessage(data);
  }).catch((e) => console.warn(e));
});

// inject our data injector
const script = document.createElement('script');

script.src = chrome.runtime.getURL('page.js');

script.onload = (): void => {
  // remove the injecting tag when loaded
  if (script.parentNode) {
    script.parentNode.removeChild(script);
  }
};

(document.head || document.documentElement).appendChild(script);

redirectIfPhishing().then((gotRedirected) => {
  if (!gotRedirected) {
    console.log('Check phishing by URL: Passed.');
  }
}).catch((e) => {
  console.warn(`Unable to determine if the site is in the phishing list: ${(e as Error).message}`);
});
