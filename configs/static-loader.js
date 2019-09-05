// url-loader 使用需要依賴 file-loader
// rules
module.exports = {
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
}