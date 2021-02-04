import { CentraRequest, HTTPMethod } from './lib/CentraRequest';
/**
 *
 *
 * @param {(URL | string)} url
 * @param {HTTPMethod} [method='GET']
 */
export = (url: URL | string, method: HTTPMethod = 'GET') => new CentraRequest(url, method);;
