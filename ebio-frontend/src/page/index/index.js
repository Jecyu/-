/**
 * @Author: Jecyu
 * @Date: 2017-10-23 10:38:07 am
 * @Modified By: JeCyu
 * @Last Modified time: 2017-11-20 12:01:05 pm
 */
// localstorage


require('./index.scss');
require('../../page/common/index.js');
const Swiper = require('../../components/swiper/swiper.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
  },
  onLoad() {
    this.bindEvent();
  },
  bindEvent() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
};

$(document).ready(() => {
  page.init();
});
