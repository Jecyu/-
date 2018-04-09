/**
 * 使用 hash 实现前端路由
 */

const Router = class Router {
  /**
   * 前端路由
   * @param {Object} routes 路由对象
   * @param {String} currentUrl 当前地址
   */
  constructor(routes, currentUrl) {
    this.routes = {};
    this.currentUrl = '';
  }

  /**
   * 存储路由更新时的回调到回调数组 routes 中，回调函数将负责对页面的更新
   * @param {String} path 监测路径
   * @param {Function} callback 回调函数
   */
  route(path, callback) {
    this.routes[path] = callback || function callBack() {};
  }
  /**
   * 执行当前 url 对应的回调函数，更新页面内容
   */
  refresh() {
    this.currentUrl = window.location.hash.slice(1) || '/';
    this.routes[this.currentUrl]();
  }
  /**
   * 监听浏览器 url hash 更新事件
   */
  init() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  }
};

export default Router;
