// babel配置预设
const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@vue/babel-preset-jsx',
];

// 插件
const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
];

module.exports = {
    presets,
    plugins,
};
