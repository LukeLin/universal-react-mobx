var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var proxy = require('proxy-middleware');
var path = require('path');

var createWebpackConfig = require('./create-webpack.config.js');
var webpackConfig = createWebpackConfig(true);
var port = 9002;

var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    hot: true,
	historyApiFallback: true,
	noInfo: true,
	stats: {
		colors: true
	},
}));
app.use(webpackHotMiddleware(compiler));
// 后台转发
app.use('/api/', proxy('http://localhost:3001'));

app.use('/dist', express.static(path.join(__dirname, '/..', '/dist')));

// 前端转发
app.use('/', proxy('http://localhost:' + port));

app.use('*', function(res){
    res.send('')
});

app.listen(port, function(err) {
	if (err) {
		console.error(err);
	}
	else {
		console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}
});
