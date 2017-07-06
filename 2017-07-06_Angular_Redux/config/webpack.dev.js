'use strict';

const path = require('path');
const webpack = require('webpack');

// load the web server settings from package.json
const devServerConfig = require('../package.json').devServer;

// configure the environment object for development mode
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

// merge the common configuration with the environment specific configuration
module.exports = require('webpack-merge')(require('./webpack.common.js'), {

    // out file settings
    // path points to web server content folder where the web server will serve the files from
    // publicPath is the path to the files from the perspective of the web browser requesting
    // the files from the web server, this is used to insert the script elements into the index.html
    // file
    // file name is the name of the files, where [name] is the name of each entry point
    output: {
        path: path.join(__dirname, '..', devServerConfig.contentBase),
        publicPath: '/',
        filename: '[name].js'
    },

    plugins: [
        // define environment variables
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })        
    ]

});