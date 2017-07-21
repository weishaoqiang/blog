const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const Category = require('../models/Category');
const Content = require('../models/Content');

// router.use(function(req,res,next){
//   if(!req.userInfo.isAdmin){
//     res.send('对不起，只有管理员才能进入后台管理系统');
//   }
//   next();
// })

/**
 * 首页
 */
router.get('/',function(req,res,next){
  res.render('admin/index')
})


// 将router暴露出来
module.exports = router;
