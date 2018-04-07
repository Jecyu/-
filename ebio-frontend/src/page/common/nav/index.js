/*
 * @Author: jecyu
 * @Date: 2017-12-24 00:14:45
 * @Last Modified by: jecyu
 * @Last Modified time: 2017-12-24 11:36:17
 */

require('./index.scss');
const _ebio = require('../../../util/ebio');
const _user = require('../../../service/user_service');

const page = {
  // 初始化
  init() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    // this.loadUserInfo();
  },
  bindEvent() {
    // 实现下拉菜单
    $('.js-drop-down').hover(function mouseIn() {
      $(this).find('ul').show();
    }, function mouseOut() {
      $(this).find('ul').hide();
    });

    // 退出点击事件（需求请求后端删除登录状态 cookie）
    $('.js-logout').click(() => {
      _user.logout((res) => {
        // 成功
        window.location.reload();
      }, (errMsg) => {
        _ebio.errorTips(errMsg);
      });
    });
  },
  /**
   * 加载用户信息
   */
  loadUserInfo() {
    _user.checkLogin((res) => {
      $('.user.not-login').hide()
        .siblings('.user.login')
        .show()
        .find('.username')
        .text(res.username);
    }, (errMsg) => {
    });
  }
};

$(document).ready(() => {
  page.init();
});
