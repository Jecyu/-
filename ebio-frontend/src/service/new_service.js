'use strict';

const _ebio = require('../util/ebio');

const _new = {
  /**
   * getPostList 获取新闻博客文章列表
   * @param {Object} listParam 请求参数对象
   * @param {Function} resolve 请求成功回调函数
   * @param {Function} reject 请求失败回调函数
   */
  getPostList(listParam, resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/news/list.do'),
      // /news/list.do?keyword=&category_id=1&page_num=1&page_size=10
      data: listParam,
      method: 'GET',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _new;
