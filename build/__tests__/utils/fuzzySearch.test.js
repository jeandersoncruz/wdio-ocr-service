"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fuse_js_1 = __importDefault(require("fuse.js"));
var fuzzySearch_1 = require("../../utils/fuzzySearch");
jest.mock('fuse.js');
describe('utils - fuzzySearch', function () {
    it('should find data when only 1 result is given back with a 100% match', function () {
        fuse_js_1.default.mockImplementation(function () { return ({
            search: jest.fn().mockReturnValue([
                {
                    item: {
                        text: 'Username',
                        originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                        dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    },
                    refIndex: 0,
                    score: 2.220446049250313e-16
                },
            ])
        }); });
        var options = {
            textArray: [
                {
                    text: 'Username',
                    originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                },
            ],
            pattern: 'Username',
        };
        expect(fuzzySearch_1.fuzzyFind(options)).toMatchSnapshot();
        expect(fuse_js_1.default).toHaveBeenCalledWithSnapshot();
    });
    it('should find data when multiple results are given back', function () {
        fuse_js_1.default.mockImplementation(function () { return ({
            search: jest.fn().mockReturnValue([
                {
                    item: {
                        text: 'Username',
                        originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                        dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    },
                    refIndex: 0,
                    score: 2.220446049250313e-16
                },
                {
                    item: {
                        text: 'The currently accepted usernames for',
                        originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                        dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    },
                    refIndex: 5,
                    score: 0.5184326474378735
                },
            ])
        }); });
        var options = {
            textArray: [
                {
                    text: 'Username',
                    originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                },
                {
                    text: 'Password',
                    originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                },
                {
                    text: 'LOGIN',
                    originalPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                    dprPosition: { left: 1, top: 2, right: 3, bottom: 4 },
                },
            ],
            pattern: 'Username',
        };
        expect(fuzzySearch_1.fuzzyFind(options)).toMatchSnapshot();
        expect(fuse_js_1.default).toHaveBeenCalledWithSnapshot();
    });
});
