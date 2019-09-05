// rules
module.exports = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    // options can put in .babelrc
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
  }
};