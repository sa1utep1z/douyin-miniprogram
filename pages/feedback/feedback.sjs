function checkStatus(list, value) {
  if (list.indexOf(value) !== -1) {
    return true;
  }
  return false;
}
module.exports = {
  checkStatus: checkStatus
};