import * as http from "http";
import fs from "fs";
import path from "path";
let body;
if (process.env.BODY === "large") body = fs.readFileSync(path.resolve("benchmarks/large.txt")).toString();
else body = "ok";


http.createServer((_req, response) => response.end(body)).listen(8080, () => console.log("online!"));
