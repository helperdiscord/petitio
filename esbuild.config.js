// eslint-disable-next-line
const esbuild = require("esbuild");

esbuild.build({
	bundle: true,
	entryPoints: ["./src/index.ts"],
	external: ["_http_common"],
	format: "cjs",
	minify: true,
	outfile: "./dist/index.js",
	platform: "node",
	target: "node14",
	tsconfig: "tsconfig.json"
}).catch((err) => {
	throw (err);
});
