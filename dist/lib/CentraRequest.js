"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const querystring_1 = __importDefault(require("querystring"));
const url_1 = require("url");
const CentraResponse_1 = __importDefault(require("centra/dist/lib/CentraResponse"));
class CentraRequest {
    constructor(url, httpMethod = 'GET') {
        this.httpMethod = httpMethod;
        this.data = null;
        this.sendDataAs = null;
        this.coreOptions = {};
        this.url = typeof url === 'string' ? new url_1.URL(url) : url;
        return this;
    }
    query(key, value) {
        if (typeof key === 'object') {
            Object.keys(key).forEach((queryKey) => {
                this.url.searchParams.append(queryKey, key[queryKey]);
            });
        }
        else {
            this.url.searchParams.append(key, value);
        }
        return this;
    }
    path(relativePath) {
        this.url.pathname = path_1.default.join(this.url.pathname, relativePath);
        return this;
    }
    body(data, sendAs) {
        this.sendDataAs = typeof data === 'object' && !sendAs && !Buffer.isBuffer(data) ? 'json' : sendAs ? sendAs.toLowerCase() : 'buffer';
        this.data = this.sendDataAs === 'form' ? querystring_1.default.stringify(data) : this.sendDataAs === 'json' ? JSON.stringify(data) : data;
        return this;
    }
    header(header, value) {
        if (typeof header === 'object') {
            Object.keys(header).forEach(headerName => {
                this.reqHeaders[headerName.toLowerCase()] = header[headerName];
            });
        }
        else {
            this.reqHeaders[header.toLowerCase()] = value;
        }
        return this;
    }
    method(method) {
        this.httpMethod = method;
        return this;
    }
    timeout(timeout) {
        this.coreOptions.timeout = timeout;
        return this;
    }
    async json() {
        const res = await this.send();
        return res.json;
    }
    async raw() {
        const res = await this.send();
        return res.body;
    }
    async text() {
        const res = await this.send();
        return res.text;
    }
    send() {
        return new Promise((resolve, reject) => {
            if (this.data) {
                if (!this.reqHeaders.hasOwnProperty('content-type')) {
                    if (this.sendDataAs === 'json')
                        this.reqHeaders['content-type'] = 'application/json';
                    else if (this.sendDataAs === 'form')
                        this.reqHeaders['content-type'] = 'application/x-www-form-urlencoded';
                }
                if (!this.reqHeaders.hasOwnProperty('content-length'))
                    this.reqHeaders['content-length'] = Buffer.byteLength(this.data);
            }
            const options = {
                protocol: this.url.protocol,
                host: this.url.hostname,
                port: this.url.port,
                path: this.url.pathname + this.url.search,
                method: this.httpMethod,
                headers: this.reqHeaders,
                ...this.coreOptions
            };
            let req;
            const resHandler = (res) => {
                let stream = res;
                const centraRes = new CentraResponse_1.default(res);
                stream.on('error', (err) => {
                    reject(err);
                });
                stream.on('data', (chunk) => {
                    centraRes._addChunk(chunk);
                });
                stream.on('end', () => {
                    resolve(centraRes);
                });
            };
            if (this.url.protocol === 'http:')
                req = http_1.default.request(options, resHandler);
            else if (this.url.protocol === 'https:')
                req = https_1.default.request(options, resHandler);
            else
                throw new Error(`Bad URL protocol: ${this.url.protocol}`);
            req.on('error', (err) => {
                reject(err);
            });
            if (this.data)
                req.write(this.data);
            req.end();
        });
    }
}
exports.default = CentraRequest;
;
