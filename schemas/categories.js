const mongoose = require('mongoose');

// 分类列表结构

module.exports = new mongoose.Schema({
  // 分类名称
  name: String,
});
