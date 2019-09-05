// devServer : 預設 8080, 可修改如下(以下配置皆可省略)
module.exports = {
  host: '0.0.0.0',
  // 自動設置 HTTPS，也可自己提供certificate文件
  https: true,
  https: {
    key: fs.readFileSync('/path/to/server.key'),
    cert: fs.readFileSync('/path/to/server.crt'),
    ca: fs.readFileSync('/path/to/ca.pem'),
  },
  // 對靜態資源運作時可指定目錄
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 9000,
  index: 'index.html',
  open: true, // Open default browser
}