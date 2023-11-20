"use strict";
// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var chain_list_1 = require("@subwallet/chain-list");
var types_1 = require("@subwallet/chain-list/types");
var EvmApi_1 = require("@subwallet/extension-base/services/chain-service/handler/EvmApi");
var SubstrateApi_1 = require("@subwallet/extension-base/services/chain-service/handler/SubstrateApi");
var util_crypto_1 = require("@polkadot/util-crypto");
jest.setTimeout(3 * 60 * 60 * 1000);
var failedMessage = 'Connect failed';
var timeoutMessage = 'Connect timeout';
var substrateHandleConnectChain = function (chain, key, provider) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                var api, _api, logFail, handlerOnFail, timeout;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('start', chain, key, provider);
                            api = null;
                            _api = new SubstrateApi_1.SubstrateApi(chain, provider, { providerName: key });
                            logFail = true;
                            handlerOnFail = function (e) {
                                if (logFail) {
                                    console.log('error', chain, key);
                                    resolve([api, (e === null || e === void 0 ? void 0 : e.message) || failedMessage]);
                                }
                                logFail = false;
                            };
                            timeout = setTimeout(function () {
                                console.log('timeout', chain, key);
                                resolve([api, timeoutMessage]);
                                logFail = false;
                                _api.destroy().catch(console.error);
                                _api.api.off('disconnected', handlerOnFail);
                                _api.api.off('error', handlerOnFail);
                            }, 30 * 1000);
                            _api.api.on('disconnected', handlerOnFail);
                            _api.api.on('error', handlerOnFail);
                            return [4 /*yield*/, _api.isReady];
                        case 1:
                            api = _a.sent();
                            logFail = false;
                            _api.api.off('disconnected', handlerOnFail);
                            _api.api.off('error', handlerOnFail);
                            clearTimeout(timeout);
                            resolve([api, '']);
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var evmHandleConnectChain = function (chain, key, provider) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                var api, _api, logFail, handlerOnFail, timeout, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('start', chain, key, provider);
                            api = null;
                            _api = new EvmApi_1.EvmApi(chain, provider, { providerName: key });
                            logFail = true;
                            handlerOnFail = function (e) {
                                if (logFail) {
                                    console.log('error', chain, key);
                                    resolve([api, (e === null || e === void 0 ? void 0 : e.message) || failedMessage]);
                                }
                                logFail = false;
                            };
                            timeout = setTimeout(function () {
                                console.log('timeout', chain, key);
                                resolve([api, timeoutMessage]);
                                logFail = false;
                                _api.destroy().catch(console.error);
                            }, 60 * 1000);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, _api.isReady];
                        case 2:
                            api = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            handlerOnFail(e_1);
                            return [3 /*break*/, 4];
                        case 4:
                            logFail = false;
                            clearTimeout(timeout);
                            resolve([api, '']);
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
describe('test chain provider', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, util_crypto_1.cryptoWaitReady)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('substrate provider', function () { return __awaiter(void 0, void 0, void 0, function () {
        var chainList, errorProvider, timeoutProvider, wrongProvider, notFoundProvider, startIndex, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chainList = Object.values(chain_list_1.ChainInfoMap).filter(function (info) { return info.chainStatus === types_1._ChainStatus.ACTIVE && !!info.substrateInfo; });
                    errorProvider = {};
                    timeoutProvider = {};
                    wrongProvider = {};
                    notFoundProvider = [];
                    startIndex = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                            var timeHandler, _loop_1, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        timeHandler = function (chain, key, provider) {
                                            reject(Error(['Time out on', chain, key, provider].join(' - ')));
                                        };
                                        _loop_1 = function (i) {
                                            var info, chain, noProvider, _loop_2, _i, _b, _c, key, provider;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        info = chainList[i];
                                                        chain = info.slug;
                                                        noProvider = !Object.keys(info.providers).length;
                                                        console.log('current', i);
                                                        console.log(chain, 'start');
                                                        if (!!noProvider) return [3 /*break*/, 5];
                                                        _loop_2 = function (key, provider) {
                                                            var timeout, _e, api, message, value, value, value;
                                                            return __generator(this, function (_f) {
                                                                switch (_f.label) {
                                                                    case 0:
                                                                        if (!provider.startsWith('wss://')) return [3 /*break*/, 3];
                                                                        timeout = setTimeout(function () {
                                                                            timeHandler(chain, key, provider);
                                                                        }, 60 * 1000);
                                                                        return [4 /*yield*/, substrateHandleConnectChain(chain, key, provider)];
                                                                    case 1:
                                                                        _e = _f.sent(), api = _e[0], message = _e[1];
                                                                        if (message === timeoutMessage) {
                                                                            value = [key, provider];
                                                                            timeoutProvider[chain] = timeoutProvider[chain] ? __spreadArray(__spreadArray([], timeoutProvider[chain], true), [value], false) : [value];
                                                                        }
                                                                        else if (message) {
                                                                            value = [key, provider, message];
                                                                            errorProvider[chain] = errorProvider[chain] ? __spreadArray(__spreadArray([], errorProvider[chain], true), [value], false) : [value];
                                                                        }
                                                                        return [4 /*yield*/, (api === null || api === void 0 ? void 0 : api.destroy())];
                                                                    case 2:
                                                                        _f.sent();
                                                                        clearTimeout(timeout);
                                                                        return [3 /*break*/, 4];
                                                                    case 3:
                                                                        if (!provider.startsWith('light://')) {
                                                                            value = [key, provider];
                                                                            wrongProvider[chain] = wrongProvider[chain] ? __spreadArray(__spreadArray([], wrongProvider[chain], true), [value], false) : [value];
                                                                        }
                                                                        _f.label = 4;
                                                                    case 4: return [2 /*return*/];
                                                                }
                                                            });
                                                        };
                                                        _i = 0, _b = Object.entries(info.providers);
                                                        _d.label = 1;
                                                    case 1:
                                                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                                                        _c = _b[_i], key = _c[0], provider = _c[1];
                                                        return [5 /*yield**/, _loop_2(key, provider)];
                                                    case 2:
                                                        _d.sent();
                                                        _d.label = 3;
                                                    case 3:
                                                        _i++;
                                                        return [3 /*break*/, 1];
                                                    case 4: return [3 /*break*/, 6];
                                                    case 5:
                                                        notFoundProvider.push(chain);
                                                        _d.label = 6;
                                                    case 6: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = startIndex;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < chainList.length)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_1(i)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 4];
                case 4:
                    console.log('error result', JSON.stringify(errorProvider, undefined, 2));
                    console.log('timeout result', JSON.stringify(timeoutProvider, undefined, 2));
                    console.log('wrong result', JSON.stringify(wrongProvider, undefined, 2));
                    console.log('notFound result', JSON.stringify(notFoundProvider, undefined, 2));
                    return [2 /*return*/];
            }
        });
    }); });
    it('evm provider', function () { return __awaiter(void 0, void 0, void 0, function () {
        var chainList, errorProvider, timeoutProvider, notFoundProvider, startIndex, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chainList = Object.values(chain_list_1.ChainInfoMap).filter(function (info) { return info.chainStatus === types_1._ChainStatus.ACTIVE && !!info.evmInfo; });
                    errorProvider = {};
                    timeoutProvider = {};
                    notFoundProvider = [];
                    startIndex = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                            var timeHandler, _loop_3, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        timeHandler = function (chain, key, provider) {
                                            reject(Error(['Time out on', chain, key, provider].join(' - ')));
                                        };
                                        _loop_3 = function (i) {
                                            var info, chain, noProvider, _loop_4, _i, _b, _c, key, provider;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        info = chainList[i];
                                                        chain = info.slug;
                                                        noProvider = !Object.keys(info.providers).length;
                                                        console.log('current', i);
                                                        console.log(chain, 'start');
                                                        if (!!noProvider) return [3 /*break*/, 5];
                                                        _loop_4 = function (key, provider) {
                                                            var timeout, _e, api, message, value, value;
                                                            return __generator(this, function (_f) {
                                                                switch (_f.label) {
                                                                    case 0:
                                                                        if (!!provider.startsWith('light://')) return [3 /*break*/, 3];
                                                                        timeout = setTimeout(function () {
                                                                            timeHandler(chain, key, provider);
                                                                        }, 2 * 60 * 1000);
                                                                        return [4 /*yield*/, evmHandleConnectChain(chain, key, provider)];
                                                                    case 1:
                                                                        _e = _f.sent(), api = _e[0], message = _e[1];
                                                                        if (message === timeoutMessage) {
                                                                            value = [key, provider];
                                                                            timeoutProvider[chain] = timeoutProvider[chain] ? __spreadArray(__spreadArray([], timeoutProvider[chain], true), [value], false) : [value];
                                                                        }
                                                                        else if (message) {
                                                                            value = [key, provider, message];
                                                                            errorProvider[chain] = errorProvider[chain] ? __spreadArray(__spreadArray([], errorProvider[chain], true), [value], false) : [value];
                                                                        }
                                                                        return [4 /*yield*/, (api === null || api === void 0 ? void 0 : api.destroy())];
                                                                    case 2:
                                                                        _f.sent();
                                                                        clearTimeout(timeout);
                                                                        _f.label = 3;
                                                                    case 3: return [2 /*return*/];
                                                                }
                                                            });
                                                        };
                                                        _i = 0, _b = Object.entries(info.providers);
                                                        _d.label = 1;
                                                    case 1:
                                                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                                                        _c = _b[_i], key = _c[0], provider = _c[1];
                                                        return [5 /*yield**/, _loop_4(key, provider)];
                                                    case 2:
                                                        _d.sent();
                                                        _d.label = 3;
                                                    case 3:
                                                        _i++;
                                                        return [3 /*break*/, 1];
                                                    case 4: return [3 /*break*/, 6];
                                                    case 5:
                                                        notFoundProvider.push(chain);
                                                        _d.label = 6;
                                                    case 6: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = startIndex;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < chainList.length)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_3(i)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises,no-async-promise-executor
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 4];
                case 4:
                    console.log('error result', JSON.stringify(errorProvider, undefined, 2));
                    console.log('timeout result', JSON.stringify(timeoutProvider, undefined, 2));
                    console.log('notFound result', JSON.stringify(notFoundProvider, undefined, 2));
                    return [2 /*return*/];
            }
        });
    }); });
});
