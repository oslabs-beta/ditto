import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { setUserRole } from '../store';

interface Users {
	user_id: string;
	username: string;
	role: string;
	date_joined: string;
}

const UsersTable: React.FC = () => {
	const userRole = useSelector((state: any) => state.userRole);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const projectId = useSelector((state: any) => state.projectId);
	const currentUser = useSelector((state: { userId: number }) => state.userId);
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
			if (currentUser === Number(userId)) dispatch(setUserRole(role));
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

	const roleOrder: Record<string, number> = {
		Owner: 0,
		Admin: 1,
		User: 2,
	};

	const usersCopy: Users[] = JSON.parse(JSON.stringify(users));
	const sortedUsers: Users[] = usersCopy.sort((a: Users, b: Users) => {
		const roleComparison = roleOrder[a.role] - roleOrder[b.role];
		if (roleComparison !== 0) {
			return roleComparison;
		}
		return (
			new Date(a.date_joined).getTime() - new Date(b.date_joined).getTime()
		);
	});

	const mappedUsersTable = sortedUsers.map(user => (
		<tr key={user.user_id}>
			<td>{user.username}</td>
			<div id="roleColumn">
				<td>
					<select
						value={user.role}
						onChange={e => handleRoleChange(user.user_id, e.target.value)}
						disabled={userRole === 'User' ? true : false}
					>
						{mapRoles}
					</select>
					<button onClick={() => handleKick(user.user_id)}>
						{' '}
						<FontAwesomeIcon icon={faUserMinus} />
					</button>
				</td>
			</div>
		</tr>
	));

	return (
		<div className="users">
			<div className="usersHeader">
				<fieldset>
					<label>
						<input value={selectedProject} readOnly={true} />
					</label>
					<legend>Project</legend>
				</fieldset>
				<fieldset>
					<label>
						<input value={userRole} readOnly={true} />
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
