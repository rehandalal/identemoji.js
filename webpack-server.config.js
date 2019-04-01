const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: [
      __dirname + "/previewer/previewer.js",
      "milligram/dist/milligram.css"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
      },
      {
        test: /\.svg$/,
        use: ["raw-loader"]
      }
    ]
  },
  output: {
    path: __dirname + "/previewer/dist",
    publicPath: "./",
    filename: "[name].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/previewer/index.html",
      favicon: __dirname + "/previewer/favicon.png",
      inject: "body"
    })
  ],
  devServer: {
    contentBase: __dirname + "/previewer/dist",
    disableHostCheck: true,
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true
  }
};
