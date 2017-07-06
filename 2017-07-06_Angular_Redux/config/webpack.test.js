'use strict';

const path = require('path');
const webpack = require('webpack');

const srcFolder = 'src';
const srcFolderPath = path.join(__dirname, '..', srcFolder);
const tsFolderPath = path.join(__dirname, '..', srcFolder, 'ts');
const nodeModulesFolderPath = path.join(__dirname, '..', 'node_modules');

// configure the environment object for test mode
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {

    // allows us to require modules using
    // import { someExport } from './my-module';
    // instead of
    // import { someExport } from './my-module.ts';
    // with the extensions in the list, it can be omitted from the import
    // root is an absolute path to the folder containing our application modules
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ], // order matters, resolves left to right
        modules: [ tsFolderPath, nodeModulesFolderPath ]
    },        

    module: {
        rules: [
            // transpile TypeScript to JavaScript
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            // package HTML as JavaScript modules
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            // package SASS files as JavaScript modules
            // this is needed otherwise Angular 2 complains that styleUrls is not a stylesheet
            // the actual style definitions are not used in unit testing
            // unlike the webpack dev config, we do not need to account for the global stylesheet
            {
                test: /\.scss$/,
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
            },
            // processes the files through istanbul to add code coverage
            {
                enforce: 'post',
                test: /\.(js|tsx?)$/,
                loader: 'istanbul-instrumenter-loader',
                include: srcFolderPath,
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }            
        ],
    },

    // outputs source map for error reporting
    // when unit tests fail, karma will display the TypeScript line number instead
    // of the JavaScript bundle line number
    devtool: 'inline-source-map',

    plugins: [
        // define environment variables
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        // fixes warnings when transpiling Angular 2 code
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),        
    ],

};
