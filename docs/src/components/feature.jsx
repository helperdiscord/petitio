/* eslint-disable node/no-missing-import */
import { arrayOf, shape, string } from "prop-types";
import React from "react";
import clsx from "../lib/clsx";
import styles from "./feature.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Feature({imageUrl, title, description}) {
	const imgUrl = useBaseUrl(imageUrl);
	let image;
	if (imgUrl) {
		image = <div className="text--center">
			<img className={styles.featureImage} src={imgUrl} alt={title} />
		</div>;
	}
	return (
		<div className={clsx("col col--4", styles.feature)}>
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


export function FeatureList({features}) {
	return <section className={styles.features}>
		<div className="container">
			<div className="row">
				{features.map((props, idx) => <Feature key={idx} {...props} />)}
			</div>
		</div>
	</section>;
}
FeatureList.propTypes = {
	features: arrayOf(shape(Feature.propTypes))
};
