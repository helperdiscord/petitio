import { build } from "esbuild";
await build({
	bundle: true,
	entryPoints: ["./src/index.ts"],
	external: ["_http_common", "undici"],
	format: "cjs",
	outfile: "./dist/index.js",
	platform: "node",
	target: "es2020",
	tsconfig: "tsconfig.json",
	minify: true
});
