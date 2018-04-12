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

    /* =============== 为当前所有的服务项目建立链接 ================= */
    // 取得服务项目容器
    const $cards = $('.card-list .card');
    // 监听点击事件
    $cards.each(function bandleClick() {
      // 取得当前服务项目的 key 值
      const keyfrom = $(this).attr('data-key');
      $(this).click(() => {
        window.location.href = `./service_intro.html?keyfrom=${keyfrom}`;
      });
    });
  },
  loadClientWord() {

  }
};

$(document).ready(() => {
  page.init();
});
