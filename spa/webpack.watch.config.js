'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, 'app/main.jsx')],
  output: {
    path: path.join(__dirname, '../app/assets/'),
    filename: 'javascripts/cfhome-[name].min.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new ExtractTextPlugin('stylesheets/cfhome-[name].min.scss'),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'app/images'), to: path.join(__dirname, '../app/assets/images') },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc'),
          failOnWarning: false,
          failOnError: true,
        },
        postcss: [require('postcss-cssnext')],
        context: '/',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: [/node_modules/, /app\/vendor/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /app\/vendor/],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                localIdentName: '[hash:base64:2]_[hash:base64:2]_[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                sourceComments: false,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                sourceComments: false,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                importLoaders: 1,
                localIdentName: '[hash:base64:2]_[hash:base64:2]_[hash:base64:5]',
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, '../node_modules'),
      'app-styles': path.resolve(__dirname, './app/styles'),
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
};
