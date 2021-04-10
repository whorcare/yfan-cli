const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack'); // 多线程打包
const HtmlWebpackPlugin = require('html-webpack-plugin');
var babelConfig = require('../babel.config.js');
const version = require('../package.json').version;
const { VueLoaderPlugin } = require('vue-loader');
const COMMONCONFIG = require('../config/index.js');
const root = COMMONCONFIG.common.root;

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [path.resolve(root, 'src')],
    options: {
        formatter: require('eslint-friendly-formatter'),
    },
});

const config = {
    entry: './src/js/index.js', // 配置模块的入口
    output: {
        path: COMMONCONFIG.common.path,
        publicPath: '/', // 静态资源时的路径
        // chunkFilename用来打包require.ensure方法中引入的模块
        chunkFilename: 'chunk/[name].[contenthash:8].js',
        filename: '[name].[hash].bundle.js',
    },
    // 防止node包，还有 setImmediate 的 profill注入到代码中
    node: {
        setImmediate: false,
        process: 'mock',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    // 引用模块
    resolve: {
        // 当遇到require('./data')这样的导入语句时，webpack会先去寻找./data.js文件，如果找不到则去找./data.json文件，如果还是找不到则会报错。
        extensions: [
            '.ts',
            '.mjs',
            '.js',
            '.jsx',
            '.tsx',
            '.vue',
            '.json',
            '.wasm',
        ],
        // 配置别名，在项目中可缩减引用路径
        alias: {
            '@src': path.resolve(root, 'src'),
        },
    },
    module: {
        // 用了noParse的模块将不会被loaders解析，所以当我们使用的库如果太大，并且其中不包含import require、define的调用，我们就可以使用这项配置来提升性能, 让 Webpack 忽略对部分没采用模块化的文件的递归解析处理
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [
            //将html文档以字符串形式导出,需要时,可以进行压缩
            {
                test: /\.(html|php)$/,
                loader: 'html-loader',
                options: {
                    attrs: [
                        'img:src',
                        'video:poster',
                        'video:src',
                        'source:src',
                    ],
                },
            },
            {
                test: /\.vue$/,
                use: [
                    'cache-loader', // 缓存到磁盘
                    {
                        loader: 'vue-loader',
                    },
                ],
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(__dirname, '../'),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(__dirname, '../'),
                            },
                        },
                    },
                    // 导入css 预处理器的一些公共的样式文件变量，比如：variables , mixins , functions，避免在每个样式文件中手动的@import导入，然后在各个css 文件中直接使用 变量。
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(
                                __dirname,
                                '../staitc',
                                'base.less'
                            ),
                            injector: 'append',
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|svga|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 8192,
                            name: function(file) {
                                var filename = file.replace(
                                    path.resolve(root, 'src') + path.sep,
                                    ''
                                ); // 去掉路径

                                filename = filename.split('.')[0]; // 去掉扩展名部分
                                return filename + '.[hash:10].[ext]';
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    esModule: false,
                    name: function(file) {
                        var filename = file.replace(
                            path.resolve(root, 'src') + path.sep,
                            ''
                        ); // 去掉路径
                        filename = filename.split('.')[0]; // 去掉扩展名部分
                        return filename + '.[hash:10].[ext]';
                    },
                },
            },
        ],
    },
    stats: 'errors-only', // 报错输出
    optimization: {}, // 主要是用来自定义一些优化打包策略
    plugins: [
        // 全局变量
        new webpack.DefinePlugin({
            GLOBAL_DATA: JSON.stringify({
                version,
                environment: process.argv.environment || '',
            }),
        }),
        new VueLoaderPlugin(),
        // 把所有样式包括css、less都打包到一个css文件 common.css中，然后再 link 进页面
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css',
        }),
        new HtmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            template: path.join(
                process.cwd(),
                './src/index.html'
            ), //指定模板页面
            //将来会根据此页面生成内存中的页面
            filename: 'index.html', //指定生成页面的名称，index.html浏览器才会默认直接打开
        }),
    ],
};

module.exports = config;