function getShapeType(status) {
  if (status === 'PENDING') {
    return 'item-position-shape-prepare';
  } else if (status === 'CANCEL') {
    return 'item-position-shape-cancel';
  } else if (status === 'FREEZE' || status === 'SIGNED') {
    return 'item-position-shape-success';
  }
  return '';
}
function getShapeText(status) {
  if (status === 'PENDING') {
    return '进行中';
  } else if (status === 'CANCEL') {
    return '已作废';
  } else if (status === 'FREEZE') {
    return '已完成';
  } else if (status === 'SIGNED') {
    return '已签署';
  }
  return '';
}
module.exports = {
  getShapeType: getShapeType,
  getShapeText: getShapeText
};