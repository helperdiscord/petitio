import CentraRequest, { HTTPMethod } from './lib/CentraRequest';

export = (url: URL | string, method: HTTPMethod = 'GET') => new CentraRequest(url, method);
