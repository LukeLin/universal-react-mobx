/**
 * Created by Devicalin on 2015/11/15.
 */
'use strict';

let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
// let HappyPack = require('happypack');

module.exports = function(DEBUG){
    let happyId = DEBUG ? 'libs-debug' : 'libs';

    let plugins = [
        // new HappyPack({ id: happyId }),
        new webpack.DllPlugin({
            path: path.resolve('./.manifest/' + (DEBUG ? 'manifest-debug.json' : 'manifest.json')),
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
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        );
    } else {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        );
    }

    let libs = [
        'react',
        'react-dom',
        'mobx',
        'mobx-react',
        'react-router-dom',
        'fastclick'
    ];
    if(DEBUG) {
        libs.push(
            'why-did-you-update',
            'mobx-react-devtools',
            'react-addons-perf'
        );
    }

    return {
        target: 'web',
        entry: {
            libs: libs
        },
        output: {
            path: './dist/',
            filename: DEBUG ? "./js/[name]-debug.js" : "./js/[name]-min.js",
            chunkFilename: DEBUG ? "./js/[name]-debug.js" : "./js/[name]-min.js",
            publicPath: '',
            pathinfo: false,
            libraryTarget: 'umd',
            library: '[name]_lib'
        },

        cache: true,

        devtool: DEBUG && "inline-source-map",

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        },
                    }]
                }
            ]
        },

        plugins: plugins,

        externals: {
        },

        resolve: {
            modules: [
                "node_modules"
            ],

            // Allow to omit extensions when requiring these files
            extensions: [".js", ".jsx", ".es6", '.json'],

            alias: {}
        }
    };

};
