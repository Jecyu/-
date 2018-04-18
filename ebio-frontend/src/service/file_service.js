/*
 * File Created: Wednesday, 18th April 2018 12:09:21 pm
 * Author: <<Jecyu>> (<<jecyulin@foxmail.com>>)
 * -----
 * Last Modified: Wednesday, 18th April 2018 12:09:39 pm
 * Modified By: <<Jecyu>> (<<jecyulin@foxmail.com>>>)
 */


const _ebio = require('../util/ebio');

const _file = {
  /**
   * checkUsername 检查用户名合法性
   * @param {Object} file 文件对象
   * @param {*} resolve 请求成功回调函数
   * @param {*} reject 请求失败回调函数
   */
  downloadFile(file, resolve, reject) {
    _ebio.request({
      url: _ebio.getServerUrl('/files/download.do'),
      data: {
        path: file.path,
        name: file.name
      },
      method: 'GET',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _file;
