
// 定义分页类
const Paging = class Paging {
  constructor(element, options) {
    this.element = element;
    // 传入形参
    this.options = {
      pageNo: options.pageNo || 1,
      totalPage: options.totalPage,
      totalSize: options.totalSize,
      callback: options.callback
    };
    // 根据形参初始化分页html和css代码
    this.init();
  }
  // 对Paging的实例对象添加公共的属性和方法
  init() {
    this.creatHtml();
    this.bindEvent();
  }
  creatHtml() {
    const me = this;
    let content = '';
    const current = me.options.pageNo;
    const total = me.options.totalPage;
    const totalNum = me.options.totalSize;

    // 当前页码大于1时才显示首页、上一页
    if (current > 1) {
      content += '<a id="firstPage">首页</a><a id="prePage">上一页</a>';
    }
    // 总页数大于6时候
    if (total > 6) {
      // 当前页码小于5时显示省略号
      if (current < 5) {
        for (let i = 1; i < 6; i += 1) {
          if (current === i) {
            content += `<a class='current'>${i}</a>`;
          } else {
            content += `<a>${i}</a>`;
          }
        }
        content += '<a class="fa fa-ellipsis-h"></a>';
        content += `<a>${total}</a>`;
      } else if (current < total - 3) { // 当前页码大于等于5，且判断页码在末尾的时候
        for (let i = current - 2; i < current + 3; i += 1) {
          if (current === i) {
            content += `<a class='current'>${i}</a>`;
          } else {
            content += `<a>${i}</a>`;
          }
        }
        content += '<a class="fa fa-ellipsis-h"></a>';
        content += `<a>${total}</a>`;
      } else { // 当前页码大于等于5，且页码在中间部分时候
        content += '<a>1</a>';
        content += '<a class="fa fa-ellipsis-h"></a>';
        for (let i = total - 4; i < total + 1; i += 1) {
          if (current === i) {
            content += `<a class='current'>${i}</a>`;
          } else {
            content += `<a>${i}</a>`;
          }
        }
      }
    } else { // 总页数小于6的时候，不需要省略号
      for (let i = 1; i < total + 1; i += 1) {
        if (current === i) {
          content += `<a class='current'>${i}</a>`;
        } else {
          content += `<a>${i}</a>`;
        }
      }
    }
    content += '<a id="nextPage">下一页</a>';
    content += '<a id="lastPage">末页</a>';
    content += '<a id="refreshPage" href="">刷新</a>';
    content += `<span class='totalPages'> 共<span>${total}</span>页 </span>`;
    content += `<span class='totalSize'> 共<span>${totalNum}</span>条记录 </span>`;
    me.element.html(content);
  }
  // 添加页面操作事件
  bindEvent() {
    const me = this;
    me.element.off('click', 'a');
    me.element.on('click', 'a', function toPage() {
      const num = $(this).html();
      const id = $(this).attr('id');
      if (id === 'prePage') {
        if (me.options.pageNo === 1) {
          me.options.pageNo = 1;
        } else {
          me.options.pageNo = +me.options.pageNo - 1;
        }
      } else if (id === 'nextPage') {
        if (me.options.pageNo === me.options.totalPage) {
          me.options.pageNo = me.options.totalPage;
        } else {
          me.options.pageNo = +me.options.pageNo + 1;
        }
      } else if (id === 'firstPage') {
        me.options.pageNo = 1;
      } else if (id === 'lastPage') {
        me.options.pageNo = me.options.totalPage;
      } else {
        me.options.pageNo = +num;
      }
      // 重新渲染分页结构
      me.creatHtml();
      // 回调请求函数
      if (me.options.callback) {
        me.options.callback(me.options.pageNo);
      }
    });
  }
};

export default Paging;
