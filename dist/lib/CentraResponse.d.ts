/// <reference types="node" />
import { IncomingMessage } from 'http';
export default class CentraResponse {
    coreRes: IncomingMessage;
    body: Buffer;
    headers: IncomingMessage['headers'];
    statusCode: IncomingMessage['statusCode'];
    constructor(coreRes: IncomingMessage);
    _addChunk(chunk: any): void;
    get json(): Promise<any>;
    get text(): string;
}
