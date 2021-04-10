import * as http from "http";
const body = "ok";


http.createServer((_req, response) => response.end(body)).listen(8080, () => console.log("online!"));
