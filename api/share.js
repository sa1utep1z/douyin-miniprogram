
import ajax from '../utils/axiosUtil';
// 获取岗位分享模板key
export const fetchPosterKeyList = () => {
  return ajax.request('/client/share/poster/key/list', null, 'GET');
 }
