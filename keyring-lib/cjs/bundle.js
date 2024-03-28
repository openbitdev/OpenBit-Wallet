"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Keyring: true,
  setSS58Format: true,
  decodeAddress: true,
  encodeAddress: true,
  getEvmDerivePath: true,
  getBitDerivePathFunction: true,
  isBitcoinAddress: true,
  getKeypairTypeByAddress: true,
  getDerivePath: true,
  createPair: true,
  packageInfo: true,
  createTestKeyring: true,
  createTestPairs: true
};
Object.defineProperty(exports, "Keyring", {
  enumerable: true,
  get: function () {
    return _keyring.Keyring;
  }
});
Object.defineProperty(exports, "createPair", {
  enumerable: true,
  get: function () {
    return _pair.createPair;
  }
});
Object.defineProperty(exports, "createTestKeyring", {
  enumerable: true,
  get: function () {
    return _testing.createTestKeyring;
  }
});
Object.defineProperty(exports, "createTestPairs", {
  enumerable: true,
  get: function () {
    return _testingPairs.createTestPairs;
  }
});
Object.defineProperty(exports, "decodeAddress", {
  enumerable: true,
  get: function () {
    return _utils.decodeAddress;
  }
});
Object.defineProperty(exports, "encodeAddress", {
  enumerable: true,
  get: function () {
    return _utils.encodeAddress;
  }
});
Object.defineProperty(exports, "getBitDerivePathFunction", {
  enumerable: true,
  get: function () {
    return _utils.getBitDerivePathFunction;
  }
});
Object.defineProperty(exports, "getDerivePath", {
  enumerable: true,
  get: function () {
    return _utils.getDerivePath;
  }
});
Object.defineProperty(exports, "getEvmDerivePath", {
  enumerable: true,
  get: function () {
    return _utils.getEvmDerivePath;
  }
});
Object.defineProperty(exports, "getKeypairTypeByAddress", {
  enumerable: true,
  get: function () {
    return _utils.getKeypairTypeByAddress;
  }
});
Object.defineProperty(exports, "isBitcoinAddress", {
  enumerable: true,
  get: function () {
    return _utils.isBitcoinAddress;
  }
});
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});
Object.defineProperty(exports, "setSS58Format", {
  enumerable: true,
  get: function () {
    return _utilCrypto.setSS58Format;
  }
});
var _keyring = require("./keyring");
var _utilCrypto = require("@polkadot/util-crypto");
var _defaults = require("./defaults");
Object.keys(_defaults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _defaults[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _defaults[key];
    }
  });
});
var _utils = require("./utils");
var _pair = require("./pair");
var _packageInfo = require("./packageInfo");
var _testing = require("./testing");
var _testingPairs = require("./testingPairs");