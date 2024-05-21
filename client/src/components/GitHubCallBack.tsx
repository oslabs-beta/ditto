// // src/GitHubCallback.tsx
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const GitHubCallback: React.FC = () => {
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchAccessToken = async () => {
// 			const code = new URLSearchParams(window.location.search).get('code');
// 			if (code) {
// 				try {
// 					console.log('madee it to githubcallback');
// 					const response = await axios.get(
// 						`http://localhost:3001/github/callback?code=${code}`
// 					);
// 					const { access_token } = response.data;
// 					console.log('token', access_token);

// 					if (access_token) {
// 						// Store the access token and fetch user data
// 						console.log('access stored');
// 						localStorage.setItem('github_token', access_token);
// 						navigate('/migration');
// 					} else {
// 						console.error('Failed to get access token');
// 					}
// 				} catch (error) {
// 					console.error('Error during OAuth callback', error);
// 				}
// 			}
// 		};

// 		fetchAccessToken();
// 	}, [navigate]);

// 	return <div>Loading...</div>;
// };

// export default GitHubCallback;

// Callback.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback: React.FC = () => {
	// const location = useLocation();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	const fetchUserData = async () => {
	// 		console.log('effect is triggered');
	// 		const code = new URLSearchParams(location.search).get('code');
	// 		if (code) {
	// 			try {
	// 				const response = await axios.get(
	// 					`http://localhost:3000/auth/callback?code=${code}`
	// 				);
	// 				console.log('User data:', response.data);
	// 				navigate('/migration');
	// 			} catch (error) {
	// 				console.error('Error fetching user data:', error);
	// 			}
	// 		}
	// 	};

	// 	fetchUserData();
	// }, [location]);

	return <div>Loading...</div>;
};

export default Callback;
