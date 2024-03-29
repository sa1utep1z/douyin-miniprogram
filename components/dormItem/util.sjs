function parseType(type) {
  if (type === 'DORM_APPLY') {
    return '住宿申请';
  } else if (type === 'DORM_FIX') {
    return '报修申请';
  } else if (type === 'DORM_OUT') {
    return '退宿申请';
  } else if (type === 'RENT') {
    return '个人外租';
  }
  return '';
}
function parseStatus(type, status) {
  if (status === 'PENDING') {
    return '待处理';
  } else if (status === 'SUCCESS') {
    if (type === 'DORM_APPLY') {
      return '已通过';
    } else if (type === 'DORM_FIX') {
      return '已处理';
    } else if (type === 'DORM_OUT') {
      return '已退宿';
    }
  } else if (status === 'FAIL') {
    return '已拒绝';
  }
  return '';
}
function parseStatusCss(status) {
  if (status === 'PENDING') {
    return 'item-status-prepare';
  } else if (status === 'SUCCESS') {
    return 'item-status-success';
  } else if (status === 'FAIL') {
    return 'item-status-fail';
  }
  return '';
}
module.exports = {
  parseType: parseType,
  parseStatus: parseStatus,
  parseStatusCss: parseStatusCss
};