import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setDatabases } from '../store';

interface LoginFormData {
	username: string;
	password: string;
}

const LoginPage: React.FC = () => {
	//regular login//
	const [formData, setFormData] = useState<LoginFormData>({
		username: '',
		password: '',
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	/* Regular Login */
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		try {
			e.preventDefault();
			console.log('Login with:', formData);

			const response = await fetch('http://localhost:3001/auth/login', {
				// /auth/login
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log('data: ', data);
				console.log('formData.username: ', formData.username);
				dispatch(setUser(formData.username));
				// dispatch(setToken(data.token)); //test
				const token = data; // session storage way
				console.log('data.token: ', token);
				// const dbResponse = await fetch('http://localhost:3001/db/')
				localStorage.setItem('token', token); // session storage way
				// dispatch(setDatabases(data.databases)); //test
				/* if we dispatch in login */
				// const responsedb = await fetch('/db/connectionStrings', {
				// 	method: 'GET',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		Authorization: `Bearer ${token}`, // Replace with your JWT token logic
				// 	},
				// });
				// const result = await responsedb.json();
				// console.log('databases: ', result);
				// dispatch(setDatabases(result.databases));
				/* if we dispatch in login */
				navigate('/migration');
			} else {
				console.error('Login failed:', await response.json());
			}
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
	};
	/* Regular Login */

	/* GitHub Login */
	const handleLoginWithGitHub = (): void => {
		const clientId: string | undefined = process.env.GITHUB_CLIENT_ID;
		if (!clientId) {
			console.error('GitHub client ID not found');
			// return;
		}

		const redirectUri: string = encodeURIComponent(
			'http://localhost:3000/github/callback'
		);
		// window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
	};
	/* GitHub Login */

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: '20px',
					width: '300px',
				}}
			>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleInputChange}
					placeholder="Username"
					style={{ marginBottom: '10px', padding: '10px' }}
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
					style={{ marginBottom: '20px', padding: '10px' }}
				/>
				<button type="submit" style={{ padding: '10px 20px' }}>
					Login
				</button>
			</form>
			<button
				onClick={handleLoginWithGitHub}
				style={{ padding: '10px 20px', marginTop: '10px' }}
			>
				Login with GitHub
			</button>
		</div>
	);
};

export default LoginPage;
