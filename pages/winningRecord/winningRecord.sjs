function parseWinningStatus(status) {
  if (status === 'CASHING') {
    return '待兑奖';
  } else if (status === 'CASHED') {
    return '已兑奖';
  }
  return '';
}
module.exports = {
  parseWinningStatus: parseWinningStatus
};