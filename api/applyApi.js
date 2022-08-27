
import ajax from '../utils/axiosUtil';
// 离职申请数据
export const listResignApply = (data) => {
 return ajax.request('/client/resignApply/list', data, 'POST');
}
// 在职信息
export const fetchJobData = () => {
  return ajax.request('/client/resignApply/job/info', null, 'GET');
 }
// 申请模板表单属性
export const getResignApproveForm = (type) => {
  return ajax.request(`/admin/approve/temp/${type}/formField`, null, 'GET');
}
// 提交申请
export const submitResignApprove = (type, data) => {
  return ajax.request(`/admin/approve/submit/${type}`, data, 'POST');
}
// 撤销申请
export const cancelApprove = (flowId) => {
  return ajax.request(`/admin/approve/cancel/${flowId}`, null, 'PUT');
}
