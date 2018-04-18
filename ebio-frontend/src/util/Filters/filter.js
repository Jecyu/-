const filter = {
  /**
   * 问卷状态过滤器
   * @param {string} qs 问卷状态
   */
  qStateFormat: (qs) => {
    if (qs === 'draft') {
      return '未发布';
    } else if (qs === 'released') {
      return '发布中';
    } else if (qs === 'closed') {
      return '已结束';
    }
    return '[状态错误]';
  },
  /**
   * 日期格式过滤器
   * @param {string} date 日期
   */
  pureDate: (date) => {
    if (date === null || date === '-') {
      return '-';
    }
    const tmp = date.split('/');
    return `${tmp[2]} - ${tmp[0]} - ${tmp[1]}`;
  },
  /**
   * 题型过滤器
   * @param {string} qType 题型
   */
  qTypeFormat: (qType) => {
    if (qType === 'single') {
      return '单选题';
    } else if (qType === 'multi') {
      return '多选题';
    } else if (qType === 'text') {
      return '文本题';
    }
    return 'unknown';
  }
};

module.exports = filter;
