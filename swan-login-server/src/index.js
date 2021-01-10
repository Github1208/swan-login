/**
 * @file index.js
 * @author swan
 * @desc 小程序用户数据解密
 */

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const {getIp} = require('./../utils');

const {decrypt} = require('../utils/decrypt');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/userinfo/decrypt', (req, res) => {
    console.log(decrypt(req.body));
    res.send(decrypt(req.body));
});

//配置服务端口
const server = app.listen(4040, () => {
    console.log("node接口服务正常运行");
    console.log('请求链接： ', `http://${getIp()}:4040/userinfo/decrypt`);
});
