const createError = require('http-errors');
const express = require('express');
// var expressWinston = require('express-winston');
const path = require('path');
const cookieParser = require('cookie-parser');
// bodyParser 解析请求主体
const bodyParser = require('body-parser');
const session = require('express-session');
// 存储 session 到 mongodb 的依赖
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const mongoose = require('mongoose');

// 设置程序运行的根目录
global.appRoot = path.resolve(__dirname);

// express-winston logger makes sense BEFORE the router
// app.use(expressWinston.logger({
//   transports: [
//     new (winston.transports.Console)({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/success.log'
//     })
//   ]
// }))

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const fileRouter = require('./routes/file');
const newRouter = require('./routes/new');

const app = express();

app.all('*', (req, res, next) => {
  // 允许跨域
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  res.header('X-Powered-By', '3.2.1');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.favicon());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(session({
  name: 'foodie',
  secret: 'foodie',
  resave: true,
  saveUninitialized: false,
  cookie: {
    key: 'keyboard cat',
    httpOnly: true,
    secure: false, // true for https
    maxAge: 365 * 24 * 60 * 60 * 1000
  },
  // 存储会话
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
  })
}));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/files', fileRouter);
app.use('/news', newRouter);

// express-winston logger makes sense AFTER the router
// app.use(expressWinston.errorLogger({
//   transports: [
//     new (winston.transports.Console)({
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       filename: 'logs/success.log'
//     })
//   ]
// }))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
