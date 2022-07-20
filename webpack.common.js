module.exports = {
  entry: "./src/js/app.js",
  module: {
    rules: [
      {
        test: /\.(svg|jpe?g|png|gif)&/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
