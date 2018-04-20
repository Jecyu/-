'use strict';

// 引入分页类，使用 export 导出，需用import 导入
import Paging from '../../components/paging/paging';

require('./index.scss');
require('../common/index.js');
const _ebio = require('../../util/ebio.js');
const _new = require('../../service/new_service');

// 引入字符串模版
const templateIndex = require('./index.string');

const page = {
  data: {
    posts_param: {
      keyword: _ebio.getUrlParam('keyword') || '',
      category_id: _ebio.getUrlParam('categoryId') || '',
      order_by: _ebio.getUrlParam('orderBy') || 'default',
      // 当前页码
      page_no: Math.floor(_ebio.getUrlParam('page_no')) || 1,
      // 每页能够显示的文章数量
      page_size: Math.floor(_ebio.getUrlParam('page_size')) || 6
    },
    hots_param: {
    }
  },
  // 初始化
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    this.loadPostList();

    const _this = this;
    // 初始化隐藏所有部分
    $('.zui-section').hide();
    // 要渲染的类型
    const type = _ebio.getUrlParam('type') || 'default';
    // 找到对应的元素
    const $element = $(`.section-${type}`);
    // 显示对应的提示元素
    $element.show();
    // 找到对应的导航元素链接
    const $element_nav_links = $('.tab-page .area-tabbar');
    $element_nav_links.each(function hightlight() {
      // 取得当前链接的 href 属性
      const href = $(this).attr('href');
      if (href.indexOf(type) !== -1) {
        // 取得当前链接的父元素
        $(this).parent()
          .addClass('active')
          .siblings()
          .remove('active');
      }
    });
  },
  bindEvent() {
  },
  // 加载博客文章列表
  loadPostList() {
    const _this = this;
    // 列表 HTML
    let list_html = '';
    // 缓存 list_param0
    const list_param = _this.data.posts_param;
    // 新闻列表容器
    const new_list_con = $('.posts');

    // 加载动画
    new_list_con.html('<div class="loading"></div>');
    // 请求接口
    _new.getPostList(list_param, (res) => {
      list_html = _ebio.renderHtml(templateIndex, {
        list: res.list
      });
      new_list_con.html(list_html);

      /* ===================== 分页配置信息 ===================== */
      // 分页配置信息
      const page_option = {
        // 当前页码
        pageNo: res.page_no,
        // 总的页数
        totalPage: res.total_page,
        // 总的记录条数
        totalSize: res.total_size
      };
      // 加载分页信息
      _this.loadPagination(page_option);
    }, (errorMsg) => {
    });
  },
  /**
   * 加载分页信息
   * @param {Object} pageOption 分页配置
   */
  loadPagination(pageOption) {
    const option = pageOption;
    const _this = this;
    // 分页容器
    const $pagination = $('.post-pagination');
    // 添加回调函数
    option.callback = function callback(pageNo) {
      _this.data.posts_param.page_no = pageNo;
      _this.loadPostList();
    };
    console.log(option);
    // 实例分页对象
    const paging = new Paging($pagination, pageOption);
  }
};

$(document).ready(() => {
  page.init();
});

