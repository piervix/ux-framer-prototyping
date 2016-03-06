'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sketch = require('gulp-sketch');
var clean = require('gulp-clean');
var webpack = require('webpack');
var browserSync = require('browser-sync');

var webpackCfg = require('./webpack.config.js');

gulp.task('webpack', function (callback) {
  webpack(webpackCfg, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
        // TODO: add config
    }));
    callback();
  });
});

gulp.task('clean', function () {
  gulp.src('./build', { read: false })
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.coffee', './src/**/*.coffee'], ['webpack']);
  // gulp.watch('./src/*.sketch', ['copy']);

  browserSync({
    server: {
      baseDir: 'build',
    },
    browser: 'google chrome',
    injectChanges: false,
    files: ['build/**/*.*', 'build/*.*'],
    notify: true,
  });

});

gulp.task('copy', function () {
  gulp.src('./node_modules/framerjs/build/*')
    .pipe(gulp.dest('build/framer'));
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
  gulp.src('src/images/**/*.{png, jpg, svg}')
    .pipe(gulp.dest('build/images'));
  gulp.src('src/*.css')
    .pipe(gulp.dest('build'));
  gulp.src('src/**/imported/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['copy', 'webpack']);
gulp.task('default', ['build', 'watch']);
