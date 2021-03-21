import Client from "undici/lib/core/client";
import type ClientType from "undici/types/client";
import type { IncomingHttpHeaders } from "http";
import { PetitioResponse } from "./PetitioResponse";
import { URL } from "url";
import { join } from "path";
import { stringify } from "querystring";

export type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export class PetitioRequest {
	public url: URL;
	public data: string | Buffer | null = null;
	public reqHeaders: IncomingHttpHeaders = {};
	public coreOptions: ClientType.Options = {};
	public timeoutOptions: { bodyTimeout?: number, headersTimeout?: number, keepAliveTimeout?: number } = {};
	public kClient?: Client;
	public keepClient?: boolean;

	/**
	 * Creates an instance of PetitioRequest.
	 * @param {(string | URL)} url
	 * @param {HTTPMethod} [httpMethod='GET']
	 * @memberof PetitioRequest
	 */
	public constructor(url: string | URL, public httpMethod: HTTPMethod = "GET") {
		this.url = typeof url === "string" ? new URL(url) : url;
		if (!["http:", "https:"].includes(this.url.protocol)) throw new Error(`Bad URL protocol: ${this.url.protocol}`);
	}

	/**
	 * @param {Client} client
	 * @param {boolean} [keepAlive]
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public client(client: Client, keepAlive?: boolean): this {
		this.kClient = client;
		if (keepAlive) this.keepClient = true;

		return this;
	}

	/**
	 * @param {(string | object)} key
	 * @param {*} value
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public query(key: string | Record<string, any>, value: any): this {
		if (typeof key === "object") Object.keys(key).forEach((query) => {
			this.url.searchParams.append(query, key[query]);
		});
		else this.url.searchParams.append(key, value);

		return this;
	}

	/**
	 * @param {string} relativePath
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public path(relativePath: string): this {
		this.url.pathname = join(this.url.pathname, relativePath);

		return this;
	}

	/**
	 * @param {*} data
	 * @param {('json' | 'buffer' | 'form')} [sendAs]
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public body(data: any, sendAs?: "json" | "form"): this {
		if (!sendAs && Buffer.isBuffer(data)) this.data = data;
		else if (sendAs === "json" || (typeof data === "object" && !Buffer.isBuffer(data))) {
			this.reqHeaders["content-type"] = "application/json";
			this.data = JSON.stringify(data);
		} else if (sendAs === "form") {
			this.reqHeaders["content-type"] = "application/x-www-form-urlencoded";
			this.data = stringify(data);
		}
		this.reqHeaders["content-length"] = Buffer.byteLength(this.data).toString();

		return this;
	}

	/**
	 * @param {(string | { [k: string]: string })} header
	 * @param {string} [value]
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public header(header: string | { [k: string]: string }, value?: string): this {
		if (typeof header === "object") Object.keys(header).forEach((headerName) => {
			this.reqHeaders[headerName.toLowerCase()] = header[headerName];
		});
		else this.reqHeaders[header.toLowerCase()] = value;


		return this;
	}

	/**
	 * @param {HTTPMethod} method
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public method(method: HTTPMethod): this {
		this.httpMethod = method;

		return this;
	}

	/**
	 * @param {(number | string)} timeout
	 * @param {number} [time]
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public timeout(timeout: number | string, time?: number): this {
		if (typeof timeout === "string") this.timeoutOptions[timeout] = time;
		else this.timeoutOptions.bodyTimeout = timeout;

		return this;
	}

	/**
	 * @template T
	 * @param {T} key
	 * @param {ClientType.Options[T]} value
	 * @return {*}  {this}
	 * @memberof PetitioRequest
	 */
	public option<T extends keyof ClientType.Options>(key: T, value: ClientType.Options[T]): this {
		this.coreOptions[key] = value;

		return this;
	}

	/**
	 * @return {*}  {Promise<any>}
	 * @memberof PetitioRequest
	 */
	public async json<T = any>(): Promise<T> {
		const res = await this.send();
		return res.json<T>();
	}

	/**
	 * @return {*}  {Promise<Buffer>}
	 * @memberof PetitioRequest
	 */
	public async raw(): Promise<Buffer> {
		const res = await this.send();
		return res.body;
	}

	/**
	 * @return {*}  {Promise<string>}
	 * @memberof PetitioRequest
	 */
	public async text(): Promise<string> {
		const res = await this.send();
		return res.text();
	}


	/**
	 * @return {*}  {Promise<PetitioResponse>}
	 * @memberof PetitioRequest
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
					for (let idx = 1; idx < headers.length; idx += 2) {
						const key = headers[idx - 1].toLowerCase();
						let val = res.headers[key.toString()];
						if (!val) res.headers[key] = headers[idx];
						else {
							if (!Array.isArray(val)) {
								val = [val];
								res.headers[key] = val;
							}
							val.push(headers[idx]);
						}
					}
					resume();
				}
			});
		});
	}
}
