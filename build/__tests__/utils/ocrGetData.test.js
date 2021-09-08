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
var Utils = __importStar(require("../../utils"));
var createImage_1 = __importDefault(require("../../utils/createImage"));
var Tesseract = __importStar(require("../../utils/tesseract"));
var ocrGetData_1 = __importDefault(require("../../utils/ocrGetData"));
jest.mock('fs');
jest.mock('jimp', function () { return ({
    read: jest.fn().mockImplementation(function () { return ({
        contrast: jest.fn(),
        greyscale: jest.fn(),
        getBufferAsync: jest.fn().mockReturnValue('getBufferAsync'),
    }); })
}); });
jest.mock('../../utils/createImage', function () { return jest.fn(); });
var logger = [];
jest.mock('@wdio/logger', function () { return jest.fn().mockImplementation(function () { return ({
    info: jest.fn().mockImplementation(function () {
        var infoArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            infoArgs[_i] = arguments[_i];
        }
        return logger.push(infoArgs);
    }),
}); }); });
var globalAny = global;
var getScreenshotSizeSpy;
var dateSpy;
var getSystemOcrDataSpy;
var getNodeOcrDataSpy;
describe('utils - ocrGetData', function () {
    beforeEach(function () {
        globalAny.driver = {
            isAndroid: true,
            isIOS: false,
            takeScreenshot: jest.fn().mockReturnValue('takeScreenshot')
        };
        getScreenshotSizeSpy = jest
            .spyOn(Utils, 'getScreenshotSize')
            .mockReturnValue({ height: 400, width: 200 });
        fs_1.default.writeFileSync = jest.fn();
        var mockDate = new Date(1466424490000);
        dateSpy = jest
            .spyOn(global, 'Date')
            // @ts-ignore
            .mockImplementation(function () { return mockDate; });
        getNodeOcrDataSpy = jest
            .spyOn(Tesseract, 'getNodeOcrData');
        getSystemOcrDataSpy = jest
            .spyOn(Tesseract, 'getSystemOcrData');
        jest.spyOn(process, 'hrtime').mockReturnValue([0, 0]);
    });
    afterEach(function () {
        jest.clearAllMocks();
        logger = [];
    });
    it('should return Node ocrData with default options', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, ocrData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        isTesseractAvailable: false,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: false,
                        screenSize: {
                            height: 200,
                            width: 100,
                        }
                    };
                    ocrData = {
                        text: 'ocrData',
                        lines: [{ text: 'line string', bbox: { left: 1, top: 2, right: 3, bottom: 4 } }],
                        words: [{ text: 'word string', bbox: { left: 5, top: 6, right: 7, bottom: 8 } }],
                    };
                    getNodeOcrDataSpy.mockResolvedValue(ocrData);
                    _a = expect;
                    return [4 /*yield*/, ocrGetData_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    expect(globalAny.driver.takeScreenshot).toHaveBeenCalledTimes(1);
                    expect(getScreenshotSizeSpy).toHaveBeenCalledTimes(1);
                    expect(dateSpy).toHaveBeenCalled();
                    expect(fs_1.default.writeFileSync).toHaveBeenCalledWith('ocrImagesPath/android-1466424490000.png', 'getBufferAsync', { 'encoding': 'base64' });
                    expect(getSystemOcrDataSpy).not.toHaveBeenCalled();
                    expect(getNodeOcrDataSpy).toHaveBeenCalledWith({ filePath: 'ocrImagesPath/android-1466424490000.png' });
                    expect(createImage_1.default).toHaveBeenCalledWithSnapshot();
                    expect(logger).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return Node ocrData for a cropped Android image', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, ocrData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        androidRectangles: { left: 10, top: 20, right: 30, bottom: 40 },
                        isTesseractAvailable: false,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: false,
                        screenSize: {
                            height: 200,
                            width: 100,
                        }
                    };
                    ocrData = {
                        text: 'ocrData',
                        lines: [{ text: 'line string', bbox: { left: 100, top: 200, right: 300, bottom: 400 } }],
                        words: [{ text: 'word string', bbox: { left: 500, top: 600, right: 700, bottom: 800 } }],
                    };
                    getNodeOcrDataSpy.mockResolvedValue(ocrData);
                    _a = expect;
                    return [4 /*yield*/, ocrGetData_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    expect(globalAny.driver.takeScreenshot).toHaveBeenCalledTimes(1);
                    expect(getScreenshotSizeSpy).toHaveBeenCalledTimes(1);
                    expect(fs_1.default.writeFileSync).toHaveBeenCalledWith('ocrImagesPath/android-1466424490000.png', 'getBufferAsync', { 'encoding': 'base64' });
                    // This is the first call for writing the cropped image
                    expect(createImage_1.default).toHaveBeenCalledWithSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return Node ocrData for a cropped iOS image', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, ocrData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        iOSRectangles: { left: 10, top: 20, right: 30, bottom: 40 },
                        isTesseractAvailable: false,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: false,
                        screenSize: {
                            height: 200,
                            width: 100,
                        }
                    };
                    ocrData = {
                        text: 'ocrData',
                        lines: [{ text: 'line string', bbox: { left: 100, top: 200, right: 300, bottom: 400 } }],
                        words: [{ text: 'word string', bbox: { left: 500, top: 600, right: 700, bottom: 800 } }],
                    };
                    globalAny.driver.isAndroid = false;
                    globalAny.driver.isIOS = true;
                    getNodeOcrDataSpy.mockResolvedValue(ocrData);
                    _a = expect;
                    return [4 /*yield*/, ocrGetData_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    expect(globalAny.driver.takeScreenshot).toHaveBeenCalledTimes(1);
                    expect(getScreenshotSizeSpy).toHaveBeenCalledTimes(1);
                    expect(fs_1.default.writeFileSync).toHaveBeenCalledWith('ocrImagesPath/ios-1466424490000.png', 'getBufferAsync', { 'encoding': 'base64' });
                    // This is the first call for writing the cropped image
                    expect(createImage_1.default).toHaveBeenCalledWithSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return Node ocrData when it needs to re-use stored driver data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        isTesseractAvailable: false,
                        ocrImagesPath: 'string',
                        reuseOcr: true,
                        screenSize: {
                            height: 200,
                            width: 100,
                        }
                    };
                    globalAny.driver.ocrData = ['driver.ocrData available'];
                    _a = expect;
                    return [4 /*yield*/, ocrGetData_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual(['driver.ocrData available']);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return System ocrData with default options', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, ocrData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        isTesseractAvailable: true,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: false,
                        screenSize: {
                            height: 200,
                            width: 100,
                        }
                    };
                    ocrData = {
                        text: 'ocrData',
                        lines: [{ text: 'line string', bbox: { left: 1, top: 2, right: 3, bottom: 4 } }],
                        words: [{ text: 'word string', bbox: { left: 5, top: 6, right: 7, bottom: 8 } }],
                    };
                    getSystemOcrDataSpy.mockResolvedValue(ocrData);
                    _a = expect;
                    return [4 /*yield*/, ocrGetData_1.default(options, {})];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    // expect(getSystemOcrDataSpy).toHaveBeenCalledWith({ filePath: 'ocrImagesPath/android-1466424490000.png' })
                    expect(getNodeOcrDataSpy).not.toHaveBeenCalled();
                    expect(logger).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to throw an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // @ts-ignore
                    return [4 /*yield*/, ocrGetData_1.default({})
                        // Don't expect it to hit this
                    ];
                case 1:
                    // @ts-ignore
                    _a.sent();
                    // Don't expect it to hit this
                    expect(true).toBe(false);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    expect(e_1.toString()).toBe("Error: TypeError: Cannot read property 'width' of undefined");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
