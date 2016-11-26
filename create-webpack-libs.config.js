/**
 * Created by Devicalin on 2015/11/15.
 */
'use strict';

let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let HappyPack = require('happypack');

module.exports = function(DEBUG){
    let happyId = DEBUG ? 'libs-debug' : 'libs';

    let plugins = [
        new HappyPack({ id: happyId }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DllPlugin({
            path: DEBUG ? 'manifest-debug.json' : 'manifest.json',
            name: '[name]_lib',
            context: __dirname
        })
    ];
    if (!DEBUG)  {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    let libs = [
        'react',
        'react-dom',
        'mobx',
        'mobx-react',
        'react-router',
        'fastclick'
    ];
    if(DEBUG) {
        libs.push(
            // 'why-did-you-update',
            'mobx-react-devtools',
            'react-addons-perf'
            );
    }

    let loaders = [
        // Load ES6/JSX
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                // "presets": ["es2015"],
                // "plugins": ["transform-runtime"]
            },
            happy: { id: happyId }
        }
    ];

    return {
        target: 'web',
        entry: {
            libs: libs
        },
        output: {
            path: './public/',
            filename: DEBUG ? "./js/[name]-debug.js" : "./js/[name]-min.js",
            chunkFilename: DEBUG ? "./js/[name]-debug.js" : "./js/[name]-min.js",
            publicPath: '',
            pathinfo: false,
            libraryTarget: 'umd',
            library: '[name]_lib'
        },

        cache: true,
        debug: DEBUG,

        // For options, see http://webpack.github.io/docs/configuration.html#devtool
        devtool: DEBUG && "eval-source-map",
        // devtool: DEBUG && "cheap-module-eval-source-map",

        module: {
            loaders: loaders,
            noParse: []
        },

        plugins: plugins,

        externals: {
        },

        resolve: {
            root: path.resolve('/'),
            modulesDirectories: [
                "node_modules",

                // https://github.com/webpack/webpack-dev-server/issues/60
                "web_modules"
            ],

            // Allow to omit extensions when requiring these files
            extensions: ["", ".js", ".jsx", ".es6", '.json'],

            alias: {}
        }
    };

};
