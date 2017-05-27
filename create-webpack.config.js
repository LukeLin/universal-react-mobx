/**
 * Created by Devicalin on 2015/11/15.
 */
'use strict';

let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let ProgressBarPlugin = require('progress-bar-webpack-plugin');
// let HappyPack = require('happypack');


module.exports = function (DEBUG) {
    let happyId = DEBUG ? 'app-debug' : 'app';


    let plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./' + (DEBUG ? 'manifest-debug.json' : 'manifest.json'))
        }),
        //CSS打包成分离文件，不打包在js文件里面
        new ExtractTextPlugin({
            filename: DEBUG ? './css/[name].css' : './css/[name].[contenthash:6].css',
            allChunks: true
        }),
    ];

    if (DEBUG) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        );
    } else {
        plugins.push(
            new webpack.HashedModuleIdsPlugin(),
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
            }),
            function () {
                this.plugin("done", function (stats) {
                    let jsonStats = stats.toJson({
                        chunkModules: true
                    });
                    let obj = Object.assign(jsonStats.assetsByChunkName, {
                        hash: jsonStats.hash.slice(0, 6)
                    });
                    fs.writeFileSync(
                        __dirname + "/webpack-assets.json",
                        JSON.stringify(obj)
                    );
                });
            }
        );
    }

    function getPagesNames(dirPath) {
        let filesNames = fs.readdirSync(dirPath);
        let entries = {
            app: __dirname + '/client/js/utils/spaRenderer.jsx'
        };

        for (let fileName of filesNames) {
            if (DEBUG) {
                entries[fileName.split('.').shift() || fileName] = [
                    // 'webpack-hot-middleware/client',
                    `${dirPath}/${fileName}`
                ];
            } else {
                entries[fileName.split('.').shift() || fileName] = [`${dirPath}/${fileName}`];
            }
        }

        return entries;
    }

    let babelPlugins = [
        "syntax-async-functions",
        'transform-regenerator',
        "transform-decorators-legacy",
        "transform-class-properties",

        ["transform-runtime", {
            // "helpers": false,
            "polyfill": false,
            "regenerator": true
        }]
    ];
    if (!DEBUG) {
        babelPlugins.push(
            'transform-react-remove-prop-types'
        );
    }

    return {
        target: 'web',
        entry: getPagesNames(__dirname + '/client/js/pages'),
        output: {
            path: __dirname + '/public/',
            filename: DEBUG ? "./js/debug/[name].js" : "./js/min/[name]-[chunkhash].js",
            // filename: DEBUG ? "./js/debug/[name].js" : "./js/min/[name].js",
            chunkFilename: DEBUG ? "./js/debug/[name].js" : "./js/min/[name]-[chunkhash].js",
            // chunkFilename: DEBUG ? "./js/debug/[name].js" : "./js/min/[name].js",
            publicPath: '/static',
            pathinfo: true
        },

        cache: true,

        // For options, see http://webpack.github.io/docs/configuration.html#devtool
        //devtool: DEBUG && "eval-source-map",
        devtool: DEBUG && "#inline-source-map",

        watch: !!DEBUG,

        module: {
            rules: [
                // Load ES6/JSX
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            "presets": [
                                "react",
                                "stage-0",
                                [
                                    "es2015",
                                    {
                                        loose: true,
                                        modules: false
                                    }
                                ]
                            ],
                            "plugins": babelPlugins
                        },
                    }],
                    // happy: {id: happyId}
                },

                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader", options: {}
                        }]
                    })
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader", options: {}
                        }, {
                            loader: "postcss-loader", options: {}
                        }, {
                            loader: "sass-loader", options: {
                                // sourceMap: true
                            }
                        }]
                    })
                },

                // Load images
                {test: /\.jpg/, loader: "url-loader?limit=1024&mimetype=image/jpg&name=./img/[name].[ext]"},
                {test: /\.gif/, loader: "url-loader?limit=1024&mimetype=image/gif&name=./img/[name].[ext]"},
                {test: /\.png/, loader: "url-loader?limit=1024&mimetype=image/png&name=./img/[name].[ext]"},
                {test: /\.svg/, loader: "url-loader?limit=1024&mimetype=image/svg&name=./img/[name].[ext]"},

                // Load fonts
                {
                    test: /\.woff$/,
                    loader: "url-loader?limit=1024&minetype=application/font-woff&name=./font/[name].[ext]"
                },
                {test: /\.(ttf|eot|svg)$/, loader: "file-loader?name=./font/[name].[ext]"}
            ]
        },

        plugins: plugins,

        externals: {},

        resolve: {
            modules: [
                "node_modules"
            ],
            extensions: [".js", ".jsx", ".es6", '.json'],

            alias: {
                // 'libs': path.join(__dirname, './common/libs')
            }
        }
    };

};
