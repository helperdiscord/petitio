import { join } from 'path';
import { stringify } from 'querystring';
import { URL } from 'url';
import { CentraResponse } from './CentraResponse';
import type { IncomingHttpHeaders } from 'http'
import Client from 'undici/lib/core/client';
import type ClientType from 'undici/types/client';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export class CentraRequest {
	public url: URL;
	public data: string | Buffer | null = null;
	public sendDataAs: 'form' | 'json' | 'buffer' | null = null;
	public reqHeaders: IncomingHttpHeaders = {};
	public coreOptions: ClientType.Options = {};
	public timeoutOptions: { bodyTimeout?: number, headersTimeout?: number, keepAliveTimeout?: number } = {};
	public kClient?: Client;
	public keepClient?: boolean;

	/**
	 * Creates an instance of CentraRequest.
	 * @param {(string | URL)} url
	 * @param {HTTPMethod} [httpMethod='GET']
	 * @memberof CentraRequest
	 */
	constructor(url: string | URL, public httpMethod: HTTPMethod = 'GET') {
		this.url = typeof url === 'string' ? new URL(url) : url;

		if (!['http:', 'https:'].includes(this.url.protocol)) throw new Error(`Bad URL protocol: ${this.url.protocol}`);

		return this;
	}

	/**
	 *
	 *
	 * @param {Client} client
	 * @param {boolean} [keepAlive]
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public client(client: Client, keepAlive?: boolean): this {
		this.kClient = client;

		if (keepAlive) this.keepClient = true;

		return this;
	}

	/**
	 *
	 *
	 * @param {(string | object)} key
	 * @param {*} value
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public query(key: string | object, value: any): this {
		if (typeof key === 'object') {
			Object.keys(key).forEach((queryKey: string) => {
				this.url.searchParams.append(queryKey, key[queryKey]);
			});
		} else {
			this.url.searchParams.append(key, value);
		}

		return this;
	}

	/**
	 *
	 *
	 * @param {string} relativePath
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public path(relativePath: string): this {
		this.url.pathname = join(this.url.pathname, relativePath);

		return this;
	}

	/**
	 *
	 *
	 * @param {*} data
	 * @param {('json' | 'buffer' | 'form')} [sendAs]
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public body(data: any, sendAs?: 'json' | 'buffer' | 'form'): this {
		this.sendDataAs = typeof data === 'object' && !sendAs && !Buffer.isBuffer(data) ? 'json' : sendAs ? sendAs.toLowerCase() as 'buffer' | 'json' | 'form' : 'buffer';
		this.data = this.sendDataAs === 'form' ? stringify(data) : this.sendDataAs === 'json' ? JSON.stringify(data) : data;

		return this;
	}

	/**
	 *
	 *
	 * @param {(string | { [k: string]: string })} header
	 * @param {string} [value]
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public header(header: string | { [k: string]: string }, value?: string): this {
		if (typeof header === 'object') {
			Object.keys(header).forEach(headerName => {
				this.reqHeaders[headerName.toLowerCase()] = header[headerName];
			});
		} else {
			this.reqHeaders[header.toLowerCase()] = value;
		}

		return this;
	}

	/**
	 *
	 *
	 * @param {HTTPMethod} method
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public method(method: HTTPMethod): this {
		this.httpMethod = method;

		return this;
	}

	/**
	 *
	 *
	 * @param {(number | string)} timeout
	 * @param {number} [time]
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public timeout(timeout: number | string, time?: number): this {
		if (typeof timeout === 'string') {
			this.timeoutOptions[timeout] = time;
		} else {
			this.timeoutOptions.bodyTimeout = timeout;
		}

		return this;
	}

	/**
	 *
	 *
	 * @template T
	 * @param {T} key
	 * @param {ClientType.Options[T]} value
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public option<T extends keyof ClientType.Options>(key: T, value: ClientType.Options[T]): this {
		this.coreOptions[key] = value

		return this
	}

	/**
	 *
	 *
	 * @return {*}  {Promise<any>}
	 * @memberof CentraRequest
	 */
	async json<T = any>(): Promise<T> {
		const res = await this.send();
		return res.json<T>();
	}

	/**
	 *
	 *
	 * @return {*}  {Promise<Buffer>}
	 * @memberof CentraRequest
	 */
	async raw(): Promise<Buffer> {
		const res = await this.send();
		return res.body;
	}

	/**
	 *
	 *
	 * @return {*}  {Promise<string>}
	 * @memberof CentraRequest
	 */
	async text(): Promise<string> {
		const res = await this.send();
		return res.text();
	}
	/**
	 *
	 *
	 * @return {*}  {Promise<CentraResponse>}
	 * @memberof CentraRequest
	 */
	public send(): Promise<CentraResponse> {
		return new Promise((resolve, reject) => {
			if (this.data) {
				if (!this.reqHeaders.hasOwnProperty('content-type') && ['json', 'form'].includes(this.sendDataAs)) this.reqHeaders['content-type'] = this.sendDataAs === 'json' ? 'application/json' : 'application/x-www-form-urlencoded';

				if (!this.reqHeaders.hasOwnProperty('content-length')) this.reqHeaders['content-length'] = Buffer.byteLength(this.data) as unknown as string;
			}

			const options: Client.RequestOptions = {
				path: this.url.pathname + this.url.search,
				method: this.httpMethod,
				headers: this.reqHeaders,
				body: this.data
			};

			const client = this.kClient ?? new Client(this.url.origin, this.coreOptions);

			let centraRes: CentraResponse = new CentraResponse();

			client.dispatch(options, {
				onData: ((data: Buffer) => {
					return void centraRes._addChunk(data);

				}),
				onError: ((err: Error) => reject(err)),
				onComplete: () => {
					if (!this.keepClient) client.close();
					resolve(centraRes)
				},
				onConnect: () => { },
				onHeaders: (statusCode: number, headers: string[], resume: () => void) => {
					centraRes.statusCode = statusCode;
					for (let i = 0; i < headers.length; i += 2) {
						const key = headers[i].toLowerCase()
						let val = centraRes.headers[key.toString()]
						if (!val) {
							centraRes.headers[key] = headers[i + 1]
						} else {
							if (!Array.isArray(val)) {
								val = [val]
								centraRes.headers[key] = val
							}
							val.push(headers[i + 1])
						}
					}
					return void resume();
				}
			})
		});
	}
}
