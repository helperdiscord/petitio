import path from 'path';
import http, { ClientRequest, IncomingMessage } from 'http';
import https, { RequestOptions } from 'https';
import qs from 'querystring';
import { URL } from 'url';

import CentraResponse from './CentraResponse';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export default class CentraRequest {
  public url: URL;
  public data: string | Buffer | null = null;
  public sendDataAs: 'form' | 'json' | 'buffer' | null = null;
  public reqHeaders: { [header: string]: string }
  public coreOptions: RequestOptions = {};

	constructor(url: string | URL, public httpMethod: HTTPMethod = 'GET') {
		this.url = typeof url === 'string' ? new URL(url) : url;

		return this;
	}

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

	public path(relativePath: string): this {
		this.url.pathname = path.join(this.url.pathname, relativePath);
    
		return this;
	}

	public body(data: any, sendAs?: 'json' | 'buffer' | 'form'): this {
		this.sendDataAs = typeof data === 'object' && !sendAs && !Buffer.isBuffer(data) ? 'json' : sendAs ? sendAs.toLowerCase() as 'buffer' | 'json' | 'form' : 'buffer';
		this.data = this.sendDataAs === 'form' ? qs.stringify(data) : this.sendDataAs === 'json' ? JSON.stringify(data) : data;

		return this;
	}

	public header(header: string | { [k: string]: string }, value?: string) {
		if (typeof header === 'object') {
			Object.keys(header).forEach(headerName => {
				this.reqHeaders[headerName.toLowerCase()] = header[headerName];
			});
		} else {
			this.reqHeaders[header.toLowerCase()] = value;
		}

		return this;
	}

	public method(method: HTTPMethod): this {
		this.httpMethod = method;

		return this;
	}

	public timeout(timeout: number): this {
		this.coreOptions.timeout = timeout;

		return this;
	}

	async json(): Promise<any> {
		const res = await this.send();
		return res.json;
	}

	async raw(): Promise<Buffer> {
		const res = await this.send();
		return res.body;
	}

	async text(): Promise<string> {
		const res = await this.send();
		return res.text;
	}

	public send(): Promise<CentraResponse> {
		return new Promise((resolve, reject) => {
			if (this.data) {
				if (!this.reqHeaders.hasOwnProperty('content-type')) {
					if (this.sendDataAs === 'json') this.reqHeaders['content-type'] = 'application/json';

					else if (this.sendDataAs === 'form') this.reqHeaders['content-type'] = 'application/x-www-form-urlencoded';
				}

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

			if (this.data) req.write(this.data);

			req.end();
		});
	}

};
