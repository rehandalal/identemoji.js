const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({
  entry: {
    builder: __dirname + "/src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true,
                  },
                ],
                "@babel/plugin-proposal-class-properties",
              ],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          "css-hot-loader",
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: ["raw-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: argv.mode === "production" ? "./" : "/",
    filename: "[name].js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      inject: "body",
    }),
  ],
  devServer: {
    contentBase: __dirname + "/dist",
    disableHostCheck: true,
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true,
  },
});
