"use strict";
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
var fs_1 = require("fs");
var ocrGetElementPositionByText_1 = __importDefault(require("./commands/ocrGetElementPositionByText"));
var ocrGetText_1 = __importDefault(require("./commands/ocrGetText"));
var ocrClickOnText_1 = __importDefault(require("./commands/ocrClickOnText"));
var ocrSetValue_1 = __importDefault(require("./commands/ocrSetValue"));
var ocrWaitForTextDisplayed_1 = __importDefault(require("./commands/ocrWaitForTextDisplayed"));
var tesseract_1 = require("./utils/tesseract");
var constants_1 = require("./utils/constants");
var OcrService = /** @class */ (function () {
    function OcrService(_options) {
        if (_options === void 0) { _options = {}; }
        this._options = _options;
        this._ocrImagesPath = constants_1.OCR_IMAGES_PATH;
        this._ocrImagesPath = this._options.ocrImagesPath || this._ocrImagesPath;
        fs_1.mkdirSync(this._ocrImagesPath, { recursive: true });
    }
    OcrService.prototype.before = function (caps, specs, driver) {
        return __awaiter(this, void 0, void 0, function () {
            var screenSize, tesseractAvailable;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._driver = driver;
                        if (!this._driver.isIOS) return [3 /*break*/, 2];
                        // Lower the quality so it will have better results for OCR on iOS
                        return [4 /*yield*/, this._driver.updateSettings({ screenshotQuality: 2 })];
                    case 1:
                        // Lower the quality so it will have better results for OCR on iOS
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._driver.getWindowSize()];
                    case 3:
                        screenSize = _a.sent();
                        tesseractAvailable = tesseract_1.isTesseractAvailable();
                        this._driver.addCommand('ocrGetElementPositionByText', function (selector, options) {
                            if (options === void 0) { options = {}; }
                            var androidRectangles = options.androidRectangles, iOSRectangles = options.iOSRectangles, reuseOcr = options.reuseOcr;
                            return ocrGetElementPositionByText_1.default({
                                androidRectangles: androidRectangles,
                                iOSRectangles: iOSRectangles,
                                isTesseractAvailable: tesseractAvailable,
                                reuseOcr: !!reuseOcr,
                                ocrImagesPath: _this._ocrImagesPath,
                                screenSize: screenSize,
                                text: selector,
                            });
                        });
                        this._driver.addCommand('ocrClickOnText', function (selector, options) {
                            if (options === void 0) { options = {}; }
                            var androidRectangles = options.androidRectangles, iOSRectangles = options.iOSRectangles, reuseOcr = options.reuseOcr;
                            return ocrClickOnText_1.default({
                                androidRectangles: androidRectangles,
                                iOSRectangles: iOSRectangles,
                                isTesseractAvailable: tesseractAvailable,
                                reuseOcr: !!reuseOcr,
                                ocrImagesPath: _this._ocrImagesPath,
                                screenSize: screenSize,
                                text: selector,
                            });
                        });
                        this._driver.addCommand('ocrGetText', function (options, tesseractOptions) {
                            if (options === void 0) { options = {}; }
                            if (tesseractOptions === void 0) { tesseractOptions = {}; }
                            var androidRectangles = options.androidRectangles, iOSRectangles = options.iOSRectangles, reuseOcr = options.reuseOcr;
                            var lang = tesseractOptions.lang, oem = tesseractOptions.oem, psm = tesseractOptions.psm, presets = tesseractOptions.presets;
                            return ocrGetText_1.default({
                                androidRectangles: androidRectangles,
                                iOSRectangles: iOSRectangles,
                                isTesseractAvailable: tesseractAvailable,
                                reuseOcr: !!reuseOcr,
                                ocrImagesPath: _this._ocrImagesPath,
                                screenSize: screenSize,
                            }, { lang: lang, oem: oem, psm: psm, presets: presets });
                        });
                        this._driver.addCommand('ocrWaitForTextDisplayed', function (selector, options, tesseractOptions) {
                            if (options === void 0) { options = {}; }
                            if (tesseractOptions === void 0) { tesseractOptions = {}; }
                            var androidRectangles = options.androidRectangles, iOSRectangles = options.iOSRectangles, timeout = options.timeout, timeoutMsg = options.timeoutMsg;
                            var lang = tesseractOptions.lang, oem = tesseractOptions.oem, psm = tesseractOptions.psm, presets = tesseractOptions.presets;
                            return ocrWaitForTextDisplayed_1.default({
                                androidRectangles: androidRectangles,
                                iOSRectangles: iOSRectangles,
                                isTesseractAvailable: tesseractAvailable,
                                ocrImagesPath: _this._ocrImagesPath,
                                screenSize: screenSize,
                                text: selector,
                                timeout: timeout,
                                timeoutMsg: timeoutMsg,
                            }, { lang: lang, oem: oem, psm: psm, presets: presets });
                        });
                        this._driver.addCommand('ocrSetValue', function (selector, value, options) {
                            if (options === void 0) { options = {}; }
                            var androidRectangles = options.androidRectangles, iOSRectangles = options.iOSRectangles, reuseOcr = options.reuseOcr, clickDuration = options.clickDuration;
                            return ocrSetValue_1.default({
                                androidRectangles: androidRectangles,
                                iOSRectangles: iOSRectangles,
                                isTesseractAvailable: tesseractAvailable,
                                ocrImagesPath: _this._ocrImagesPath,
                                reuseOcr: !!reuseOcr,
                                screenSize: screenSize,
                                text: selector,
                                value: value,
                                clickDuration: clickDuration,
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return OcrService;
}());
exports.default = OcrService;
