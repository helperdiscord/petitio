import * as http from "http";
import fs from "fs";
import path from "path";
const body = fs.readFileSync(path.resolve("benchmarks/large.txt")).toString();


http.createServer((_req, response) => response.end(body)).listen(8081, () => console.log("online!"));
