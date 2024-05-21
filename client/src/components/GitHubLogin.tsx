import React from 'react';

const Auth: React.FC = () => {
	const handleLogin = () => {
		window.location.href = 'http://localhost:3001/auth/github';
	};

	return (
		<div>
			<button onClick={handleLogin}>Login with GitHub</button>
		</div>
	);
};

export default Auth;
