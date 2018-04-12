'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* 注册用户 schema */
const sessionSchema = new Schema({
  id: Number,
  session: Object
  // expires: String // 销毁日期
});

// 添加索引
sessionSchema.index({ id: 1 });
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
