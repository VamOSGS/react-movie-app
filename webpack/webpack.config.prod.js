const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = require('./PATHS');
require('dotenv').config();

const production = merge(
  {
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
      ],
    },
  },
  parts.buildSetup('production'),
  parts.setMode('production'),
  parts.sourceMaps('source-map'),
  parts.styleLoader({}),
);

module.exports = production;
