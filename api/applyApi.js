
import ajax from '../utils/axiosUtil';
// 离职申请数据
export const listResignApply = (data) => {
  return ajax.request('/client/resignApply/list', data, 'POST');
};
// 在职信息
export const fetchJobData = () => {
  return ajax.request('/client/resignApply/job/info', null, 'GET');
};
// 申请模板表单属性
export const getResignApproveForm = (type) => {
  return ajax.request(`/admin/approve/temp/${type}/formField`, null, 'GET');
};
// 提交离职申请
export const submitApprove = (type, data, toast) => {
  return ajax.request(`/admin/approve/submit/${type}`, data, 'POST', true, toast);
};
// 撤销申请
export const cancelApprove = (flowId) => {
  return ajax.request(`/admin/approve/cancel/${flowId}`, null, 'PUT');
};

// 预支薪资
// 预支薪资-获取会员信息
export const fetchAdvanceMemberInfo = () => {
  return ajax.request('/client/advance/member/info', null, 'GET');
};

// 预支薪资-获取会员预支列表
export const listMemberAdvance = (data) => {
  return ajax.request('/client/advance/list', data, 'POST');
};

// 预支薪资-获取会员预支列表统计
export const statisticsMemberAdvance = (data) => {
  return ajax.request('/client/advance/list/statistics', data, 'POST');
};

// 预支薪资-获取会员预支审核进度详情
export const fetchAdvanceApproveInfo = (applyId) => {
  return ajax.request(`/advance/${applyId}/flow`, null, 'GET');
};