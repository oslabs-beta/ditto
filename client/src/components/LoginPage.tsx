import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
	username: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const [formData, setFormData] = useState<LoginFormData>({
		username: '',
		password: '',
	});

	const navigate = useNavigate(); // Use the useHistory hook for redirection

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		try {
			e.preventDefault();
			console.log('Login with:', formData);
			// Here you would handle the login logic, e.g., making an API request to your backend

			const response = await fetch('/migration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// Check if the HTTP status code is 2xx
				// Assuming your login is successful and you need to redirect
				navigate('/MigrationPage'); // Redirect to MigrationPage on success
			} else {
				console.error('Login failed:', await response.json()); // Logging the error response
			}
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
	};

	// component declaration const name: React.FC (type stands for function component)
	const handleLoginWithGitHub = (): void => {
		// handles login, and :void shows that it takes no parameters and returns nothing
		// Ensuring the client_id is present
		const clientId: string | undefined = process.env.REACT_APP_GITHUB_CLIENT_ID; // retrieves github client ID from environment variable, can be string or undefined // had to add node in ts.config for process to work
		if (!clientId) {
			// if no client id, returns console log and ends execution
			console.error('GitHub client ID not found');
			return;
		}

		const redirectUri: string = encodeURIComponent(
			// encodes URI
			'http://localhost:3000/auth/callback'
		);
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`; // sends to github's Oauth page
	};

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
