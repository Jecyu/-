'use strict';

const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('../config/default');

// 连接数据库
mongoose.connect(config.url);
const db = mongoose.connection;

db.once('open', () => {
  console.log(chalk.green('连接数据库成功！'));
});

db.on('error', (error) => {
  console.error(chalk.red(`Error in MongoDb connection: ${error}`));
});

db.on('close', () => {
  console.log(chalk.red('数据库断开，重新连接数据库'));
  mongoose.connect(config.url);
});

module.exports = db;
