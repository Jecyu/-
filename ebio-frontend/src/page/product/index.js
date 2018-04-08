/*
 * @Author: jecyu
 * @Date: 2018-01-10 23:22:24
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-13 20:44:54
 */

require('./index.scss');
require('../../page/common/index.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
    // 设置下划线为第一个 nav 下边
    $('.product-nav  i').css(
      'left',
      ($($('a[href^="#"]')[0]).offset().left + ($($('a[href^="#"]')[0]).width() / 2)) - 20,
    );
  },
  onLoad() {
    this.bindEvent();
  },
  bindEvent() {
    const $root = $('html, body');
    // 去得当前二级导航的所有链接
    const $sub_navs = $('.product-nav a[href^="#"]');
    /* ======================= Section 滚动动画 ======================== */
    $sub_navs.each(function bandleClick() {
      $(this).click(() => {
        // 获得要滚动的目标id
        const target_id = $(this).attr('href').substring(1);
        // 获得要滚动的 section
        const target_section = $(`div[id="${target_id}"]`);
        // 单击链接滚动到对应的部分
        $root.animate(
          {
            scrollTop: $(target_section).offset().top - 100
          }, // 减去导航栏的高度
          1000,
          'swing',
        );
      });
    });
    /* ======================= 产品导航条检测动画 ======================== */
    $(window).scroll((event) => {
      // 如果滚动到导航栏
      if ($(document).scrollTop() > 590) {
        $('.product-nav').attr('class', 'product-nav nav-fixed');
        // console.log('fixed');
      } else {
        $('.product-nav').attr('class', 'product-nav');
      }

      /* ======================= 产品导航下划线滚动动画 ======================== */
      // 获取页面所有的部分
      const sections = $('.zui-section');
      for (let i = 0, len = sections.length; i < len; i += 1) {
        const section = $(sections[i]);
        // 当前滚动的地方的窗口顶端到整个页面顶端的距离
        const winH = $(window).scrollTop();
        // 获取指定部分的页面位置
        // 位置为离它的最近position不为static祖先元素距离;
        const sectionH = section.offset().top;
        // 当前的 section id
        const section_id = section.attr('id');

        // 取得当前 sectionH 比 winH 大的部分，其他小的不进行处理
        if (sectionH > winH) {
          const query_selector = `a[href="#${section_id}"]`;
          // 目标导航链接
          const $targetNav = $(query_selector);
          const targetNav_x = $targetNav.offset().left;
          const targetNav_width = $targetNav.width();
          // 激活
          $('a[href^="#"]').attr('class', 'nav');
          $targetNav.attr('class', 'nav current');
          // 滚动下划线
          $('.product-nav  i').css(
            'left',
            (targetNav_x + (targetNav_width / 2)) - 20,
          );
          // 进入下一次循环
          break;
        }
      }
    });
  }
};

$(document).ready(() => {
  page.init();
});
