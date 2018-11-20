const webpack = require('webpack'),
		path = require('path'),
		HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{ test: /\.jsx?$/, loader: 'babel-loader' },
			{ test: /\.babelrc$/, loader: 'json5-loader' }
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin()
	],
	node: {
		fs: 'empty'
	}
};
