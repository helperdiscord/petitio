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
			const headersArray2 = ["a", "1", "b", "2", "c", "3", "a", "4"];
			const parsedHeaders2 = {"a": ["1", "4"], "b": "2", "c": "3"};

			expect.assertions(1);

			const res = new PetitioResponse();
			res._parseHeaders(headersArray2);

			expect(res.headers).toEqual(parsedHeaders2);
		});
	});
});
