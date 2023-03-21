const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/svg+xml',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|__tests__/,
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', 'scss'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
};