import CentraRequest, { HTTPMethod } from './lib/CentraRequest';
import CentraResponse from './lib/CentraResponse';
module.exports = (url: URL | string, method: HTTPMethod = 'GET') => new CentraRequest(url, method);
export { CentraRequest, CentraResponse };
