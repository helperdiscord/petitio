/* eslint-disable node/no-missing-import */
import Version, { VersionTable } from "../components/version";
import { useLatestVersion, useVersions } from "@theme/hooks/useDocs";
import Layout from "@theme/Layout";
import React from "react";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// eslint-disable-next-line max-lines-per-function
export default function Versions() {
	const { siteConfig } = useDocusaurusContext();
	const versions = useVersions();
	const latest = useLatestVersion();
	const current = versions.find((version) => version.name === "current");
	const past = versions.filter(
		(version) => version !== latest && version.name !== "current"
	);
	const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;

	let latestTable;
	if (latest) {
		latestTable = <VersionTable id="latest"
			label={<Translate>Latest</Translate>}
			description={<Translate>
				Here you can find the documentation for the
				latest released version.
			</Translate>}>
			<Version
				label={latest.label}
				path={latest.path}
				notes={`${repoUrl}/releases/tag/v${latest.name}`} />
		</VersionTable>;
	}

	let currentTable;
	if (current !== latest) {
		currentTable = <VersionTable id="next"
			label={<Translate>Next (Unreleased)</Translate>}
			description={<Translate>
				Here you can find the documentation for the unreleased
				bleeding-edge version.
			</Translate>}>
			<Version
				label={current.label}
				path={current.path}
				notes={repoUrl} />
		</VersionTable>;
	}

	let pastTable;
	if (past.length) {
		pastTable = <VersionTable id="archive"
			label={<Translate>Previous versions (unmaintained)</Translate>}
			description={<Translate>
				Here you can find the documentation for archived versions.
			</Translate>}>
			{past.map((version) => <Version key={version.name} label={version.label} path={version.path} notes={`${repoUrl}/releases/tag/v${version.name}`} />)}
		</VersionTable>;
	}
	return (
		<Layout title="Versions" description="All documented site versions">
			<main className="container margin-vert--lg">
				<h1><Translate>Petitio documentation versions</Translate></h1>
				{latestTable}
				{currentTable}
				{pastTable}
			</main>
		</Layout>
	);
}
