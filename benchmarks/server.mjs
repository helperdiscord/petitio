import { createServer } from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

// @ts-expect-error: the file is running as a module, import.meta is allowed
const largeData = (await readFile(`${dirname(fileURLToPath(import.meta.url))}/large.txt`)).toString();

function requestHandler(req, res) {
	switch (req.url) {
		case "/ok": {
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("ok");
			return;
		}
		case "/large": {
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end(largeData);
			return;
		}
		default: {
			res.end("No benchmark specified.");
		}
	}
}

createServer(requestHandler)
	.listen(8080, () => console.log("Awaiting requests."));
