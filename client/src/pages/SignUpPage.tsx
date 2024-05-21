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
		<div className="container">
			<h1>Sign up:</h1>
			<form onSubmit={handleSubmit} className="form">
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleInputChange}
					placeholder="Username"
					className="input"
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
					className="input"
				/>
				<input
					type="password"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleInputChange}
					placeholder="Confirm Password"
					className="input confirm-password"
				/>
				<button type="submit" className="button">
					Sign Up
				</button>
			</form>
		</div>
		);
	}	

export default SignUpPage;
