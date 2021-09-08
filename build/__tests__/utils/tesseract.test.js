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
var child_process_1 = __importDefault(require("child_process"));
var tesseract_js_1 = __importDefault(require("tesseract.js"));
// @ts-ignore
var node_tesseract_ocr_1 = __importDefault(require("node-tesseract-ocr"));
var tesseract_1 = require("../../utils/tesseract");
var Utils = __importStar(require("../../utils/index"));
var mocks_1 = require("./__mocks__/mocks");
jest.mock('child_process');
jest.mock('tesseract.js');
jest.mock('node-tesseract-ocr');
describe('utils - tesseract', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe('isTesseractAvailable', function () {
        it('should return true with a default call', function () {
            child_process_1.default.execSync.mockReturnValue(undefined);
            expect(tesseract_1.isTesseractAvailable()).toEqual(true);
            expect(child_process_1.default.execSync).toHaveBeenCalledWithSnapshot();
        });
        it('should return false with a default non existing custom command', function () {
            child_process_1.default.execSync.mockImplementation(function () {
                throw new Error();
            });
            expect(tesseract_1.isTesseractAvailable('custom-tesseract-arg')).toEqual(false);
            expect(child_process_1.default.execSync).toHaveBeenCalledWithSnapshot();
        });
    });
    describe('getNodeOcrData', function () {
        var parseAttributeStringSpy;
        var worker = tesseract_js_1.default.createWorker;
        beforeEach(function () {
            parseAttributeStringSpy = jest.spyOn(Utils, 'parseAttributeString').mockReturnValue({
                bbox: { left: 83, top: 326, right: 248, bottom: 352 },
                wc: 0.9,
            });
        });
        it('should throw an error when incorrect data is returned from the `worker.recognize` method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        worker.mockImplementation(function () { return ({
                            load: jest.fn(),
                            loadLanguage: jest.fn(),
                            initialize: jest.fn(),
                            setParameters: jest.fn(),
                            recognize: jest.fn().mockResolvedValue('<div>'),
                            terminate: jest.fn(),
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tesseract_1.getNodeOcrData({ filePath: 'path/file.png' })
                            // Don't expect it to hit this
                        ];
                    case 2:
                        _a.sent();
                        // Don't expect it to hit this
                        expect(true).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1.toString())
                            .toBe('Error: An error happened when parsing the getNodeOcrData, see: TypeError: Cannot read property ' +
                            "'text' of undefined");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error when incorrect data is parsed in parseString', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        worker.mockImplementation(function () { return ({
                            load: jest.fn(),
                            loadLanguage: jest.fn(),
                            initialize: jest.fn(),
                            setParameters: jest.fn(),
                            recognize: jest.fn().mockResolvedValue({ data: { text: '', hocr: false } }),
                            terminate: jest.fn(),
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tesseract_1.getNodeOcrData({ filePath: 'path/file.png' })
                            // Don't expect it to hit this
                        ];
                    case 2:
                        _a.sent();
                        // Don't expect it to hit this
                        expect(true).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        expect(e_2.toString())
                            .toContain('Error: An error happened when parsing the getNodeOcrData, see: Error [ERR_UNHANDLED_ERROR]: ' +
                            'Unhandled error. (Error: An error happened when parsing the getNodeOcrData, see: Error: Non-whitespace ' +
                            'before first tag.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error when no text was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        worker.mockImplementation(function () { return ({
                            load: jest.fn(),
                            loadLanguage: jest.fn(),
                            initialize: jest.fn(),
                            setParameters: jest.fn(),
                            recognize: jest.fn().mockResolvedValue({ data: { text: '', hocr: '<div></div>' } }),
                            terminate: jest.fn(),
                        }); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tesseract_1.getNodeOcrData({ filePath: 'path/file.png' })
                            // Don't expect it to hit this
                        ];
                    case 2:
                        _a.sent();
                        // Don't expect it to hit this
                        expect(true).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        expect(e_3.toString())
                            .toContain('Error: An error happened when parsing the getNodeOcrData, see: Error: No text was ' +
                            'found for the OCR, please verify the stored image.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should be able to parse the node OCR data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        worker.mockImplementation(function () { return ({
                            load: jest.fn(),
                            loadLanguage: jest.fn(),
                            initialize: jest.fn(),
                            setParameters: jest.fn(),
                            recognize: jest.fn().mockResolvedValue(mocks_1.TESSERACT_NODEJS),
                            terminate: jest.fn(),
                        }); });
                        _a = expect;
                        return [4 /*yield*/, tesseract_1.getNodeOcrData({ filePath: 'path/file.png' })];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                        expect(parseAttributeStringSpy).toHaveBeenCalledTimes(10);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getSystemOcrData', function () {
        it('should throw an error when incorrect data is returned from the `recognize` method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node_tesseract_ocr_1.default.recognize.mockResolvedValue('');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tesseract_1.getSystemOcrData({ filePath: 'path/file.png' })
                            // Don't expect it to hit this
                        ];
                    case 2:
                        _a.sent();
                        // Don't expect it to hit this
                        expect(true).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        expect(e_4.toString())
                            .toContain('Error: An error happened when parsing the getSystemOcrData, see: Error ' +
                            "[ERR_UNHANDLED_ERROR]: Unhandled error. (TypeError: Cannot read property 'alto' of null");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error when incorrect data is parsed in parseString', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node_tesseract_ocr_1.default.recognize.mockResolvedValue(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tesseract_1.getSystemOcrData({ filePath: 'path/file.png' })
                            // Don't expect it to hit this
                        ];
                    case 2:
                        _a.sent();
                        // Don't expect it to hit this
                        expect(true).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        expect(e_5.toString())
                            .toContain('Error: An error happened when parsing the getSystemOcrData, see: Error ' +
                            '[ERR_UNHANDLED_ERROR]: Unhandled error. (Error: An error happened when parsing the getSystemOcrData, ' +
                            'see: Error: Non-whitespace before first tag.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error when no text was found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node_tesseract_ocr_1.default.recognize
                            .mockResolvedValue('<alto><Layout><Page><PrintSpace></PrintSpace></Page></Layout></alto>');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tesseract_1.getSystemOcrData({ filePath: 'path/file.png' })
                            // Don't expect it to hit this
                        ];
                    case 2:
                        _a.sent();
                        // Don't expect it to hit this
                        expect(true).toBe(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        expect(e_6.toString())
                            .toContain('Error: An error happened when parsing the getSystemOcrData, see: Error: No text was found for ' +
                            'the OCR, please verify the stored image.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should be able to parse the system OCR data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        node_tesseract_ocr_1.default.recognize.mockResolvedValue(mocks_1.TESSERACT_SYSTEM);
                        _a = expect;
                        return [4 /*yield*/, tesseract_1.getSystemOcrData({ filePath: 'path/file.png' })];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
