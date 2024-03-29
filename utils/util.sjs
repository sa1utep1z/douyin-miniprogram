function formatTime(time) {
  if (!time) {
    return;
  }
  var date = getDate(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + '  ' + [hour, minute, second].map(formatNumber).join(':');
}
function formatTimeYMD(time) {
  if (!time) {
    return '';
  }
  var date = getDate(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
function formatTags(tags) {
  if (!tags) {
    return '';
  }
  return tags.join(' | ');
}
function formatDistance(distance) {
  if (!distance || distance === 0) {
    return '0米';
  }
  if (distance < 1) {
    return Math.floor(distance * 1000) + "米";
  }
  return distance.toFixed(2) + "千米";
}
function formatTimeAll(longmil, connector, format) {
  if (!longmil) return '';
  var date = getDate(parseInt(longmil));
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  var hour = date.getHours();
  hour = hour >= 10 ? hour : '0' + hour;
  var minute = date.getMinutes();
  minute = minute >= 10 ? minute : '0' + minute;
  var second = date.getSeconds();
  second = second >= 10 ? second : '0' + second;
  var connector = '/', format = 'yyyy-MM-dd HH:mm:ss';
  if (format === 'yyyy-MM-dd HH:mm') {
    return [year, month, day].join(connector) + ' ' + [hour, minute].join(':');
  } else if (format === 'yyyy-MM-dd') {
    return [year, month, day].join(connector);
  } else if (format === 'yyyy-MM') {
    return [year, month].join(connector);
  } else if (format === 'MM-dd') {
    return month + '月' + day + '日';
  }
  return [year, month, day].join(connector) + ' ' + [hour, minute, second].join(':');
}
function formatMessageTime(longmil) {
  if (!longmil) return '';
  var date = getDate(parseInt(longmil));
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var m = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  var d = day >= 10 ? day : '0' + day;
  var hour = date.getHours();
  var h = hour >= 10 ? hour : '0' + hour;
  var minute = date.getMinutes();
  var min = minute >= 10 ? minute : '0' + minute;
  var today = getDate().getDate();
  if (today === day) {
    return '今天' + [h, min].join(':');
  }
  if (today - day === 1) {
    return '昨天' + [h, min].join(':');
  }
  return m + '月' + d + '日' + [h, min].join(':');
}
function parseStatus(status) {
  if (status === 'init' || status === 'running') {
    return '处理中';
  }
  if (status === 'success') {
    return '成功';
  }
  if (status === 'failure') {
    return '失败';
  }
  return '';
}
module.exports = {
  formatTime: formatTime,
  formatTags: formatTags,
  formatDistance: formatDistance,
  formatTimeYMD: formatTimeYMD,
  formatTimeAll: formatTimeAll,
  formatMessageTime: formatMessageTime,
  parseStatus: parseStatus
};