const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
	return {
		entry: './index.ts',
		stats: 'errors-only',
		resolve: {
			extensions: ['.js', '.ts', '.css', '.scss'],
			alias: {
				handlebars: 'handlebars/dist/handlebars.js',
			},
		},

		devServer: {
			watchFiles: path.join(__dirname, 'src'),
			// static: {
			// 	directory: path.join(__dirname, 'public'),
			// },
			compress: true,
			port: 9000,
		},

		module: {
			rules: [
				{
					test: /\.handlebars$/,
					loader: 'handlebars-loader',
				},
				{
					test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						configFile: 'tsconfig.json',
					},
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
			],
		},

		output: {
			path: path.resolve(__dirname, 'dist'),
		},

		mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // development & production

		plugins: [
			new CleanWebpackPlugin({
				dangerouslyAllowCleanPatternsOutsideProject: true,
			}),

			new Dotenv(),

			new HtmlWebpackPlugin({
				title: 'OLDFAG.messenger',
				template: path.resolve(__dirname, './src/pages/indexPageTemplate.html'),
				filename: 'index.html',
			}),

			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css',
			}),
		],
	};
};
