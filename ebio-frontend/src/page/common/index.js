/*
 * File Created: Sunday, 1st April 2018 9:35:37 pm
 * Author: <<Jecyu>> (<<jecyulin@foxmail.com>>)
 * -----
 * Last Modified: Friday, 6th April 2018 12:03:46 pm
 * Modified By: <<Jecyu>> (<<jecyulin@foxmail.com>>>)
 */

require('./main.scss');
require('font-awesome/scss/font-awesome.scss');
require('./nav/index.js');
require('./nav-simple/index.js');
require('./nav-simple-2/index.js');
require('./footer/index.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
  },
  onLoad() {
    this.bindEvent();
  },
  bindEvent() {
    this.prepareLogin();
  },
  /**
   * 准备登录
   */
  prepareLogin() {
    const _this = this;
  }
};

$(document).ready(() => {
  page.init();
});
