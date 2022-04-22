/**
 * @module PetitioRequest
 */
import type { DispatchOptions as ADO, Options as AO } from "undici/types/agent";
import { Agent, Client } from "undici";
import type { Options as CO } from "undici/types/client";
import type { DispatchOptions as DO } from "undici/types/dispatcher";
import type { IncomingHttpHeaders } from "node:http";
import type { Readable } from "node:stream";
import { PetitioResponse } from "./PetitioResponse";
import { URL } from "node:url";
import { join } from "node:path";
import { type ParsedUrlQueryInput, stringify } from "node:querystring";

export type DispatchOptions = DO | ADO;
export type Options = AO | CO;
/**
 * Accepted HTTP methods (currently only supports up to HTTP/1.1).
 */
export type HTTPMethod = "GET" | "HEAD" | "POST" | "OPTIONS" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | "PATCH";

const validProtocols = ["http:", "https:"];

/**
 * @see [Undici AgentOptions timeout documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md#parameter-agentoptions)
 */
export interface TimeoutOptions {
	bodyTimeout?: number;
	headersTimeout?: number;
	keepAliveTimeout?: number
	keepAliveMaxTimeout?: number;
	keepAliveTimeoutThreshold?: number;
}

export class PetitioRequest {
	/**
	 * Options to use for Undici under the hood.
	 * @see [Undici AgentOptions documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md#parameter-agentoptions)
	 */
	public coreOptions: Options = {};
	/**
	 * The data to be sent as the request body.
	 * This will be a buffer or string for normal requests, or a stream.Readable
	 * if the request is to be sent as a stream.
	 */
	public data?: Buffer | string | Readable;
	/**
	 * @see [[HTTPMethod]]
	 */
	public httpMethod: HTTPMethod = "GET";
	/**
	 * @see [[PetitioRequest.dispatch]]
	 */
	public kDispatch?: Agent | Client;
	/**
	 * Whether [[PetitioRequest.kDispatch]] will persist between [[PetitioRequest.send]]
	 * calls. This is recommended to improve performance (if you will make more
	 * than one request).
	 */
	public keepDispatcher = false;
	/**
	 * The headers to attach to the request.
	 */
	public reqHeaders: IncomingHttpHeaders = {};
	/**
	 * The timeout options for the Undici agent.
	 * @see [[TimeoutOptions]]
	 */
	public timeoutOptions: TimeoutOptions = {};
	/**
	 * The URL destination for the request, targeted in [[PetitioRequest.send]].
	 */
	public url: URL;
	/**
	 * The AbortController attached to the request
	 * enableable with [[PetitioRequest.signal]]
	 */
	public controller?: AbortController;

	/**
	 * @param {*} url The URL to start composing a request for.
	 * @param {*} [httpMethod="GET"] The HTTP method to use.
	 * @return {*} The Petitio request instance for your URL.
	 */
	public constructor(url: string | URL, httpMethod: HTTPMethod = "GET") {
		this.url = typeof url === "string" ? new URL(url) : url;
		this.httpMethod = httpMethod;
		// eslint-disable-next-line max-len, @typescript-eslint/no-unnecessary-boolean-literal-compare
		if (validProtocols.includes(this.url.protocol) === false) throw new Error(`Bad URL protocol: ${this.url.protocol}`);
	}

	/**
	 * @param {*} dispatch The Undici agent or client instance you wish to use.
	 * @param {boolean} keepAlive Whether to persist the dispatcher across requests or not.
	 * @return {*} The request object for further composition.
	 * @see [Undici Agent documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md)
	 * @see [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)
	 */
	public dispatch(agent: Agent | Client, keepAlive?: boolean): this {
		this.kDispatch = agent;
		if (keepAlive) this.keepDispatcher = true;

		return this;
	}

	/**
	 * @param {string} key The query key to use for the URL query parameters.
	 * @param {string} value The value to set the query key to.
	 * @example
	 * If you wish to make a query at https://example.com/index?query=parameter
	 * you can use `.query("query", "parameter")`.
	 */
	public query(key: string, value: any): this
	/**
	 * @param {Record<string, any>} key An object of query keys and their respective values.
	 * @example
	 * If you wish to make multiple queries at once, you can use
	 * `.query({"keyOne": "hello", "keyTwo": "world!"})`.
	 */
	public query(key: Record<string, any>): this
	public query(key: string | Record<string, any>, value?: any): this {
		if (typeof key === "object") {
			const keys = Object.keys(key);
			// eslint-disable-next-line vars-on-top, no-var
			var len = keys.length;
			// eslint-disable-next-line no-plusplus
			while (len--) {
				const val = keys[len];
				this.url.searchParams.append(val, key[val]);
			}
		} else this.url.searchParams.append(key, value);

		return this;
	}

	/**
	 * @param {string} relativePath A path to resolve relative to the current URL.
	 * @return {this} The request object for further composition.
	 * @example `https://example.org/hello/world` with `.path("../petitio")`
	 * would resolve to `https://example.org/hello/petitio`.
	 */
	public path(relativePath: string): this {
		this.url.pathname = join(this.url.pathname, relativePath);

		return this;
	}

	/**
	 * @param {AbortController} controller A controller instance that handles aborting the request.
	 * @return {this} The request object for further composition.
	 * @example
	 * ```ts
	 * const controller = new AbortController();
	 * const result = petitio(URL).signal(controller);
	 * setTimeout(() => controller.abort(), 5000) // serves as a request timeout
	 * ```
	 */
	public signal(controller: AbortController): this {
		this.controller = controller;

		return this;
	}

