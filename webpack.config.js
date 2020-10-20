let webpack = require("webpack");

module.exports = {
  entry: "./client/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        loaders: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "'production'",
    }),
  ],
};
