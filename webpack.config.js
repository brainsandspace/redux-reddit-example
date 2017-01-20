// const webpack = require('webpack');
const path = require('path');
console.log('in webpack config', path.resolve(__dirname,'..'));

module.exports = {

  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
  },

  module: {
    
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]

  },

  
  // devServer: {
  //   contentBase: path.resolve(__dirname, '..')
  // },

  devtool: 'cheap-module-eval-source-map'
}
