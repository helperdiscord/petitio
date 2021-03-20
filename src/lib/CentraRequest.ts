import { join } from 'path';
import http, { ClientRequest, IncomingMessage } from 'http';
import https, { RequestOptions } from 'https';
import { stringify } from 'querystring';
import { URL } from 'url';
import { CentraResponse } from './CentraResponse';
import 'undici';
export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export class CentraRequest {
	public url: URL;
	public data: string | Buffer | null = null;
	public sendDataAs: 'form' | 'json' | 'buffer' | null = null;
	public reqHeaders: { [header: string]: string } = {};
	public coreOptions: RequestOptions = {};

	/**
	 * Creates an instance of CentraRequest.
	 * @param {(string | URL)} url
	 * @param {HTTPMethod} [httpMethod='GET']
	 * @memberof CentraRequest
	 */
	constructor(url: string | URL, public httpMethod: HTTPMethod = 'GET') {
		this.url = typeof url === 'string' ? new URL(url) : url;

		return this;
	}

	/**
	 *
	 *
	 * @param {string} key
	 * @param {*} value
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public query(key: string, value: any): this {
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
	 * @param {number} timeout
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public timeout(timeout: number): this {
		this.coreOptions.timeout = timeout;

		return this;
	}

	/**
	 *
	 *
	 * @template T
	 * @param {T} key
	 * @param {RequestOptions[T]} value
	 * @return {*}  {this}
	 * @memberof CentraRequest
	 */
	public option<T extends keyof RequestOptions>(key: T, value: RequestOptions[T]): this {
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

			const options = {
				protocol: this.url.protocol,
				host: this.url.hostname,
				port: this.url.port,
				path: this.url.pathname + this.url.search,
				method: this.httpMethod,
				headers: this.reqHeaders,
				...this.coreOptions
			};

			let req: ClientRequest;

			const resHandler = (res: IncomingMessage) => {
				let stream = res;

				const centraRes = new CentraResponse(res);

				stream.on('error', (err: Error) => {
					reject(err);
				});

				stream.on('aborted', () => {
					reject(new Error('Server aborted request'))
				})

				stream.on('data', (chunk: any) => {
					centraRes._addChunk(chunk);
				});

				stream.on('end', () => {
					resolve(centraRes);
				});
			};

			if (this.url.protocol === 'http:') req = http.request(options, resHandler);

			else if (this.url.protocol === 'https:') req = https.request(options, resHandler);

			else throw new Error(`Bad URL protocol: ${this.url.protocol}`);

			req.on('error', (err: Error) => {
				reject(err);
			});

			if (this.data) {
				req.write(this.data);
			}
			req.end();

		});
	}
}
