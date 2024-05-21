import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../store';

interface DecodedToken {
	id: number;
	username: string;
}

const GitHubCallback: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		console.log('params:', params);
		const token = params.get('token');
		console.log('token', token);

		if (token) {
			sessionStorage.setItem('token', token);
			dispatch(setToken(token));

			const payload = JSON.parse(atob(token.split('.')[1])); //decode the JWT payload. Header. Payload. Signature. [1] gives us payload
			console.log('payload:', payload);
			dispatch(setUser(payload.username)); //dispatch users username from JWT payload

			navigate('/migrations');
		} else {
			console.error('Access token not found');
		}
	}, [navigate, location, dispatch]);

	return <div>Loading...</div>;
};

export default GitHubCallback;

// const Callback: React.FC = () => {
// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			console.log('effect is triggered');
// 			const code = new URLSearchParams(location.search).get('code');
// 			if (code) {
// 				try {
// 					const response = await axios.get(
// 						`http://localhost:3000/auth/callback?code=${code}`
// 					);
// 					console.log('User data:', response.data);
// 					navigate('/migration');
// 				} catch (error) {
// 					console.error('Error fetching user data:', error);
// 				}
// 			}
// 		};

// 		fetchUserData();
// 	}, [location]);

// 	return <div>Loading...</div>;
// };

// export default Callback;
