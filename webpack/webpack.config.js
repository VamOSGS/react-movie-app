const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const production = require('./webpack.config.prod');
const development = require('./webpack.config.dev');
const PATHS = require('./PATHS');
require('dotenv').config();

const { ENV } = process.env;
const pathsToClean = ['dist'];

const cleanOptions = {
  root: path.resolve(),
  verbose: true,
  dry: false,
};

const common = {
  entry: PATHS.APP,
  output: {
    path: PATHS.DIST,
    filename: 'app.bundle.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    modules: ['node_modules', PATHS.SRC],
    extensions: ['.js', '.jsx', '.json', '.less'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets/*', to: 'assets/' }],
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: pathsToClean,
      ...cleanOptions,
    }),
  ],
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    flagIncludedChunks: true,
    mergeDuplicateChunks: false,
    concatenateModules: true,
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     react: {
    //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //       name: 'react',
    //       reuseExistingChunk: true,
    //     },
    //     vendor: {
    //       test: /node_modules\/(?!react)/,
    //       name: 'vendor',
    //       chunks: 'all',
    //       enforce: true,
    //     },

    //   },
    // },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

module.exports = () => {
  const config = merge(common, ENV === 'DEV' ? development : production);
  return config;
};
