"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CentraResponse {
    constructor(coreRes) {
        this.coreRes = coreRes;
        this.body = Buffer.alloc(0);
        this.headers = coreRes.headers;
        this.statusCode = coreRes.statusCode;
    }
    ;
    ;
    _addChunk(chunk) {
        this.body = Buffer.concat([this.body, chunk]);
    }
    get json() {
        return JSON.parse(this.body);
    }
    get text() {
        return this.body.toString('utf-8');
    }
}
exports.default = CentraResponse;
;
