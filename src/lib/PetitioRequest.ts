/**
 * @module PetitioRequest
 */

// @ts-expect-error 7016 - Unusual type exports
import Client from "undici/lib/core/client";
import type ClientType from "undici/types/client";
import type { IncomingHttpHeaders } from "http";
import type { ParsedUrlQueryInput } from "querystring";
import { PetitioResponse } from "./PetitioResponse";
import { URL } from "url";
import { join } from "path";
import { stringify } from "querystring"; // eslint-disable-line no-duplicate-imports

/**
 * Accepted HTTP methods (currently only supports up to HTTP/1.1).
 */
export type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
/**
 * @see [Undici ClientOptions timeout documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md#parameter-clientoptions)
 */
export interface TimeoutOptions {
	bodyTimeout?: number;
	headersTimeout?: number;
	keepAliveTimeout?: number
}

export class PetitioRequest {
	/**
	 * Options to use for Undici under the hood.
	 * @see [Undici ClientOptions documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md#parameter-clientoptions)
	 */
	public coreOptions: ClientType.Options = {};
	/**
	 * The data to be sent as the request body.
	 */
	public data?: string | Buffer;
	/**
	 * @see [[HTTPMethod]]
	 */
	public httpMethod: HTTPMethod = "GET";
	/**
	 * @see [[PetitioRequest.client]]
	 */
	public kClient?: ClientType;
	/**
	 * Whether [[PetitioRequest.kClient]] will persist between [[PetitioRequest.send]]
	 * calls. It is recommended to enable this for superior performance.
	 */
	public keepClient?: boolean;
	/**
	 * The headers to attach to the request.
	 */
	public reqHeaders: IncomingHttpHeaders = {};
	/**
	 * The timeout options for the Undici client.
	 * @see [[TimeoutOptions]]
	 */
	public timeoutOptions: TimeoutOptions = {};
	/**
	 * The URL destination for the request, targeted in [[PetitioRequest.send]].
	 */
	public url: URL;

	/**
	 * @param {(string | URL)} url The URL to start composing a request for.
	 * @param {HTTPMethod} [httpMethod="GET"] The HTTP method to use.
	 * @return {PetitioRequest} The Petitio request instance for your URL.
	 */
	public constructor(url: string | URL, httpMethod: HTTPMethod = "GET") {
		this.url = typeof url === "string" ? new URL(url) : url;
		this.httpMethod = httpMethod;
		if (!["http:", "https:"].includes(this.url.protocol)) throw new Error(`Bad URL protocol: ${this.url.protocol}`);
	}

	/**
	 * @param {ClientType} client The Undici client instance you wish to use.
	 * @param {boolean} keepAlive Whether to persist the client across requests or not.
	 * @return {*} The request object for further composition.
	 * @see [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)
	 */
	public client(client: ClientType, keepAlive?: boolean): this {
		this.kClient = client;
		if (keepAlive) this.keepClient = true;

		return this;
	}

	/**
	 * @param {*} key The query key to use for the URL query parameters.
	 * @param {*} value The value to set the query key to.
	 * @example
	 * If you wish to make a query at https://example.com/index?query=parameter
	 * you can use `.query("query", "parameter")`.
	 */
	public query(key: string, value: any): this
	/**
	 * @param {*} key An object of query keys and their respective values.
	 * @example
	 * If you wish to make multiple queries at once, you can use
	 * `.query({"keyOne": "hello", "keyTwo": "world!"})`.
	 */
	public query(key: Record<string, any>): this
	public query(key: string | Record<string, any>, value?: any): this {
		if (typeof key === "object") Object.keys(key).forEach((query) => {
			this.url.searchParams.append(query, key[query]);
		});
		else this.url.searchParams.append(key, value);

		return this;
	}

	/**
	 * @param {string} relativePath A path to resolve relative to the current URL.
	 * @return {*} The request object for further composition.
	 * @example `https://example.org/hello/world` with `.path("../petitio")`
	 * would resolve to `https://example.org/hello/petitio`.
	 */
	public path(relativePath: string): this {
		this.url.pathname = join(this.url.pathname, relativePath);

		return this;
	}

