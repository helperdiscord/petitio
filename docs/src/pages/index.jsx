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

	return (
		<Layout title={siteConfig.title} description={siteConfig.tagline}>
			<header className={STYLE.BANNER}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">
						<Translate>
							Zero-dependency HTTP library designed to be simple,
							fast, and type-strong.
						</Translate>
					</p>
					<div className={styles.buttons}>
						<Link className={STYLE.BUTTON} to={useBaseUrl("docs/")}>
							<Translate>Get Started</Translate>
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
