/*
 * File Created: Friday, 6th April 2018 3:20:42 pm
 * Author: <<Jecyu>> (<<jecyulin@foxmail.com>>)
 * -----
 * Last Modified: Friday, 6th April 2018 3:21:31 pm
 * Modified By: <<Jecyu>> (<<jecyulin@foxmail.com>>>)
 */
// 兼容的事件方法
function addEvent(elementNode, event, hanlder) {
  const ele = elementNode;
  if (ele.addEventListener) {
    ele.addEventListener(event, hanlder, false);
  } else if (ele.attachEvent) {
    ele.attachEvent(`on${event}`, hanlder);
  } else {
    ele[`on${event}`] = hanlder;
  }
}

function removeEvent(elementNode, event, hanlder) {
  const ele = elementNode;
  if (ele.removeEventListener) {
    ele.removeEventListener(event, hanlder, false);
  } else if (ele.detachEvent) {
    ele.detachEvent(`on${event}`, hanlder);
  } else {
    ele[`on${event}`] = null;
  }
}

/**
 * 浮出层
 */
const FloatLayer = class FloatLayer {
  /**
   * 构造器
   * @param {*} element 对话框元素
   */
  constructor(element) {
    this.ele = element;
    this.visible = false;
    this.maskEle = null;
    this.animateTime = 600;
    this.init();
  }
  /**
   * 显示浮出层
   */
  show() {
    this.visible = true;
    this.ele.style.transform = 'translate(-50%, -50%) scale(1, 1)';
    this.maskEle.style.visibility = 'visible';
    this.ele.style.left = '50%';
    this.ele.style.top = '50%';
  }
  /**
   * 隐藏浮出层
   */
  hide() {
    this.visible = false;
    this.ele.style.transform = 'translate(-50%, -50%) scale(0, 0)';
    // 存储当前元素对象
    const self = this;
    setTimeout(() => {
      self.maskEle.style.visibility = 'hidden';
    }, this.animateTime - 10);
  }
  /**
   * 初始化浮出层，定位、绑定事件
   */
  init() {
    // 定位遮罩层
    this.maskEle = document.createElement('div');
    this.maskEle.style.width = `${window.screen.width}px`;
    this.maskEle.style.height = `${window.screen.height}px`;
    this.maskEle.style.backgroundColor = 'rgba(108, 108, 108, 0.7)';
    this.maskEle.style.position = 'fixed';
    this.maskEle.style.zIndex = '4';
    this.maskEle.style.left = '50%';
    this.maskEle.style.top = '50%';
    this.maskEle.style.transform = 'translate(-50%, -50%)';
    this.maskEle.style.visibility = this.visible ? 'visible' : 'hidden';

    // 定位对话框
    this.ele.style.position = 'absolute';
    this.ele.style.left = '50%';
    this.ele.style.top = '50%';
    this.ele.style.width = `${this.ele.clientWidth}px`;
    this.ele.style.transform = 'translate(-50%, -50%) scale(0, 0)';
    this.ele.style.transition = `${this.animateTime}ms transform`;

    this.ele.parentNode.removeChild(this.ele);
    this.maskEle.appendChild(this.ele);
    document.body.appendChild(this.maskEle);

    // 添加事件监听
    const self = this;
    addEvent(this.maskEle, 'click', function hide(e) {
      if (self.maskEle === this) {
        self.hide();
      }
    });

    addEvent(this.ele, 'click', (e) => {
      e.stopPropagation();
    });

    // 拖拽对话框
    this.setDragNode(this.ele.children[0]);
  }
  /**
   * 移动节点
   * @param {*} node 节点对象
   */
  setDragNode(elementNode) {
    const node = elementNode;
    const self = this;
    node.style.cursor = 'move';

    addEvent(node, 'mousedown', (event) => {
      const disX = event.clientX - self.ele.offsetLeft;
      const disY = event.clientY - self.ele.offsetTop;

      /**
       * 移动函数
       * @param {*} event 事件对像
       */
      const move = (e) => {
        self.ele.style.left = `${e.clientX - disX}px`;
        self.ele.style.top = `${e.clientY - disY}px`;
      };
      addEvent(document, 'mousemove', move);
      addEvent(document, 'mouseup', () => {
        removeEvent(document, 'mousemove', move);
      });
    });
  }
};

module.exports = FloatLayer;

