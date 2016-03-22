'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sketch = require('gulp-sketch');
var clean = require('gulp-clean');
var runIf = require('gulp-if');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var path = require('path');
var argv = require('yargs').argv;

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
  sketchSlices: path.join(__dirname, 'src/*.slices.sketch'),
  appImages: path.join(__dirname, 'src/images/**/*.{png, jpg, svg}'),
  appCSS: path.join(__dirname, 'src/style.css'),
};

gulp.task('clean', function () {
  return gulp.src(paths.build, { read: false })
    .pipe(clean());
});

gulp.task('webpack', function (callback) {
  webpack(webpackCfg, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
        // TODO: add config
    }));
    callback();
  });
});

gulp.task('sketch:slices', function () {
  gulp.src(paths.sketchSlices)
    .pipe(sketch({
      export: 'slices',
      format: 'png',
      saveForWeb: true,
      scales: 1.0,
      trimmed: false,
    }))
    .pipe(gulp.dest(paths.buildImages));
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

gulp.task('copy:imported', function () {
  gulp.src(paths.buildImported, { read: false })
    .pipe(clean());
  gulp.src(paths.importedFromSketchFold)
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
  gulp.watch([paths.appIndex, paths.appModules], ['webpack']);
  if (argv.slices) {
    console.log('slices!');
    gulp.watch(paths.sketchSlices, ['sketch:slices']);
  } else {
    gulp.watch(paths.importedFromSketch, ['copy:imported']);
  }

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

gulp.task('build', ['clean', 'copy', 'webpack']);
gulp.task('default', ['build', 'watch'], browserSync.reload);
