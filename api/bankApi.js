import ajax from '../utils/axiosUtil';
 
 
 //提现
 export const withdraw = (data) => {
  return  ajax.request('/client/balance/withdraw', data, 'POST',true);
 }
 //明细列表
 export const fetchBalanceDetail = (data) => {
  return  ajax.request('/client/balance/detail/list', data, 'POST',false);
 }