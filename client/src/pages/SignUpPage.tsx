import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpFormData {
	username: string;
	password: string;
	confirmPassword: string;
}

const SignUpPage: React.FC = () => {
	const [formData, setFormData] = useState<SignUpFormData>({
		username: '',
		password: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match.');
			return;
		}

		try {
			const response = await fetch('auth/register', {
				// /auth/register
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
				}),
			});

			if (response.ok) {
				navigate('/login');
			} else {
				console.error('Signup failed:', await response.json());
			}
		} catch (error) {
			console.error('An error occurred during signup:', error);
		}
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
					style={{ marginBottom: '10px', padding: '10px' }}
				/>
				<input
					type="password"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleInputChange}
					placeholder="Confirm Password"
					style={{ marginBottom: '20px', padding: '10px' }}
				/>
				<button type="submit" style={{ padding: '10px 20px' }}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpPage;
