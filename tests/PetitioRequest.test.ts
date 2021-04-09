import { Client } from "undici";
import { URL as NURL } from "url";
import { PetitioRequest } from "../src/lib/PetitioRequest";
import { Readable } from "stream";
import qs from "querystring";

describe("PetitioRequest", () => {
	describe("Query Params", () => {
		const QS = [
			["test", "test1"],
			["test1", "test"]
		];
		const OQS = Object.fromEntries(QS);

		test("CHECK THAT passed query params MATCH RECIEVED query params object", async () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = await request
				.query("test", "test1")
				.query("test1", "test")
				.json() as { args: Record<string, string> };

			expect(response.args).toEqual(OQS);
		});

		test("CHECK THAT passed query params OBJECT MATCH RECIEVED query params object", async () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = await request
				.query(OQS)
				.json() as { args: Record<string, string> };

			expect(response.args).toEqual(OQS);
		});
	});

	describe("Body", () => {
		const body = { hi: "hello" };
		const text = "hi";

		const bodyString = JSON.stringify(body);
		const bodyString2 = qs.stringify(body);
		const bodyBuffer = Buffer.from(bodyString);

		// eslint-disable-next-line
		const bodyStream = Readable.from(text, {objectMode: false});

		test("CHECK THAT passed body MATCH RECIEVED stringified body", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = request
				.body(body);

			expect(response.data).toEqual(bodyString);
		});

		test("CHECK THAT passed body MATCH RECIEVED stringified body", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = request
				.body(body, "json");

			expect(response.data).toEqual(bodyString);
		});

		test("CHECK THAT passed stream MATCH RECIEVED passed body", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL)
				.body(bodyStream, "stream");

			expect(request.data).toEqual(bodyStream);
		});

		test("CHECK THAT passed form MATCH RECIEVED form body", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL)
				.body(bodyString2, "form");

			expect(request.reqHeaders["content-type"]).toEqual("application/x-www-form-urlencoded");
		});

		test("CHECK THAT buffer MATCH RECIEVED buffer", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL)
				.body(bodyBuffer);

			expect(request.reqHeaders["content-length"]).toEqual(Buffer.byteLength(bodyBuffer).toString());
		});
	});

	describe("Headers", () => {
		const h1 = { hi: "hello" };
		const h2 = Object.entries(h1)[0];

		test("CHECK THAT passed headers object MATCH RECIEVED reqHeaders object", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = request
				.header(h1);

			expect(response.reqHeaders).toEqual(h1);
		});

		test("CHECK THAT passed headers MATCH RECIEVED reqHeaders object", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = request
				.header(h2[0], h2[1]);

			expect(response.reqHeaders).toEqual(h1);
		});
	});
	describe("CLIENT", () => {
		const client = new Client("https://helper.wtf");
		const keepClient = true;
		test("CHECK THAT persistent client MATCHED SENT client", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.client(client);

			expect(req.kClient).toEqual(client);
		});

		test("CHECK THAT keep alive MATCHED SENT keepalive", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.client(client, keepClient);

			expect(req.keepClient).toEqual(keepClient);
		});
	});
	describe("PATH", () => {
		const path = "hi";
		test("CHECK THAT path MATCHED SENT path", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.path(path);

			expect(req.url.pathname).toEqual(`/${path}`);
		});
	});
	describe("METHOD", () => {
		const method = "POST";
		test("CHECK THAT post MATCHED SENT post", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.method(method);

			expect(req.httpMethod).toEqual(method);
		});
	});
	describe("TIMEOUT", () => {
		const timeout = 1000;
		const key = "bodyTimeout";
		test("CHECK THAT timeout MATCHED SENT timeout", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.timeout(timeout);

			expect(req.timeoutOptions.bodyTimeout).toEqual(timeout);
		});
		test("CHECK THAT timeout k/v MATCHED SENT timeout v", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.timeout(key, timeout);

			expect(req.timeoutOptions.bodyTimeout).toEqual(timeout);
		});
	});
	describe("OPTION", () => {
		const key = "pipelining";
		const val = 10;
		const options = { "pipelining": val };
		test("CHECK THAT key/val MATCHED SENT key/val", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.option(key, val);

			expect(req.coreOptions[key]).toEqual(val);
		});

		test("CHECK THAT k/v object MATCHED SENT k/v object", () => {
			const req = new PetitioRequest("https://helper.wtf")
				.option(options);

			expect(req.coreOptions[key]).toEqual(val);
		});
	});
	describe("RAW", () => {
		const obj = { test: "test1", test1: "test" };

		test("CHECK THAT passed json MATCH RECIEVED raw value", async () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = await request
				.query("test", "test1")
				.query("test1", "test")
				.raw();
			const json = JSON.parse(response.toString());
			expect(json.args).toEqual(obj);
		});
	});

	describe("TEXT", () => {
		const obj = { test: "test1", test1: "test" };

		test("CHECK THAT passed json MATCH RECIEVED text", async () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = await request
				.query("test", "test1")
				.query("test1", "test")
				.text();
			const json = JSON.parse(response);
			expect(json.args).toEqual(obj);
		});
	});

	describe("CONSTRUCTOR", () => {
		test("CHECK THAT passed url DIDNT MATCH ALLOWED protocols", () => {
			const URL = "wss://gateway.discord.gg";

			// eslint-disable-next-line func-style
			const func = () => {
				const request = new PetitioRequest(URL);
			};

			expect(func).toThrow("Bad URL protocol: wss:");
			expect(func).toThrow(Error);
		});
		test("CHECK THAT passed url DIDNT MATCH ALLOWED protocols", () => {
			const URL = new NURL("https://helper.wtf");

			const request = new PetitioRequest(URL);
			expect(request.url instanceof NURL).toBeTruthy();
		});
	});

	describe("SEND", () => {
		test("IF existing client THEN use existing", async () => {
			const client = new Client("https://helper.wtf");
			const spy = jest.spyOn(client, "dispatch");
			const URL = new NURL("https://helper.wtf");
			const request = await new PetitioRequest(URL)
				.client(client)
				.send();
			expect(spy).toHaveBeenCalledTimes(1);
		});
		test("IF invalid THEN rejects", () => {
			expect.assertions(1);
			const URL = new NURL("https://nothing.nowhere");

			return expect(new PetitioRequest(URL).send()).rejects.toThrow();
		});
	});
});
