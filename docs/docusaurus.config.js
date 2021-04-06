/* eslint-disable max-len */
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: "Petitio",
	tagline: "Zero-dependency HTTP library designed to be simple, fast, and type-strong.",
	url: "https://helperdiscord.github.io/petitio",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "throw",
	i18n: {
		defaultLocale: "en-gb",
		locales: ["en-gb"]
	},
	favicon: "img/favicon.ico",
	organizationName: "helperdiscord",
	projectName: "petitio",
	plugins: [
		[
			"docusaurus-plugin-typedoc",
			{
				entryPoints: [
					"../src/index.ts",
					"../src/lib/PetitioRequest.ts",
					"../src/lib/PetitioResponse.ts"
				],
				tsconfig: "../tsconfig.json",
				out: "pkg"
			}
		]
	],
	themeConfig: {
		hideableSidebar: true,
		colorMode: {
			respectPrefersColorScheme: true
		},
		navbar: {
			hideOnScroll: true,
			title: "Petitio Docs",
			logo: {
				alt: "My Site Logo",
				src: "img/logo.svg"
			},
			items: [
				{
					to: "docs/",
					activeBasePath: "docs",
					label: "Docs",
					position: "left"
				},
				{
					to: "blog",
					label: "Blog",
					position: "left"
				},
				{
					type: "docsVersionDropdown",
					position: "right",
					dropdownItemsBefore: [],
					dropdownItemsAfter: [{to: "/versions", label: "All versions"}],
					dropdownActiveClassDisabled: true,
					docsPluginId: "default"
				},
				{
					type: "localeDropdown",
					position: "right",
					dropdownItemsBefore: [],
					dropdownItemsAfter: [{to: "https://github.com/helperdiscord/petitio/issues/14", label: "Help us translate!"}]
				},
				{
					href: "https://github.com/helperdiscord/petitio",
					label: "GitHub",
					position: "right"
				}
			]
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Getting Started",
							to: "docs/guides/getting-started"
						},
						{
							label: "API Reference",
							to: "docs/pkg/index"
						}
					]
				},
				{
					title: "More",
					items: [
						{
							label: "Blog",
							to: "blog"
						},
						{
							label: "GitHub",
							href: "https://github.com/helperdiscord/petitio"
						}
					]
				}
			],
			copyright: `Copyright © ${new Date().getFullYear()} helperdiscord. Built with Docusaurus and TypeDoc.`
		}
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					editUrl: "https://github.com/helperdiscord/petitio/edit/master/docs/docs/",
					editCurrentVersion: false,
					editLocalizedFiles: true,
					showLastUpdateTime: true
				},
				blog: {
					showReadingTime: true,
					editUrl: "https://github.com/helperdiscord/petitio/edit/master/docs/blog/",
					editLocalizedFiles: true
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css")
				}
			}
		]
	]
};
