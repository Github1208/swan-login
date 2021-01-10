/**
 * @file index.js
 * @author swan
 */

Page({
    data: {
        // // 智能小程序后台设置获取
        appkey: '',
        // 智能小程序后台设置获取
        AppSecret: '',
        photo: ''
    },
    onLoad() {
        // 监听页面加载的生命周期函数

    },
    async getphonenumber({detail}) {
        swan.showLoading({title: '手机号获取中...'});
        const {encryptedData, iv} = detail;
        const session_key = await this.getSessionKey();
        const appkey = this.getAppkey();
        this.getDecryptionphone(encryptedData, iv, appkey, session_key);
    },

    async getSessionKey() {
        const code = await this.getCode();
        const client_id = this.getAppkey();
        const sk = this.getAppSecret();

        return new Promise(r => {
            swan.request({
                url: 'https://spapi.baidu.com/oauth/jscode2sessionkey',
                method: 'POST',
                header: {
                    'Content-Type': 'Application/x-www-form-urlencoded'
                },
                data: {
                    code,
                    client_id,
                    sk
                },
                success(res) {
                    if (res.statusCode === 200) {
                        r(res.data.session_key);
                    }
                    console.log(res, 'getSessionKey');
                }
            })
        });
    },

    /**
     * 获取 appkey
     */
    getAppkey() {
        return this.data.appkey;
    },

    /**
     * 获取 AppSecret
     */
    getAppSecret() {
        return this.data.AppSecret;
    },

    /**
     * 获取百度 app 登录 code
     */
    getCode() {
        return new Promise((r) => {
            swan.getLoginCode({
                success: res => {
                    r(res.code);
                },
                fail: err => {
                    console.log('getLoginCode fail', err);
                }
            });
        });
    },

    /**
     * 获取解密后的手机号
     * @param {string} data 用户数据密文
     * @param {string} iv 加密向量
     * @param {string} appkey 小程序唯一标识
     * @param {string} sessionKey 登录的code换得的
     */
    getDecryptionphone(data, iv, appkey, sessionKey) {
        swan.request({

            // 仅为示例
            url: 'http://192.000.000.000:4040/userinfo/decrypt',
            method: 'POST',
            data: {
                data,
                iv,
                appkey,
                sessionKey
            },
            success: res => {
                if (res.statusCode === 200) {
                    swan.hideLoading();
                    this.setData('photo', res.data.data.mobile)
                }
            },
            complete() {
                swan.hideLoading();
            }
        });
    }
})
