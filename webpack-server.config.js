const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({
  entry: {
    previewer: [
      __dirname + "/src/previewer/previewer.js",
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
    path: __dirname + "/dist/previewer",
    publicPath: argv.mode === "production" ? "./" : "/",
    filename: "[name].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/previewer/index.html",
      favicon: __dirname + "/src/previewer/favicon.png",
      inject: "body"
    })
  ],
  devServer: {
    contentBase: __dirname + "/dist/previewer",
    disableHostCheck: true,
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true
  }
});
