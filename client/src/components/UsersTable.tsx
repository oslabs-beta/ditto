import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setUserRole, setSelectedProject } from '../store';

interface Users {
	user_id: string;
	username: string;
	role: string;
}

const UsersTable: React.FC = () => {
	const userRole = useSelector((state: any) => state.userRole);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const projectId = useSelector((state: any) => state.projectId);
	const [users, setUsers] = useState<Users[]>([
		{ username: 'ShanKhan', role: 'admin', user_id: '12' },
	]);
	const token = sessionStorage.getItem('token');

	useEffect(() => {
		const fetchUsers = async () => {
			if (!selectedProject) {
				// dispatch(setSelectedUser(''));
			}
			try {
				const response = await fetch(`/project/allusers/${projectId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				console.log('result: ', result); // props are username, user_id, role
				setUsers(result);
			} catch (error) {
				console.error('Error fetching migrations:', error);
			}
		};

		if (selectedProject) {
			fetchUsers();
		} else {
			setUsers([]);
		}
	}, [selectedProject]);

	const mappedUsersTable = users.map(user => (
		<tbody key={user.user_id}>
			<tr>
				<td>{user.username}</td>
				<select>
					<option>
						<td>{user.role}</td>
					</option>
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
