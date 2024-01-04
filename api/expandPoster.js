
import ajax from '../utils/axiosUtil';
// 获取所有推广海报列表
export const listExpandPosterTemplate = (params) => {
  return ajax.request('/client/expand/posterTemplate/list', params, 'POST');
};