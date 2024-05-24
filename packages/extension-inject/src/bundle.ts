// Copyright 2019-2022 @polkadot/extension-inject authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Injected, InjectedWindow, InjectOptions } from './types';

import { EIP6963ProviderDetail, EIP6963ProviderInfo, EvmProvider } from './types';

export { packageInfo } from './packageInfo';

// It is recommended to always use the function below to shield the extension and dapp from
// any future changes. The exposed interface will manage access between the 2 environments,
// be it via window (current), postMessage (under consideration) or any other mechanism
export function injectExtension (enable: (origin: string) => Promise<Injected>, { name, version }: InjectOptions): void {
  // small helper with the typescript types, just cast window
  const windowInject = window as Window & InjectedWindow;

  // don't clobber the existing object, we will add it (or create as needed)
  windowInject.injectedWeb3 = windowInject.injectedWeb3 || {};

  // add our enable function
  windowInject.injectedWeb3[name] = {
    enable: (origin: string): Promise<Injected> =>
      enable(origin),
    version
  };
}

// Inject EVM Provider
export function injectEvmExtension (evmProvider: EvmProvider): void {
  // small helper with the typescript types, just cast window
  const windowInject = window as Window & InjectedWindow;

  // add our enable function
  if (windowInject.OpenBit) {
    // Provider has been initialized in proxy mode
    windowInject.OpenBit.provider = evmProvider;
  } else {
    // Provider has been initialized in direct mode
    windowInject.OpenBit = evmProvider;
  }

  windowInject.dispatchEvent(new Event('subwallet#initialized'));

  // Publish to global if window.ethereum is not available
  windowInject.addEventListener('load', () => {
    if (!windowInject.ethereum) {
      windowInject.ethereum = evmProvider;
      windowInject.dispatchEvent(new Event('ethereum#initialized'));
    }
  });

  inject6963EIP(evmProvider);
}

