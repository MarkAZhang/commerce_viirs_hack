const path = require('path')
const SRC = path.resolve(__dirname, 'src')
const DEST = path.resolve(__dirname, 'dist')

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
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
            loader: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:5]!postcss-loader',
          },
          {
            test: /\.(ttf|eot|png|jpg|gif|svg|woff2?)/,
            loader: 'url?limit=5000',
          },
        ]
    },
    postcss: function () {
      return [
        require('precss'),
        require('autoprefixer')({
          browsers: ['Firefox >= 31', 'last 2 Chrome versions'],
        }),
      ]
    },
    resolve: {
      extensions: ['', '.js', '.css'],
      root: SRC,
    }
};
