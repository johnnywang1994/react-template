const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// plugins
module.exports = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: './index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css'
  })
]