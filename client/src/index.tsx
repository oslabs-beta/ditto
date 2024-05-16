// import './styles.css';
// // index.ts
// function greet(name: string): void {
// 	console.log(`Hello, ${name}!`);
// }

// greet('World');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'; // Assuming your App component is in App.tsx

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
