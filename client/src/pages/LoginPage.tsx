import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setDatabases } from '../store';
import signupImg from '/client/src/assets/img/signup.png';
import githubIcon from '/client/src/assets/img/github-mark.png';
import '/client/src/styles/LoginPage.css';

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
				sessionStorage.setItem('token', token); // session storage way
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
	// const handleLoginWithGitHub = (): void => {
	// 	const clientId: string | undefined = process.env.GITHUB_CLIENT_ID;
	// 	if (!clientId) {
	// 		console.error('GitHub client ID not found');
	// 		return;
	// 	}

	// 	const redirectUri: string = encodeURIComponent(
	// 		'http://localhost:3000/github/callback'
	// 	);
	// 	window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
	// };

	const handleLoginWithGitHub = (): void => {
		window.location.href = 'http://localhost:3001/github/login';
	}; // user clicks button to invoke this and redirect to github/login

	/* GitHub Login */

	return (
		<div className="container">
			<h1>Login:</h1>
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
				<button type="submit" className="button">
					Login
				</button>
			</form>
			Don't have an account?
			<a href="/signup" className="signUpBtn">
				<img src={signupImg} alt="signup" className="signUpImage" />
				<span className="credit"></span>
			</a>
			Login with GitHub:
			<button onClick={handleLoginWithGitHub} className="githubLoginBtn">
				<img src={githubIcon} className="githubLoginIcon" />
			</button>
			<div className="credit">
				<a target="_blank" href="https://icons8.com/icon/8SXWOtdZLjo8/sign-up">
					Sign Up
				</a>{' '}
				icon by{' '}
				<a target="_blank" href="https://icons8.com">
					Icons8
				</a>
			</div>
		</div>
	);
};

export default LoginPage;
