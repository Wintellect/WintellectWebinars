'use strict';

const path = require('path');
const webpack = require('webpack');

// load the web server settings from package.json
const devServerConfig = require('../package.json').devServer;

// use to insert script elements points to webpack bundles in the main index.html file
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = 'src';
const srcFolderPath = path.join(__dirname, '..', srcFolder);
const tsFolderPath = path.join(__dirname, '..', srcFolder, 'ts');

module.exports = {

    // root folder for entry point files
    context: tsFolderPath,

    // entry points for the three bundles, order does not matter
    entry: {
        'vendor': './vendor.ts',
        'polyfills': './polyfills.ts',
        'app': './main.ts',
    },

    // allows us to require modules using
    // import { someExport } from './my-module';
    // instead of
    // import { someExport } from './my-module.ts';
    // with the extensions in the list, it can be omitted from the import
    // root is an absolute path to the folder containing our application modules
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ], // order matters, resolves left to right
        modules: [ tsFolderPath, path.join(__dirname, '..', 'node_modules') ]
    },

    module: {
        rules: [
            // process all TypeScript files except for unit testing and end-to-end testing
            // with the TypeScript loader
            // this will transpile the TypeScript to JavaScript, and return the JavaScript
            // to webpack for further processing
            // Tesing files are excluded because they are not included in the application
            // output
            // There is a special webpack config file for testing purposes which is separate
            // from this configuration
            {
                test: /\.tsx?$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: 'ts-loader'
            },
            // processes HTML files into JavaScript files
            // useful for bundling HTML with Angular Component
            {
                test: /\.html$/,
                exclude: [path.join(__dirname, '..', srcFolder, 'index.html')],
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            // transpiles global SASS stylesheets
            {
                test: /\.scss$/,
                exclude: [ path.join(__dirname, '..', srcFolder, 'ts') ],
                // loader order is executed right to left
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        // configuration for the postcss loader which modifies CSS after
                        // processing
                        options: {
                            // autoprefixer plugin for postcss adds vendor specific prefixing for
                            // non-standard or experimental css properties
                            plugins: [ require('autoprefixer') ]
                        }
                    },
                    'sass-loader'
                ]
            },
            // transpiles component SASS stylesheets
            {
                test: /\.scss$/,
                exclude: [ path.join(__dirname, '..', srcFolder, 'scss') ],
                // loader order is executed right to left
                use: [
                    'raw-loader',
                    {
                        loader: 'postcss-loader',
                        // configuration for the postcss loader which modifies CSS after
                        // processing
                        options: {
                            // autoprefixer plugin for postcss adds vendor specific prefixing for
                            // non-standard or experimental css properties
                            plugins: [ require('autoprefixer') ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [

        // this one is a little complex to understand
        // when app bundle code imports vendor bundle code, webpack will want to include the
        // the vendor code in the app bundle, this makes sense when we think of webpack as a
        // bundler which bundles all imported code together
        // but this is NOT what we want webpack to do
        // instead, we want webpack to keep the three bundles separate, and once all are loaded
        // in the web browser we trust it will all work, and all three will work together
        // as expect
        // so this plugin keeps the three bundle separated and does not put the code of one,
        // in the code of another

        // order of the names does matter
        // order establishes a hierarchy
        // app -> vendor -> polyfills
        // which means app depends upon vendor, and vendor upon polyfills
        // therefore, polyfills will be loaded first (script element appear first in index.html)
        // vendor will be loaded next, and finally app
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        // copies image files directly when they are changed
        new CopyWebpackPlugin([{
            from: path.join(srcFolderPath, 'images'),
            to: 'images'
        }]),

        // configure the file to have the bundle script elements injected
        // this is almost always the main html for the initial loading of 
        // the site
        new HtmlWebpackPlugin({
            template: path.join(srcFolderPath, 'index.html')
        }),

        // fixes warnings when transpiling Angular 2 code
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '..', 'src')
        ),     
    ],

    // use the webpack dev server to serve up the web application
    devServer: devServerConfig,

    // use full source maps
    // this specific setting value is required to set breakpoints in the TypeScript
    // in the web browser for development
    // other source map settings do not allow debugging in browser and vscode
    devtool: 'source-map',

};