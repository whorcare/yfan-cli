#!/usr/bin/env node

// 1. 配置可执行命令
const program = require('commander');
const chalk = require('chalk');

// 核心功能 1.创建项目 2.更改配置文件 3.UI界面 @vue/ui
program
    .command('create <app-name>') // 基础命令
    .description('create a new project') // 描述
    .option('-f, --force', 'overwrite target directory if it exists') // 如果重名? 强制创建模式
    .action((name, cmd) => { // 动作
        // 调用create模块去创建
        require('./server/create')(name, cmd);
    });

program
    .command('start') // 基础命令
    .description('yarn run gua start') // 描述
    .option('-p, --port <port>', '端口参数')
    .action((name, cmd) => { // 动作
        // run
        require('./server/server')(name, cmd);
    });

program
    .command('build') // 基础命令
    .description('yarn run gua build') // 描述
    .option('-ev, --env <env>', '环境变量')
    .action((name, cmd) => {
        // 动作
        // build
        require('./server/build')(name, cmd);
    });

program
    .command('config [value]')
    .description('set config')
    .option('-g, --get <path>', 'get value form config')
    .option('-s, --set <path> <value>', 'set value form config')
    .option('-d, --delete <path>', 'delete option form config')
    .action((value, cmd) => {
        console.log(value, cmd);
    });

program
    .command('ui')
    .description('open gua-cli ui')
    .option('-p, --port <port>', 'delete option form config')
    .action((cmd) => {
        console.log(cmd);
        console.log('ui wait loading...');
    });

program
    .version(`gua-cli ${require('./package.json').version}`)
    .usage(`<command> [option]`)

program.on(('--help'), () => {
    console.log()
    console.log(`启动 ${chalk.cyan('gua <command> --help')} 查看基础命令`);
    console.log()
})

program.parse(process.agrv); // 获取用户执行命令时传入的参数