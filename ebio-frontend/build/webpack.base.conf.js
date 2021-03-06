/**
 * 在 base 文件里，你需要将开发坏境和生产环境中通用的配置放在这里
 */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取HtmlWebpackPlugin的参数（多页应用时，避免代码冗余）
const getHtmlConfig = (name, title) => ({
  // 把整个对象传过去
  template: `./view/${name}.html`,
  filename: `view/${name}.html`,
  title: { title },
  favicon: './images/favicon.ico',
  inject: true,
  hash: true,
  chunks: ['common', name]
});

/**
 * 映射目录
 * @param {*} dir
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

// 配置常量
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve(__dirname, '../src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve(__dirname, '../dist');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
// const ASSETS_PUBLIC_PATH = '/assets/'; // 部署上线
const ASSETS_PUBLIC_PATH = '../'; // 本地测试


module.exports = {
  context: SRC_PATH, // 设置源代码的默认根路径
  resolve: {
    extensions: ['.js', '.jsx'], // 同时支持 js 和 jsx
    alias: {
      node_modules: `${__dirname}../node_modules`,
      util: `${SRC_PATH}/util`,
      images: `${SRC_PATH}/images`,
      page: `${SRC_PATH}/page`,
      service: `${SRC_PATH}/service`
    }
  },
  entry: {
    // 注意 entry 中的路径都是相对于 SRC_PATH 的路径
    // vendor: ['./vendors'],
    common: ['./page/common/index.js'],
    index: ['./page/index/index.js'],
    product: ['./page/product/index.js'],
    about_us: ['./page/about-us/index.js'],
    service_item: ['./page/service-item/index.js'],
    service_intro: ['./page/service-intro/index.js'],
    project_show: ['./page/project-show/index.js'],
    process_show: ['./page/process-show/index.js'],
    user_register: ['./page/user-register/index.js'],
    user_pass_reset: ['./page/user-pass-reset/index.js'],
    bidding_reward: ['./page/bidding-reward/index.js'],
    result: ['./page/result/index.js']
  },
  output: {
    path: ASSETS_BUILD_PATH, // 打包后输出文件放置的地方
    publicPath: ASSETS_PUBLIC_PATH, // 打包后的文件访问依赖包的路径
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre', // ESLint 优先级高于其他 JS 相关的loader
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // outputPath: "img/"
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      // string主要作为模版供模版引擎hogan使用
      {
        test: /\.string$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeAttributeQuotes: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 每次打包前，先清空原来目录中的内容
    // new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: true }),
    new CleanWebpackPlugin(['js', 'css', 'fonts', 'view', 'images'], {
      root: ASSETS_BUILD_PATH,
      verbose: true,
      dry: false
    }),
    // 启用 CommonChunkPlugin，独立通用模块
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'common'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
    // HtmlwebpackPlugin 输出 html
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('product', '软件下载')),
    new HtmlWebpackPlugin(getHtmlConfig('about_us', '公司介绍')),
    new HtmlWebpackPlugin(getHtmlConfig('service_item', '服务项目')),
    new HtmlWebpackPlugin(getHtmlConfig('service_intro', '服务介绍')),
    new HtmlWebpackPlugin(getHtmlConfig('project_show', '项目展示')),
    new HtmlWebpackPlugin(getHtmlConfig('process_show', '流程展示')),
    new HtmlWebpackPlugin(getHtmlConfig('user_register', '注册以太生物帐号')),
    new HtmlWebpackPlugin(getHtmlConfig('user_pass_reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('bidding_reward', '招标悬赏')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ]
};

