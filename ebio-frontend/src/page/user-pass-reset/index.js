/*
 * @Author: jecyu
 * @Date: 2018-01-22 22:49:10
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-23 00:24:24
 */

require('./index.scss');
require('../../page/common/index.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
  },
  onLoad() {
    this.bindEvent();
  },
  bindEvent() {}
};

$(document).ready(() => {
  page.init();
});
