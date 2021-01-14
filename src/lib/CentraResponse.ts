import { IncomingMessage } from 'http';

export default class CentraResponse {
  public body: Buffer = Buffer.alloc(0);
  public headers: IncomingMessage['headers'];
  public statusCode: IncomingMessage['statusCode'];

	constructor(public coreRes: IncomingMessage) {
		this.headers = coreRes.headers;
		this.statusCode = coreRes.statusCode;
	}

	public _addChunk(chunk: any) {
		this.body = Buffer.concat([this.body, chunk]);
	}

	public json(): any {
		return JSON.parse(this.body as unknown as string)
	}

	public text(): string {
		return this.body.toString('utf-8');
	}
};
