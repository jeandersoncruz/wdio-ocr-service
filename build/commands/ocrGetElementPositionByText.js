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
var logger_1 = __importDefault(require("@wdio/logger"));
var ocrGetTextPositions_1 = __importDefault(require("../utils/ocrGetTextPositions"));
var fuzzySearch_1 = require("../utils/fuzzySearch");
var constants_1 = require("../utils/constants");
var log = logger_1.default(constants_1.SERVICE_NAME);
function ocrGetElementPositionByText(data) {
    return __awaiter(this, void 0, void 0, function () {
        var androidRectangles, iOSRectangles, isTesseractAvailable, ocrImagesPath, reuseOcr, screenSize, text, textPositions, matches, element, score, messageOne, messageTwo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    androidRectangles = data.androidRectangles, iOSRectangles = data.iOSRectangles, isTesseractAvailable = data.isTesseractAvailable, ocrImagesPath = data.ocrImagesPath, reuseOcr = data.reuseOcr, screenSize = data.screenSize, text = data.text;
                    return [4 /*yield*/, ocrGetTextPositions_1.default({
                            androidRectangles: androidRectangles,
                            iOSRectangles: iOSRectangles,
                            isTesseractAvailable: isTesseractAvailable,
                            ocrImagesPath: ocrImagesPath,
                            reuseOcr: reuseOcr,
                            screenSize: screenSize,
                        })];
                case 1:
                    textPositions = _a.sent();
                    matches = fuzzySearch_1.fuzzyFind({
                        textArray: textPositions,
                        pattern: text,
                    });
                    if (matches.length === 0) {
                        log.warn("No matches were found based on the word \"" + text + "\"");
                        throw new Error("InvalidSelectorMatch. Strategy 'ocr' has failed to find word '" + text + "' in the image");
                    }
                    else if (matches.length > 1) {
                        // @ts-ignore
                        matches.sort(function (a, b) { return (a.score > b.score ? 1 : -1); });
                        element = matches[0];
                        score = Number(((1 - element.score) * 100).toFixed(2));
                        messageOne = "Multiple matches were found based on the word \"" + text + "\".";
                        messageTwo = "The match \"" + element.item.text + "\" with score \"" + score + "%\" will be used.";
                        log.info(messageOne + " " + messageTwo);
                    }
                    else {
                        element = matches[0];
                        score = Number(((1 - element.score) * 100).toFixed(2));
                        log.info("We searched for the word \"" + text + "\" and found one match \"" + element.item.text + "\" with score \"" + score + "%\"");
                    }
                    return [2 /*return*/, {
                            searchValue: text,
                            matchedString: element.item.text,
                            originalPosition: element.item.originalPosition,
                            dprPosition: element.item.dprPosition,
                            score: score,
                        }];
            }
        });
    });
}
exports.default = ocrGetElementPositionByText;
