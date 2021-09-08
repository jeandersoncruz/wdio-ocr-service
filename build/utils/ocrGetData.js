"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var logger_1 = __importDefault(require("@wdio/logger"));
var fs_1 = require("fs");
var path_1 = require("path");
var jimp_1 = __importDefault(require("jimp"));
var index_1 = require("./index");
var createImage_1 = __importDefault(require("./createImage"));
var constants_1 = require("./constants");
var tesseract_1 = require("./tesseract");
var log = logger_1.default(constants_1.SERVICE_NAME);
// @TODO: fix output
function ocrGetData(options, tesseractOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var androidRectangles, iOSRectangles, isTesseractAvailable, ocrImagesPath, reuseOcr, screenSize, screenshot, _a, height, width, dpr, image, greyscaleImage, fileName, filePath, rectangles, ocrData, start, diff, processTime, parsedOcrData, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    androidRectangles = options.androidRectangles, iOSRectangles = options.iOSRectangles, isTesseractAvailable = options.isTesseractAvailable, ocrImagesPath = options.ocrImagesPath, reuseOcr = options.reuseOcr, screenSize = options.screenSize;
                    if (!(!reuseOcr || !driver.ocrData)) return [3 /*break*/, 13];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, driver.takeScreenshot()];
                case 2:
                    screenshot = _b.sent();
                    _a = index_1.getScreenshotSize(screenshot), height = _a.height, width = _a.width;
                    dpr = width / screenSize.width;
                    return [4 /*yield*/, jimp_1.default.read(Buffer.from(screenshot, 'base64'))];
                case 3:
                    image = _b.sent();
                    image.greyscale();
                    image.contrast(1);
                    return [4 /*yield*/, image.getBufferAsync(jimp_1.default.MIME_PNG)];
                case 4:
                    greyscaleImage = (_b.sent()).toString('base64');
                    fileName = (driver.isAndroid ? 'android' : 'ios') + "-" + new Date().getTime() + ".png";
                    filePath = path_1.join(ocrImagesPath, fileName);
                    fs_1.writeFileSync(filePath, greyscaleImage, { encoding: 'base64' });
                    if (!(androidRectangles || iOSRectangles)) return [3 /*break*/, 6];
                    rectangles = driver.isAndroid ? androidRectangles : iOSRectangles;
                    return [4 /*yield*/, createImage_1.default(__assign({ filePath: filePath,
                            height: height,
                            width: width }, rectangles))];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    ocrData = void 0;
                    start = process.hrtime();
                    if (!isTesseractAvailable) return [3 /*break*/, 8];
                    log.info('Using system installed version of Tesseract');
                    return [4 /*yield*/, tesseract_1.getSystemOcrData({ filePath: filePath })];
                case 7:
                    ocrData = _b.sent();
                    return [3 /*break*/, 10];
                case 8:
                    log.info('Using NodeJS version of Tesseract');
                    return [4 /*yield*/, tesseract_1.getNodeOcrData({ filePath: filePath })];
                case 9:
                    ocrData = _b.sent();
                    _b.label = 10;
                case 10:
                    diff = process.hrtime(start);
                    processTime = ((diff[0] * 1000000 + diff[1] / 1000) / 1000000).toFixed(3);
                    log.info("It took '" + processTime + "s' to process the image.");
                    log.info("The following text was found through OCR:\n\n" + ocrData.text.replace(/[\r\n]{2,}/g, '\n'));
                    // Overwrite image with the found locations
                    return [4 /*yield*/, createImage_1.default({
                            filePath: filePath,
                            height: height,
                            lines: ocrData.lines,
                            width: width,
                        })];
                case 11:
                    // Overwrite image with the found locations
                    _b.sent();
                    log.info("OCR Image with found text can be found here:\n\n" + filePath);
                    parsedOcrData = __assign(__assign({}, ocrData), { dpr: dpr });
                    // @TODO: fix this typing
                    // @ts-ignore
                    driver.ocrData = parsedOcrData;
                    return [2 /*return*/, parsedOcrData];
                case 12:
                    e_1 = _b.sent();
                    throw new Error(e_1);
                case 13: 
                // @TODO: fix this typing
                // @ts-ignore
                return [2 /*return*/, driver.ocrData];
            }
        });
    });
}
exports.default = ocrGetData;
