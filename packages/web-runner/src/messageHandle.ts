// Copyright 2019-2022 @subwallet/web-runner authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RequestSignatures, TransportRequestMessage, TransportResponseMessage } from '@subwallet/extension-base/background/types';
import { PORT_CONTENT, PORT_EXTENSION } from '@subwallet/extension-base/defaults';
import handlers from '@subwallet/extension-koni-base/background/handlers';

export interface CustomResponse<T> {
  id: string,
  response: T,
  error?: string
}

export type PageStatus = CustomResponse<{ status: 'init' | 'load' | 'crypto_ready' }>

export function responseMessage (response: TransportResponseMessage<keyof RequestSignatures> | PageStatus) {
  // @ts-ignore
  if (window.ReactNativeWebView) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    window.ReactNativeWebView.postMessage(JSON.stringify(response));
  } else {
    console.log('Post message in browser ', response);
  }
}

export type MobileHandlers = Record<string, (data: { id: string, message: string, request: unknown }) => Promise<unknown>>;

export function setupHandlers (MobileHandlers: MobileHandlers = {}) {
  window.addEventListener('message', (ev) => {
    const data = ev.data as TransportRequestMessage<keyof RequestSignatures>;
    const port = {
      name: PORT_EXTENSION,
      sender: { url: data.origin || ev.origin },
      postMessage: responseMessage,
      onDisconnect: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        addListener: () => {
        }
      }
    };

    if (data.id && data.message) {
      if (data.message.startsWith('mobile')) {
        const specialHandler = MobileHandlers[data.message.split(':')[1] || ''];

        if (specialHandler && typeof specialHandler === 'function') {
          specialHandler(data)
            .then((rs) => {
              // @ts-ignore
              responseMessage({ id: data.id, message: data.message, response: rs });
            })
            .catch(console.error);
        }

        return;
      } else if (data.message.startsWith('pri')) {
        port.name = PORT_EXTENSION;
      } else {
        port.name = PORT_CONTENT;
      }

      // @ts-ignore
      handlers(data, port);
    }
  });
}
