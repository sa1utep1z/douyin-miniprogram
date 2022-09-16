import ajax from '../utils/axiosUtil';

// 企业下拉
export const companySelectDatas = () => {
  return ajax.request('/common/companies/forSelect', null, 'GET');
};