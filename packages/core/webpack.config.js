const webpack = require("webpack");

module.exports = {
  entry: {
    core: __dirname + "/index.js"
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
    filename: "[name].js"
  }
};
