import { URL as NURL } from "url";
import { PetitioRequest } from "../src/lib/PetitioRequest";
import { PetitioResponse } from "../src/lib/PetitioResponse";

describe("PetitioResponse", () => {
	describe("JSON", () => {
		test("GET JSON data FROM https://jsonplaceholder.typicode.com/posts/1 STRING", async () => {
			expect.assertions(1);
			const URL = "https://jsonplaceholder.typicode.com/posts/1";
			const RESPONSE = {
				userId: 1,
				id: 1,
				title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				// eslint-disable-next-line max-len
				body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
			};

			const request = new PetitioRequest(URL);
			const response = await request.json();

			expect(response).toEqual(RESPONSE);
		});

		test("GET JSON data FROM https://jsonplaceholder.typicode.com/posts/1 URL", async () => {
			expect.assertions(1);
			const URL = new NURL("https://jsonplaceholder.typicode.com/posts/1");
			const RESPONSE = {
				userId: 1,
				id: 1,
				title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				// eslint-disable-next-line max-len
				body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
			};

			const request = new PetitioRequest(URL);
			const response = await request.json();

			expect(response).toEqual(RESPONSE);
		});
	});
	describe("Building Response", () => {
		const data = { hi: "hello" };
		const buffer = Buffer.from(JSON.stringify(data));

		test("ADDING BUFFER TO RESPONSE", () => {
			const res = new PetitioResponse();
			res._addBody([buffer]);

			const final = res.json();

			expect(final).toEqual(data);
		});
	});
	describe("TEXT", () => {
		const text = "hi";
		const buffer = Buffer.from(text);
		test("TEXT", () => {
			const res = new PetitioResponse();
			res._addBody([buffer]);

			const final = res.text();

			expect(final).toEqual(text);
		});
	});

	describe("TEXT WITH ENCODING", () => {
		const text = "hi";
		const buffer = Buffer.from(text);
		const encoded = buffer.toString("base64");
		test("BASE64", () => {
			const res = new PetitioResponse();
			res._addBody([buffer]);

			const final = res.text("base64");

			expect(final).toEqual(encoded);
		});
	});
});
