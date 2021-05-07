import type { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { createServer } from "http";

const JSON_RESPONSE = JSON.stringify({
	id: 0,
	title: "in collaboration we trust",
	body: "melius simul quam solus"
});

function requestHandler(
	req: IncomingMessage,
	res: ServerResponse
) {
	const url = new URL(`http://${req.headers.host}${req.url || ""}`);
	switch (url.pathname) {
		case "/get-echo": {
			res.writeHead(200, req.headers);
			return res.end(JSON.stringify({
				args: Object.fromEntries(url.searchParams.entries()),
				headers: req.headers,
				url: url.href
			}));
		}
		case "/json-test": {
			res.writeHead(200, {
				"Content-Type": "application/json",
				"Content-Length": Buffer.byteLength(JSON_RESPONSE).toString()
			});
			return res.end(JSON_RESPONSE);
		}
		default: {
			res.writeHead(200);
			res.end("No command specified");
		}
	}
}

export default function globalSetup() {
	// @ts-expect-error: Jest & Node type merging creates conflict
	global.__SERVER__ = createServer(requestHandler);
	// @ts-expect-error: Jest & Node type merging creates conflict
	global.__SERVER__.listen(8080);
}
