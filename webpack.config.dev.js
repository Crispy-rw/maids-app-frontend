const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// const autoprefixer = require("autoprefixer");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index_bundle.js"
  },
  devServer: {
    stats: "minimal",
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new ErrorOverlayPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, "./.env")
    })
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};
