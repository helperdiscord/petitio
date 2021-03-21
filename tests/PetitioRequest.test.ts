/* eslint-disable @typescript-eslint/naming-convention */
import { PetitioRequest } from "../src/lib/PetitioRequest";

// eslint-disable-next-line
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

		const bodyString = JSON.stringify(body);

		test("CHECK THAT passed body MATCH RECIEVED stringified body", () => {
			expect.assertions(1);

			const URL = "https://postman-echo.com/get";

			const request = new PetitioRequest(URL);
			const response = request
				.body(body);

			expect(response.data).toEqual(bodyString);
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
});
