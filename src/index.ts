/**
 * @module Petitio
 */
import { HTTPMethod, PetitioRequest } from "./lib/PetitioRequest";
import { URL } from "url";

/**
 * @param {(string | URL)} url The URL to start composing a request for.
 * @param {HTTPMethod} [method="GET"] The HTTP method to use.
 * @return {PetitioRequest} The Petitio request instance for your URL.
 * @see [[PetitioRequest.constructor]]
 */
// @ts-ignore Typescript is wrong
export = function petitio(url: URL | string, method: HTTPMethod = "GET"): PetitioRequest {
	return new PetitioRequest(url, method);
}

export { HTTPMethod };
