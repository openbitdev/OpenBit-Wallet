"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _prefix = require("./prefix");
Object.keys(_prefix).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _prefix[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _prefix[key];
    }
  });
});
var _address = require("./address");
Object.keys(_address).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _address[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _address[key];
    }
  });
});
var _signature = require("./signature");
Object.keys(_signature).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _signature[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _signature[key];
    }
  });
});