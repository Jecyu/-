# “以太生物” 后台系统

## 功能列表

## 项目结构

```
.
├── bin                             项目启动文件
│   ├── www                         项目入口文件
├── config                          运行配置
│   ├── default.js                  默认配置
│   └── development.js              开发环境
├── controller                      处理中心，负责路由及数据库的具体操作
│   ├── user                        用户模块
│   │   └── user.js                 用户
├── logs                            日志文件
├── middlewares                     中间件
├── models                          模型(数据库)
│   ├── user
│   │   └── user.js                 user 模型
├── mongodb                         连接数据库
│   └── db.js
├── public                          静态资源目录
├── routes                          路由配置
│   ├── user.js                     用户
├── views   
├── .babelrc 
├── .gitignore
├── app.js                          基础配置
├── package.json
├── README.md                  
.

47 directories, 197 files

```

