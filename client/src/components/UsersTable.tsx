import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setUserRole, setSelectedProject } from '../store';

interface Users {
	user_id: string;
	user: string;
	role: string;
}

const UsersTable: React.FC = () => {
	const userRole = useSelector((state: any) => state.userRole);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const [users, setUsers] = useState<Users[]>([
		{ user: 'ShanKhan', role: 'admin', user_id: '12' },
	]);

	const mappedUsersTable = users.map(user => (
		<tbody key={user.user_id}>
			<tr>
				<td>{user.user}</td>
				<select>
					<td>{user.role}</td>
				</select>
			</tr>
		</tbody>
	));

	return (
		<div className="users">
			<div className="usersHeader">
				<fieldset>
					<label>
						<input value={selectedProject} />
					</label>
					<legend>Project</legend>
				</fieldset>
				<fieldset>
					<label>
						<input value={userRole} />
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
					{mappedUsersTable}
				</table>
			</div>
		</div>
	);
};

export default UsersTable;