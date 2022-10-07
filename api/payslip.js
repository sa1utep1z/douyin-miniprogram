import ajax from '../utils/axiosUtil';

// 获取会员的薪资列表数据
 export const listPayslips = (year, month) => {
  return ajax.request(`/client/salarySlip/member/${year}/${month}`, null, 'GET', false);
 }

 // 获取会员的最新薪资单的年月
 export const newestYM = () => {
  return ajax.request('/client/salarySlip/newest/ym', null, 'GET', false);
 }

 // 签署
 export const signPayslip = (id, data) => {
  return ajax.request(`/client/salarySlip/${id}/sign`, data, 'POST', false);
 }
