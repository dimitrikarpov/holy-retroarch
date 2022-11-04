const path = require("path")

module.exports = ({ development }) => ({
  entry: "./src/index.ts",
  devtool: development ? "inline-source-map" : false,
  mode: development ? "development" : "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
})
