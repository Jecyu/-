/*
 * @Author: jecyu
 * @Date: 2018-01-14 11:47:08
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-27 10:24:39
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
