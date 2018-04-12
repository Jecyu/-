/*
 * File Created: Wednesday, 4th April 2018 9:20:14 pm
 * Author: <<Jecyu>> (<<jecyulin@foxmail.com>>)
 * -----
 * Last Modified: Wednesday, 4th April 2018 10:14:07 pm
 * Modified By: <<Jecyu>> (<<jecyulin@foxmail.com>>>)
 */

const _ebio = require('../util/ebio');

const _user = {
  /**
   * checkUsername 检查用户名合法性
   * @param {*} username 用户名
   * @param {*} resolve 请求成功回调函数
   * @param {*} reject 请求失败回调函数
   */
  checkUsername(username, resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/users/check_valid.do'),
      // url: _ebio.getServerUrl('/users/check_valid.do?str=admin&type=username'),
      data: {
        type: 'username',
        str: username
      },
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  /**
   * login 用户登录
   * @param {Object} userInfo 用户数据
   * @param {Function} resolve 请求成功回调函数
   * @param {Function} reject 请求失败回调函数
   */
  login(userInfo, resolve, reject) {
    _ebio.request({
      method: 'POST',
      url: _ebio.getServerUrl('/users/login.do'),
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  /**
   * 检查登录状态（通过是否能够取到用户信息来判断登录状态）
   * @param {Function} resolve 请求成功回调函数
   * @param {Function} reject 请求失败回调函数
   */
  checkLogin(resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/users/get_user_info.do'),
      method: 'GET',
      success: resolve,
      error: reject
    });
  },
  /**
   * 发送短信验证码
   * @param {Object} userInfo 用户数据
   * @param {Function} resolve 请求成功回调函数
   * @param {Function} reject 请求失败回调函数
   */
  getSmsVerifyCode(userInfo, resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/users/get_message_code.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  /**
   * resetPassword 重置密码
   * @param {object} userInfo 用户提交的数据
   * @param {Function} resolve 请求成功回调函数
   * @param {Function} reject 请求失败回调函数
   */
  resetPassword(userInfo, resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/users/forgot_reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  /**
   * register 用户注册
   * @param {object} userInfo 用户提交的数据
   * @param {Function} resolve 请求成功回调函数
   * @param {Function} reject 请求失败回调函数
   */
  register(userInfo, resolve, reject) {
    _ebio.request({
      method: 'POST',
      url: _ebio.getServerUrl('/users/register.do'),
      data: userInfo,
      success: resolve,
      error: reject
    });
  },
  /**
   * logout 登出
   * @param {Function} resolve 成功回调函数
   * @param {Function} reject 失败回调函数
   */
  logout(resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/users/logout.do'),
      method: 'GET',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _user;
