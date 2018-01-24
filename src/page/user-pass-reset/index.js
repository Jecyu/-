/*
 * @Author: jecyu 
 * @Date: 2018-01-22 22:49:10 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-23 00:24:24
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
