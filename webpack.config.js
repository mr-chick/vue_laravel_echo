const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  }
};