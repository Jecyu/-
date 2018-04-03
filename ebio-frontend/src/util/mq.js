/**
 * @Author: Jecyu
 * @Date: 2017-11-19 10:00:42 pm
 * @Modified By: JeCyu
 * @Last Modified time: 2017-11-20 11:57:33 am
 */


const Hogan = require('hogan.js');

const conf = {
  // 因为接口地址和当前的静态文件地址是一样的，所以直接用空
  serverHost: '',
};

const mq = {
  /**
   * 网络请求
   * @param {Object} params 可以是对象、函数
   */
  request: (params) => {
    const _this = this;
    $.ajax({
      type: params.method || 'get',
      url: params.url || '',
      dataType: params.type || 'json',
      data: params.data || '',
      success: (res) => {
        // console.log(res.data);
        // 请求成功
        // if (200 === res.status) {
        // success为函数，则进行回调传过去
        typeof params.success === 'function' && params.success(res.data, res.msg);
        // }
        // // 请求数据错误
        // else if (1 === res.status) {
        //     typeof params.error === 'function' && params.error(res.msg);
        // }
      },
      error: (err) => {
        typeof params.error === 'function' && params.error(err.statusText);
      },
    });
  },
  /**
   * 获取服务器地址
   * @param {string} path 服务器路径
   * @return  {string} 返回服务器地址
   */
  getServerUrl: (path) => {
    return conf.serverHost + path
  },
  /**
   * 获取URL参数
   * @param {string} name 要查询的键keyword
   * @return  返回对应键的值value
   */
  getUrlParam: (name) => {
    // miniQ.com/questionnaire/list?keyword=xxx&page=1
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const result = window.location.search.substring(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  /**
   * 渲染html模版
   * @param {string} htmlTemplate html模版
   * @param {Object} data 一个数据对象
   * @return 返回渲染后的html片段
   */
  renderHtml: (htmlTemplate, data) => {
    // 编译
    const compiledTemplate = Hogan.compile(htmlTemplate);
    // 渲染
    const result = compiledTemplate.render(data);
    return result;
  },
  /**
   * 回到首页
   */
  goHome: () => {
    window.location.href = './index.html';
  },
  /**
   * feature-detecting localStorage
   */
  storageAvailable: (type) => {
    const storage = window[type];
    try {
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
    }
  },
};

module.exports = mq;
