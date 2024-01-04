import ajax from '../utils/axiosUtil';

// 扫码乘车
export const submitRiding = (data) => {
  return ajax.request('/client/riding', data, 'POST', false);
};