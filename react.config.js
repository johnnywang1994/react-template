const path = require('path');


/**
 * Import Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin'); // 因為使用css minimizer 會覆蓋default的這個JS minify套件，必須引用回來
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const Template = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
  // v3
  // minify: true,
  // webpack v4
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  }
});


const ExtractCss = new MiniCssExtractPlugin({
  filename: '[name].css'
});


const MiniCss = new OptimizeCSSAssetsPlugin({});

const MiniJS = new TerserJSPlugin({});



/**
 * Entry Point
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // Modules
  module: {
    rules: [

      // Babel with React
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options can put in .babelrc
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },

      // Sass Compile
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },

      // Images
      // url-loader 使用需要依賴 file-loader
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000, // 小於 25KB 會以 base64 引入
              outputPath: 'assets' // 輸出目錄
            },
          },
        ],
      },

    ]
  },

  // Plugins
  plugins: [
    Template, ExtractCss
  ],

  // Compress
  optimization: {
    minimizer: [MiniCss, MiniJS]
  },

  // Alias
  resolve: {
    extensions: ['.js', '.css', '.sass', '.jpg', '.png', 'gif'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  // DevServer 預設 8080, 可修改如下(以下配置皆可省略)
  // devServer: {
  //   host: '0.0.0.0',
  //   // 自動設置 HTTPS，也可自己提供certificate文件
  //   https: true,
  //   https: {
  //     key: fs.readFileSync('/path/to/server.key'),
  //     cert: fs.readFileSync('/path/to/server.crt'),
  //     ca: fs.readFileSync('/path/to/ca.pem'),
  //   },
  //   // 對靜態資源運作時可指定目錄
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000,
  //   index: 'index.html',
  //   open: true, // Open default browser
  // publicPath: 'http://localhost:8080/dist', // 設置文件讀取根路徑，預設是 '/'
  // }
}