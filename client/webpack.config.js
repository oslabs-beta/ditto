const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './client/src/index.tsx', // Pointing to the entry TypeScript file
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				// use: ['file-loader'],
				// type: 'asset/resource',
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]', // Correct path for image files
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'], // Add .ts and .tsx as resolvable extensions.
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/src/index.html',
			filename: 'index.html',
			favicon: "client/src/public/favicon.ico"
		}),
	],
	devServer: {
		compress: true,
		port: 3000, //sets up frontend localhost:port
		historyApiFallback: true,
		static: [
			{
				directory: path.resolve('dist'),
				publicPath: '/',
			},
		],
		proxy: [
			{
				context: ['/'],
				target: 'http://localhost:3001',
			},
		],
	},
};
