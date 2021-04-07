/* eslint-disable node/no-missing-import */
import { FeatureList } from "../components/feature";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import React from "react";
import Translate from "@docusaurus/Translate";
import clsx from "../lib/clsx";
import styles from "./index.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// TODO: add more features, change logo, use remark plugins, add documentation searching
const features = [
	{
		title: <Translate
			id="features.speed.title"
			description="Clever reference that hints to us being fast">
			Warp Speed, Mr. Sulu
		</Translate>,
		description: <Translate
			id="features.speed.description"
			description="Details about us being the fastest and benchmarks"
			values={{performance: <Link to="/docs/metrics/performance">
				performance
			</Link>}}>
			{`Petitio is the fastest mainstream high-level HTTP library
			available on NPM. Check {performance} for more details.`}
		</Translate>
	}
];
const STYLE = {
	BANNER: clsx("hero hero--primary", styles.heroBanner),
	BUTTON: clsx(
		"button button--outline button--secondary button--lg",
		styles.getStarted
	)
};

export default function Home() {
	const context = useDocusaurusContext();
	const {siteConfig = {}} = context;

	return (
		<Layout title={siteConfig.title} description={siteConfig.tagline}>
			<header className={STYLE.BANNER}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">
						<Translate id="homepage.tagline">
							Zero-dependency HTTP library designed to be simple,
							fast, and type-strong.
						</Translate>
					</p>
					<div className={styles.buttons}>
						<Link className={STYLE.BUTTON} to={useBaseUrl("docs/")}>
							<Translate id="homepage.docsLink">
								Get Started
							</Translate>
						</Link>
					</div>
				</div>
			</header>
			<main>
				<FeatureList features={features ?? []}/>
			</main>
		</Layout>
	);
}
