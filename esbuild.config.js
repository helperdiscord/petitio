// eslint-disable-next-line 
const esbuild = require("esbuild");

esbuild.build({
	bundle: true,
	entryPoints: ["./src/index.ts"],
	format: "cjs",
	minify: true,
	outfile: "./dist/index.js",
	platform: "node",
	tsconfig: "tsconfig.json"
}).catch(() => process.exit(1));
