/* eslint-disable */
function getMonthEndDay(year, month) {
  return 32 - getDate(year, month - 1, 32).getDate();
}
function compareMonth(date1, date2) {
  date1 = getDate(date1);
  date2 = getDate(date2);
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();
  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
module.exports = {
  getMonthEndDay: getMonthEndDay,
  compareMonth: compareMonth
};