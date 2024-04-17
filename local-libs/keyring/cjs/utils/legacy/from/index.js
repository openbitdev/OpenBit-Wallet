"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _path = require("./path");
Object.keys(_path).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _path[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _path[key];
    }
  });
});
var _seed = require("./seed");
Object.keys(_seed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _seed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _seed[key];
    }
  });
});