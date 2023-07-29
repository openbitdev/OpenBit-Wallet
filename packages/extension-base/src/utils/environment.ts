// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BrowserType, EnvironmentSupport, OSType, RuntimeEnvironment, RuntimeEnvironmentInfo, TargetEnvironment } from '../background/KoniTypes';

function detectRuntimeEnvironment (): RuntimeEnvironmentInfo {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Web environment
    return {
      environment: RuntimeEnvironment.Web,
      version: navigator.userAgent,
      host: window.location.host,
      protocol: window.location.protocol
    };
  } else if (typeof self !== 'undefined' && typeof importScripts !== 'undefined') {
    // Service Worker environment
    return {
      environment: RuntimeEnvironment.ServiceWorker,
      version: navigator.userAgent,
      host: self.location.host,
      protocol: window.location.protocol
    };
  } else if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    // Node.js environment
    return {
      environment: RuntimeEnvironment.Node,
      version: process.versions.node
    };
  } else if (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined') {
    // Extension environment (Chrome)
    return {
      environment: RuntimeEnvironment.ExtensionChrome,
      version: chrome.runtime.getManifest().version,
      host: window.location.host,
      protocol: window.location.protocol
    };
  } else if (typeof browser !== 'undefined' && typeof browser.runtime !== 'undefined') {
    // Extension environment (Firefox)
    return {
      environment: RuntimeEnvironment.ExtensionFirefox,
      version: browser.runtime.getManifest().version,
      host: window.location.host,
      protocol: window.location.protocol
    };
    // @ts-ignore
  } else if (typeof WorkerGlobalScope !== 'undefined') {
    // Web Worker environment
    return {
      environment: RuntimeEnvironment.WebWorker,
      version: ''
    };
  } else {
    // Unknown environment
    return {
      environment: RuntimeEnvironment.Unknown,
      version: ''
    };
  }
}

export const RuntimeInfo: RuntimeEnvironmentInfo = detectRuntimeEnvironment();

export const getOS = (): OSType => {
  const userAgent = window.navigator.userAgent;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const platform: string = window.navigator?.userAgentData?.platform || window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os: OSType = 'Unknown';

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
};

export const getBrowserType = (): BrowserType => {
  // Opera 8.0+
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  // @ts-ignore
  const isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  // @ts-ignore
  const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return p?.toString() === '[object SafariRemoteNotification]';
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  })(!window.safari || (typeof safari !== 'undefined' && window.safari.pushNotification));

  // Internet Explorer 6-11
  // @ts-ignore
  const isIE = /* @cc_on!@ */!!document.documentMode;

  // Edge 20+
  // @ts-ignore
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && (navigator.userAgent.indexOf('Edg') !== -1);

  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!window.CSS;

  if (isEdgeChromium) {
    return 'EdgeChromium';
  }

  if (isFirefox) {
    return 'Firefox';
  }

  if (isChrome) {
    return 'Chrome';
  }

  if (isSafari) {
    return 'Safari';
  }

  if (isOpera) {
    return 'Opera';
  }

  if (isIE) {
    return 'IE';
  }

  if (isEdge) {
    return 'Edge';
  }

  if (isBlink) {
    return 'Blink';
  }

  return 'Unknown';
};

export const isFirefox = () => getBrowserType() === 'Firefox';

export const TARGET_ENV = (process.env.TARGET_ENV || 'extension') as TargetEnvironment;

export const MODULE_SUPPORT: EnvironmentSupport = {
  MANTA_ZK: TARGET_ENV === 'extension'
};
