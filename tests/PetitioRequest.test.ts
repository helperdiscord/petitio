// eslint-disable-next-line node/no-extraneous-import
import { Agent, Client } from "undici";
import type { HTTPMethod, TimeoutOptions } from "../src/lib/PetitioRequest";
import AbortController from "node-abort-controller";
import { URL as NURL } from "url";
import { PetitioRequest } from "../src/lib/PetitioRequest";
import { Readable } from "stream";
import qs from "querystring";

function url(host = "localhost:8080", method = "http") {
	return `${method}://${host}`;
}

describe("Constructor", () => {
	test("GIVEN invalid protocol THEN THROW", () => {
		expect.assertions(2);

		function func() {
			return new PetitioRequest(url("localhost:8080", "wss"));
		}

		expect(func).toThrow("Bad URL protocol: wss:");
		expect(func).toThrow(Error);
	});

	test("GIVEN passed url string THEN use native url", () => {
		expect.assertions(2);

		const reqOne = new PetitioRequest(new NURL(url()));
		const reqTwo = new PetitioRequest(url());

		expect(reqOne.url instanceof NURL).toEqual(true);
		expect(reqTwo.url instanceof NURL).toEqual(true);
	});
});

describe("Abort Controller", () => {
	test("GIVEN passed controller THEN use controller", () => {
		expect.assertions(1);

		const controller = new AbortController();

		const request = new PetitioRequest(url()).signal(controller);

		expect(request.controller).toEqual(controller);
	});
});

describe("Undici Options", () => {
	const key = "pipelining";
	const val = 10;
	const options = { "pipelining": val };

	test("GIVEN undici option parameters THEN set options", () => {
		expect.assertions(1);

		const req = new PetitioRequest(url()).option(key, val);
		expect(req.coreOptions[key]).toEqual(val);
	});

	test("GIVEN undici options object THEN set options", () => {
		expect.assertions(1);

		const req = new PetitioRequest(url()).option(options);
		expect(req.coreOptions[key]).toEqual(val);
	});
});

describe("Undici Agent", () => {
	const client = new Agent({});

	test("GIVEN passed agent THEN set agent", () => {
		const req = new PetitioRequest(url()).dispatch(client);

		expect(req.kDispatch).toEqual(client);
	});

	test("IF keepalive passed THEN set agent persistence", () => {
		expect.assertions(1);

		const req = new PetitioRequest(url()).dispatch(client, true);

		expect(req.keepDispatcher).toEqual(true);
	});
});

describe("Undici Client", () => {
	const client = new Client(url());

	test("GIVEN passed client THEN set client", () => {
		const req = new PetitioRequest(url()).dispatch(client);

		expect(req.kDispatch).toEqual(client);
	});

	test("IF keepalive passed THEN set client persistence", () => {
		expect.assertions(1);

		const req = new PetitioRequest(url()).dispatch(client, true);

		expect(req.keepDispatcher).toEqual(true);
	});
});

describe("Request Body", () => {
	const body = { hi: "hello" };
	const text = "hi";
	const bodyString = JSON.stringify(body);
	const bodyBuffer = Buffer.from(bodyString);
	const bodyStream = Readable.from(text, {objectMode: false});

	test("GIVEN passed body string THEN set body / headers", () => {
		expect.assertions(3);

		const req = new PetitioRequest(url()).body(body);

		expect(req.data).toEqual(bodyString);
		expect(req.reqHeaders["content-type"]).toEqual("application/json");
		expect(req.reqHeaders["content-length"]).toEqual(Buffer.byteLength(bodyString).toString());
	});

	test("GIVEN passed explicit json body THEN set body / headers", () => {
		expect.assertions(3);

		const req = new PetitioRequest(url()).body(body, "json");

		expect(req.data).toEqual(bodyString);
		expect(req.reqHeaders["content-type"]).toEqual("application/json");
		expect(req.reqHeaders["content-length"]).toEqual(Buffer.byteLength(bodyString).toString());
	});

	test("GIVEN passed stream body THEN set body", () => {
		expect.assertions(3);

		const req = new PetitioRequest(url()).body(bodyStream, "stream");

		expect(req.data).toEqual(bodyStream);
		expect(req.reqHeaders["content-type"]).toBeUndefined();
		expect(req.reqHeaders["content-length"]).toBeUndefined();
	});

	test("GIVEN passed form body THEN set body / headers", () => {
		expect.assertions(3);

		const query = qs.stringify(body);
		const req = new PetitioRequest(url()).body(body, "form");

		expect(req.data).toEqual(query);
		expect(req.reqHeaders["content-type"]).toEqual("application/x-www-form-urlencoded");
		expect(req.reqHeaders["content-length"]).toEqual(Buffer.byteLength(query).toString());
	});

	test("GIVEN passed buffer body THEN set body / headers", () => {
		expect.assertions(2);

		const req = new PetitioRequest(url()).body(bodyBuffer);

		expect(req.data).toEqual(bodyBuffer);
		expect(req.reqHeaders["content-type"]).toBeUndefined();
	});
});

