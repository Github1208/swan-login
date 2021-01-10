/**
 * @file decryption.js
 * @author swan
 * @desc 百度智能小程序用户数据解密
 */

const Crypto = require('./../lib/cryptojs').Crypto;

const PHOTO_LEN = 11;
const PHOTO_LOC = '"mobile":"';


const base64decode = base64Str => {
    return Crypto.util.base64ToBytes(base64Str);
}

/**
 * 获取解密后的手机号
 * @param {string} data 用户数据密文
 * @param {string} iv 加密向量
 * @param {string} appkey 小程序唯一标识
 * @param {string} sessionKey 登录的code换得的
 * @return {Object} 解密之后的手机号
 */
const decrypt = ({data, iv, appkey, sessionKey}) => {

    // base64decode 使用 CryptoJS 中 Crypto.util.base64ToBytes() 对参数进行 base64解码
    const encryptedData = base64decode(data);
    const key = base64decode(sessionKey);
    const tempIv = base64decode(iv);

    const mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

    const bytes = Crypto.AES.decrypt(encryptedData, key, {
        asBpytes: true,
        iv: tempIv,
        mode: mode
    });

    const i = bytes.indexOf(PHOTO_LOC) + PHOTO_LOC.length;
    const mobile = bytes.slice(i, i + PHOTO_LEN);

    return {
        code: 0,
        errMsg: '手机号解密成功',
        data: {mobile}
    };
}

module.exports = {
    decrypt
}