// Very minimal class concatenation, inspired by clsx.
export default function clsx(...args) {
	return args.filter((entry) => Boolean(entry)).join(" ");
}
