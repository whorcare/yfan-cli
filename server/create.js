// 创建项目
const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer'); // 选择插件模块
const chalk = require('chalk');
const Creator = require('../creator/Creator');

module.exports = async function(projectName, options) {
    const cwd = process.cwd(); // 获取当前目录
    const targetDir = path.join(cwd, projectName); // 目标目录

    if (fs.existsSync(targetDir)) {
        // 判断是否存在当前目录
        if (options.force) {
            // 强制创建新
            await fs.remove(targetDir); // 删除当前目录
        } else {
            // 配置询问的方式
            let { action } = await Inquirer.prompt([
                {
                    name: 'action',
                    type: 'list', // 类型
                    message: '当前目录已存在，是否覆盖？',
                    choices: [
                        { name: 'Overwrite(覆盖)', value: 'Overwrite' },
                        { name: 'Cancel(取消)', value: false },
                    ],
                },
            ]);

            if (!action) {
                return;
            } else if (action === 'Overwrite') {
                console.log(`文件 ${chalk.red('删除中...')}`);
                await fs.remove(targetDir);
                console.log(`文件 ${chalk.cyan('删除完成!')}`);
            }
        }
    }

    // 创建项目
    const creator = new Creator(projectName, targetDir);
    creator.create(); // 创建
};
