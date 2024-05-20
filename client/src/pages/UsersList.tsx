import React, { useEffect, useState } from 'react';

interface User {
	username: string;
	password: string;
}

const UsersList = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('http://localhost:3001/users'); // Ensure this URL is correct
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div>
			<h1>Users List</h1>
			<ul>
				{users.map((user, index) => (
					<li key={index}>
						<strong>Username:</strong> {user.username},{' '}
						<strong>Password:</strong> {user.password}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UsersList;