export const eip6963ProviderInfo: EIP6963ProviderInfo = {
  uuid: '28228aa0-3dca-4bf7-b397-cb02ac1e574e',
  name: 'OpenBit',
  icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHZpZXdCb3g9IjAgMCA4OCA4OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjIgMEMxMS45ODUgMCAxMSAwLjk4NDk3MiAxMSAyLjJWOC44QzExIDEwLjAxNSAxMC4wMTUgMTEgOC44IDExTDIuMiAxMUMwLjk4NDk3NSAxMSAwIDExLjk4NSAwIDEzLjJWNzQuOEMwIDc2LjAxNSAwLjk4NDk2OSA3NyAyLjE5OTk5IDc3SDguOEMxMC4wMTUgNzcgMTEgNzcuOTg1IDExIDc5LjJWODUuOEMxMSA4Ny4wMTUgMTEuOTg1IDg4IDEzLjIgODhINzQuOEM3Ni4wMTUgODggNzcgODcuMDE1IDc3IDg1LjhWNzkuMkM3NyA3Ny45ODUgNzcuOTg1IDc3IDc5LjIgNzdIODUuOEM4Ny4wMTUgNzcgODggNzYuMDE1IDg4IDc0LjhWMTMuMkM4OCAxMS45ODUgODcuMDE1IDExIDg1LjggMTFINzkuMkM3Ny45ODUgMTEgNzcgMTAuMDE1IDc3IDguOFYyLjJDNzcgMC45ODQ5NzQgNzYuMDE1IDAgNzQuOCAwSDEzLjJaIiBmaWxsPSIjRjBEMDMwIi8+CjxwYXRoIGQ9Ik0yMiAxMy4yODUxQzIyIDEyLjAyMzEgMjMuMDIzMSAxMSAyNC4yODUxIDExSDMwLjcxNDlDMzEuOTc2OSAxMSAzMyAxMi4wMjMxIDMzIDEzLjI4NTFWMjkuODg4N0wzMy4wMDUzIDI5Ljg5NDFDMzMuMDAyIDI5Ljk1MTIgMzMuMDAwMyAzMC4wMDg3IDMzLjAwMDMgMzAuMDY2N0MzMy4wMDAzIDMxLjY4NTggMzQuMzEyMSAzMi45OTg1IDM1LjkzMDggMzNIMzUuOTM2NUMzNS45OTM1IDMyLjk5OTkgMzYuMDUwMSAzMi45OTgzIDM2LjEwNjMgMzIuOTk1TDM2LjExMTMgMzNINTIuNzE0OUM1My45NzY5IDMzIDU1IDM0LjAyMzEgNTUgMzUuMjg1MVY0MS43MTQ5QzU1IDQyLjk3NjkgNTMuOTc2OSA0NCA1Mi43MTQ5IDQ0SDM1LjI4NTFDMzQuMDIzMSA0NCAzMyA0Mi45NzY5IDMzIDQxLjcxNDlWMzYuMTExM0wzMi45OTUzIDM2LjEwNjZDMzIuOTk3OCAzNi4wNjM5IDMyLjk5OTQgMzYuMDIxIDMzIDM1Ljk3NzlWMzUuODg4N0MzMi45NzYyIDM0LjI4OTMgMzEuNjcyMSAzMyAzMC4wNjcgMzNDMzAuMDA4OCAzMyAyOS45NTExIDMzLjAwMTcgMjkuODkzOCAzMy4wMDVMMjkuODg4NyAzM0gyNC4yODUxQzIzLjAyMzEgMzMgMjIgMzEuOTc2OSAyMiAzMC43MTQ5VjEzLjI4NTFaIiBmaWxsPSIjMUIxRDI0Ii8+CjxwYXRoIGQ9Ik0yMiA0Ni4yODUxQzIyIDQ1LjAyMzEgMjMuMDIzMSA0NCAyNC4yODUxIDQ0SDMwLjcxNDlDMzEuOTc2OSA0NCAzMyA0NS4wMjMxIDMzIDQ2LjI4NTFWNjMuNzE0OUMzMyA2NC45NzY5IDMxLjk3NjkgNjYgMzAuNzE0OSA2NkgyNC4yODUxQzIzLjAyMzEgNjYgMjIgNjQuOTc2OSAyMiA2My43MTQ5VjQ2LjI4NTFaIiBmaWxsPSIjMUIxRDI0Ii8+CjxwYXRoIGQ9Ik01Ny4yODUxIDQ0QzU2LjAyMzEgNDQgNTUgNDUuMDIzMSA1NSA0Ni4yODUxVjYyLjg4ODdMNTQuOTk1IDYyLjg5MzdDNTQuOTk4MyA2Mi45NTA4IDU1IDYzLjAwODQgNTUgNjMuMDY2M0M1NSA2NC42ODY0IDUzLjY4NjcgNjUuOTk5NyA1Mi4wNjY3IDY1Ljk5OTdDNTIuMDA4NyA2NS45OTk3IDUxLjk1MTIgNjUuOTk4IDUxLjg5NDEgNjUuOTk0N0w1MS44ODg3IDY2SDM1LjI4NTFDMzQuMDIzMSA2NiAzMyA2Ny4wMjMxIDMzIDY4LjI4NTFWNzQuNzE0OUMzMyA3NS45NzY5IDM0LjAyMzEgNzcgMzUuMjg1MSA3N0g1Mi43MTQ5QzUzLjk3NjkgNzcgNTUgNzUuOTc2OSA1NSA3NC43MTQ5VjY5LjExMTNMNTUuMDA1IDY5LjEwNjJDNTUuMDAxNyA2OS4wNDg5IDU1IDY4Ljk5MTIgNTUgNjguOTMzQzU1IDY3LjMyNzggNTYuMjg5MyA2Ni4wMjM4IDU3Ljg4ODkgNjZINTcuOTc3OEM1OC4wMjEgNjYuMDAwNiA1OC4wNjM5IDY2LjAwMjIgNTguMTA2NiA2Ni4wMDQ3TDU4LjExMTMgNjZINjMuNzE0OUM2NC45NzY5IDY2IDY2IDY0Ljk3NjkgNjYgNjMuNzE0OVY0Ni4yODUxQzY2IDQ1LjAyMzEgNjQuOTc2OSA0NCA2My43MTQ5IDQ0SDU3LjI4NTFaIiBmaWxsPSIjMUIxRDI0Ii8+CjxwYXRoIGQ9Ik01NSAxMy4yQzU1IDExLjk4NSA1NS45ODUgMTEgNTcuMiAxMUg2My44QzY1LjAxNSAxMSA2NiAxMS45ODUgNjYgMTMuMlYxOS44QzY2IDIxLjAxNSA2NS4wMTUgMjIgNjMuOCAyMkg1Ny4yQzU1Ljk4NSAyMiA1NSAyMS4wMTUgNTUgMTkuOFYxMy4yWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==',
  rdns: 'app.openbit'
};

export const inject6963EIP = (provider: EvmProvider) => {
  const _provider = new Proxy(provider, {
    get (target, key) {
      if (key === 'then') {
        return Promise.resolve(target);
      }

      const proxyTarget = Reflect.get(target, key) as Record<string, any>;

      if (typeof proxyTarget?.bind === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
        return proxyTarget.bind(target);
      }

      return proxyTarget;
    },
    deleteProperty () {
      return true;
    }
  });

  const announceProvider = () => {
    const detail: EIP6963ProviderDetail = Object.freeze({ info: eip6963ProviderInfo, provider: _provider });
    const event = new CustomEvent('eip6963:announceProvider', { detail });

    window.dispatchEvent(event);
  };

  window.addEventListener('eip6963:requestProvider', announceProvider);

  announceProvider();
};
