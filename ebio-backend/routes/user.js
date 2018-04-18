const express = require('express');
// 引入用户控制器
const User = require('../controllers/user/user');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// 检查用户名合法性
router.get('/check_valid.do', User.checkUsername);

// 用户注册
router.post('/register.do', User.register);

// 用户登录
router.post('/login.do', User.login);

// 用户退出
router.get('/logout.do', User.logout);

// 获取用户信息
router.get('/get_user_info.do', User.getUserInfo);

module.exports = router;
