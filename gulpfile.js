'use strict';

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var sketch = require('gulp-sketch');
var del = require('del');
var webpack = require('webpack');
var mergeStream = require('merge-stream');
var browserSync = require('browser-sync');
var path = require('path');
var argv = require('yargs').argv;

var webpackCfg = require('./webpack.config.js');

var paths = {
  framerModuleBuild: path.join(__dirname, 'node_modules/framerjs/build/*'),
  build: path.join(__dirname, 'build'),
  buildFramer: path.join(__dirname, 'build/framer'),
  buildFolders: path.join(__dirname, 'build/**/*.*'),
  buildImages: path.join(__dirname, 'build/images'),
  src: path.join(__dirname, 'src'),
  appIndex: path.join(__dirname, 'src/app.coffee'),
  appHTML: path.join(__dirname, 'src/index.html'),
  appModules: path.join(__dirname, 'src/**/*.coffee'),
  importedFromSketchFold: path.join(__dirname, 'src/**/imported/**/*'),
  importedFromSketchJson: path.join(__dirname, 'src/**/imported/**/*.json'),
  sketchSlices: path.join(__dirname, 'src/*.slices.sketch'),
  appImages: path.join(__dirname, 'src/images/**/*.{png, jpg, svg}'),
  appCSS: path.join(__dirname, 'src/style.css'),
};

var sketchSlices = argv.slices || false;
var copyTask = (sketchSlices) ? 'sketch:slices' : 'copy:generator';
var sketchWatchPath = (sketchSlices) ? paths.sketchSlices : paths.importedFromSketchJson;

gulp.task('clean', del.bind(null, paths.build));

gulp.task('webpack', function (callback) {
  webpack(webpackCfg, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task('copy:framerjs', function () {
  var stream = gulp.src(paths.framerModuleBuild)
    .pipe(gulp.dest(paths.buildFramer));

  return stream;
});

gulp.task('copy:static', function () {
  var htmlStream = gulp.src(paths.appHTML)
    .pipe(gulp.dest(paths.build));

  var imagesStream = gulp.src(paths.appImages)
    .pipe(gulp.dest(paths.buildImages));

  var cssStream = gulp.src(paths.appCSS)
    .pipe(gulp.dest(paths.build));

  return mergeStream(htmlStream, imagesStream, cssStream);
});

gulp.task('copy:generator', ['copy:static', 'copy:framerjs'], function () {
  var stream = gulp.src(paths.importedFromSketchFold)
    .pipe(gulp.dest(paths.build));

  return stream;
});

gulp.task('sketch:slices', ['copy:static', 'copy:framerjs'], function () {
  var stream = gulp.src(paths.sketchSlices)
    .pipe(sketch({
      export: 'slices',
      format: 'png',
      saveForWeb: true,
      scales: 1.0,
      trimmed: false,
    }))
    .pipe(gulp.dest(paths.buildImages));

  return stream;
});

gulp.task('watch:serve', function () {
  gulp.watch([paths.appIndex, paths.appModules], ['webpack']);
  gulp.watch(sketchWatchPath, [copyTask]);

  browserSync({
    server: {
      baseDir: 'build',
    },
    browser: 'google chrome',
    injectChanges: false,
    files: [paths.buildFolders],
    notify: true,
  });
});

gulp.task('build', [copyTask, 'webpack']);
gulp.task('default', ['clean'], function () {
  gulp.start(['build', 'watch:serve']);
});
