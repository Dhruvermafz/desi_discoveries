// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.mdx$/,
        use: [
          {
            loader: "@mdx-js/loader",
          },
        ],
      },
    ],
  },
};
