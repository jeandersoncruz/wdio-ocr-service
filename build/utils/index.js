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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAttributeString = exports.determineClickPoint = exports.getDprPositions = exports.getScreenshotSize = void 0;
/**
 * Get the size of a screenshot in pixels
 */
function getScreenshotSize(screenshot) {
    return {
        height: Buffer.from(screenshot, 'base64').readUInt32BE(20),
        width: Buffer.from(screenshot, 'base64').readUInt32BE(16),
    };
}
exports.getScreenshotSize = getScreenshotSize;
function getDprPositions(values, dpr) {
    Object.keys(__assign({}, values)).map(function (value) {
        // @ts-ignore
        values[value] /= dpr;
    });
    return values;
}
exports.getDprPositions = getDprPositions;
/**
 * Determine the click point
 */
function determineClickPoint(options) {
    var _a = options.rectangles, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
    var x = left + (right - left) / 2;
    var y = top + (bottom - top) / 2;
    return { x: x, y: y };
}
exports.determineClickPoint = determineClickPoint;
function parseAttributeString(attributes) {
    var bbox = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    };
    var wc = 0;
    attributes.forEach(function (attribute) {
        if (attribute.includes('bbox')) {
            var bboxValues = attribute.replace('bbox ', '').split(' ');
            bbox = {
                left: Number(bboxValues[0]),
                top: Number(bboxValues[1]),
                right: Number(bboxValues[2]),
                bottom: Number(bboxValues[3]),
            };
        }
        else if (attribute.includes('x_wconf')) {
            var score = attribute.replace('x_wconf ', '');
            wc = Number(score) / 100;
        }
    });
    return __assign({ bbox: bbox }, { wc: wc });
}
exports.parseAttributeString = parseAttributeString;
