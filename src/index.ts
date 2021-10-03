/**
 * @module Petitio
 */
import { HTTPMethod, PetitioRequest } from "./lib/PetitioRequest";
import { PetitioResponse } from "./lib/PetitioResponse";
import { URL } from "url";

/**
 * @param {(string | URL)} url The URL to start composing a request for.
 * @param {HTTPMethod} [method="GET"] The HTTP method to use.
 * @return {PetitioRequest} The Petitio request instance for your URL.
 * @see [[PetitioRequest.constructor]]
 */
// @ts-ignore typescript is technically right that this shouldn't exist but it is the only export of a useable class, whereas the rest are for easy of use type-wise
export = function petitio(url: URL | string, method: HTTPMethod = "GET"): PetitioRequest {
	return new PetitioRequest(url, method);
}

export { HTTPMethod, PetitioRequest, PetitioResponse };
