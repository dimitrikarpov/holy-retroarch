const path = require("path")

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: {
      type: "module",
    },
  },
  devServer: {
    static: "./dist",
  },
  experiments: {
    outputModule: true,
  },

  resolve: {
    fallback: {
      path: false,
      fs: false,
    },
  },
}
