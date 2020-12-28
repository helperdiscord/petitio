"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CentraRequest_1 = __importDefault(require("./lib/CentraRequest"));
;
module.exports = (url, method) => new CentraRequest_1.default(url, method);
