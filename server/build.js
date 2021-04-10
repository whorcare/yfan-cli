#!/usr/bin/env node

const webpack = require('webpack');
const path = require('path');
const ora = require('ora'); // loading
const webpackConfig = require('../webpack/webpack.prod.js')({});

module.exports = function (params) {
    let loading = ora(`打包中...`);
    loading.start()
    webpack(webpackConfig, function(err, status) {
        loading.stop();
        if (err) throw err;
    });
}