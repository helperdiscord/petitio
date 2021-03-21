export class PetitioResponse {
	public body: Buffer = Buffer.alloc(0);
	public headers: { [k: string]: any } = {};
	public statusCode: number;

	/**
	 * @param {*} chunk
	 * @memberof PetitioResponse
	 */
	public _addChunk(chunk: any) {
		this.body = Buffer.concat([this.body, chunk]);
	}

	/**
	 * @return {*}  {*}
	 * @memberof PetitioResponse
	 */
	public json<T = any>(): T {
		return JSON.parse(String.fromCharCode(...this.body.toJSON().data));
	}

	/**
	 * @return {*}  {string}
	 * @memberof PetitioResponse
	 */
	public text(): string {
		return this.body.toString("utf-8");
	}
}
