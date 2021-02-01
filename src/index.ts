import CentraRequest, { HTTPMethod } from './lib/CentraRequest';
import CentraResponse from './lib/CentraResponse';

/**
 *
 *
 * @param {(URL | string)} url
 * @param {HTTPMethod} [method='GET']
 */
const req = (url: URL | string, method: HTTPMethod = 'GET') => new CentraRequest(url, method);
module.exports = req;
export { CentraRequest, CentraResponse };
