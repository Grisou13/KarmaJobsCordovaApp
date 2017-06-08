var webpack = require('webpack');
var path = require('path');
var CordovaPlugin = require('webpack-cordova-plugin');


var BUILD_DIR = path.resolve(__dirname, 'www');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV ? process.env.NODE_ENV : "development")
            }
        }),
    new CordovaPlugin({
      config: 'config.xml',  // Location of Cordova' config.xml (will be created if not found)
      src: 'index.html',     // Set entry-point of cordova in config.xml
      platform: 'android', // Set `webpack-dev-server` to correct `contentBase` to use Cordova plugins.
      version: true,         // Set config.xml' version. (true = use version from package.json)
    })
  ]
};
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    )
    babelSettings.plugins.push("transform-react-inline-elements");
    babelSettings.plugins.push("transform-react-constant-elements");

} else {
    config.devtool = "#cheap-module-source-map"
    config.devServer = {
        contentBase: './public',
        hot: true,
        inline: true,
        host: "0.0.0.0",
        port: 2708
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}
module.exports = config;
