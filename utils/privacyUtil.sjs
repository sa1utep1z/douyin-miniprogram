function hideUserName(name) {
  if (!name || typeof name !== "string" || name.length === 0) {
    return "";
  }
  if (name.length > 2) {
    // 将中间字符替换为特定数量的星号(*)
    var maskedPart = repeatStr(name.length - 2);
    return name.charAt(0) + maskedPart + name.charAt(name.length - 1);
  }
  if (name.length > 0) {
    return name.substring(0, 1) + '*';
  }
  return '';
}
function hideMobile(mobile) {
  if (!mobile || typeof mobile !== "string" || mobile.length < 4) {
    return "";
  }
  if (mobile.length === 11) {
    // 保留电话号码的前三位和后四位
    // 将脱敏部分替换为特定数量的星号(*)
    var maskedPart = repeatStr(mobile.length - 7);
    return mobile.substring(0, 3) + maskedPart + mobile.substring(mobile.length - 4);
  }
  return mobile;
}

// 该方法代替  "*".repeat()
function repeatStr(count) {
  var repeatedStr = '';
  for (var i = 0; i < count; i++) {
    repeatedStr += '*';
  }
  return repeatedStr;
}
module.exports = {
  hideUserName: hideUserName,
  hideMobile: hideMobile
};