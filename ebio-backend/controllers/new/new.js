'use strict';

// 引入用户模型
const NewModel = require('../../models/new/new');


class New {
  constructor(id) {
    this.id = id + 1;
    // this.addPost();
  }
  /**
   * 获得文章列表
   */
  getPostList(req, res, next) {
    // 查询条件
    const query = {
      page_no: Math.floor(req.query.page_no),
      page_size: req.query.page_size,
      order_by: req.query.order_by
    };

    // 响应数据
    const data = {
      all_list: {}
    };

    // 查找特定条件下如 keyword，查找数据库
    NewModel.find({}, (err, docs) => {
      if (err) next(err);
      data.all_list = docs;
    });

    // 根据当前页码，返回对应页码的数据条件
    const filter = (query.page_no - 1) * query.page_size;

    // 查询当前页数据库
    NewModel.find({'id': {$gt: filter, $lt: filter + 5 }}, (err, docs) => {
      if (err) next(err);
      const news = docs;

      if (!news) {
        // 找不到到匹配项
        res.json({
          status: 1,
          msg: '参数错误'
        });
      } else { // 找到匹配项
        res.json({
          status: 0,
          data: {
            page_no: query.page_no,
            page_size: Math.floor(query.page_size),
            total_page: Math.floor(data.all_list.length / query.page_size) + 1,
            total_size: data.all_list.length, // 这里返回的是所有的条数
            prev_page: 0,
            next_page: 0,
            has_previous_page: false,
            has_next_page: false,
            list: docs
          }
        });
      }
    });
  }
  /**
   * 分页数据的处理
   * @param {*} pageNo 当前页码
   * @param {*} pageSize 当前页拥有的条数
   * @param {*} docs 从数据库中查找的数据
   */
  paging(pageNo, pageSize, docs) {
    return docs;
  }
  /**
   * 添加新闻
   * @param {*} req 请求对象
   * @param {*} res 响应对象
   * @param {*} next next 中间件
   */
  addPost(req, res, next) {
    for (let i = 1; i <= 20; i += 1) {
      // 声明一个新闻对象
      const post = {
        id: i,
        title: `${i}This is the article title.`,
        content: `Entertainment
        'Roseanne' just explained why David has been absent from the show and the reason is heartbreaking
        Business Insider Tue, Apr 17 1:00 PM GMT+8 
        Reactions  Reblog on Tumblr  Share  Tweet  Email
        Warning: There are spoilers ahead for Tuesday's "Roseanne," "Darlene v. David." Johnny Galecki finally made his return to "Roseanne" on Tuesday's episode and he resolved the mystery of why his character David has been missing on the show's revival until this`,
        pdate: '13小時前',
        src: '',
        img_width: '',
        img_height: '',
        img_url: '',
        url: '',
        full_pdate: `2018年01月${i}日`
      };
      NewModel.create(post);
    }
  }
}

module.exports = new New();
