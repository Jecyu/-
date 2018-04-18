'use strict';

const path = require('path');
const fs = require('fs');

// 引入軟件模型
const fileModel = require('../../models/file/file');


class File {
  constructor(filePath, fileName) {
    this.path = filePath;
    this.name = fileName;
  }
  /**
   * downLoad 文件下载函数
   * @param {string} dir 文件所在的目录
   */
  downLoad(dir) {
    return (req, res, next) => {
      // 查询文件所在的路径
      const query_path = req.query.path;
      // 查询文件的名称
      const query_name = req.query.name;
      // 构造指向文件的绝对路径
      const file_path = path.join(dir, query_path, query_name);
      console.log(file_path);

      // 检查文件是否存在
      fs.stat(file_path, (err, stat) => {
        if (err) {
          // 找不到文件
          if (err.code === 'ENOENT') {
            res.status(404).send('Not Found');
          } else { // 服务器内部错误
            res.status(500).send('Internal Server Error');
          }
        } else {
          // 响应文件配置
          // const options = {
          //   headers: {
          //     'Content-Length': stat.size,
          //     'Content-Disposition': 'attachment; filename=logo.png'
          //   }
          // };
          // res.sendFile(file_path, options);
          res.download(file_path);
        }
      });
    }
  }
}

module.exports = new File();
