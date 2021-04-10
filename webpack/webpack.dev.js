// 本地dev环境 执行

const webpack = require('webpack');
const merge = require('webpack-merge');
const VConsolePlugin = require('vconsole-webpack-plugin');
const common = require('./webpack.common');

module.exports = function() {
    return merge(common, {
        mode: 'development',
        devtool: 'source-map', // dev调试打包代码
        devServer: Object.assign(
            {
                contentBase: './build', // contentbase代表html页面所在的相对目录
                useLocalIp: true, // 自动打开浏览器
                port: 10089,
                disableHostCheck: true, // 解决 Invalid Host header
                proxy: {
                    '/web/webApi': {
                        target: 'https://www.baidu.com',
                        secure: false,
                        changeOrigin: true,
                    },
                },
                hot: true,
                open: true,
                stats: 'errors-only', // 报错输出
            },
            {}
        ),
        plugins: [
            new webpack.DefinePlugin({
                // 定义环境变量
                'process.env': {
                    NODE_ENV: JSON.stringify('dev'),
                },
            }),
            new VConsolePlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
    });
}