import { CentraRequest, HTTPMethod } from './lib/CentraRequest';
import { URL } from 'url';
/**
 *
 *
 * @param {(URL | string)} url
 * @param {HTTPMethod} [method='GET']
 */
export = (url: URL | string, method: HTTPMethod = 'GET') => new CentraRequest(url, method);;
