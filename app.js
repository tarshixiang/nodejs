var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var register = require('./routes/register');
var login = require('./routes/login');
var update = require('./routes/update');
var person = require('./routes/person');
var app = express();

// view engine setup
// console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) { //所有的路由都会经过路由处理
    res.setHeader('Access-Control-Allow-Origin', '*'); //设置跨域
    next(); //转到下一个路由
});

app.route('/register').get(register.registerGet).post(register.registerPost);//注册
app.route('/login').get(login.loginGet).post(login.loginPost);//登录
app.route('/update').get(update.updateGet).post(update.updatePost);//修改密码
app.get('/person/:name',person.AlbumsList);//个人空间

app.listen(8000,function(){
	console.log('server listen');
});
module.exports = app;
