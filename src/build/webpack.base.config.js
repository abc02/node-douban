const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const sourcePath = path.join(__dirname, '../../');
const outputPath = path.join(__dirname, './../../APP');

module.exports = {

  entry: {
    'index': path.join(__dirname, '../javascripts/index/index.js'),
    vendor: ['jquery'],
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'javascripts/[name].js',
  },
  devServer: {
    contentBase: '../../APP',
    hot: true
  },
  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              // presets: ['es2015', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, '../javascripts/index/index.html'),
      // filename: 'index.html'
      title: 'webpack'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'javascripts/[name].js'
    }),
  ]
};