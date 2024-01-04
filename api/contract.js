import ajax from '../utils/contractAxiosUtil';
// 合同列表
export const listContractData = () => {
  return ajax.request('/client/contract/list', null, 'GET');
};
// 获取签署url
export const fetchSignUrl = (data) => {
  return ajax.request('/client/contract/sign', data, 'POST', false);
};

// 获取合同查看url
export const fetchViewUrl = (contractId) => {
  return ajax.request(`/client/contract/view/${contractId}`, null, 'GET');
};

// 获取合同查看url
export const fetchDownUrl = (contractId) => {
  return ajax.request(`/client/contract/down/${contractId}`, null, 'GET');
};
// 获取认证url
export const fetchAuthUrl = () => {
  return ajax.request('/client/user/authUrl', null, 'GET');
};