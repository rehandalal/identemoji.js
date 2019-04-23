const webpack = require("webpack");

const GenerateThemeJSONPlugin = require("./GenerateThemeJSONPlugin");

module.exports = {
  entry: {
    core: __dirname + "/src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.svg$/,
        use: ["raw-loader"]
      }
    ]
  },
  plugins: [new GenerateThemeJSONPlugin()],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "output.js",
    library: "defaultTheme"
  }
};
