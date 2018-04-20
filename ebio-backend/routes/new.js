const express = require('express');

// 引入新闻控制器
const New = require('../controllers/new/new');

const router = express.Router();

router.get('/list.do', New.getPostList);

module.exports = router;
