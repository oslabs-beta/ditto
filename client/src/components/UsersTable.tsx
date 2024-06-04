import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setUserRole, setSelectedProject } from '../store';
import { useRevalidator } from 'react-router-dom';
import { useRouteId } from 'react-router/dist/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';

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

	const handleRoleChange = async (userId: string, role: string) => {
		const token = sessionStorage.getItem('token');
		console.log('in role change');
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
			console.log('result: ', result); // props are username, user_id, role
			setUsers(result);
		} catch (error) {
			console.error('Error fetching migrations:', error);
		}
	};

	const mapRoles = roles.map((role: string) => (
		<option key={role} value={role}>
			{role}
		</option>
	));

	const mappedUsersTable = users.map(user => (
		<tbody key={user.user_id}>
			<tr>
				<td>{user.username}</td>
				<td>
					<select
						defaultValue={user.role}
						onChange={e => handleRoleChange(user.user_id, e.target.value)}
					>
						{mapRoles}
					</select>
					<button>
						{' '}
						<FontAwesomeIcon icon={faUserMinus} />
					</button>
				</td>
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
