import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

interface Users {
	user_id: string;
	username: string;
	role: string;
}

const UsersTable: React.FC = () => {
	const userRole = useSelector((state: any) => state.userRole);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const projectId = useSelector((state: any) => state.projectId);
	const [users, setUsers] = useState<Users[]>([]);
	const token = sessionStorage.getItem('token');
	const roles = ['Owner', 'Admin', 'User'];
	const selectedProjectId = useSelector(
		(state: { projectId: string }) => state.projectId
	);
	const projects = useSelector((state: any) => state.projects);
	const dispatch = useDispatch();

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
				setUsers(result);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		if (selectedProject) {
			fetchUsers();
		} else {
			setUsers([]);
		}
	}, [selectedProject]);

	const handleRoleChange = async (userId: string, role: string) => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await fetch(`/project/updaterole/${selectedProjectId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					user: userId,
					role: role,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			setUsers(result);
		} catch (error) {
			console.error('Error updating user role:', error);
		}
	};

	const mapRoles = roles.map((role: string) => (
		<option key={role} value={role}>
			{role}
		</option>
	));

	const handleKick = async (userId: string) => {
		const token = sessionStorage.getItem('token');
		try {
			const response = await fetch(
				`/project/kick/${selectedProjectId}/${userId}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			setUsers(result);
		} catch (error) {
			console.error('Error leaving project:', error);
		}
	};

	const mappedUsersTable = users.map(user => (
		<tr key={user.user_id}>
			<td>{user.username}</td>
			<td>
				<select
					value={user.role}
					onChange={e => handleRoleChange(user.user_id, e.target.value)}
				>
					{mapRoles}
				</select>
				<button onClick={() => handleKick(user.user_id)}>Kick</button>
			</td>
		</tr>
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
					<tbody>{mappedUsersTable}</tbody>
				</table>
			</div>
		</div>
	);
};

export default UsersTable;
