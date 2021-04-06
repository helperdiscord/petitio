module.exports = {
	docs: [
		{
			type: "category",
			label: "Guides",
			items: [
				"guides/getting-started"
			]
		},
		{
			type: "category",
			label: "API Reference",
			items: require("./typedoc-sidebar")
		}
	]
};
