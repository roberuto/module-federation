const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const pgk = require("./package.json");

module.exports = {
  entry: "./lib/index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "loader.js",
    library: "loader",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "loader",
      shared: {},
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        SCRIPT: "http://localhost:8080/remoteEntry.js",
        CONTAINER: "componentsLibrary",
      }),
    }),
  ],
};
