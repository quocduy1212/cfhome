'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3333',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'app/main.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: 'http://localhost:3333/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc'),
          failOnWarning: false,
          failOnError: false,
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
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /app\/vendor/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              sourceComments: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              sourceComments: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        ],
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
