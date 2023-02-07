const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: './index.ts',
	stats: 'errors-only',
	resolve: {
		extensions: ['.js', '.ts', '.css', '.scss'],
		alias: {
			handlebars: 'handlebars/dist/handlebars.js',
		},
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'public')
		},
		compress: true,
		port: 9000,
	},
	module: {
		rules: [
			{ test: /\.handlebars$/, loader: 'handlebars-loader' },
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.json'
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // development & production

	plugins: [

		new CleanWebpackPlugin(),

		new HtmlWebpackPlugin({
			title: 'OLDFAG.messenger',
			template: path.resolve(__dirname, './src/pages/template.html'), // шаблон
			filename: 'index.html' // название выходного файла
		}),


		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
	]
};


