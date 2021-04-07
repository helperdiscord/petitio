/* eslint-disable node/no-missing-import */
import { any, arrayOf, instanceOf, string } from "prop-types";
import Link from "@docusaurus/Link";
import React from "react";
import Translate from "@docusaurus/Translate";

export default function Version({ key, label, path, notes }) {
	return <tr key={key}>
		<th>{label}</th>
		<td>
			<Link to={path}>
				<Translate
					id="version.docs"
					description="Version documentation header">
					Documentation
				</Translate>
			</Link>
		</td>
		<td>
			<a href={notes}>
				<Translate
					id="version.notes"
					description="Version release notes header">
					Release Notes
				</Translate>
			</a>
		</td>
	</tr>;
}
Version.propTypes = {
	key: any,
	label: string.isRequired,
	path: string.isRequired,
	notes: string.isRequired
};

export function VersionTable({ id, label, description, children }) {
	return <div className="margin-bottom--lg">
		<h3 id={id}>{label}</h3>
		<p>{description}</p>
		<table>
			<tbody>{children}</tbody>
		</table>
	</div>;
}
VersionTable.propTypes = {
	id: any,
	label: string,
	description: string,
	children: arrayOf(instanceOf(Version))
};
