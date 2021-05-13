/* eslint-disable node/no-unpublished-require */
module.exports = {
	docs: [
		{
			type: "category",
			label: "Guides",
			items: [
				"guides/getting-started",
				"guides/basic-examples"
			]
		},
		{
			type: "category",
			label: "Metrics",
			items: [
				"metrics/performance"
			]
		},
		{
			type: "category",
			label: "API Reference",
			items: require("./typedoc-sidebar")
		}
	]
};
