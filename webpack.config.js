const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    content: './src/js/main.js',
    background: './src/js/service.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({}),
                require('cssnano')({ preset: 'default' }),
              ],
              minimize: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  watch: true,

};
