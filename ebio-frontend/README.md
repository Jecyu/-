# 前言

## 技术栈

## 项目运行

## 目标功能

* [ ] 登录、注册
* [ ] 发送短信验证
* [ ] 部署上线

## 项目布局

```0
.
├── build                           Webpack 配置文件
│   ├── webpack.base.conf.js        默认环境         
│   ├── webpack.dev.conf.js         开发环境
│   ├── webpack.prod.conf.js        生产环境
├── dist                            打包输出的文件
│   ├── js                          js 脚本
│   ├── css                         样式文件
│   ├── images                      图片
│   ├── views                       HTML 文件
├── src                             源文件
│   ├── components                  组件
│   │   └── FloatLayer              浮出层组件
│   │   └── Router                  前端路由
│   │   └── swiper                  轮播插件
│   │   └── util                    常用的 DOM 原生操作方法
│   ├── images                      图片
│   ├── mocks                       模拟数据   
│   ├── page                        
│   │   └── index                   首页模块
│   │   │    └── index.scss         页面样式文件
│   │   │    └── index.js           页面逻辑文件
│   │   │    └── index.string       页面动态模版文件
│   │   └── ...
│   ├── service                     数据服务文件
│   ├── test                        测试接口、插件等
│   ├── util                        通用 js 工具类封装
│   │   ├── ebio.js                 项目通用工具类
│   ├── vendor                      第三方库
│   │   └── jquery-3.2.1.min.js     jQuery 文件
│   ├── view                        视图存放页面的 HTML 文件
│   │   └── layout                  布局
│   │   │   └── foot.html           要引入的包含 js 资源
│   │   │   └── footer.html         公共脚部
│   │   │   └── head_common.html    公共头部
│   │   │   └── nav.html            主导航
│   │   │   └── nav_sample.html     特殊导航
│   │   │   └── nav_sample2.html    特殊导航
│   │   └── ...                     页面的 HTML 文件 
├── .babelrc                        Babel 配置文件
├── .eslintrc.js                    代码校验
├── .gitignore                      git 文件忽略配置
├── LICENSE                         项目证书
├── package-lock.json               项目配置文件
├── package.json                    项目配置文件
├── postcss.config.js               scss 转 css 配置文件
├── README.md                       项目说明
.

47 directories, 197 files

```


