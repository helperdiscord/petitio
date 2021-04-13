import { CycleLogger } from "@kludge-cs/bench-utils";
// @ts-expect-error: BenchmarkJS does not support ESM exports
import bench from "benchmark";
const { Suite } = bench;
// @ts-expect-error: TSC is not aware when petitio is built
import petitio from "../dist/index.mjs";
import undici from "undici";
const { Client } = undici;

const client = new Client("http://localhost:8080");
const defer = {"defer": true, "minSamples": 200};

new Suite()
	.add("petitio - base", async (deferred) => {
		await petitio("http://localhost:8080/ok")
			.client(client, true)
			.send();
		deferred.resolve();
	}, defer)
	.add("petitio - large body", async (deferred) => {
		await petitio("http://localhost:8080/large")
			.client(client, true)
			.send();
		deferred.resolve();
	}, defer)
	.on("cycle", (event) => console.log(event.target.toString()))
	.run({async: true});
