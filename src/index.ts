import { HTTPMethod, PetitioRequest } from "./lib/PetitioRequest";
import { URL } from "url";

/**
 * @param {(URL | string)} url
 * @param {HTTPMethod} [method='GET']
 */
export = function petitio(url: URL | string, method: HTTPMethod = "GET") {
	return new PetitioRequest(url, method);
}
