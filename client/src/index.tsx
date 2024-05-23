// import './styles.css';
// // index.ts
// function greet(name: string): void {
// 	console.log(`Hello, ${name}!`);
// }

// greet('World');

// index.tsx
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
