const path = require("path");
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
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    port: 8080,
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
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "componentsLibrary",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./LikeButton": "./src/components/LikeButton",
        "shareable/LikeButton": "./src/shareable/LikeButton",
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