	/**
	 * @param {*} data The data to be set for the request body.
	 */
	public body(data: Buffer | string): this
	/**
	 * @param {*} data The data to be set for the request body.
	 * @param {*} sendAs If data is set to any object type value other than a
	 * buffer or this is set to `json`, the `Content-Type` header will be set to
	 * `application/json` and the request data will be set to the stringified
	 * JSON form of the supplied data.
	 */
	public body(data: Record<string, any>, sendAs?: "json"): this
	/**
	 * @param {*} data The data to be set for the request body.
	 * @param {*} sendAs If data is a string or a parsed object of query
	 * parameters *AND* this is set to `form`, the `Content-Type` header will be
	 * set to `application/x-www-form-urlencoded` and the request data will be
	 * set to the URL encoded version of the query string.
	 */
	public body(data: ParsedUrlQueryInput | string, sendAs: "form"): this
	public body(data: any, sendAs?: "json" | "form"): this {
		if (sendAs === "json" || (typeof data === "object" && !Buffer.isBuffer(data))) {
			this.reqHeaders["content-type"] = "application/json";
			this.data = JSON.stringify(data);
		} else if (sendAs === "form") {
			this.reqHeaders["content-type"] = "application/x-www-form-urlencoded";
			this.data = stringify(data);
		} else this.data = data;
		this.reqHeaders["content-length"] = Buffer.byteLength(this.data as string | Buffer).toString();

		return this;
	}

	/**
	 * @param {*} header The encoded header name to set.
	 * @param {*} value The value to set the header to.
	 */
	public header(header: string, value: string): this
	/**
	 * @param {*} header An object of keys and values to set headers to.
	 */
	public header(header: Record<string, string>): this
	public header(header: string | Record<string, string>, value?: string): this {
		if (typeof header === "object") Object.keys(header).forEach((headerName) => {
			this.reqHeaders[headerName.toLowerCase()] = header[headerName];
		});
		else this.reqHeaders[header.toLowerCase()] = value;

		return this;
	}

	/**
	 * @param {*} method The HTTP method to change the request to.
	 * @return {*} The request object for further composition.
	 */
	public method(method: HTTPMethod): this {
		this.httpMethod = method;

		return this;
	}

	/**
	 * @param {*} timeout The timeout (in milliseconds) to set the `bodyTimeout`
	 * to.
	 * @see [[TimeoutOptions.bodyTimeout]]
	 */
	public timeout(timeout: number): this
	/**
	 * @param {*} timeout The timeout option to change.
	 * @param {*} time The number of milliseconds to set the timeout to.
	 * @see [[TimeoutOptions]]
	 */
	public timeout(timeout: keyof TimeoutOptions, time: number): this
	public timeout(timeout: keyof TimeoutOptions | number, time?: number): this {
		if (typeof timeout === "string") this.timeoutOptions[timeout] = time;
		else this.timeoutOptions.bodyTimeout = timeout;

		return this;
	}

	/**
	 * @param {*} key An object of key-value options to set for Undici.
	 * @see [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)
	 */
	public option(key: ClientType.Options): this
	/**
	 * @template T
	 * @param {T} key The client options key to set.
	 * @param {ClientType.Options[T]} value The value to set the client option to (type checked).
	 * @see [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)
	 */
	public option<T extends keyof ClientType.Options>(key: T, value: ClientType.Options[T]): this
	public option(key: keyof ClientType.Options | ClientType.Options, value?: any) {
		if (typeof key === "object") this.coreOptions = {...this.coreOptions, ...key};
		else this.coreOptions[key] = value;

		return this;
	}

	/**
	 * @template T Type casting parameter for the JSON result.
	 * @return {*} A serialized object result from sending the request.
	 */
	public async json<T = any>(): Promise<T> {
		const res = await this.send();
		return res.json<T>();
	}

	/**
	 * @return {*} The raw response body as a buffer.
	 */
	public async raw(): Promise<Buffer> {
		const res = await this.send();
		return res.body;
	}

	/**
	 * @return {*} The raw response body as a string.
	 */
	public async text(): Promise<string> {
		const res = await this.send();
		return res.text();
	}


	/**
	 * Finalizes and sends the composable request to the target server.
	 * @return {*} The response object.
	 */
	public send(): Promise<PetitioResponse> {
		return new Promise((resolve, reject) => {
			const options: Client.RequestOptions = {
				path: this.url.pathname + this.url.search,
				method: this.httpMethod,
				headers: this.reqHeaders,
				body: this.data
			};

			const client = this.kClient ?? new Client(this.url.origin, this.coreOptions);

			const res: PetitioResponse = new PetitioResponse();

			client.dispatch(options, {
				onData: (data: Buffer) => {
					return res._addChunk(data);
				},
				onError: (err: Error) => reject(err),
				onComplete: () => {
					if (!this.keepClient) client.close();
					resolve(res);
				},
				onConnect: () => null,
				onHeaders: (statusCode: number, headers: string[], resume: () => void) => {
					res.statusCode = statusCode;
					res._parseHeaders(headers);
					resume();
				}
			});
		});
	}
}
