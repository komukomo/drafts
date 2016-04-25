module.exports = {
  context: __dirname + '/src',
  entry: {
    'application': './es2015/application',
  },
  output: {
    path: __dirname + '/dist/javascript',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
