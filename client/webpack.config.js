// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
// 	mode: 'development',
// 	entry: './client/src/index.tsx', // Pointing to the entry TypeScript file
// 	module: {
// 		rules: [
// 			{
// 				test: /\.tsx?$/,
// 				use: 'ts-loader',
// 				exclude: /node_modules/,
// 			},
// 			{
// 				test: /\.css$/,
// 				use: ['style-loader', 'css-loader'],
// 				exclude: /node_modules/,
// 			},
// 		],
// 	},
// 	resolve: {
// 		extensions: ['.tsx', '.ts', '.js'], // Add .ts and .tsx as resolvable extensions.
// 	},
// 	output: {
// 		filename: 'bundle.js',
// 		path: path.resolve(__dirname, 'dist'),
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: './client/src/index.html',
// 			filename: 'index.html',
// 		}),
// 	],
// 	devServer: {
// 		compress: true,
// 		port: 3000,
// 		historyApiFallback: true,
// 		static: [
// 			{
// 				directory: path.resolve('dist'),
// 				publicPath: '/',
// 			},
// 		],
// 		// proxy: [
// 		// 	{
// 		// 		context: ['/'],
// 		// 		target: 'http://localhost:3000',
// 		// 	},
// 		// ],
// 	},
// };
