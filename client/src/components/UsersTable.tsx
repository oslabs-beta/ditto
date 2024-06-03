import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setUserRole, setSelectedProject } from '../store';
import { useRevalidator } from 'react-router-dom';
import { useRouteId } from 'react-router/dist/lib/hooks';

interface Users {
	user_id: string;
	user: string;
	role: string;
}

const UsersTable: React.FC = () => {
	const userRole = useSelector((state: any) => state.userRole);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const [users, setUsers] = useState<Users[]>([
		{ user: 'ShanKhan', role: 'Admin', user_id: '12' },
	]);
	const token = sessionStorage.getItem('token');
	const roles = ['Owner', 'Admin', 'User'];
	const selectedProjectId = useSelector(
		(state: { projectId: string }) => state.projectId
	);

	// useEffect(() => {
	// 	const fetchMigrations = async () => {
	// 		if (!selectedProject) {
	// 			// dispatch(setSelectedUser(''));
	// 		}
	// 		const token = sessionStorage.getItem('token');
	// 		try {
	// 			const response = await fetch(`/migrationlog/all/${dbId}`, {
	// 				// we'll need getDBConnectionByUserID so endpoint db/getConnectionString/:dbId
	// 				method: 'GET',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: `Bearer ${token}`, // Replace with your JWT token logic
	// 				},
	// 			});

	// 			if (!response.ok) {
	// 				throw new Error(`HTTP error! status: ${response.status}`);
	// 			}

	// 			const result = await response.json();
	// 			const sortedMigrations = result.sort(
	// 				(a: Migration, b: Migration) =>
	// 					parseInt(a.version) - parseInt(b.version)
	// 			);
	// 			setMigrations(sortedMigrations);
	// 		} catch (error) {
	// 			console.error('Error fetching migrations:', error);
	// 		}
	// 	};

	// 	if (selectedDatabase) {
	// 		fetchMigrations();
	// 	} else {
	// 		setUsers([]);
	// 	}
	// }, []);

	const mapRoles = roles.map((role: string) => (
		<option key={role} value={role}>
			{role}
		</option>
	));

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
		} catch (error) {
			console.error('Error fetching migrations:', error);
		}

		const mappedUsersTable = users.map(user => (
			<tbody key={user.user_id}>
				<tr>
					<td>{user.user}</td>
					<td>
						<select defaultValue={user.role}>{mapRoles}</select>
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
};

export default UsersTable;
