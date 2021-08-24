import {
	App as createServer,
	us_listen_socket as uSocket,
	us_listen_socket_close as uSocketClose
} from "uWebSockets.js";
import { URL } from "url";

const JSON_RESPONSE = JSON.stringify({
	id: 0,
	title: "in collaboration we trust",
	body: "melius simul quam solus"
});

const socks: uSocket[] = [];

const server = createServer()
	.get("/get-echo", (res, req) => {
		const headers: [string, string][] = [];
		let query = req.getQuery();
		query = query ? `?${query}` : "";
		const url = new URL(`http://localhost:8080${req.getUrl()}${query}`);

		req.forEach((key, val) => {
			headers.push([key, val]);
			res.writeHeader(key, val);
		});

		res.end(JSON.stringify({
			args: Object.fromEntries(url.searchParams.entries()),
			headers,
			url: url.href
		}));
	})
	.get("/json-test", (res) => {
		res.writeHeader("Content-Type", "application/json");
		res.end(JSON_RESPONSE);
	})
	.get("/*", (res) => {
		res.end("No command specified");
	});

beforeAll(() => {
	server.listen(
		"127.0.0.1",
		8080 + Number(process.env.JEST_WORKER_ID),
		(sock) => socks.push(sock)
	);
});

afterAll(() => {
	for (const _i of socks) uSocketClose(socks.shift() as uSocket);
});
