const webpack = require('webpack'),
		path = require('path'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	module: {
		rules: [
			{ test: /\.(js|ts)x?$/, loader: 'babel-loader' },
			{ test: /\.babelrc$/, loader: 'json5-loader' },
			{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
	node: {
		fs: 'empty'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
};
