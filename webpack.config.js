const path = require('path')
const DEST = path.resolve(__dirname, 'dist')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: DEST,
        filename: "bundle.js"
    },
    module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel?cacheDirectory',
            exclude: [/node_modules/],
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
          }
        ]
    }
};
