let fs = require('fs');
let path = require('path');
let webpack = require('webpack');
let packageJson = require('./package.json');


module.exports = {
    entry: path.resolve(__dirname, './server/app.js'),

    output: {
        path: path.resolve(__dirname, "./dist"),
        pathinfo: true,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    cache: true,
    devtool: 'source-map',

    target: 'node',

    node: {
        __filename: true,
        __dirname: true
    },

    resolve: {
        modules: [
            "node_modules"
        ],

        // Allow to omit extensions when requiring these files
        extensions: [".js", ".jsx", ".es6", '.json'],
    },

    externals: Object.keys(packageJson.dependencies)
        .concat([
            'react-dom/server'
        ]),

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    },
                }]
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        }),
        new webpack.IgnorePlugin(/(\.(?:css|less|scss|sass)$)/)
    ],
};

