'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const helpers = require('./helpers');
const commonConfig = require('./webpack.config.common');
const isProd = process.env.NODE_ENV === 'production';
const environment = isProd ? require('./env/prod.env') : require('./en/staging.env');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(commonConfig, {
	mode: 'production',
	output: {
		path: helpers.root('../nms/frontend'),
		publicPath: '/static/',
		filename: 'js/nms4.js',
		chunkFilename: 'js/[id].js'
	},
	optimization: {
		runtimeChunk: 'single',
		minimizer: [
			/* =============================
				FIXME: There are some errors with css minimizers.
				Need to find a better package, or fix current, i dunno 
			  ============================= */
			new OptimizeCSSAssetsPlugin({
				cssProcessorPluginOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true
						}
					}],
				},
				safe: true
			}),
			new UglifyJSPlugin({
				// uglifyOptions: {
					// output: {
					// 	comments: false
					// },
					// compress: {
						// warnings: false,
						// drop_console: true
					// }
				// },
				cache: true,
				parallel: true,
				sourceMap: !isProd
			})
		],
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `npm.${packageName.replace('@', '')}`;
					}
				},
				styles: {
					test: /\.css$/,
					name: 'styles',
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	plugins: [
		new webpack.EnvironmentPlugin(environment),
		new MiniCSSExtractPlugin({
			filename: 'css/nms4.css',
			chunkFilename: 'css/[id].css'
		}),
		new webpack.HashedModuleIdsPlugin(),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
			{from: './docs', to: './docs'},
			{from: './favicon.ico', to: './'},
			{from: './resources', to: './'},
			{from: './images', to: './images'}
			]
		}),
	]
});

if (!isProd) {
	webpackConfig.devtool = 'source-map';

	if (process.env.npm_config_report) {
		const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
		webpackConfig.plugins.push(new BundleAnalyzerPlugin());
	}
}

module.exports = webpackConfig;
