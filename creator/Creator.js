const downloadGitRepo = require('download-git-repo'); // 不支持promise
const util = require('util')
const path = require('path');

class Creator {
    constructor(projectName, targetDir) {
        this.name = projectName;
        this.target = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo); // 转换为promise方法
    }

    // 下载
    async download() {
        let requestUrl = `whorcare/yfan-cli-template`;
        let target =  this.downloadGitRepo(requestUrl, path.resolve(process.cwd()))
        return this.target
    }

    // 开始创建
    async create() {
        let downloadUrl = await this.download();
    }
}

module.exports = Creator;