	/**
	 * @param {Buffer | string} data The data to be set for the request body.
	 */
	public body(data: Buffer | string): this
	/**
	 * @param {Record<string, any>} data The data to be set for the request body.
	 * @param {string = "json"} sendAs If data is set to any object type value other than a
	 * buffer or this is set to `json`, the `Content-Type` header will be set to
	 * `application/json` and the request data will be set to the stringified
	 * JSON form of the supplied data.
	 */
	public body(data: Record<string, any>, sendAs?: "json"): this
	/**
	 * @param {ParsedUrlQueryInput} data The data to be set for the request body.
	 * @param {"form"} sendAs If data is a string or a parsed object of query
	 * parameters *AND* this is set to `form`, the `Content-Type` header will be
	 * set to `application/x-www-form-urlencoded` and the request data will be
	 * set to the URL encoded version of the query string.
	 */
	public body(data: ParsedUrlQueryInput | string, sendAs: "form"): this
	/**
	 * @param {Readable} data The data to be set for the request body.
	 * @param {"stream"} sendAs If data is a stream.Readable *AND* this is set to
	 * `stream`, the body will be sent as the stream with no modifications to
	 * it or the headers.
	 */
	public body(data: Readable, sendAs: "stream"): this
	public body(data: any, sendAs?: "json" | "form" | "stream"): this {
		switch (sendAs) {
			case "json": {
				this.data = JSON.stringify(data);
				this.header({
					"content-type": "application/json",
					"content-length": Buffer.byteLength(this.data).toString()
				});
				break;
			}
			case "form": {
				this.data = stringify(data);
				this.header({
					"content-type": "application/x-www-form-urlencoded",
					"content-length": Buffer.byteLength(this.data).toString()
				});
				break;
			}
			case "stream": {
				this.data = data;
				break;
			}
			default: {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
				if (typeof data === "object" && Buffer.isBuffer(data) === false) {
					this.data = JSON.stringify(data);
					this.header({
						"content-type": "application/json",
						"content-length": Buffer.byteLength(this.data as string).toString()
					});
				} else this.data = data;
				break;
			}
		}
		return this;
	}

	/**
	 * @param {string} header The encoded header name to set.
	 * @param {string} value The value to set the header to.
	 */
	public header(header: string, value: string): this
	/**
	 * @param {Record<string, string>} header An object of keys and values to set headers to.
	 */
	public header(header: Record<string, string>): this
	public header(header: string | Record<string, string>, value?: string): this {
		// eslint-disable-next-line max-len
		if (typeof header === "object") {
			const keys = Object.keys(header);
			let len = keys.length;
			// eslint-disable-next-line no-plusplus
			while (len--) {
				const val = keys[len];
				this.reqHeaders[val.toLowerCase()] = header[val];
			}
		} else this.reqHeaders[header.toLowerCase()] = value;

		return this;
	}

	/**
	 * @param {HTTPMethod} method The HTTP method to change the request to.
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
	 * @see [Undici Agent documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md)
	 */
	public option(key: Options): this
	/**
	 * @template T
	 * @param {*} key The agent options key to set.
	 * @param {*} value The value to set the agent option to (type checked).
	 * @see [Undici Agent documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md)
	 */
	public option<T extends keyof Options>(key: T, value: Options[T]): this
	public option<T extends keyof Options>(key: T | Options, value?: Options[T]) {
		if (typeof key === "object") Object.assign(this.coreOptions, key);
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
	 * @return {@link PetitioRequest} The response object.
	 * @throws {@link RequestAbortedError} Thrown when the request is aborted via
	 * the abort controller.
	 * @throws {@link ClientDestroyedError} Thrown when you attempt to use an
	 * already destroyed Undici client to make another request.
	 * @throws {@link ClientClosedError} Thrown when you attempt to use an
	 * already closed Undici client to make another request.
	 * @throws {@link HeadersTimeoutError} Thrown when request headers were not
	 * received before the timeout expired.
	 * @throws {@link BodyTimeoutError} Thrown when the request body was not
	 * received before the timeout expired.
	 */
	public send(): Promise<PetitioResponse> {
		return new Promise((resolve, reject) => {
			const options: DispatchOptions = {
				origin: this.url.origin,
				path: this.url.pathname + this.url.search,
				method: this.httpMethod,
				headers: this.reqHeaders,
				body: this.data
				// TODO(doge): implement "idempotent" retry logic
			};

			const dispatcher = this.kDispatch ?? new Client(this.url.origin, this.coreOptions);

			const res: PetitioResponse = new PetitioResponse();
			const data: Uint8Array[] | Buffer[] = [];

			dispatcher.dispatch(options, {
				// @ts-expect-error: Undici mandates erroneous return typing
				onData: (buff: Buffer) => (data[data.length] = buff),
				onError: (err: Error) => reject(err),
				onComplete: () => {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare, eqeqeq
					if (this.keepDispatcher == false) void dispatcher.close();
					res._addBody(data);
					resolve(res);
				},
				onConnect: () => null,
				// @ts-ignore: Undici types are incorrect
				onHeaders: (statusCode: number, headers: Buffer[], resume: () => void) => {
					resume();
					res.statusCode = statusCode;
					res._parseHeaders(headers);
				}
			});
		});
	}
}
