const webpack = require("webpack");

module.exports = {
  entry: {
    core: __dirname + "/src/core/index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name]/[name].js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: __dirname + "/previewer",
    disableHostCheck: true,
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    historyApiFallback: true
  }
};
