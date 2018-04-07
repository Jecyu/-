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


