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
// @ts-ignore
var PureImage = __importStar(require("pureimage"));
var fs_1 = __importDefault(require("fs"));
var createImage_1 = __importDefault(require("../../utils/createImage"));
jest.mock('fs');
jest.mock('pureimage');
var pureImageDecodePNGFromStream = PureImage.decodePNGFromStream;
var pureImageEncodePNGToStream = PureImage.encodePNGToStream;
var pureImageMake = PureImage.make;
var contextFunctionArguments = [];
describe('createImage', function () {
    beforeEach(function () {
        fs_1.default.createReadStream = jest.fn().mockReturnValue('createReadStream');
        fs_1.default.createWriteStream = jest.fn().mockReturnValue('createWriteStream');
        pureImageDecodePNGFromStream.mockResolvedValue('pureImageDecodePNGFromStream');
        pureImageEncodePNGToStream.mockResolvedValue('');
        pureImageMake.mockImplementation(function () { return ({
            getContext: jest.fn().mockImplementation(function () { return ({
                beginPath: jest.fn().mockImplementation(function () { return jest.fn(); }),
                drawImage: jest.fn().mockImplementation(function () {
                    var drawImageArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        drawImageArgs[_i] = arguments[_i];
                    }
                    return contextFunctionArguments.push({ drawImageArgs: drawImageArgs });
                }),
                fillRect: jest.fn().mockImplementation(function () {
                    var fillRectangleArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        fillRectangleArgs[_i] = arguments[_i];
                    }
                    return contextFunctionArguments.push({ fillRectangleArgs: fillRectangleArgs });
                }),
                rect: jest.fn().mockImplementation(function () {
                    var rectangleArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        rectangleArgs[_i] = arguments[_i];
                    }
                    return contextFunctionArguments.push({ rectangleArgs: rectangleArgs });
                }),
                stroke: jest.fn().mockImplementation(function () { return jest.fn(); }),
            }); }),
        }); });
    });
    afterEach(function () {
        contextFunctionArguments = [];
    });
    it('should call all internal methods with default options', function () { return __awaiter(void 0, void 0, void 0, function () {
        var height, width, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    height = 1792;
                    width = 828;
                    options = {
                        filePath: 'ocr-images/ios-1617168519503.png',
                        height: height,
                        width: width,
                    };
                    return [4 /*yield*/, createImage_1.default(options)];
                case 1:
                    _a.sent();
                    expect(fs_1.default.createReadStream).toHaveBeenCalledTimes(1);
                    expect(pureImageDecodePNGFromStream).toHaveBeenCalledTimes(1);
                    expect(pureImageMake).toHaveBeenCalledTimes(1);
                    expect(pureImageMake).toHaveBeenCalledWith(width, height);
                    expect(contextFunctionArguments).toMatchSnapshot();
                    expect(fs_1.default.createWriteStream).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to crop an image when it is being drawn', function () { return __awaiter(void 0, void 0, void 0, function () {
        var height, width, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    height = 1792;
                    width = 828;
                    options = {
                        filePath: 'ocr-images/ios-1617168519503.png',
                        height: height,
                        width: width,
                        top: 300,
                        left: 70,
                        right: 750,
                        bottom: 745
                    };
                    return [4 /*yield*/, createImage_1.default(options)];
                case 1:
                    _a.sent();
                    expect(contextFunctionArguments).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to crop an image when it is being drawn where top is 0', function () { return __awaiter(void 0, void 0, void 0, function () {
        var height, width, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    height = 1792;
                    width = 828;
                    options = {
                        filePath: 'ocr-images/ios-1617168519503.png',
                        height: height,
                        width: width,
                        top: 0,
                        left: 0,
                        right: 25,
                        bottom: 1700
                    };
                    return [4 /*yield*/, createImage_1.default(options)];
                case 1:
                    _a.sent();
                    expect(contextFunctionArguments).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to draw the lines', function () { return __awaiter(void 0, void 0, void 0, function () {
        var height, width, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    height = 1792;
                    width = 828;
                    options = {
                        filePath: 'ocr-images/ios-1617180757754.png',
                        height: height,
                        lines: [
                            {
                                text: 'Username',
                                bbox: {
                                    left: 83,
                                    top: 326,
                                    right: 248,
                                    bottom: 352
                                }
                            },
                            {
                                text: 'Password',
                                bbox: {
                                    left: 83,
                                    top: 454,
                                    right: 237,
                                    bottom: 480
                                }
                            },
                            {
                                text: 'LOGIN',
                                bbox: {
                                    left: 359,
                                    top: 669,
                                    right: 467,
                                    bottom: 695
                                }
                            }
                        ],
                        width: width,
                    };
                    return [4 /*yield*/, createImage_1.default(options)];
                case 1:
                    _a.sent();
                    expect(contextFunctionArguments).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
});
