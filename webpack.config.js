const path = require('path');

// require loader modules
const $babel_loader = require('./configs/babel-loader');
const $sass_loader = require('./configs/sass-loader');
const $plugins = require('./configs/plugins');
const $optimize = require('./configs/optimize');
const $static_loader = require('./configs/static-loader');



module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      $babel_loader,
      $sass_loader,
      $static_loader
    ]
  },
  plugins: $plugins,
  optimization: $optimize,
  // Alias
  resolve: {
    extensions: ['.js', '.css', '.sass', '.jpg', '.png', '.gif'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // devServer
  devServer: {},
  // 預設文件圖取路徑： '/'
  publicPath: 'http://localhost:8080/dist'
}
