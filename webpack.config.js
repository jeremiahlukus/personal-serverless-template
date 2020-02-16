const path = require('path');
const slsw = require('serverless-webpack');

const resolve = pth => path.resolve(__dirname, pth);
const join = pth => path.join(__dirname, pth);

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@root': resolve('./'),
      '@': resolve('./src'),
      '@utils/': resolve('./utils/'),
      '@models/': resolve('./models/'),
      '@env': resolve('./src/utils/environment')
    }
  },
  output: {
    libraryTarget: 'commonjs',
    path: join('.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
