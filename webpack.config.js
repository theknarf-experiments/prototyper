const webpack = require('webpack'),
		path = require('path'),
		HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{ test: /\.(js|ts)x?$/, loader: 'babel-loader' },
			{ test: /\.babelrc$/, loader: 'json5-loader' }
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin()
	],
	node: {
		fs: 'empty'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
};
