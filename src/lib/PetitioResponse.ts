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
	 * @param {Buffer[] | Uint8Array[]} chunks The body to set for the response.
	 * @return {void} In place operation with no return.
	 */
	public _addBody(chunks: Buffer[] | Uint8Array[]): void {
		// eslint-disable-next-line radix
		const length = parseInt(this.headers["content-length"]) || undefined;
		this.body = Buffer.concat(chunks, length);
	}

	/**
	 * @param {Buffer[]} headers The headers to add. This is done by splitting the
	 * array into chunks of two, where the first value becomes the header and
	 * the latter becomes its value. This will also append values to the header
	 * as an array if it already exists.
	 * @return {void} In place operation with no return.
	 */
	public _parseHeaders(headers: Buffer[]): void {
		// eslint-disable-next-line no-var
		var len = headers.length;
		// @ts-ignore - TypeScript isn't picking up that we are changing this to string[].
		// eslint-disable-next-line no-plusplus
		while (len--) headers[len] = headers[len].toString();
		len = headers.length;
		// eslint-disable-next-line vars-on-top, no-var
		for (var idx = 1; idx < len; idx += 2) {
			// @ts-ignore - TypeScript isn't picking up that we are changing this to string[].
			const key = headers[idx - 1].toLowerCase();
			const toA = headers[idx];
			const val = this.headers[key];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare, max-len, no-unused-expressions, max-statements-per-line, eqeqeq
			if (val !== undefined) if (Array.isArray(val) == false) (this.headers[key] = [val, toA]); else (val[val.length] = toA);
			else this.headers[key] = toA;
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
	 * @return {string} The response body decoded as as a string from the buffer, using either the encoding specified in `encoding` or UTF-8 by default..
	 */
	public text(encoding: BufferEncoding = "utf8"): string {
		return this.body.toString(encoding);
	}

	/**
	 * @return {Buffer} The raw response body as a buffer.
	 */
	public raw(): Buffer {
		return this.body;
	}
}
