/**
 * @Author Devicalin
 */

var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var createLibsWebpackConfig = require('./create-webpack-libs.config.js');
var createWebpackConfig = require('./create-webpack.config.js');
var del = require('del');
var browserSync = require('browser-sync').create();
var runServer = require('./webpack.server.js');

gulp.task('default', ['build-dev', 'build']);

gulp.task('clean', function (cb) {
    return del([
        './public/js/min/'
    ], {
            force: true
        });
});

gulp.task('clean:dev', function (cb) {
    return del([
        './public/js/debug/'
    ], {
            force: true
        });
});

gulp.task('build:lib', function(cb){
    webpack(createLibsWebpackConfig(), function (err, stats) {
        if (err) {
            console.log(err.stack || err);
            if (err.details) {
                console.log(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            for (let error of info.errors) {
                console.log('\n' + error + '\n');
            }
        }

        if (stats.hasWarnings()) {
            for (let warning of info.warnings) {
                console.warn(warning)
            }
        }

        console.log('webpack libs end');
        cb();
    });
});

gulp.task('build', ['clean'], function (cb) {
    webpack(createWebpackConfig(), function (err, stats) {
        if (err) {
            console.log(err.stack || err);
            if (err.details) {
                console.log(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            for (let error of info.errors) {
                console.log('\n' + error + '\n');
            }
        }

        if (stats.hasWarnings()) {
            for (let warning of info.warnings) {
                console.warn(warning)
            }
        }

        console.log('webpack end');
        cb();
    });
});

gulp.task('build:lib:dev', function(cb){
    webpack(createLibsWebpackConfig(true), function (err, stats) {
        if (err) {
            console.log(err.stack || err);
            if (err.details) {
                console.log(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            for (let error of info.errors) {
                console.log('\n' + error + '\n');
            }
        }

        if (stats.hasWarnings()) {
            for (let warning of info.warnings) {
                console.warn(warning)
            }
        }

        console.log('webpack libs dev end');
        cb();
    });
});

gulp.task('build:dev', ['clean:dev'], function (cb) {
    webpack(createWebpackConfig(true), function (err, stats) {
        if (err) {
            console.log(err.stack || err);
            if (err.details) {
                console.log(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            for (let error of info.errors) {
                console.log('\n' + error + '\n');
            }
        }

        if (stats.hasWarnings()) {
            for (let warning of info.warnings) {
                console.warn(warning)
            }
        }

        console.log('webpack dev end');

        browserSync.reload();

        cb();
    });
});
