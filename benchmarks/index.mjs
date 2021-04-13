import { spawn } from "child_process";
const server = spawn("node", ["benchmarks/server.mjs"]);
const client = spawn("node", ["benchmarks/client.mjs"]);

client.stdout.on("data", (data) => console.log(data.toString()));
client.on("error", (err) => console.error(err));
server.on("error", (err) => console.error(err));

client.on("exit", () => server.kill("SIGKILL"));
