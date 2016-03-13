'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sketch = require('gulp-sketch');
var clean = require('gulp-clean');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var path = require('path');

var webpackCfg = require('./webpack.config.js');

var paths = {
  framerModuleBuilded: path.join(__dirname, 'node_modules/framerjs/build/*'),
  build: path.join(__dirname, 'build'),
  buildFramer: path.join(__dirname, 'build/framer'),
  buildFolders: path.join(__dirname, 'build/**/*.*'),
  buildFiles: path.join(__dirname, 'build/*.*'),
  buildImages: path.join(__dirname, 'build/images'),
  buildImported: path.join(__dirname, 'build/imported'),
  src: path.join(__dirname, 'src'),
  appIndex: path.join(__dirname, 'src/app.coffee'),
  appHTML: path.join(__dirname, 'src/index.html'),
  appModules: path.join(__dirname, 'src/**/*.coffee'),
  importedFromSketchFold: path.join(__dirname, 'src/**/imported/**/*'),
  importedFromSketch: path.join(__dirname, 'src/**/imported/**/*.json'),
  appImages: path.join(__dirname, 'src/images/**/*.{png, jpg, svg}'),
  appCSS: path.join(__dirname, 'src/style.css'),
};

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
  gulp.src(paths.build, { read: false })
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch([paths.appIndex, paths.appModules], ['webpack']);
  gulp.watch(paths.importedFromSketch, ['copy-imported']);

  browserSync({
    server: {
      baseDir: 'build',
    },
    browser: 'google chrome',
    injectChanges: false,
    files: [paths.buildFolders, paths.buildFolders],
    notify: true,
  });
});

gulp.task('copy', function () {
  gulp.src(paths.framerModuleBuilded)
    .pipe(gulp.dest(paths.buildFramer));
  gulp.src(paths.appHTML)
    .pipe(gulp.dest(paths.build));
  gulp.src(paths.appImages)
    .pipe(gulp.dest(paths.buildImages));
  gulp.src(paths.appCSS)
    .pipe(gulp.dest(paths.build));
  gulp.src(paths.importedFromSketchFold)
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy-imported', function () {
  gulp.src(paths.buildImported, { read: false })
    .pipe(clean());
  gulp.src(paths.importedFromSketchFold)
    .pipe(gulp.dest(paths.build));
});

gulp.task('build', ['copy', 'webpack']);
gulp.task('default', ['build', 'watch'], browserSync.reload);
