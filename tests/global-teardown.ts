export default function globalTeardown() {
	// @ts-expect-error: Jest & Node type merging creates conflict
	global.__SERVER__.close();
}
