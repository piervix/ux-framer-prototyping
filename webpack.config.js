'use strict';

var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src/',
  devtool: 'source-map',
  entry: 'app.coffee',
  module: {
    loaders: [
        {
          test: /\.coffee$/,
          loader: 'coffee-loader',
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.(coffee\.md|litcoffee)$/,
          loader: 'coffee-loader?literate',
          exclude: /(node_modules|bower_components)/,
        },
    ],
  },
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
  },
  resolve: {
    root:  [__dirname + '/src/'],
    modulesDirectories: [__dirname + '/src/modules/'],
    extensions: ['', '.web.coffee', '.web.js', '.coffee', '.js'],
  },
  resolveLoader: {
    modulesDirectories: [
        __dirname + '/node_modules/',
    ],
  },
};
