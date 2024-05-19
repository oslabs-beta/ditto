import React from 'react';

const MigrationScripts: React.FC = () => {
	return (
		<div className="migrationTableContainer">
			<div className="title">Migration Table</div>
			<table className="migrationTable">
				<thead>
					<tr>
						<th>Version</th>
						<th>Description</th>
						<th>Date Migrated</th>
						<th>State</th>
						<th>Execution Time</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1.0.0</td>
						<td>Initial Migration</td>
						<td>2024-05-17</td>
						<td>Success</td>
						<td>30s</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default MigrationScripts;