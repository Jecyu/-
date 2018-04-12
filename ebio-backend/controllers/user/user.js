'use strict';

// 引入用户模型
const UserModel = require('../../models/user/user');
// 引入会话模型
const Session = require('../../models/session/session');


class User {
  constructor() {
    this.checkUsername = this.checkUsername.bind(this);
  }
  /**
   * checkUsername 检查用户名是否存在
   * @param {*} req 请求对象
   * @param {*} res 响应对象
   * @param {*} next 中间件函数
   */
  checkUsername(req, res, next) {
    // 存取表单提交的用户名
    const username = req.query.str;
    // 客户端提交的用户名类型：用户名 || 手机号 || 邮箱
    const type = req.query.type;
    // 查询对象
    const query = {};
    query[type] = username;

    UserModel.findOne(query, (err, doc) => {
      // 出现查找错误
      if (err) throw err;
      const user = doc;
      if (!doc) {
        // 找不到到匹配项
        res.json({
          status: 0,
          msg: '该用户可用'
        });
      } else { // 找到匹配项
        res.json({
          status: 1,
          msg: '用户已存在',
          data: doc
        });
      }
    });
  }
  register(req, res, next) {
    // 1. 对各个表单字段进行判断
    // 2. 需要对密码进行加密处理
    // 3. 存取表单提交的数据到数据库上里
    // 4. 发送响应状态
    // const new_password = this.hashPassword();
    // 定义新用户对象
    const newUser = {
      username: req.body.username,
      hashed_password: req.body.password,
      phone: req.body.phone,
      email: req.body.email
    };

    // 查询对象
    const query = {};
    query.username = newUser.username;

    // 查找用户是否存在
    UserModel.findOne(query, (err, doc) => {
      // 出现查找错误
      if (err) throw err;
      const user = doc;
      if (!doc) {
        // 找不到到匹配项
        res.json({
          status: 0,
          msg: '注册成功'
        });
        // 保存新用户
        UserModel.create(newUser);
      } else { // 找到匹配项
        res.json({
          status: 1,
          msg: '用户已存在',
          data: doc
        });
      }
    });
  }
  /**
   * login 登录
   */
  login(req, res, next) {
    // 请求主体
    const data = req.body;
    // 查询对象
    const query = {
      username: data.username,
      hashed_password: data.password
    };

    // 查找用户是否存在
    UserModel.findOne(query, (err, doc) => {
      // 出现查找错误
      if (err) throw err;
      const user = doc;
      if (!doc) {
        // 找不到到匹配项
        res.json({
          status: 1,
          msg: '用户名或密码错误'
        });
      } else { // 找到匹配项
        // 为认证存储 cookie 到客户端, 24 小时销毁
        res.cookie('user_id', user._id, { maxAge: 36000000 * 24 });

        // 重定向到入口页面

        // 返回响应 JSON 对象
        res.json({
          status: 0,
          msg: '登录成功',
          data: doc
        });
        // req.session.cookie.user_id = user._id;
        // req.session.user_id = user._id;
        // console.log(req.session.user_id);
        // console.log(req.session);

        // 把 session 保存到数据库
        // Session.create({
        //   session: { user_id: user._id }
        // });
      }
    });
  }
  /**
   * 加载已登录用户数据
   */
  getUserInfo(req, res, next) {
    // 查询对象
    // TODO 待处理 这里无法访问 req.session.user_id
    // 同理，退出时，也无法删除 req.session.user_id
    // console.log(req.session);
    console.log(req.cookies);

    // 取得存取在数据库的 session user_id

    const query = {
      _id: req.cookies.user_id
      // _id: req.session.user_id
      // _id: '5ace4c34cf78742518299d9c'
    };
    // 查找用户是否存在
    UserModel.findOne(query, (err, doc) => {
      // 出现查找错误
      if (err) throw err;
      const user = doc;
      if (!doc) {
        // 找不到到匹配项
        res.json({
          status: 1,
          msg: '该用户还未登录'
        });
      } else { // 找到匹配项
        res.json({
          status: 0,
          msg: '登录状态',
          data: doc
        });
      }
    });
  }
  logout(req, res, next) {
    // Destroys the session and will unset the req.session property.
    // delete req.session.user_id;
    // delete req.cookies.user_id;

    // 销毁 cookie
    // res.cookie('user_id', { maxAge: -1 });
    res.clearCookie('user_id');

    res.json({
      status: 0,
      msg: ''
    });
  }
  /**
   * 添加 bcrypt 加密
   */
  hashPassword(fn) {
  }
  /**
   * 认证用户的名称和密码、加密等处理
   */
  authenticate(name, pass, fn) {
    // 查询对象
    const query = {};
    query.username = name;

    // 查找用户是否存在
    UserModel.findOne(query, (err, doc) => {
      // 出现查找错误
      if (err) fn(err);
      const user = doc;
      // 用户不存在
      if (!doc) {
        return fn();
      }
      // 找到匹配项
      // 验证密码
      if (user.password === pass) {
        // 把用户信息穿回去回去
        return fn(null, user);
      }
      // 密码无效
      return fn();
    });
  }
}

module.exports = new User();
