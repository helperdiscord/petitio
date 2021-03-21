
export class PetitioResponse {
	public body: Buffer = Buffer.alloc(0);
	public headers: { [k: string]: any } = {};
	public statusCode: number | null = null;

	/**
	 * @param {*} chunk
	 * @memberof PetitioResponse
	 */
	public _addChunk(chunk: any) {
		this.body = Buffer.concat([this.body, chunk]);
	}

	/**
	 * @param {string[]} chunk
	 * @memberof PetitioResponse
	 */
	public _parseHeaders(headers: string[]) {
		for (let idx = 1; idx < headers.length; idx += 2) {
			const key = headers[idx - 1].toLowerCase();
			let val = this.headers[key];
			if (val) {
				if (!Array.isArray(val)) {
					val = [val];
					this.headers[key] = val;
				}
				val.push(headers[idx]);
			} else this.headers[key] = headers[idx];
		}
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
