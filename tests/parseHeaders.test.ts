import { PetitioResponse } from "../src/lib/PetitioResponse";

describe("parseHeaders", () => {
	describe("run", () => {
		test("parsed headers array SHOULD match header object", () => {
			const headersArray = ["a", "1", "b", "2", "c", "3"];
			const parsedHeaders = {"a": "1", "b": "2", "c": "3"};

			expect.assertions(1);

			const res = new PetitioResponse();
			res._parseHeaders(headersArray);

			expect(res.headers).toEqual(parsedHeaders);
		});

		test("IF overlapping headers THEN concatenate", () => {
			const headersArray = ["a", "1", "b", "2", "c", "3", "a", "4"];
			const parsedHeaders = {"a": ["1", "4"], "b": "2", "c": "3"};

			expect.assertions(1);

			const res = new PetitioResponse();
			res._parseHeaders(headersArray);

			expect(res.headers).toEqual(parsedHeaders);
		});

		test("IF headers exist THEN array / append", () => {
			const headersArray = ["b", "2", "c", "3", "a", "4"];
			const parsedHeaders = {"a": ["1", "4"], "b": "2", "c": "3"};

			expect.assertions(1);

			const res = new PetitioResponse();
			res.headers = {"a": "1"};
			res._parseHeaders(headersArray);

			expect(res.headers).toEqual(parsedHeaders);
		});
	});
});
