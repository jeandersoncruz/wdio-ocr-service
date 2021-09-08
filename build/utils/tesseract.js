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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemOcrData = exports.getNodeOcrData = exports.isTesseractAvailable = void 0;
var child_process_1 = require("child_process");
var tesseract_js_1 = require("tesseract.js");
// @ts-ignore
var node_tesseract_ocr_1 = require("node-tesseract-ocr");
var xml2js_1 = require("xml2js");
var index_1 = require("./index");
function isTesseractAvailable(tesseractName) {
    if (tesseractName === void 0) { tesseractName = ''; }
    var binary = tesseractName || 'tesseract';
    var command = [binary, '--version'].join(' ');
    try {
        child_process_1.execSync(command);
    }
    catch (ign) {
        return false;
    }
    return true;
}
exports.isTesseractAvailable = isTesseractAvailable;
function getNodeOcrData(options) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, jsonSingleWords_1, jsonWordStrings_1, composedBlocks_1, worker, _a, text, hocr, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    filePath = options.filePath;
                    jsonSingleWords_1 = [];
                    jsonWordStrings_1 = [];
                    composedBlocks_1 = [];
                    worker = tesseract_js_1.createWorker();
                    return [4 /*yield*/, worker.load()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, worker.loadLanguage('eng')];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, worker.initialize('eng')];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, worker.setParameters({
                            tessedit_ocr_engine_mode: 2 /* TESSERACT_LSTM_COMBINED */,
                            tessedit_pageseg_mode: "3" /* AUTO */,
                            tessjs_create_tsv: '0',
                            tessjs_create_box: '0',
                            tessjs_create_unlv: '0',
                            tessjs_create_osd: '0',
                        })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, worker.recognize(filePath)
                        // @ts-ignore
                    ];
                case 5:
                    _a = (_b.sent()).data, text = _a.text, hocr = _a.hocr;
                    // @ts-ignore
                    xml2js_1.parseString(hocr, function (error, data) {
                        if (error) {
                            throw Error("An error happened when parsing the getNodeOcrData, see: " + error);
                        }
                        composedBlocks_1 = data.div.div;
                    });
                    if (!composedBlocks_1 || composedBlocks_1.length === 0) {
                        throw Error('No text was found for the OCR, please verify the stored image.');
                    }
                    // This is for single words
                    // @ts-ignore
                    composedBlocks_1.forEach(function (_a) {
                        var TextBlock = _a.p;
                        // @ts-ignore
                        TextBlock.forEach(function (_a) {
                            var TextLine = _a.span;
                            // @ts-ignore
                            TextLine.forEach(function (_a) {
                                var String = _a.span;
                                // @ts-ignore
                                String.forEach(function (_a) {
                                    var text = _a._, title = _a.$.title;
                                    if (!text) {
                                        return;
                                    }
                                    var attributes = ("; " + title).split('; ');
                                    var _b = index_1.parseAttributeString(attributes), bbox = _b.bbox, wc = _b.wc;
                                    jsonSingleWords_1.push({
                                        text: text,
                                        bbox: bbox,
                                        wc: wc,
                                    });
                                });
                            });
                        });
                    });
                    // This is for single lines
                    // @ts-ignore
                    composedBlocks_1.forEach(function (_a) {
                        var TextBlock = _a.p;
                        // @ts-ignore
                        TextBlock.forEach(function (_a) {
                            var TextLine = _a.span;
                            // @ts-ignore
                            TextLine.forEach(function (_a) {
                                var title = _a.$.title, String = _a.span;
                                var attributes = ("; " + title).split('; ');
                                var bbox = index_1.parseAttributeString(attributes).bbox;
                                var line = {
                                    text: '',
                                    bbox: bbox,
                                };
                                // @ts-ignore
                                String.map(function (_a) {
                                    var text = _a._;
                                    line.text = (line.text + " " + (text || '')).trim();
                                });
                                if (line.text === '') {
                                    return;
                                }
                                jsonWordStrings_1.push(line);
                            });
                        });
                    });
                    return [4 /*yield*/, worker.terminate()];
                case 6:
                    _b.sent();
                    return [2 /*return*/, {
                            lines: jsonWordStrings_1,
                            words: jsonSingleWords_1,
                            text: text,
                        }];
                case 7:
                    error_1 = _b.sent();
                    throw Error("An error happened when parsing the getNodeOcrData, see: " + error_1);
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getNodeOcrData = getNodeOcrData;
function getSystemOcrData(options, tesseractOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, lang, oem, psm, presets, filePath, jsonSingleWords_2, jsonWordStrings_2, composedBlocks_2, text_1, result, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = tesseractOptions || { lang: 'eng', oem: 1, psm: 3, presets: ['txt', 'alto'] }, lang = _a.lang, oem = _a.oem, psm = _a.psm, presets = _a.presets;
                    filePath = options.filePath;
                    jsonSingleWords_2 = [];
                    jsonWordStrings_2 = [];
                    composedBlocks_2 = [];
                    text_1 = '';
                    return [4 /*yield*/, node_tesseract_ocr_1.recognize(filePath, {
                            lang: lang,
                            oem: oem,
                            // https://github.com/tesseract-ocr/tesseract/blob/master/doc/tesseract.1.asc
                            psm: psm,
                            presets: presets,
                        })];
                case 1:
                    result = _b.sent();
                    xml2js_1.parseString(result, function (error, data) {
                        if (error) {
                            throw Error("An error happened when parsing the getSystemOcrData, see: " + error);
                        }
                        text_1 = data.alto.Layout[0]._ || text_1;
                        composedBlocks_2 = data.alto.Layout[0].Page[0].PrintSpace[0].ComposedBlock;
                    });
                    if (!composedBlocks_2 || composedBlocks_2.length === 0) {
                        throw Error('No text was found for the OCR, please verify the stored image.');
                    }
                    // This is for single words
                    // @ts-ignore
                    composedBlocks_2.forEach(function (_a) {
                        var TextBlock = _a.TextBlock;
                        // @ts-ignore
                        TextBlock.forEach(function (_a) {
                            var TextLine = _a.TextLine;
                            // @ts-ignore
                            TextLine.forEach(function (_a) {
                                var String = _a.String;
                                // @ts-ignore
                                String.forEach(function (_a) {
                                    var _b = _a.$, CONTENT = _b.CONTENT, HPOS = _b.HPOS, VPOS = _b.VPOS, WIDTH = _b.WIDTH, HEIGHT = _b.HEIGHT, WC = _b.WC;
                                    jsonSingleWords_2.push({
                                        text: CONTENT || '',
                                        bbox: {
                                            left: Number(HPOS),
                                            top: Number(VPOS),
                                            right: Number(HPOS) + Number(WIDTH),
                                            bottom: Number(VPOS) + Number(HEIGHT),
                                        },
                                        wc: Number(WC),
                                    });
                                });
                            });
                        });
                    });
                    // This is for single lines
                    // @ts-ignore
                    composedBlocks_2.forEach(function (_a) {
                        var TextBlock = _a.TextBlock;
                        // @ts-ignore
                        TextBlock.forEach(function (_a) {
                            var TextLine = _a.TextLine;
                            // @ts-ignore
                            TextLine.forEach(function (_a) {
                                var _b = _a.$, HPOS = _b.HPOS, VPOS = _b.VPOS, WIDTH = _b.WIDTH, HEIGHT = _b.HEIGHT, String = _a.String;
                                var line = {
                                    text: '',
                                    bbox: {
                                        left: Number(HPOS),
                                        top: Number(VPOS),
                                        right: Number(HPOS) + Number(WIDTH),
                                        bottom: Number(VPOS) + Number(HEIGHT),
                                    },
                                };
                                // @ts-ignore
                                String.forEach(function (_a) {
                                    var CONTENT = _a.$.CONTENT;
                                    line.text = (line.text + " " + (CONTENT || '')).trim();
                                });
                                if (line.text === '') {
                                    return;
                                }
                                jsonWordStrings_2.push(line);
                            });
                        });
                    });
                    return [2 /*return*/, {
                            lines: jsonWordStrings_2,
                            words: jsonSingleWords_2,
                            text: text_1,
                        }];
                case 2:
                    error_2 = _b.sent();
                    throw Error("An error happened when parsing the getSystemOcrData, see: " + error_2);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSystemOcrData = getSystemOcrData;
