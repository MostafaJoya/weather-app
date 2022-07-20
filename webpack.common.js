module.exports = {
  entry: "./src/js/app.js",
  module: {
    rules: [
      {
        test: /\.(svg|jpe?g|png|gif)&/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
