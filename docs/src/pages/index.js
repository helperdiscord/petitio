/* eslint-disable node/no-missing-import */
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import React from "react";
import { string } from "prop-types";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function clsx(...args) {
	const current = [];
	for (const arg of args) {
		if (arg) {
			current.push(arg);
		}
	}
	return current.join(" ");
}

const features = [];

function Feature({imageUrl, title, description}) {
	const imgUrl = useBaseUrl(imageUrl);
	let image;
	if (imgUrl) {
		image = <div className="text--center">
			<img className={styles.featureImage} src={imgUrl} alt={title} />
		</div>;
	}
	return (
		<div className={`col col--4 ${styles.feature ?? ""}`}>
			{image}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}
Feature.propTypes = {
	imageUrl: string.isRequired,
	title: string.isRequired,
	description: string.isRequired
};
export default function Home() {
	const context = useDocusaurusContext();
	const {siteConfig = {}} = context;
	return (
		<Layout
			title={"Petitio Documentation"}
			description="A fast lightweight HTTP library for Node.">
			<header className={clsx("hero hero--primary", styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link
							className={clsx(
								// eslint-disable-next-line max-len
								"button button--outline button--secondary button--lg",
								styles.getStarted
							)}
							to={useBaseUrl("docs/")}>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				{features?.length && <section className={styles.features}>
					<div className="container">
						<div className="row">
							{ // eslint-disable-next-line max-len
								features.map((props, idx) => <Feature key={idx} {...props} />)}
						</div>
					</div>
				</section>
				}
			</main>
		</Layout>
	);
}
