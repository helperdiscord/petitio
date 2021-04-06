/* eslint-disable node/no-missing-import */
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import React from "react";
import clsx from "../lib/clsx";
import { renderFeatures } from "../components/feature";
import styles from "./index.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const features = [];
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

	const featureList = features?.length ? renderFeatures(features) : undefined;

	return (
		<Layout title={siteConfig.title} description={siteConfig.tagline}>
			<header className={STYLE.BANNER}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link className={STYLE.BUTTON} to={useBaseUrl("docs/")}>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				{featureList}
			</main>
		</Layout>
	);
}
