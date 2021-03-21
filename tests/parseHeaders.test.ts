import { PetitioResponse } from "../src/lib/PetitioResponse";
import { parseHeaders } from "../src/lib/PetitioRequest";
// eslint-disable-next-line
describe("parseHeaders", () => {
	describe("run", () => {
		const headersArray = ["a", "1", "b", "2", "c", "3"];
		const headersArray2 = ["a", "1", "b", "2", "c", "3", "a", "4"];
		const parsedHeaders = {
			"a": "1",
			"b": "2",
			"c": "3"
		};
		const parsedHeaders2 = {
			"a": ["1", "4"],
			"b": "2",
			"c": "3"
		};
		test("CHECK THAT passed headers array MATCH RECIEVED header object", () => {
			expect.assertions(1);

			const res = new PetitioResponse();
			parseHeaders(headersArray, res);

			expect(res.headers).toEqual(parsedHeaders);
		});

		test("CHECK THAT passed headers object MATCH RECIEVED header object", () => {
			expect.assertions(1);

			const res = new PetitioResponse();
			parseHeaders(headersArray2, res);

			expect(res.headers).toEqual(parsedHeaders2);
		});
	});
});
