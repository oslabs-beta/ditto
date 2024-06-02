import * as React from 'react';

const UsersTable: React.FC = () => {
	return (
		<div className="users">
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
					<tbody>
						<tr>
							<td>PlaceHolderUser</td>
							<td>
								<select>PlaceHolderRole</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UsersTable;
