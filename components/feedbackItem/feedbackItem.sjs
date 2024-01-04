function getShapeType(status) {
  if (status === 'PREPARING') {
    return 'item-position-shape-prepare';
  } else if (status === 'PROCESSING') {
    return 'item-position-shape-cancel';
  } else if (status === 'END') {
    return 'item-position-shape-success';
  }
  return '';
}
function getShapeText(status) {
  if (status === 'PREPARING') {
    return '待处理';
  } else if (status === 'PROCESSING') {
    return '处理中';
  } else if (status === 'END') {
    return '已结案';
  }
  return '';
}
function getFeedbackType(type) {
  if (type === 'SALARY') {
    return '薪资问题';
  } else if (type === 'BORROW') {
    return '借支问题';
  } else if (type === 'RESIDENTIAL') {
    return '驻厂问题';
  } else if (type === 'COMPLAINT') {
    return '投诉问题';
  } else if (type === 'DORMITORY') {
    return '宿舍问题';
  }
  return '';
}
module.exports = {
  getShapeType: getShapeType,
  getShapeText: getShapeText,
  getFeedbackType: getFeedbackType
};