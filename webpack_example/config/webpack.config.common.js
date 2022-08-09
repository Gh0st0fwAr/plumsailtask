'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const TerserPlugin = require('terser-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")

const webpackConfig = {
	entry: {
		polyfill: '@babel/polyfill',
		main: helpers.root('src', 'main'),
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
			'@': helpers.root('src')
		},
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				include: [helpers.root('src')]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [helpers.root('src')]
			},
			{
				test: /\.css$/,
				use: [
					isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDev
						}
					},
				]
			},
			{
				test: /\.md?$/,
				include: [
					// path.resolve(__dirname),
					// path.resolve(__dirname, './docs')
					helpers.root('src/docs')
				],
				loader: "file-loader"
			},
			

			// {
			// 	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			// 	loader: 'url-loader',
			// 		options: {
			// 			// name: '[name].[ext]',
			// 			// outputPath: 'fonts/',
			// 			// sourceMap: isDev,
			// 			limit: 8192,
			// 			mimetype:'application/font-woff'
			// 		}
			// },
			// {
			// 	test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
			// 	loader: 'url-loader',
			// 		options: {
			// 			name: '[name].[ext]',
			// 			outputPath: 'fonts/',
			// 			sourceMap: isDev,
			// 			limit: 8192,
			// 			mimetype:'application/font-woff'
			// 		}
			// },
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						// outputPath: 'fonts/',
						sourceMap: isDev
					}
				}]
			},
			{
				test: /\.pcss$/,
				use: [
					isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDev
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDev
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isDev
						}
					}
				]
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			// { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader'] },
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlPlugin({
			template: 'index.html',
			chunksSortMode: 'none'
		}),
		new GoogleFontsPlugin({
			// apiUrl: 'https://n8n-google-fonts-helper.herokuapp.com/api/fonts',
			apiUrl: 	"https://google-webfonts-helper.herokuapp.com/api/fonts",
			fonts: [
				{family: "Roboto", variants: ["300", "400", "500", "bold"]},
				{family: "Ubuntu Mono"},
				// {family: "VT323"}
			],
			options: {
				name: "fonts",
				filename: "fonts.css",
				formats: ["woff", "woff2", "ttf"],
				path: "fonts/",
				local: true
			}
		})
	]
};

module.exports = webpackConfig;
