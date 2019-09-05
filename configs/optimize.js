const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 因為使用css minimizer 會覆蓋default的這個JS minify套件，必須引用回來
const TerserJSPlugin = require('terser-webpack-plugin');

// optimization
module.exports = {
  minimizer: [
    new OptimizeCSSAssetsPlugin({}),
    new TerserJSPlugin({})
  ]
}