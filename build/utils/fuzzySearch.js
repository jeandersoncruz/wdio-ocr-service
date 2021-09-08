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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzyFind = void 0;
var fuse_js_1 = __importDefault(require("fuse.js"));
function fuzzyFind(options) {
    var textArray = options.textArray, pattern = options.pattern, searchOptions = options.searchOptions;
    var fuzzyOptions = __assign(__assign({}, searchOptions), {
        includeScore: true,
        isCaseSensitive: false,
        shouldSort: true,
        includeMatches: false,
        useExtendedSearch: false,
        ignoreLocation: false,
        ignoreFieldNorm: false,
        keys: ['text'],
    });
    var fuse = new fuse_js_1.default(textArray, fuzzyOptions);
    return fuse.search(pattern).map(function (item) {
        /* istanbul ignore next */
        if (item.score) {
            item.score = item.score < 1e-10 ? 0 : item.score;
            return item;
        }
    });
}
exports.fuzzyFind = fuzzyFind;
