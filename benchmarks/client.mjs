import Benchmark from "benchmark";
import pkg from "undici";
import req from "../dist/index.mjs";

const { Client } = pkg;

Benchmark.options.minSamples = 200;
const suite = new Benchmark.Suite();

const url1 = new URL("http://127.0.0.1:8080");
const client1 = new Client(url1);

const url2 = new URL("http://127.0.0.1:8081");
const client2 = new Client(url2);

setTimeout(() => null, 2500);

const defer = {"defer": true};

suite
	.add("petitio", async (deferred) => {
		await req(url1)
			.client(client1, true)
			.send();
		deferred.resolve();
	}, defer)
	.add("petitio - large body", async (deferred) => {
		await req(url2)
			.client(client2, true)
			.send();
		deferred.resolve();
	}, defer)
	.on("cycle", (event) => {
		console.log(String(event.target));
	})
	.on("complete", () => {
		process.kill(process.pid, "SIGINT");
	})
	.run();

