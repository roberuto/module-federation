const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: path.resolve("src/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve("dist"),
  },
  resolve: {
    alias: {
      src: path.resolve("src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      reactDOM: path.resolve(__dirname, "./node_modules/react-dom"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "react-example",
      remotes: {
        "mf-components-library": "componentsLibrary@http://localhost:8080/remoteEntry.js",
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
};
