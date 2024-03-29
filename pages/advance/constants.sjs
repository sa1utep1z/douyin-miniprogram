// 定义解析状态
function parseStatusType(status) {
  if ('PENDING' === status) {
    return '审核中';
  } else if ('PASS' === status) {
    return '通过';
  } else if ('FAIL' === status) {
    return '拒绝';
  } else if ('CANCEL' === status) {
    return '撤销';
  } else if ('INVALID' === status) {
    return '废弃';
  }
  return '无';
}

// 审批人文字描述
function parseApproveRole(role) {
  if ('BELONG_RESIDENT' === role || 'BELONG_RESIDENT_SINGLE' === role) {
    return '驻厂';
  } else if ('FINANCE' === role) {
    return '财务';
  } else if ('TREASURER' === role) {
    return '会计';
  }
  return '审核';
}

// 审批人文字描述
function parseApproveResult(resultBean) {
  if (resultBean.pass === null) {
    return;
  }
  if ('TREASURER' === resultBean.role) {
    return resultBean.pass ? '放款成功' : '拒绝';
  }
  return resultBean.pass ? '通过' : '拒绝';
}
module.exports = {
  parseStatusType: parseStatusType,
  parseApproveRole: parseApproveRole,
  parseApproveResult: parseApproveResult
};