import CentraRequest, { HTTPMethod } from 'centra/src/lib/CentraRequest';

export = (url: URL | string, method: HTTPMethod) => new CentraRequest(url, method);;
