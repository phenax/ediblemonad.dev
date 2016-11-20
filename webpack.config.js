const webpack = require('webpack');
const {resolve} = require('path');

const BUILD_DIR= resolve(__dirname, 'dist/js');     // Build directory
const APP_DIR= resolve(__dirname, 'js');         // Source directory

const webpackConfig = {

	entry: {

		script: resolve(APP_DIR, 'script.js')
	},

	output: {

		path: BUILD_DIR,

		filename: '[name].js'
	},

	module: {

		loaders: [
			{

				test: /\.js$/,

				exclude: /node_modules/,

				loader: 'babel-loader'
			}
		],
	},

	devtool: 'source-map'
};


// Stuff for production
if(process.argv.includes('-p')) {
	
	webpackConfig.devtool= false;

	webpackConfig.plugins= [

		new webpack.optimize.DedupePlugin(),
		
		new webpack.optimize.UglifyJsPlugin({

			minimize: true,

			compress: {
				screw_ie8: true,
				warnings: false
			},

			output: {
				comments: false
			},

			sourceMap: false
		}),
		
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		})
	];
}

module.exports = webpackConfig;
