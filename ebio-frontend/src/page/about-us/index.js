require('./index.scss');
require('../common/index.js');
const _ebio = require('../../util/ebio.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    const _this = this;
    // 初始化隐藏所有部分
    $('.zui-section').hide();
    // 要渲染的类型
    const type = _ebio.getUrlParam('type') || 'default';
    // 找到对应的元素
    const $element = $(`.section-${type}`);
    // 显示对应的提示元素
    $element.show();
    // 找到对应的导航元素链接
    const $element_nav_links = $('.tab-page .area-tabbar');
    $element_nav_links.each(function hightlight() {
      // 取得当前链接的 href 属性
      const href = $(this).attr('href');
      if (href.indexOf(type) !== -1) {
        // 取得当前链接的父元素
        $(this).parent()
          .addClass('active')
          .siblings()
          .remove('active');
      }
    });
  },
  bindEvent() {
  }
};

$(document).ready(() => {
  page.init();
});

