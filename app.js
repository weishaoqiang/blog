/**
 * 应用程序的入口文件
 */
const express = require('express');
const swig = require('swig');
// 加载数据库模块
const mongoose = require('mongoose');
// 处理post请求的数据
const bodyParser = require('body-Parser');
const Cookies = require('cookies');
// 创建app应用
const app = express();

const User = require('./models/Users');
// 设置静态文件托管,后台对静态文件的处理
app.use('/public',express.static(__dirname+'/public'));

// 定义模板引擎
app.engine('html',swig.renderFile);
// 设置模板文件放置的目录,第一个参数必须是views
app.set('views','./views');
// 注释使用模板引擎
app.set('view engine','html');
// 取消模板缓存的限制
swig.setDefaults({
  cache: false,
})
// bodyparser设置
app.use(bodyParser,urlencoded({extended: false}));

// 设置cookies
app.use(function(req, res, next){
  req.cookies = new Cookies(req,res);
  req.userInfo = {};
  if(req.cookies.get('userInfo')){
    try{
      req.userInfo = JSON.parse(req.cookies.get('userInfo'))
      // 判断当前用户是不是管理员
      User.findById(req.userInfo._id).then(function(userInfo){
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
      })
    }catch(e){
      next();
    }
  }else{
    next();
  }
})
/**
 * 根据不同看模块划分功能，设定对应的路由
 */
app.use('./admin',require('./routers/admin'));
app.use('./api',require('./routers/api'));
app.use('./',require('./routers/main'));

// app.get('/',function(req, res, next){
//   // res.send('<h1>欢迎光临我的博客</h1>');
//   //使用模板引擎,render中的参数，第一个是相对于view目录的views/index.html问价
//   res.render('index');
// })

// 监听http请求
app.listen(8081);
