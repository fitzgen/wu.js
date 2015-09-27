var webpack = require("webpack");
var fs = require("fs");
var path = require("path");
var distDir = path.join(__dirname, "dist");

module.exports = [
  // Plain build.
  {
    entry: "./wu.js",
    output: {
      path: distDir,
      filename: "wu.js",
      library: "wu",
      libraryTarget: "umd",
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel?optional[]=runtime'
        }
      ]
    }
  },

  // Debug build.
  {
    entry: "./wu.js",
    output: {
      path: distDir,
      filename: "wu.debug.js",
      library: "wu",
      libraryTarget: "umd",
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel?optional[]=runtime'
        }
      ]
    },
    devtool: "#inline-source-map"
  },

  // Minified build.
  {
    entry: "./wu.js",
    output: {
      path: distDir,
      filename: "wu.min.js",
      library: "wu",
      libraryTarget: "umd",
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel?optional[]=runtime'
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ],
  }
];
