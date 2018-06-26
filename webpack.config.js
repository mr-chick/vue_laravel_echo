const path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          //     plugins: [
          //       require('@babel/plugin-proposal-object-rest-spread'),
          //       require('babel-plugin-transform-class-properties')
          //     ]
          }
        },
    }],
  },
  externals: {
    Echo: 'laravel-echo',
  },
};