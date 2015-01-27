var webpack = require('webpack');

console.log("Packaging for '" + process.env.NODE_ENV + "'");
console.log("----------------------------------");


var options = {
  cache: true,
  entry: {
    app: ['./app'],
    vendors: ['flux', 'typed-react', 'react/addons', 'react']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  module: {
    loaders: [
      { test: /\.css$/, loaders: ["style-loader", "css-loader" /*doesn't work:"autoprefixer-loader?browsers=last 2 version"*/] }
    ]
  }
};


switch (process.env.NODE_ENV) {
  case "dev":
    break;
  case "prod":
    options.output.path = './dist';
    break;
  case "watch":
    break;
  case "hot":
    options.output.publicPath = '/build';
    options.entry.app = ['webpack/hot/dev-server', './app'];
    break;
}


module.exports = options;
