import bench from "benchmark";
import petitio from "../dist/index.mjs";
import undici from "undici";

const client = new undici.Client("http://localhost:8080");
const defer = {"defer": true, "minSamples": 200};

new bench.Suite()
	.add("petitio - base", async (deferred) => {
		await petitio("http://localhost:8080/ok")
			.dispatch(client, true)
			.send();
		deferred.resolve();
	}, defer)
	.add("petitio - large body", async (deferred) => {
		await petitio("http://localhost:8080/large")
			.dispatch(client, true)
			.send();
		deferred.resolve();
	}, defer)
	.on("cycle", (event) => console.log(event.target.toString()))
	.run({async: true});
