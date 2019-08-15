# React-Template

這是一個簡單的React 目錄模板，使用我自己的配置。



## Command

1. npm run ref: 返回 Webpack 相關指令幫助

2. npm run serve: 啟動 webpack-dev-server 服務

3. npm run dev: 以開發模式編譯，並 watch 文件變化

4. npm run build: 以生產模式編譯



## Use Modules

**需要安裝的 NPM 模組**

1. webpack, webpack-cli, webpack-dev-server

2. babel-loader, @babel/core, @babel/preset-env, @babel/preset-react

3. sass-loader, css-loader, node-sass, mini-css-extract-plugin, optimize-css-assets-webpack-plugin

4. file-loader, url-loader

5. html-webpack-plugin

6. react, react-dom


**配置說明**

1. Webpack 指令

須透過 npm 指令調用 webpack 指令，直接在終端輸入會 Command Not Found.

基本編譯： webpack (預設用 production 模式)

指定 config 檔： webpack --config react.config.js

指定編譯開發模式： webpack --mode development

指定編譯生產模式： webpack --mode production

指定編譯開發模式並監聽： webpack --mode development --watch

開啟 dev-server： webpack-dev-server


2. Config 檔配置

首先要安裝 webpack 基礎套件：

```cmd
$ npm install --save-dev webpack webpack-cli webpack-dev-server
```

配置部分總共我把它分成四部分：

  1. Babel 配置

  2. Sass 配置

  3. HTML template 配置

  4. Static files 配置


***第一部分： Babel***

首先看到第一部分，請先安裝如下，如果不使用react ，可以去掉最後一個

```cmd
$ npm install --save-dev babel-loader @babel/core @babel/preset-env [ @babel/preset-react ]
```

接著來到我們主要的 webpack.config.js 檔中：

以下為預設的配置，就是你沒有這個檔案，啟動 webpack 他就這樣執行。

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
```

接著我們加入 module 的 rules 的驗證規則：

同樣的，如果沒用到 react ，在presets 中的 react 就可以拿掉。

```js
module.exports = {
  // ...
  module: {
    rules: [
      // Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options 可以另外放在目錄裡的 .babelrc
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  }
}
```


***第二部分： Sass***

接著看到第二部分，請先安裝如下，如果不使用sass，就不用加入 node-sass 跟 sass-loader

```cmd
$ npm install --save-dev css-loader mini-css-extract-plugin [ node-sass sass-loader ]
```

然後編輯我們的 config 檔如下：

編譯順序是由下往上，也就是會先經由 sass-loader --> css-loader --> mini-css-extract-plugin 

順序處理引入的sass, scss, css檔案。記得最後把 ExtractCss 放入 plugins 數組中使用。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 使用 mini-css-extract-plugin 套件將 CSS 內容以外部引入方式使用，詳細配置請見套件官網
const ExtractCss = new MiniCssExtractPlugin({});

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      // Sass
      {
        test: /\.(sa|sc|c)ss$/, // 純CSS 只需要 /\.css$/，並把 sass-loader 移除即可
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              // 若 hmr 不作動，下方式強制執行的方式
              reloadAll: true
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  },
  // Plugins
  plugins: [
    ExtractCss
  ],
}
```


***第三部分： HTML template***

第三部分，請安裝 html-webpack-plugin 套件，此步驟用以使用自定義模板配置。

```cmd
$ npm install --save-dev html-webpack-plugin
```

接著配置 config，注意使用套件的 minify 選項時的 webpack 版本，第四版的需配置較長的內容：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 創建套件
const Template = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
  // webpack v3
  minify: true,
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

module.exports = {
  // ...
  // Plugins
  plugins: [
    Template, ExtractCss
  ],
}
```


***第四部分： Static files***

第四部分誒靜態資源載入，請安裝如下：

```cmd
$ npm install --save-dev file-loader url-loader
```

配置使用上，使用 url-loader 不用另外配置 file-loader，但當url-loader引入的內容超過限制時，

會在背景自動調用 file-loader ，所以必須一起安裝。

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      // url-loader 使用需要依賴 file-loader
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000, // 小於 25KB 會以 base64 引入
              outputPath: 'assets' // 指定輸出目錄
            },
          },
        ],
      },
    ]
  }
}
```



## 關於檔案壓縮的問題

  - JS 壓縮

    由於 webpack 本身在生產模式下，會自動調用 TerserJSPlugin 這個 webpack 內建的套件壓縮 JS 檔，

    所以不用另外配置。

  - HTML 壓縮

    可以使用 html-webpack-plugin 的 minify 選項進行配置，僅需注意 webpack 版本即可。

  - CSS 壓縮

    CSS 壓縮可以使用 optimize-css-assets-webpack-plugin 套件配置如下：

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MiniCss = new OptimizeCSSAssetsPlugin({});

module.exports = {
  // ...
  optimization: {
    minimizer: [MiniCss]
  }
}
```

    但配置完會發現原本的 JS 壓縮功能不見了，這是因為如果指定了 optimization 的 minimizer，會覆蓋掉
    
    預設的配置，此時必須手動調用 TerserJSPlugin 並把它一起放進去 minimizer。

```js
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MiniCss = new OptimizeCSSAssetsPlugin({});
const MiniJS = new TerserJSPlugin({});

module.exports = {
  // ...
  optimization: {
    minimizer: [MiniCss, MiniJS]
  }
}
```
