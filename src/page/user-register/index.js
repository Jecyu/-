/*
 * @Author: jecyu 
 * @Date: 2018-01-19 21:17:07 
 * @Last Modified by: jecyu
 * @Last Modified time: 2018-01-19 21:18:41
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
