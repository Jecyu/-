/*
 * @Author: jecyu
 * @Date: 2018-01-19 21:17:07
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-27 10:25:59
 */

require('./index.scss');
require('../../page/common/index.js');
const _ebio = require('../../util/ebio.js');
const _user = require('../../service/user_service.js');

const page = {
  // 初始化
  init() {
    this.onLoad();
  },
  onLoad() {
    this.bindEvent();
    // 给必填的字段添加标识
    $('form :input.required').each(function requiredFiled() {
      const $required = $('<strong class="high">*</strong>');
      // 在文本框后面追加一个红色的小星星标识
      $(this).parent().append($required);
    });
  },
  bindEvent() {
    // 存储 page 对象
    const _this = this;
    // 验证表单
    $('.pass-reg form :input').blur(function validate() {
      const $parent = $(this).parent();
      // 删除以前的提醒信息
      $parent.find('.pass-item-tips').remove();
      // 表单字段的验证
      _this.formValidate($(this), $parent);
    });

    /* ==== 提交表单 ==== */
    $('#submit-register').click((event) => {
      // 防止冒泡，出现多次请求 bug
      event.preventDefault();
      event.stopPropagation();
      _this.submit();
      return false;
    });

    // 如果按下回车，也进行提交
    $('.mod-reg').keyup((e) => {
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
      username: $.trim($('#inpt-account').val()),
      password: $.trim($('#inpt-pwd').val()),
      passwordConfirm: $.trim($('#inpt-pwd2').val()),
      phone: $.trim($('#inpt-phone').val()),
      email: $.trim($('#inpt-email').val())
    };
    // 判断是否勾选协议
    if (!$('#check-isAgree').prop('checked')) {
      return false;
    }
    // 触发失去焦点事件
    // error 元素的长度
    const num_error = $('form .isError').length;
    if (num_error) {
      // TODO 阻止表单提交, 需要禁用 按钮点击
    }
    // 提交
    _user.register(formData, (res) => {
      // 重定向到结果页面
      window.location.href = './result.html?type=register';
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
    if (formField.is('#inpt-account')) {
      // 把32bit编码的中文字符的一个汉字转为两个英文字符
      let field_value_convert = field_value.replace(/[xd800-xffff]/g, 'a');
      // 把16bit字符串中的一个汉字转为两个英文字符
      field_value_convert = field_value.replace(/[\u4000-\u9fa5]/g, 'aa');

      if (field_value_convert === '' || field_value_convert > 14) {
        const error_msg = '中英文均可，最长14个英文或7个汉字';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        /* === 异步验证用户名是否存在 === */
        const ok_msg = '该用户名可用';
        _user.checkUsername(field_value, (res) => {
          formContainer.append(`<span class='pass-item-tips isSuccess'>${ok_msg}</span>`);
        }, (errMsg) => {
          formContainer.append(`<span class='pass-item-tips isError'>${errMsg}</span>`);
        });
      }
    }
    // 验证密码
    if (formField.is('#inpt-pwd')) {
      if (field_value === '' || field_value.length < 6 || field_value.length > 16) {
        const error_msg = '请输入6到16位密码，区分大小写';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        const ok_msg = '输入正确';
        formContainer.append(`<span class='pass-item-tips isSuccess'>${ok_msg}</span>`);
      }
    }
    // 验证密码是否一致
    if (formField.is('#inpt-pwd2')) {
      if (field_value === '' || $.trim($('#inpt-pwd').val()) !== field_value) {
        const error_msg = '密码不一致';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        const ok_msg = '输入正确';
        formContainer.append(`<span class='pass-item-tips isSuccess'>${ok_msg}</span>`);
      }
    }
    // 验证国内手机号
    if (formField.is('#inpt-phone')) {
      if (field_value === '' || (field_value !== '' && !/^1\d{10}$/.test(field_value))) {
        const error_msg = '手机号码格式不正确';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        const ok_msg = '输入正确';
        formContainer.append(`<span class='pass-item-tips isSuccess'>${ok_msg}</span>`);
      }
    }
    // 验证邮箱
    if (formField.is('#inpt-email')) {
      if (field_value === '' || (field_value !== '' && !/.+@.+\.[a-zA-Z]{2,4}$/.test(field_value))) {
        const error_msg = '请输入正确的 E-mail 地址';
        formContainer.append(`<span class='pass-item-tips isError'>${error_msg}</span>`);
      } else {
        const ok_msg = '输入正确';
        formContainer.append(`<span class='pass-item-tips isSuccess'>${ok_msg}</span>`);
      }
    }
  }
};

$(document).ready(() => {
  page.init();
});
