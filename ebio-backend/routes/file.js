const express = require('express');
// 引入软件下载控制器
const file = require('../controllers/file/file');

const router = express.Router();


// 软件下载
// 静态文件所在的目录
const dir = `${global.appRoot}/public/`;
router.get('/download.do', file.downLoad(dir));

module.exports = router;
