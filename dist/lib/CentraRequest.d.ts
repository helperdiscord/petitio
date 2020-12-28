/// <reference types="node" />
import { RequestOptions } from 'https';
import { URL } from 'url';
import CentraResponse from './CentraResponse';
export declare type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
export default class CentraRequest {
    httpMethod: HTTPMethod;
    url: URL;
    data: string | Buffer | null;
    sendDataAs: 'form' | 'json' | 'buffer' | null;
    reqHeaders: {
        [header: string]: string;
    };
    coreOptions: RequestOptions;
    constructor(url: string | URL, httpMethod?: HTTPMethod);
    query(key: string, value: any): this;
    path(relativePath: string): this;
    body(data: any, sendAs?: 'json' | 'buffer' | 'form'): this;
    header(header: string | {
        [k: string]: string;
    }, value?: string): this;
    method(method: HTTPMethod): this;
    timeout(timeout: number): this;
    json(): Promise<any>;
    raw(): Promise<Buffer>;
    text(): Promise<string>;
    send(): Promise<CentraResponse>;
}
