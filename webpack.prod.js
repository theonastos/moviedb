const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CompressionPlugin({
      test: /\.(html|css|js)(\?.*)?$/i,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/i,
        use: [MiniCssExtractPlugin.loader, 'postcss-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});