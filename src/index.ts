import { CentraRequest, HTTPMethod } from './lib/CentraRequest';
/**
 *
 *
 * @param {(URL | string)} url
 * @param {HTTPMethod} [method='GET']
 */
const req = (url: URL | string, method: HTTPMethod = 'GET') => new CentraRequest(url, method);

// @ts-ignore
export = req;
export * from './lib/CentraRequest';
export * from './lib/CentraResponse';
