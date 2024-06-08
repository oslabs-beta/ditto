import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setUserId } from '../store';

interface DecodedToken {
	id: number;
	username: string;
}

const GitHubCallback: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('in callback');
		const params = new URLSearchParams(location.search);
		console.log('params:', params);
		const token = params.get('token');
		console.log('token', token);

		if (token) {
			sessionStorage.setItem('token', token);
			dispatch(setToken(token));

			const payload = JSON.parse(atob(token.split('.')[1])); //decode the JWT payload. 
			console.log('payload:', payload);
			dispatch(setUser(payload.username)); //dispatch user's username from JWT payload
			dispatch(setUserId(payload.id));

			navigate('/projects');
		} else {
			console.error('Access token not found');
		}
	}, []);

	return <div>Loading...</div>;
};

export default GitHubCallback;