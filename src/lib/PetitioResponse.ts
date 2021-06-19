/**
 * @module PetitioResponse
 */
export class PetitioResponse {
	/**
	 * The response body received from the server.
	 * This is updated through [[PetitioResponse._addBody]], either
	 * from [[PetitioRequest.send]] or directly on a response object from
	 * another source.
	 */
	public body!: Buffer;
	/**
	 * The response headers received from the server.
	 * This is updated through [[PetitioResponse._parseHeaders]].
	 */
	public headers: { [k: string]: any } = {};
	/**
	 * The status code received from the server.
	 * This is set only after the response is complete when headers are received
	 * or it can be set manually.
	 */
	public statusCode: number | null = null;

	/**
	 * This takes the data chunks and creates a Buffer, and it sets
	 * that buffer as the body.
	 * @param {*} chunks The body to set for the response.
	 * @return {*} In place operation with no return.
	 */
	public _addBody(chunks: Buffer[] | Uint8Array[]) {
		const length = Number(this.headers["content-length"]) || undefined;
		this.body = Buffer.concat(chunks, length);
	}

	/**
	 * @param {*} headers The headers to add. This is done by splitting the
	 * array into chunks of two, where the first value becomes the header and
	 * the latter becomes its value. This will also append values to the header
	 * as an array if it already exists.
	 * @return {*} In place operation with no return.
	 */
	public _parseHeaders(headers: Buffer[]) {
		const len = headers.length;
		for (let idx = 1; idx < len; idx += 2) {
			const key = headers[idx - 1].toString().toLowerCase();
			const toA = headers[idx].toString();
			const val = this.headers[key];
			// eslint-disable-next-line curly
			if (val !== undefined) {
				if (!Array.isArray(val)) this.headers[key] = [val, toA];
				else val[val.length] = toA;
			} else this.headers[key] = toA;
		}
	}

	/**
	 * @template T Type casting parameter for the JSON result.
	 * @param {*} [encoding="utf8"] The encoding to use when parsing the response body.
	 * @return {T} A serialized object result parsed from the response body.
	 */
	public json<T = any>(encoding: BufferEncoding = "utf8"): T {
		return JSON.parse(this.body.toString(encoding));
	}

	/**
	 * @param {*} [encoding="utf8"] The encoding to use.
	 * @return {*} The response body decoded as as a string from the buffer, using either the encoding specified in `encoding` or UTF-8 by default..
	 */
	public text(encoding: BufferEncoding = "utf8"): string {
		return this.body.toString(encoding);
	}

	/**
	   * @return {*} The raw response body as a buffer.
	   */
	public raw(): Buffer {
		return this.body;
	}
}
