const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            {loader: "style-loader"}, // creates style nodes from JS strings
            {loader: "css-loader"}, // translates CSS into CommonJS
            {
              loader: 'postcss-loader',
              options: {
                 plugins: () => [autoprefixer()]
              }
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: ['./node_modules']
              }
            } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: { presets: ["@babel/env"] }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  // entry: './app.scss',
  // output: {
  //     //     This is necessary for webpack to compile
  //     //     But we never use style-bundle.js
  //     filename: 'style-bundle.js',
  //   },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [
//     new HtmlWebPackPlugin({
//       template: "./public/index.html",
//       filename: "./index.html"
//     }),
new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "style.css",
    chunkFilename: "[id].css"
  }),
    // new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin()
  ],
  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
};
