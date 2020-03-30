const webpack = require("webpack");

module.exports = {
  entry: {
    core: __dirname + "/src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "identemoji-core.js",
    library: "Identemoji",
  },
};
