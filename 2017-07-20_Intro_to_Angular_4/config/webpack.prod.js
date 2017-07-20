'use strict';

const path = require('path');

// load the web server settings from package.json
const devServerConfig = require('../package.json').devServer;

// load webpack for plugins below
const webpack = require('webpack');

// configure the environment object for production mode
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

// merge the common configuration with the environment specific configuration
module.exports = require('webpack-merge')(require('./webpack.common.js'), {

    // out file settings
    // path points to web server content folder where the web server will serve the files from
    // publicPath is the path to the files from the perspective of the web browser requesting
    // the files from the web server, this is used to insert the script elements into the index.html
    // file
    // filename is the name of the files, where [name] is the name of each entry point, the [hash] is
    // the unique value for cache busting
    output: {
        path: path.join(__dirname, '..', devServerConfig.contentBase),
        publicPath: '/',
        filename: '[name].[hash].js'
    },

    // UglifyJsPlugin - minimizes JavaScript files, but function names are not discarded
    // DefinePlugin - configures environment variables for enabling production mode
    plugins: [
        // set minimize option for all loaders
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),        
        // minimizes javascript code
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
            mangle: {
                keep_fnames: true,
            },
        }),
        // define environment variables
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});