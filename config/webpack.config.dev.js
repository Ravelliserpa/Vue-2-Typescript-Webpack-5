const helpers = require("./helpers");
const webpackConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const env = require("../environment/dev.env");

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: "file-loader",
  },
];

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new HtmlWebpackPlugin({
    inject: true,
    template: helpers.root("/public/index.html"),
    favicon: helpers.root("/public/favicon.ico"),
  }),
  new DefinePlugin({
    "process.env": env,
  }),
];

webpackConfig.devServer = {
  port: 8080,
  host: "localhost",
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  contentBase: "./src",
  open: true,
};

module.exports = webpackConfig;
