import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpFormData {
	username: string;
	password: string;
	// email: string;
	confirmPassword: string;
}

const SignUpPage: React.FC = () => {
	const [formData, setFormData] = useState<SignUpFormData>({
		username: '',
		password: '',
		// email: '',
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
			// Here you would handle the signup logic, e.g., making an API request to your backend
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// Assuming signup is successful and you need to redirect
				navigate('/login'); // Redirect to LoginPage on successful signup
			} else {
				console.error('Signup failed:', await response.json()); // Logging the error response
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
				{/* <input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Email"
					style={{ marginBottom: '10px', padding: '10px' }}
				/> */}
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
