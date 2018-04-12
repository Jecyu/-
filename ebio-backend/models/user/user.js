'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* 注册用户 schema */
const userSchema = new Schema({
  username: String,
  hashed_password: String,
  email: String,
  phone: Number
});

// 添加索引
userSchema.index({ id: 1 });
const User = mongoose.model('User', userSchema);

module.exports = User;
