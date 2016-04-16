'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/src/',
  devtool: 'source-map',
  entry: 'app.coffee',
  module: {
    loaders: [
        {
          test: /\.coffee$/,
          loader: 'coffee-loader',
	  exclude: /(node_modules)/,
        },
        {
          test: /\.(coffee\.md|litcoffee)$/,
          loader: 'coffee-loader?literate',
	  exclude: /(node_module)/,
        },
    ],
  },
  output: {
    path: __dirname + '/build',
    filename: 'app.[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'UX Framer Prototype',
      template: __dirname + '/src/index.html',
    }),
  ],
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
