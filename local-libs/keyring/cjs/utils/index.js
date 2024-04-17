"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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
var _legacy = require("./legacy");
Object.keys(_legacy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _legacy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _legacy[key];
    }
  });
});
var _derivePath = require("./derive-path");
Object.keys(_derivePath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _derivePath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _derivePath[key];
    }
  });
});
var _estimateFee = require("./estimate-fee");
Object.keys(_estimateFee).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _estimateFee[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _estimateFee[key];
    }
  });
});