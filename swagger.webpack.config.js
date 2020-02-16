/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = env => {
  return {
    mode: 'development',
    entry: './swagger/swaggerUIBundle.ts',
    output: {
      path: path.resolve(__dirname, 'swagger'),
      filename: 'swagger.bundle.js',
    },
    plugins: [
      // This makes it possible for us to safely use env vars on our code
      new webpack.DefinePlugin({
        'process.env.FILE_NAME': JSON.stringify(env.FILE_NAME),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                insert: 'head', // insert style tag inside of <head>
                injectType: 'singletonStyleTag', // this is for wrap all your style in just one style tag
              },
            },
            'css-loader',
          ],
        },
      ],
    },
  };
};
