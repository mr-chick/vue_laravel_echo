const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
        path: path.resolve('../dist'),
        filename: 'build.js',
        library: 'vue_laravel_echo',
        libraryTarget: 'commonjs2'
      },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }, 
};

// npx webpack