/*
 * @Author: jecyu
 * @Date: 2018-01-21 12:25:29
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-22 22:44:00
 */


require('./index.scss');

const page = {
  // 初始化
  init() {
    page.onLoad();
  },
  onLoad() {
    page.bindEvent();
  },
  bindEvent() {
    // 取得登录按钮
    const $login_pop_btn = $('#login-popBtn');
    // 找到弹出框 login-modal
    const $login_modal = $('#passport-login-pop');
    const $login_modal_dialog = $login_modal.find('.modal-login__dialog');
    // close btn
    const $close_btn = $('.modal-login__closebtn');

    // 弹出登录框
    $login_pop_btn.on('click', () => {
      $login_modal.show();
    });

    // 绑定单击事件
    $close_btn.on('click', 'span', () => {
      $login_modal.hide();
    });

    // 实现单击对话框周围，关闭登录框
    $login_modal.on('click', () => {
      $login_modal.hide();
    });

    // 禁止冒泡，导致关闭对话框
    $login_modal_dialog.on('click', (event) => {
      event.stopPropagation();
    });
  }
};


$(document).ready(() => {
  page.init();
});
