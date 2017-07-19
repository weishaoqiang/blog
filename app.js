/**
 * 应用程序的入口文件
 */
const express = require('express');
const swig = require('swig');
// 创建app应用
const app = express();

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
/**
 * 首页路由设定
 */
app.get('/',function(req, res, next){
  // res.send('<h1>欢迎光临我的博客</h1>');
  //使用模板引擎,render中的参数，第一个是相对于view目录的views/index.html问价
  res.render('index');
})

// 监听http请求
app.listen(8080);
