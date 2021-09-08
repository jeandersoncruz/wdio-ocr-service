"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_snapshot_1 = require("jest-snapshot");
expect.extend({
    toHaveBeenCalledWithSnapshot: function (received) {
        // @ts-ignore
        return jest_snapshot_1.toMatchSnapshot.call(this, received);
    },
});
