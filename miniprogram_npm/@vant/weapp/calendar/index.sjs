/* eslint-disable */
var utils = require("./utils.sjs");
function getMonths(minDate, maxDate) {
  var months = [];
  var cursor = getDate(minDate);
  cursor.setDate(1);
  do {
    months.push(cursor.getTime());
    cursor.setMonth(cursor.getMonth() + 1);
  } while (utils.compareMonth(cursor, getDate(maxDate)) !== 1);
  return months;
}
function getButtonDisabled(type, currentDate) {
  if (currentDate == null) {
    return true;
  }
  if (type === 'range') {
    return !currentDate[0] || !currentDate[1];
  }
  if (type === 'multiple') {
    return !currentDate.length;
  }
  return !currentDate;
}
module.exports = {
  getMonths: getMonths,
  getButtonDisabled: getButtonDisabled
};