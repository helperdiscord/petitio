export class CentraResponse {
	public body: Buffer = Buffer.alloc(0);
	public headers: {} = {};
	public statusCode: number;

	/**
	 * Creates an instance of CentraResponse.
	 * @param {IncomingMessage} coreRes
	 * @memberof CentraResponse
	 */
	constructor() { }

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
