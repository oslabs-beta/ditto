import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setUserId } from '../store';
import { Helmet } from 'react-helmet-async';
import githubIcon from '/client/src/assets/img/github-mark.png';
import '/client/src/styles/LoginPage.css';
import '../styles/NavBar.css';

interface LoginFormData {
	username: string;
	password: string;
}

const LoginPage: React.FC = () => {
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

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		try {
			e.preventDefault();

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(setUser(formData.username));
				dispatch(setUserId(data.userId));
				const token = data.token;
				sessionStorage.setItem('token', token);

				navigate('/projects');
			} else {
				console.error('Login failed:', await response.json());
			}
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
	};

	const handleLoginWithGitHub = (): void => {
		window.location.href =
			process.env.NODE_ENV === 'production'
				? '3.216.47.20:3000/auth/github'
				: 'http://localhost:3000/auth/github';
	};

	const handleSignUp = (): void => {
		sessionStorage.clear();
		navigate('/signup');
	};

	return (
		<div className="container">
			<Helmet>
				<title>Login to Ditto</title>
				<meta
					name="description"
					content="Log in to Ditto to access and manage your PostgreSQL database migrations."
				/>
			</Helmet>
			<h1 className="login">Sign In</h1>
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
				<button type="submit" className="loginbutton">
					Log In
				</button>
			</form>
			<div className="signupcontainer">
				Don't have an account?
				<button className="signupbtn" onClick={handleSignUp}>
					Sign Up
				</button>
			</div>
			<div className="githubcontainer">
				<p>Login with:</p>
				<div className="links">
					<button onClick={handleLoginWithGitHub} className="githubLoginBtn">
						<img src={githubIcon} className="githubLoginIcon" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
