const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const sourcePath = path.join(__dirname, '../../');
const outputPath = path.join(__dirname, './../../APP');

module.exports = {

  entry: {
    'app': path.join(__dirname, '../javascripts/index/index.js'),
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
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

    ]
  },
  resolve: {
    // 使用的扩展名
    extensions: [".js", ".jsx", ".css", ".scss"], 
    // 用于查找模块的目录
    modules: [
      sourcePath,
      'node_modules'
    ],
    alias: {
      // 模块别名列表
      "src": path.join(__dirname, '../'),

      "javascripts": "sr/javascripts",

      "module": "src/javascripts/module",

      "app": "src/javascripts/index"
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../javascripts/index/index.html'),
      filename: 'index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'javascripts/[name].js'
    }),
  ]
};