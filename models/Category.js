const mongoose = require('mongoose');
const categoriesSchema = require('../schemas/categories.js');

module.exports = mongoose.model('Category',categoriesSchema);
