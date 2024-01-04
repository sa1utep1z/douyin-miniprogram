function formatTime(time) {
  var date = getDate(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日' + '  ' + [hour, minute].map(formatNumber).join(':');
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
module.exports.formatTime = formatTime;