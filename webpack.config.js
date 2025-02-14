const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = (env) => {

	const isDev = env.mode === 'development';
	return {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'index.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].[contenthash].js',
			clean: true,
		},

		module: {
			rules: [
				{
					test: /\.scss$/i,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					],
				},

				{
					test: /\.woff2$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name][ext][query]'
					}
				},

				{
					test: /\.jpg$/i,
					type: 'asset/resource',
					generator: {
						filename: (input) => {
							const fileName = input.filename.split('/').pop();
							return fileName === ('producer-1.jpg')
								? 'images/[name][ext]'
								: 'images/slider/[name][ext]';
						}
					}
				},

				{
					test: /\.svg$/i,
					type: 'asset/resource',
					generator: {
						filename: 'icons/[name][ext]'
					}
				},
			],
		},


		plugins: [
			new HtmlWebpackPlugin(
				{
					template: path.resolve(__dirname, 'src', 'index.html'),
					minify: {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true
					},
				}
			),
			new webpack.ProgressPlugin(),
		],
		devtool: isDev ? 'inline-source-map' : false,
		devServer: isDev ? {
			port: 5050,
			open: true,
		} : undefined,
	}
} 