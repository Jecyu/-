'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* 注册软件 schema */
const newSchema = new Schema({
  id: Number,
  categoryId: Number, // 文章类别
  title: String, // 文章标题
  content: String, // 文章摘要
  pdate: String, // 发布日期
  src: String, // 文章来源
  img_width: String, // 图片宽度
  img_height: String, // 图片高度
  img_url: String, // 图片地址
  url: String, // 文章地址
  full_pdate: String // 完整日期
});

newSchema.index({ id: 1 });
const New = mongoose.model('New', newSchema);

module.exports = New;
