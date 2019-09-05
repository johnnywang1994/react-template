const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// rules
module.exports = {
  test: /\.(sa|sc|c)ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
        // if hmr does not work, this is a forceful method.
        reloadAll: true
      }
    },
    'css-loader',
    'sass-loader'
  ]
}