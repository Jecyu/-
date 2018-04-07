/*
 * File Created: Thursday, 5th April 2018 11:46:56 pm
 * Author: <<Jecyu>> (<<jecyulin@foxmail.com>>)
 * -----
 * Last Modified: Thursday, 5th April 2018 11:47:21 pm
 * Modified By: <<Jecyu>> (<<jecyulin@foxmail.com>>>)
 */

require('./index.scss');
require('../../page/common/index.js');
const _ebio = require('../../util/ebio.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
  },
  onLoad() {
    this.bindEvent();
    // 要渲染的类型
    const type = _ebio.getUrlParam('type') || 'default';
    // 找到对应的元素
    const $element = $(`.${type}-success`);
    // 显示对应的提示元素
    $element.show();
  },
  bindEvent() {
  }
};

$(document).ready(() => {
  page.init();
});
