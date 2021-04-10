import { spawn } from "child_process";
const client = spawn("node", ["benchmarks/client.mjs"]);
const server1 = spawn("node", ["benchmarks/server1.mjs"]);
const server2 = spawn("node", ["benchmarks/server2.mjs"]);
client.on("exit", () => {
	server1.kill("SIGINT");
	server2.kill("SIGINT");
});
client.stdout.on("data", (data) => {
	console.log(data.toString());
});

client.on("error", (err) => {
	console.error(err);
});
server1.on("error", (err) => {
	console.error(err);
});
server2.on("error", (err) => {
	console.error(err);
});
