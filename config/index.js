const path = require('path');
const fs = require('fs');

const dirname =
    process
        .cwd()
        .split(path.sep)
        .pop() + path.sep;
const cwd = process.cwd();

const testUrl = '';
const prodUrl = '';
const develop = '';

module.exports = {
    common: {
        entry: path.resolve(cwd, 'src'),
        root: path.resolve(cwd), // 根目录,
        path: path.resolve(path.resolve(cwd), './build'),
    },
    prod: {
        publicPath: prodUrl + dirname,
    },
    develop: {
        publicPath: '/web/' + dirname,
    }
};