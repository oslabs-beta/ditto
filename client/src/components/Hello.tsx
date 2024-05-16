import * as React from 'react';

interface HelloProps {
	name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => {
	return <h1>Hello, {name}!</h1>;
};

export default Hello;
