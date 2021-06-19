import { Worker, isMainThread } from "worker_threads";
import { cpus } from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "uWebSockets.js";
import { readFile } from "fs/promises";

process.env.UV_THREADPOOL_SIZE = cpus().length;

const filename = fileURLToPath(import.meta.url);
const largeData = (await readFile(`${dirname(filename)}/large.txt`)).toString();

if (isMainThread) cpus().forEach(() => {new Worker(filename)});
else pkg.App()
	.get("/ok", (res) => {
		res.writeHeader("Content-Type", "text/plain");
		res.end("ok");
	})
	.get("/large", (res) => {
		res.writeHeader("Content-Type", "text/plain");
		res.end(largeData);
	})
	.get("/*", (res) => {
		res.end();
	})
	.listen("127.0.0.1", 8080, (sock) => console.log(sock, " active."));
