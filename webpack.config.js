const webpack = require('webpack'),
		path = require('path'),
		HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{ loader: 'babel-loader', test: /\.jsx?$/ }
		]
	},

	mode: 'development',

	plugins: [
		new HtmlWebpackPlugin()
	]
};