describe("Query Parameters", () => {
	const QS = [
		["test", "test1"],
		["test1", "test"]
	];
	const OQS = Object.fromEntries(QS);

	test("GIVEN query param pair THEN transmit query", async () => {
		expect.assertions(1);

		const request = new PetitioRequest(url("localhost:8080/get-echo"));
		const response = await request
			.query("test", "test1")
			.query("test1", "test")
			.json<{ args: Record<string, string> }>();

		expect(response.args).toEqual(OQS);
	});

	test("GIVEN query params object THEN transmit query", async () => {
		expect.assertions(1);

		const request = new PetitioRequest(url("localhost:8080/get-echo"));
		const response = await request
			.query(OQS)
			.json<{ args: Record<string, string> }>();

		expect(response.args).toEqual(OQS);
	});
});

describe("Request Headers", () => {
	const h1 = { hi: "hello" };
	const h2 = Object.entries(h1)[0];

	test("GIVEN headers object THEN set headers", () => {
		expect.assertions(1);

		const request = new PetitioRequest(url()).header(h1);

		expect(request.reqHeaders).toEqual(h1);
	});

	test("GIVEN header pair THEN set headers", () => {
		expect.assertions(1);

		const request = new PetitioRequest(url()).header(h2[0], h2[1]);

		expect(request.reqHeaders).toEqual(h1);
	});
});


describe("URL", () => {
	test("GIVEN method path THEN set path", () => {
		expect.assertions(1);

		const path = "test";
		const req = new PetitioRequest(url())
			.path(path);

		expect(req.url.pathname).toEqual(`/${path}`);
	});

	test("GIVEN constructor path THEN set path", () => {
		expect.assertions(1);

		const path = "test";
		const req = new PetitioRequest(url(`localhost:8080/${path}`));

		expect(req.url.pathname).toEqual(`/${path}`);
	});

	test("GIVEN method THEN set method", () => {
		expect.assertions(18);

		const methods: HTTPMethod[] = [
			"GET",
			"HEAD",
			"POST",
			"OPTIONS",
			"PUT",
			"DELETE",
			"TRACE",
			"CONNECT",
			"PATCH"
		];
		for (const method of methods) {
			const reqOne = new PetitioRequest(url()).method(method);
			const reqTwo = new PetitioRequest(url(), method);

			expect(reqOne.httpMethod).toEqual(method);
			expect(reqTwo.httpMethod).toEqual(method);
		}
	});
});

describe("Timeout", () => {
	const timeout = 1000;

	test("GIVEN timeout AND no method THEN use body timeout", () => {
		expect.assertions(1);

		const req = new PetitioRequest(url())
			.timeout(timeout);

		expect(req.timeoutOptions.bodyTimeout).toEqual(timeout);
	});

	test("GIVEN timeout AND method THEN use timeout pair", () => {
		expect.assertions(3);

		const timeouts: Array<keyof TimeoutOptions> = [
			"bodyTimeout",
			"headersTimeout",
			"keepAliveTimeout"
		];

		for (const timeoutKey of timeouts) {
			const req = new PetitioRequest(url()).timeout(timeoutKey, timeout);

			expect(req.timeoutOptions[timeoutKey]).toEqual(timeout);
		}
	});
});

describe("Sending", () => {
	const obj = { test: "test1", test1: "test" };

	test("GIVEN passed json THEN MATCH received raw", async () => {
		expect.assertions(1);

		const response = await new PetitioRequest(url("localhost:8080/get-echo"))
			.query("test", "test1")
			.query("test1", "test")
			.raw();
		const json = JSON.parse(response.toString());
		expect(json.args).toEqual(obj);
	});

	test("GIVEN passed json THEN MATCH received text", async () => {
		expect.assertions(1);

		const response = await new PetitioRequest("http://localhost:8080/get-echo")
			.query("test", "test1")
			.query("test1", "test")
			.text();

		const json = JSON.parse(response);
		expect(json.args).toEqual(obj);
	});

	test("GIVEN passed json THEN MATCH received text", async () => {
		expect.assertions(1);

		const res = await new PetitioRequest("http://localhost:8080/get-echo")
			.query("test", "test1")
			.query("test1", "test")
			.json();

		expect(res.args).toEqual(obj);
	});

	test("IF existing client THEN use existing", async () => {
		expect.assertions(1);

		const client = new Agent({});
		const spy = jest.spyOn(client, "dispatch");

		await new PetitioRequest(url())
			.dispatch(client)
			.send();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("IF invalid THEN THROW", () => {
		expect.assertions(1);
		const URL = new NURL("http://nothing.nowhere");

		return expect(new PetitioRequest(URL).send()).rejects.toThrow();
	});
});
