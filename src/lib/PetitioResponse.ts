/**
 * @module PetitioResponse
 */

export class PetitioResponse {
	/**
	 * The response body received from the server.
	 * This is updated in chunks through [[PetitioResponse._addChunk]], either
	 * from [[PetitioRequest.send]] or directly on a response object from
	 * another source.
	 */
	public body: Buffer = Buffer.alloc(0);
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
	 * This appends data to the body, dynamically reallocating the buffer size
	 * as chunks are added. Therefore, this is currently unsuitable for handling
	 * large responses, as the exact size is allocated in memory as a buffer.
	 * @param {*} chunk The chunk of data to append to the body.
	 * @return {*} In place operation with no return.
	 */
	public _addChunk(chunk: Buffer | Uint8Array) {
		this.body = Buffer.concat([this.body, chunk]);
	}

	/**
	 * @param {*} headers The headers to add. This is done by splitting the
	 * array into chunks of two, where the first value becomes the header and
	 * the latter becomes its value. This will also append values to the header
	 * as an array if it already exists.
	 * @return {*} In place operation with no return.
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
	 * @template T Type casting parameter for the JSON result.
         * @param {BufferEncoding} [encoding="utf8"] The encoding to use before formatting to json.
	 * @return {*} A serialized object result parsed from the response body.
	 */
	public json<T = any>(encoding: BufferEncoding = "utf8"): T {
		return JSON.parse(this.body.toString(encoding));
	}

	/**
	 * @param {BufferEncoding} [encoding="utf8"] The encoding to use.
	 * @return {string} The response body decoded as as a string from the buffer, using either the encoding specified in `encoding` or UTF-8 by default..
	 */
	public text(encoding: BufferEncoding = "utf8"): string {
		return this.body.toString(encoding);
	}
}
