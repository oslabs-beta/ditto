// import './styles.css';
// // index.ts
// function greet(name: string): void {
// 	console.log(`Hello, ${name}!`);
// }

// greet('World');

// index.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
