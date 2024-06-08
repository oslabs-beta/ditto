import React from 'react';

const Auth: React.FC = () => {
	const handleLogin = () => {
		window.location.href =
			process.env.NODE_ENV === 'production'
				? '3.216.47.20:3000/auth/github'
				: 'http://localhost:3000/auth/github';
	};

	return (
		<div>
			<button onClick={handleLogin}>Login with GitHub</button>
		</div>
	);
};

export default Auth;
