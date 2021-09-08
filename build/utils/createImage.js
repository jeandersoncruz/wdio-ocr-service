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
// @ts-ignore
var pureimage_1 = require("pureimage");
var fs_1 = require("fs");
function createImage(data) {
    return __awaiter(this, void 0, void 0, function () {
        var bottom, filePath, height, left, lines, right, top, width, image, canvasImage, context, sxDx, syDy, sdHeight, sdWidth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bottom = data.bottom, filePath = data.filePath, height = data.height, left = data.left, lines = data.lines, right = data.right, top = data.top, width = data.width;
                    return [4 /*yield*/, pureimage_1.decodePNGFromStream(fs_1.createReadStream(filePath))];
                case 1:
                    image = _a.sent();
                    canvasImage = pureimage_1.make(width, height);
                    context = canvasImage.getContext('2d');
                    sxDx = left ? left : 0;
                    syDy = top ? top : 0;
                    sdHeight = bottom && (top || top === 0) ? bottom - top : height;
                    sdWidth = (left || left === 0) && right ? right - left : width;
                    context.drawImage(image, 
                    // Start at x/y pixels from the left and the top of the image (crop)
                    sxDx, syDy, 
                    // 'Get' a (w * h) area from the source image (crop)
                    sdWidth, sdHeight, 
                    // Place the result at 0, 0 in the canvas,
                    // 0,0,
                    sxDx, syDy, 
                    // With as width / height: 100 * 100 (scale)
                    sdWidth, sdHeight);
                    if (lines && lines.length > 0) {
                        // Highlight all found texts
                        lines.forEach(function (_a) {
                            var bbox = _a.bbox;
                            var right = bbox.right, bottom = bbox.bottom, left = bbox.left, top = bbox.top;
                            context.beginPath();
                            context.fillStyle = 'rgba(57, 170, 86, 0.5)';
                            context.fillRect(left, top, right - left, bottom - top);
                            context.lineWidth = 2;
                            context.strokeStyle = '#39aa56';
                            context.rect(left, top, right - left, bottom - top);
                            context.stroke();
                        });
                    }
                    return [4 /*yield*/, pureimage_1.encodePNGToStream(canvasImage, fs_1.createWriteStream(filePath))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = createImage;
