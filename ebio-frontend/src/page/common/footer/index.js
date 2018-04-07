/*
 * @Author: jecyu
 * @Date: 2018-01-21 12:25:29
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-22 22:44:00
 */


require('./index.scss');
const FloatLayer = require('../../../components/FloatLayer/float_layer');
const _ebio = require('../../../util/ebio');
const _user = require('../../../service/user_service');

const page = {
  // 初始化
  init() {
    page.onLoad();
  },
  onLoad() {
    page.bindEvent();
  },
  bindEvent() {
    const _this = this;
    /* ================ 登录浮出层逻辑 =================== */
    const login_modal = $('#passport-login-pop')[0];
    // 这里要传入 DOM 对象，非 jQuery对象
    const layer = new FloatLayer(login_modal);
    // 取得登录按钮
    const $login_pop_btn = $('.js-login');
    // 找到弹出框 login-modal
    const $login_modal = $('#passport-login-pop');
    // layer.show();
    $login_pop_btn.click((event) => {
      event.stopPropagation();
      layer.show();
    });
    $login_modal.find('.modal-login__closebtn').click(() => {
      layer.hide();
    });

    /* ================ 登录逻辑 =================== */
    // 验证表单
    $('.modal-login__form :input').blur(function validate() {
      const $parent = $(this).parent();
      // 删除以前的提醒信息
      $parent.find('.pass-item-tips').remove();
      // 表单字段的验证
      _this.formValidate($(this), $parent);
    });

    // 提交表单
    $('#login-submit').click((event) => {
      // 防止冒泡，出现多次请求 bug
      event.stopPropagation();
      _this.submit();
    });

    // 如果按下回车，也进行提交
    $('.modal-login__form').keyup((e) => {
      // keyCode == 13 表示回车键
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },
  /**
   * 提交表单
   */
  submit() {
    const _this = this;
    const formData = {
      username: $.trim($('#inpt-account-login').val()),
      password: $.trim($('#inpt-pwd-login').val())
    };
    // 触发失去焦点事件
    $('.modal-login__dialog :input').trigger('blur');
    // error 元素的长度
    const num_error = $('.modal-login__dialog .isError').length;
    if (num_error) {
      // 阻止表单提交
      return false;
    }
    // 提交
    _user.login(formData, (res) => {
      // 重定向到原来的入口页面
      window.location.href = _ebio.getUrlParam('redirect') || './index.html';
    }, (errMsg) => {
      $('.error-item').show().find('.err-msg').text(errMsg);
    });
    return true;
  },
  /**
   * formValidate 验证表单字段
   * @param {object} formField jQuery 对象 表单字段
   * @param {object} formContainer jQuery 对象 表单字段容器
   */
  formValidate(formField, formContainer) {
    // 表单字段的值
    const field_value = $.trim(formField.val());
    // 验证用户名
    if (formField.is('#inpt-account-login')) {
      if (field_value === '') {
        const error_msg = '用户名不能为空';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      }
    }
    // 验证密码
    if (formField.is('#inpt-pwd-login')) {
      if (field_value === '') {
        const error_msg = '密码不能为空';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      }
    }
  }
};


$(document).ready(() => {
  page.init();
});
