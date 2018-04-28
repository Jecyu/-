// ====================================================
//  ebio 工具类
// ====================================================

const Hogan = require('hogan.js');

const conf = {
  // serverHost: 'http://mock.eolinker.com/cf6IZykb556226864ab04e4e65fc27205f38da162a310f6?uri=www.eoLinker.com/api'
  serverHost: 'http://localhost:3000' // 本地测试
  // 因为接口地址和当前的静态文件地址是一样的，所以直接用空
  // serverHost: '' // 部署上线
};

const ebio = {
  /**
   * 网络请求
   * @param {Object} params 请求对象
   */
  request(params) {
    const _this = this;
    $.ajax({
      type: params.method || 'get',
      url: params.url || '',
      dataType: params.type || 'json',
      data: params.data || '',
      // beforeSend(xhr) {
      //   // const xhr_object = xhr;
      //   xhr.withCredentials = true; // 跨域必须设置，否则不能保存 cookie 或 会话
      // },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (res) => {
        // 请求成功
        if (res.status === 0) {
          // success为函数，则进行回调传过去
          typeof params.success === 'function' && params.success(res.data, res.msg);
        } else if (res.status === 1) { // 请求数据错误
          typeof params.error === 'function' && params.error(res.msg);
        }
      },
      error: (err) => {
        typeof params.error === 'function' && params.error(err.statusText);
      }
    });
  },
  /**
   * 获取服务器地址
   * @param {string} path 服务器路径
   * @return  {string} 返回服务器地址
   */
  getServerUrl(path) {
    return conf.serverHost + path;
  },
  /**
   * 获取URL参数
   * @param {string} name 要查询的键keyword
   * @return  返回对应键的值value
   */
  getUrlParam(name) {
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
  renderHtml(htmlTemplate, data) {
    // 编译
    const compiledTemplate = Hogan.compile(htmlTemplate);
    // 渲染
    const result = compiledTemplate.render(data);
    return result;
  },
  /**
   * 向现有的 URL的末尾添加查询字符串参数
   * @param {*} url 查询的地址
   * @param {*} name 查询的键
   * @param {*} value 查询的值
   */
  addUrlParam(url, name, value) {
    url += (url.indexOf('?') === -1 ? '?' : '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
  },
  successTips(msg) {
    alert(msg || '操作成功');
  },
  // 错误提示
  errorTips(msg) {
    alert(msg || '哪里不对了~');
  },
  /**
   * 回到首页
   */
  goHome() {
    window.location.href = './index.html';
  }
};

module.exports = ebio;
