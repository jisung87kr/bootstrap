const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const devMode = process.env.NODE_ENV !== "production";
devMode = false;

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/assets/',
    assetModuleFilename: '[path][name][ext][query]'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          },
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
          {loader: 'postcss-loader'},
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [].concat(devMode ? [] : [
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
    }),
    // new HtmlWebpackPlugin()
  ]),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    allowedHosts: 'all',
    port: 9002,
  },
};