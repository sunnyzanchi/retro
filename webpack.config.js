const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: 'public/js',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      Pages: path.join(__dirname, 'src/js/Pages'),
      Components: path.join(__dirname, 'src/js/Components'),
      img: path.join(__dirname, 'public/img')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      }
    ]
  }
}
