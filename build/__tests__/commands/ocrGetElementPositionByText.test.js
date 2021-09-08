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
var ocrGetElementPositionByText_1 = __importDefault(require("../../commands/ocrGetElementPositionByText"));
var OcrGetTextPositions = __importStar(require("../../utils/ocrGetTextPositions"));
var FuzzySearch = __importStar(require("../../utils/fuzzySearch"));
var logger = [];
jest.mock('@wdio/logger', function () { return jest.fn().mockImplementation(function () { return ({
    info: jest.fn().mockImplementation(function () {
        var infoArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            infoArgs[_i] = arguments[_i];
        }
        return logger.push(infoArgs);
    }),
    warn: jest.fn().mockImplementation(function () {
        var warnArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            warnArgs[_i] = arguments[_i];
        }
        return logger.push(warnArgs);
    }),
}); }); });
jest.mock('../../utils/ocrGetTextPositions', function () { return jest.fn(); });
describe('ocrGetElementPositionByText', function () {
    var ocrGetTextPositionsSpy;
    var fuzzySearchSpy;
    beforeEach(function () {
        ocrGetTextPositionsSpy = jest.spyOn(OcrGetTextPositions, 'default').mockResolvedValue([
            {
                text: 'text',
                originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
            },
        ]);
    });
    afterEach(function () {
        ocrGetTextPositionsSpy.mockClear();
        fuzzySearchSpy.mockClear();
        logger = [];
    });
    it('should throw an error when no matches are found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        isTesseractAvailable: true,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: true,
                        screenSize: { width: 1, height: 2 },
                        text: 'text',
                    };
                    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ocrGetElementPositionByText_1.default(options)
                        // Don't expect it to hit this
                    ];
                case 2:
                    _a.sent();
                    // Don't expect it to hit this
                    expect(true).toEqual(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(ocrGetTextPositionsSpy).toHaveBeenCalledTimes(1);
                    expect(fuzzySearchSpy).toHaveBeenCalledTimes(1);
                    expect(error_1.toString())
                        .toEqual('Error: InvalidSelectorMatch. Strategy \'ocr\' has failed to find word \'text\' in the image');
                    expect(logger).toMatchSnapshot();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('should select the match with the highest score', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        isTesseractAvailable: true,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: true,
                        screenSize: { width: 1, height: 2 },
                        text: 'text',
                    };
                    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([
                        {
                            item: {
                                text: 'text 100',
                                originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                                dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                            },
                            refIndex: 0,
                            score: 0,
                        },
                        {
                            item: {
                                text: 'text 90',
                                originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                                dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                            },
                            refIndex: 0,
                            score: 0.1,
                        }
                    ]);
                    _a = expect;
                    return [4 /*yield*/, ocrGetElementPositionByText_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    expect(logger).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should select the sorted match with the highest score', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        isTesseractAvailable: true,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: true,
                        screenSize: { width: 1, height: 2 },
                        text: 'text',
                    };
                    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([
                        {
                            item: {
                                text: 'text 60',
                                originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                                dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                            },
                            refIndex: 0,
                            score: 0.4,
                        },
                        {
                            item: {
                                text: 'text 90',
                                originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                                dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                            },
                            refIndex: 0,
                            score: 0.1,
                        }
                    ]);
                    _a = expect;
                    return [4 /*yield*/, ocrGetElementPositionByText_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should select the only match', function () { return __awaiter(void 0, void 0, void 0, function () {
        var options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        isTesseractAvailable: true,
                        ocrImagesPath: 'ocrImagesPath',
                        reuseOcr: true,
                        screenSize: { width: 1, height: 2 },
                        text: 'text',
                    };
                    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([
                        {
                            item: {
                                text: 'text 60',
                                originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                                dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
                            },
                            refIndex: 0,
                            score: 0.4,
                        },
                    ]);
                    _a = expect;
                    return [4 /*yield*/, ocrGetElementPositionByText_1.default(options)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                    expect(logger).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
});
