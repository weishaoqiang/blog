const express = require('express');
const router = express.Router();

const Category = require('../models/Category.js');
const Content = require('../models/Content.js');
var data;

// 全局处理函数
router.use(function(req,res,next){
  data = {
    userInfo: res.userInfo,
    categories: []
  },
  Category.find().then(function(categories){
    data.categories = categories,
    next();
  });
});

router.get('/',function(req.res,next){
  data.category = req.query.category || '';
  data.page = req.query.page || 0;
  data.content = [];
  data.pages=0;
  data.limit = 3;
  data.count = 0;
  var where = {};
  if(data.category){
    where.category = data.category;
  }
  // 读取多有分类新信息
  Content.where(where).count().then(function(count){
    data.count = count;
    data.pages = Math.ceil(count/data.limit);
    // 取值不能够大于pages
    data.page = Math.min(data.page,data.pages);
    // 取值不能小于1
    data.page = Math.max(data.page,1);
    var skip = (data.page-1)*data.limit;
    return Content.where(where).find().sort({_id:-1}).limit(data.limit).skip(skip).populate(['Category','user']).sort({
      addTime:-1
    });
  }).then(function(contents){
    data.contents = contents;
    res.render('main/index_1',data);
  });
})

module.exports = router;
