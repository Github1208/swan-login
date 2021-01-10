
/**
 * @file index.js
 * @author swan
 * @desc 工具函数
 */

const os = require('os');

const getIp = () => {
    const networkInterfaces = os.networkInterfaces();
    return networkInterfaces.en0[1].address;
};

module.exports = {
    getIp
}