import CentraRequest, { HTTPMethod } from './lib/CentraRequest';

export = (url: URL | string, method: HTTPMethod) => new CentraRequest(url, method);;
