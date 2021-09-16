"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var index_1 = __importDefault(require("../index"));
var Tesseract = __importStar(require("../utils/tesseract"));
var constants_1 = require("../utils/constants");
var ocrGetElementPositionByText_1 = __importDefault(require("../commands/ocrGetElementPositionByText"));
var ocrClickOnText_1 = __importDefault(require("../commands/ocrClickOnText"));
var ocrGetText_1 = __importDefault(require("../commands/ocrGetText"));
var ocrWaitForTextDisplayed_1 = __importDefault(require("../commands/ocrWaitForTextDisplayed"));
var ocrSetValue_1 = __importDefault(require("../commands/ocrSetValue"));
jest.mock('fs');
jest.mock('../commands/ocrGetElementPositionByText', function () { return jest.fn(); });
jest.mock('../commands/ocrClickOnText', function () { return jest.fn(); });
jest.mock('../commands/ocrGetText', function () { return jest.fn(); });
jest.mock('../commands/ocrWaitForTextDisplayed', function () { return jest.fn(); });
jest.mock('../commands/ocrSetValue', function () { return jest.fn(); });
var caps = {
    browserName: 'chrome',
    platformName: 'iOS',
    'appium:platformVersion': '14.2'
};
var DriverMock = /** @class */ (function () {
    function DriverMock(isIOS) {
        var _this = this;
        this.addCommand = jest.fn().mockImplementation(function (name, fn) {
            _this[name] = fn;
        });
        this.getWindowSize = jest.fn().mockReturnValue({ height: 400, width: 200 });
        this.isIOS = isIOS;
        this.updateSettings = jest.fn();
    }
    return DriverMock;
}());
function getDriver(isIOS) {
    if (isIOS === void 0) { isIOS = true; }
    return new DriverMock(isIOS);
}
describe('wdio-ocr-service', function () {
    var isTesseractAvailableSpy;
    beforeEach(function () {
        isTesseractAvailableSpy = jest.spyOn(Tesseract, 'isTesseractAvailable').mockReturnValue(false);
    });
    afterEach(function () {
        isTesseractAvailableSpy.mockRestore();
    });
    describe('init', function () {
        it('should create the default ocr-folder', function () {
            fs_1.default.mkdirSync = jest.fn();
            new index_1.default();
            expect(fs_1.default.mkdirSync).toHaveBeenCalledWith(constants_1.OCR_IMAGES_PATH, { 'recursive': true });
        });
        it('should create a provided ocr-folder', function () {
            fs_1.default.mkdirSync = jest.fn();
            var path = './foo';
            new index_1.default({ ocrImagesPath: path });
            expect(fs_1.default.mkdirSync).toHaveBeenCalledWith(path, { 'recursive': true });
        });
    });
    describe('before hook', function () {
        it('should register all commands', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())];
                    case 1:
                        _e.sent();
                        expect((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.getWindowSize).toHaveBeenCalled();
                        expect((_b = service['_driver']) === null || _b === void 0 ? void 0 : _b.updateSettings).toHaveBeenCalled();
                        expect(isTesseractAvailableSpy).toHaveBeenCalled();
                        expect((_c = service['_driver']) === null || _c === void 0 ? void 0 : _c.addCommand).toBeCalledTimes(5);
                        return [4 /*yield*/, service.before(caps, [], getDriver(false))];
                    case 2:
                        _e.sent();
                        expect((_d = service['_driver']) === null || _d === void 0 ? void 0 : _d.updateSettings).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrGetElementPositionByText with no options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrGetElementPositionByText('foo'))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrGetElementPositionByText_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrGetElementPositionByText with all options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrGetElementPositionByText('foo', {
                                androidRectangles: { foo: 'androidRectangles' },
                                iOSRectangles: { foo: 'iOSRectangles' },
                                reuseOcr: true
                            }, {}))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrGetElementPositionByText_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrClickOnText with no options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrClickOnText('click'))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrClickOnText_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrClickOnText with all options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrClickOnText('click', {
                                androidRectangles: { foo: 'androidRectangles' },
                                iOSRectangles: { foo: 'iOSRectangles' },
                                reuseOcr: true
                            }, {}))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrClickOnText_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrGetText with no options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrGetText())];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrGetText_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrGetText with all options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrGetText({
                                androidRectangles: { foo: 'androidRectangles' },
                                iOSRectangles: { foo: 'iOSRectangles' },
                                reuseOcr: true
                            }, {}))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrGetText_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrWaitForTextDisplayed with no options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrWaitForTextDisplayed('ocrWaitForTextDisplayed'))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrWaitForTextDisplayed_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrWaitForTextDisplayed with all options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrWaitForTextDisplayed('ocrWaitForTextDisplayed', {
                                androidRectangles: { foo: 'androidRectangles' },
                                iOSRectangles: { foo: 'iOSRectangles' },
                                reuseOcr: true,
                                timeout: 15,
                                timeoutMsg: 'timeoutMsg',
                            }, {}))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrWaitForTextDisplayed_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrSetValue with no options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrSetValue('ocrSetValue-selector', 'ocrSetValue'))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrSetValue_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to call ocrSetValue with all options', function () { return __awaiter(void 0, void 0, void 0, function () {
            var service;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = new index_1.default();
                        return [4 /*yield*/, service.before(caps, [], getDriver())
                            // @ts-ignore
                        ];
                    case 1:
                        _b.sent();
                        // @ts-ignore
                        return [4 /*yield*/, ((_a = service['_driver']) === null || _a === void 0 ? void 0 : _a.ocrSetValue('ocrSetValue-selector', 'ocrSetValue', {
                                androidRectangles: { foo: 'androidRectangles' },
                                iOSRectangles: { foo: 'iOSRectangles' },
                                reuseOcr: true
                            }))];
                    case 2:
                        // @ts-ignore
                        _b.sent();
                        expect(ocrSetValue_1.default).toHaveBeenCalledWithSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
