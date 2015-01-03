var webpack = require('webpack');

console.log("Packaging for '" + process.env.NODE_ENV + "'");
console.log("----------------------------------");


var options = {
  cache: true,
  entry: {
    app: ['./index'],
    vendors: ['react']
  },
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
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
    options.entry.app = ['webpack/hot/dev-server', './index'];
    break;
}


module.exports = options;
