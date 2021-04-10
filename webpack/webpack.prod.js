const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const config = require('../config/index.js')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩
const TerserPlugin = require('terser-webpack-plugin'); // js压缩
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = function () {
    return merge(common, {
        mode: 'production',
        optimization: {
            // 优化
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                        cache: true, // 开启缓存
                        parallel: true, // 开启多线程压缩
                        compress: {
                            // 配置
                            //  是有有必要开启
                            warnings: true, // 关闭警告：删除无法访问的代码或未使用的声明等时显示警告
                            drop_console: true,
                            drop_debugger: true,
                        },
                    },
                }),
            ],
        },
        output: {
            publicPath: './',
        },
        plugins: [
            new OptimizeCssAssetsPlugin(), // 压缩
            new CleanWebpackPlugin(),
            new CleanWebpackPlugin(['build'], {
                root: path.resolve(process.cwd()),
            }),
        ],
    });
}