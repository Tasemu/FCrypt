module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'background.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
