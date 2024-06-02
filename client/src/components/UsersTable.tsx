import * as React from 'react';

const UsersTable: React.FC = () => {
	return (
		<div className="usersTable">
			<div className="usersHeader">
				<fieldset>
					<label>
						<input value="" />
					</label>
					<legend>Projects</legend>
				</fieldset>
				<fieldset>
					<label>
						<input value="" />
					</label>
					<legend>Role</legend>
				</fieldset>
			</div>
			<div className="usersInfo">
				<table>
					<thead>
						<tr>
							<th>User</th>
							<th>Role</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	);
};

export default UsersTable;
