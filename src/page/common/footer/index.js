/*
 * @Author: jecyu 
 * @Date: 2018-01-21 12:25:29 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-22 22:44:00
 */

"use strict";

require("./index.scss");

const page = {
    // 初始化
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        // 居中
        /*     var $login_modal_left = $(document).width() / 2 + "px";
        var $login_modal_top = "100px";
        $login_modal.css({
            left: $login_modal_left,
            top: $login_modal_top,
            "z-index": 6000
        }); */

        this.bindEvent();
    },
    bindEvent: function () {
        // 取得登录按钮
        var $login_pop_btn = $('#login-popBtn');
        // 找到弹出框 login-modal
        var $login_modal = $("#passport-login-pop");
        var $login_modal_dialog = $login_modal.find(".modal-login__dialog");
        // close btn
        var $close_btn = $(".modal-login__closebtn");

        // 弹出登录框
        $login_pop_btn.on('click', function showLoginModal() {
            $login_modal.show();
        });

        // 绑定单击事件
        $close_btn.on('click', 'span', function closeLoginModal() {
            $login_modal.hide();
        });

        // 实现单击对话框周围，关闭登录框
        $login_modal.on('click', function closeLoginModal() {
            $login_modal.hide();
        });

        // 禁止冒泡，导致关闭对话框
        $login_modal_dialog.on('click', function preventClosed(event) {
            event.stopPropagation();
        });

    }
};

$(document).ready(function () {
    page.init();
});