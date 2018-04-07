/*
 * @Author: jecyu
 * @Date: 2018-01-22 22:49:10
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-23 00:24:24
 */

require('./index.scss');
require('../../page/common/index.js');
const _ebio = require('../../util/ebio');
const _user = require('../../service/user_service');

const page = {
  data: {
    username: '',
    phone: '',
    verifycode: '',
    authtoken: ''
  },
  // 初始化
  init() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    this.loadStepAccount();
  },
  bindEvent() {
    const _this = this;
    /* =========== 输入账户名后下一步按钮的点击 =============== */

    $('#submit-account').click((event) => {
      event.stopPropagation();
      // 账户名
      const username = $.trim($('#mod-forgot-account').val());
      // 当前输入框的容器
      const $formContainer = $('#mod-forgot-account').parent();
      // 清除以前提醒的消息
      $formContainer.find('.pass-item-tips').remove();

      if (username === '') {
        const error_msg = '用户名不能为空';
        $formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        // 异步验证用户名是否存在
        _user.checkUsername(username, (res) => {
          _this.data.username = username;
          // 加载下一步：安全验证
          _this.loadStepAuthentication();
        }, (errMsg) => {
          $formContainer.append(`<span class='pass-item-tips isError'>${errMsg}</span>`);
        });
      }
      // 取消默认的表单提交行为
      return false;
    });

    /* =================== 输入手机验证码后下一步按钮的点击 ================= */

    // 点击发送验证码
    $('#submit-vscode').click((event) => {
      event.stopPropagation();
      // 获取对应的手机号
      const phone = $.trim($('.js-inpt-phone').val());
      // 当前输入框的容器
      const $formContainer = $('.js-inpt-phone').parent();
      // 清除以前提醒的消息
      $formContainer.find('.pass-item-tips').remove();

      if (phone === '' || (phone !== '' && !/^1\d{10}$/.test(phone))) {
        const error_msg = '手机号格式不正确';
        $formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        // 提交手机号到后台
        _user.getSmsVerifyCode(phone, (res) => {
          // 存取返回的数据
          _this.data.verifycode = res.verifycode;
          _this.data.authtoken = res.authtoken;
        }, (errMsg) => {
        });
      }
    });

    // 点击下一步
    $('#submit-verifycode').click(() => {
      // 取得输入验证码
      const verifycode = parseInt($.trim($('#forgot-inpt-vscode').val()), 10);
      // 当前输入框的容器
      const $formContainer = $('#forgot-inpt-vscode').parent();
      // 清除以前提醒的消息
      $formContainer.find('.pass-item-tips').remove();

      if (verifycode === '' || (verifycode !== '' && !/^\d{6}$/.test(verifycode))) {
        const error_msg = '验证需为6位数字';
        $formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else if (verifycode === _this.data.verifycode) {
        // 验证码相等
        _this.loadStepPassword();
      }
      return false;
    });

    /* ======================== 输入新密码后确认按钮的点击 =================== */

    $('#submit-reset-password').click(() => {
      const password = $.trim($('#forgot-inpt-pwd').val());
      // 当前输入框的容器
      const $formContainer = $('#forgot-inpt-pwd').parent();
      // 清除以前提醒的消息
      $formContainer.find('.pass-item-tips').remove();

      if (password === '' || password.length < 6 || password.length > 16) {
        const error_msg = '请输入6到16位密码，区分大小写';
        $formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        const ok_msg = '输入正确';
        $formContainer.append(`<span class='pass-item-tips isSuccess'>${ok_msg}</span>`);
        // 发送请求
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgotToken: _this.data.authtoken
        }, (res) => {
          window.location.href = './result.html?type=pass-reset';
        }, (errMsg) => {
          $formContainer.append(`<span class='pass-item-tips isSuccess'>${errMsg}</span>`);
        });
      }

      return false;
    });
  },
  /**
   * 加载第一步：确认帐号
   */
  loadStepAccount() {
    const _this = this;
    _this.loadStepSection(1);
  },
  /**
   * 加载第二步：安全验证
   */
  loadStepAuthentication() {
    const _this = this;
    _this.loadStepSection(2);
  },
  /**
   * 加载第二步：安全验证
   */
  loadStepPassword() {
    const _this = this;
    _this.loadStepSection(3);
  },
  /**
   * 加载对应的步骤结构
   * @param {number} index 索引
   */
  loadStepSection(index) {
    // eq 从 0 开始，所以要减去1
    const step_index = index - 1;
    // 显示表单
    $('.mod-forgot__content .mod-forgot__step').eq(step_index)
      .show()
      .siblings()
      .hide();
    // 激活对应导航
    $('.mod-forgot__nav .mod-forgot__item').eq(step_index)
      .addClass('mod-forgot__item--is-actived')
      .siblings()
      .removeClass('mod-forgot__item--is-actived');
  }
};

$(document).ready(() => {
  page.init();
});
