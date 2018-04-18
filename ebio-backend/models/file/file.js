'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* 注册软件 schema */
const fileSchema = new Schema({
  path: String,
  name: String
});

fileSchema.index({ id: 1 });
const File = mongoose.model('File', fileSchema);

module.exports = File;
