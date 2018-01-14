/*
 * @Author: jecyu 
 * @Date: 2018-01-14 11:47:08 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-14 12:21:35
 */

"use strict";

require("./index.scss");
require("page/common/index.js");

const page = {
    // 初始化
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.bindEvent();
    },
    bindEvent: function() {}
};

$(document).ready(function() {
    page.init();
});
