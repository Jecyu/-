/**
 * @Author: Jecyu
 * @Date: 2017-10-23 10:38:07 am
 * @Modified By: JeCyu
 * @Last Modified time: 2017-11-20 12:01:05 pm
 */
// localstorage

"use strict";

require("./index.scss");
require("page/common/index.js");
// 引入localStore模块
let _store = require("mocks/store.js");
let _mq = require("util/mq.js");
let _filter = require("util/Filters/filter.js");
let templateIndex = require("./index.string");

// 逻辑
// 1.通过localStorage获取mock数据，通过hogan来动态渲染
// 2.实现单条删除以及全选删除逻辑，选中图标的状态切换
// 3.判断发布状态，决定“发布中”添加特殊颜色，选择渲染“查看问卷”或“查看数据”
console.log(_store.data);

let page = {

    // 初始化
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadList();
        this.bindEvent();
    },
    bindEvent: function() {

        // 单条问卷的选择、取消选择
        $(document).on('click', '.quest-select', function() {
            let $this  = $(this);
            let questId = $this.parents('.quest-item').data('quest-id');
            console.log(questId);
            // TODO
            // 选中状态，释放操作按钮
            // if ($this.prop('checked')) {
            //     console.log('checked');                
            // }
            // 取消状态，禁用操作按钮
            $this.change(function () {
                if ($this.prop('checked')) {
                    console.log('select');
                }
                else {
                    console.clear();
                    console.log('unselect')
                }
            });
        });
     

        // 实现单条删除、及全选删除逻辑
        // 问卷的全选、取消全选
    },
    /**
     * 加载问卷列表
     */
    loadList: function() {
        let _this = this;
        let questionnaireListHtml = "";
        let $listCon = $(".questionnaire-list");

        // 渲染Html
        _this.filter(_store.data);
        // 存储到本地
        _store.initData();
        // console.log(_store.fetch());

        questionnaireListHtml = _mq.renderHtml(templateIndex, _store.data);
        $listCon.html(questionnaireListHtml);

    },
    /**
     * 数据匹配,添加flag判断
     * @param data {object}
     */
    filter: function(data) {
        // 判断问卷列表是否为空，用在hogan渲染模版
        data.notEmpty = !!data.questionnaireList.length;

        // 过滤处理发布状态
        for (let i = 0, len = data.questionnaireList.length; i < len; i++) {
            // 添加状态标识
            if (data.questionnaireList[i].state === 'released') {
                data.questionnaireList[i].isRelease = true;
            } else {
                data.questionnaireList[i].isRelease = false;
            }
            // 发布状态文本格式处理
            data.questionnaireList[i].stateText = _filter.qStateFormat(data.questionnaireList[i].state);
            // 日期格式处理
            data.questionnaireList[i].releaseDateText = _filter.pureDate(data.questionnaireList[i].releaseDate);
        }

    }

};

$(document).ready(function() {
    page.init();
});