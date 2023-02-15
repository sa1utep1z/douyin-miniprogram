import ajax from '../utils/axiosUtil';
 
 
 //提现信息
 export const fetchWithdraw = () => {
  return  ajax.request('/client/withdraw/info', null, 'GET');
 }

 // 提交提现申请
 export const submitWithdraw = (data) => {
  return  ajax.request('/client/withdraw/submit', data, 'POST',false);
 }
 
 //明细列表
 export const fetchBalanceDetail = (data) => {
  return  ajax.request('/client/balance/detail/list', data, 'POST',false);
 }