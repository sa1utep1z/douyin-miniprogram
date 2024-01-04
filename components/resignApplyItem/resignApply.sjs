function formatTime(time) {
  if (!time) {
    return '';
  }
  var date = getDate(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日' + '  ' + [hour, minute, second].map(formatNumber).join(':');
}
function formatTime2(time) {
  if (!time) {
    return '';
  }
  var date = getDate(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日';
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
function getShapeType(status) {
  if (status === 'PENDING') {
    return 'item-position-shape-prepare';
  } else if (status === 'CANCEL') {
    return 'item-position-shape-cancel';
  } else if (status === 'PASS') {
    return 'item-position-shape-success';
  } else if (status === 'FAIL') {
    return 'item-position-shape-fail';
  }
}
function getShapeText(status) {
  if (status === 'PENDING') {
    return '待审核';
  } else if (status === 'CANCEL') {
    return '已撤回';
  } else if (status === 'PASS') {
    return '通过';
  } else if (status === 'FAIL') {
    return '拒绝';
  }
  return '';
}
function getWorkType(type) {
  if (type === 'FORMAL_WORKER') {
    return '正式工';
  } else if (type === 'DISPATCH_HOURLY_WORKER') {
    return '小时工';
  } else if (type === 'DISPATCH_EQUAL_PAY') {
    return '派遣工';
  }
  return '';
}
module.exports.formatTime = formatTime;
module.exports.formatTime2 = formatTime2;
module.exports.getShapeType = getShapeType;
module.exports.getShapeText = getShapeText;
module.exports.getWorkType = getWorkType;