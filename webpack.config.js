const webpack = require('webpack'),
		path = require('path'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		MiniCssExtractPlugin = require("mini-css-extract-plugin"),
		HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
	module: {
		rules: [
			{ test: /\.(js|ts)x?$/, loader: 'babel-loader' },
			{ test: /\.babelrc$/, loader: [ 'babelrc-loader', 'json5-loader' ] },
			{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
		]
	},
	mode: 'development',
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: /node_modules/,
					enforce: true
				},
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			inlineSource: '(.css|main.js)$',
			minify: true,
			title: 'Prototyper',
			xhtml: true,
		}),
		new HtmlWebpackInlineSourcePlugin(),
	],
	node: {
		fs: 'empty'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	resolveLoader: {
		modules: [ path.resolve(__dirname, 'loaders'), 'node_modules' ]
	}
};
