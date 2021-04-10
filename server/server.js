// run server
const WebpackDevServer = require('webpack-dev-server'); // Server服务
const webpack = require('webpack');
const config = require('../webpack/webpack.dev.js')({});
const devServerOptions = Object.assign({}, config.devServer);

module.exports = function() {
    const server = new WebpackDevServer(webpack(config), devServerOptions);
    server.listen(devServerOptions.port);
}