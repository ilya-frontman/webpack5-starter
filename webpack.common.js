/* eslint-disable no-undef */
const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// pug pages generator

const PATHS = {
	src: path.resolve(__dirname, './src/'),
	dist: path.resolve(__dirname, './dist/'),
	pugPages: 'pug/'
}

const PAGES_DIR = `${PATHS.src}/${PATHS.pugPages}pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))



// common build
module.exports = {
	entry: "./src/js/app.js",

	output: {
		filename: "js/[name].bundle.js",
		path: path.resolve(__dirname, "./dist"),
		clean: true,
		asyncChunks: true,
		compareBeforeEmit: false,
		assetModuleFilename: 'assets/'
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},

	resolve: {
		extensions: ['.js', '.scss', '.css', '.sass'],
		alias: {
			Scss: path.resolve(__dirname, './src/scss/'),
			Fonts: path.resolve(__dirname, './public/fonts'),
			Img: path.resolve(__dirname, './public/img'),
			Svg: path.resolve(__dirname, './public/svg'),
			Pug: path.resolve(__dirname, './src/pug/'),
		},
	},

	plugins: [

		// all pug pages
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/, '.html')}`,
		}))

	],

	module: {
		rules: [
			{
				test: /\.pug$/i,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true,
						}
					}
				]
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
		]
	}
};
