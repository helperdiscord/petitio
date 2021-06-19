import { PetitioRequest } from "../src/lib/PetitioRequest";
import { PetitioResponse } from "../src/lib/PetitioResponse";

function url(host = "localhost:8080", method = "http") {
	return `${method}://${host}`;
}

describe("Response Parsing", () => {
	test("GIVEN json from request THEN parse", async () => {
		expect.assertions(1);

		const json = {
			id: 0,
			title: "in collaboration we trust",
			body: "melius simul quam solus"
		};
		const request = new PetitioRequest(url("localhost:8080/json-test"));
		const response = await request.json();

		expect(response).toEqual(json);
	});
});

describe("Response Formats", () => {
	const text = "hi";
	const buffer = Buffer.from(text);
	const encoded = buffer.toString("base64");

	test("GIVEN buffer THEN parse json", () => {
		expect.assertions(1);

		const data = { hi: "hello" };
		const buf = Buffer.from(JSON.stringify(data));
		const res = new PetitioResponse();
		res._addBody([buf]);
		const final = res.json();

		expect(final).toEqual(data);
	});

	test("GIVEN buffer THEN parse text", () => {
		expect.assertions(1);

		const res = new PetitioResponse();
		res._addBody([buffer]);
		const final = res.text();

		expect(final).toEqual(text);
	});

	test("GIVEN buffer THEN parse buffer", () => {
		expect.assertions(1);

		const res = new PetitioResponse();
		res._addBody([buffer]);
		const final = res.raw();

		expect(final).toEqual(buffer);
	});

	test("GIVEN buffer THEN parse encoded text", () => {
		expect.assertions(1);

		const res = new PetitioResponse();
		res._addBody([buffer]);
		const final = res.text("base64");

		expect(final).toEqual(encoded);
	});
});
