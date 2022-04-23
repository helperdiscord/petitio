/**
 * @module Petitio
 */
import { type HTTPMethod, PetitioRequest } from "./lib/PetitioRequest";
import type { URL } from "node:url";

/**
 * @param {(string | URL)} url The URL to start composing a request for.
 * @param {HTTPMethod} [method="GET"] The HTTP method to use.
 * @return {PetitioRequest} The Petitio request instance for your URL.
 * @see [[PetitioRequest.constructor]]
 */
export = function petitio(url: URL | string, method: HTTPMethod = "GET") {
	return new PetitioRequest(url, method);
}
