import { IncomingMessage } from 'http';

export class CentraResponse {
  public body: Buffer = Buffer.alloc(0);
  public headers: IncomingMessage['headers'];
  public statusCode: IncomingMessage['statusCode'];

	/**
	 * Creates an instance of CentraResponse.
	 * @param {IncomingMessage} coreRes
	 * @memberof CentraResponse
	 */
	constructor(public coreRes: IncomingMessage) {
		this.headers = coreRes.headers;
		this.statusCode = coreRes.statusCode;
	}

	/**
	 *
	 *
	 * @param {*} chunk
	 * @memberof CentraResponse
	 */
	public _addChunk(chunk: any) {
		this.body = Buffer.concat([this.body, chunk]);
	}

	/**
	 *
	 *
	 * @return {*}  {*}
	 * @memberof CentraResponse
	 */
	public json<T = any>(): T {
		return JSON.parse(this.body as unknown as string)
	}

	/**
	 *
	 *
	 * @return {*}  {string}
	 * @memberof CentraResponse
	 */
	public text(): string {
		return this.body.toString('utf-8');
	}
};
