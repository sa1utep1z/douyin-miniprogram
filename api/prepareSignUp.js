
import ajax from '../utils/axiosUtil';
// 获取所有岗位下拉
export const listPreSignUpMode = () => {
  return ajax.request('/client/noauth/prepareSignUp/mode/forSelect', null, 'GET');
}
// 模式详情
export const fetchPreSignUpMode = (modeId) => {
  return ajax.request(`/client/preSignUp/mode/${modeId}`, null, 'GET');
}
// 获取归属招聘员
export const fetchRecruiter = (idNo) => {
  return ajax.request(`/client/preSignUp/${idNo}/fetchRecruiter`, null, 'GET');
}
// 提交
export const submitPreSignUp = (data) => {
  return ajax.request('/client/preSignUp', data, 'POST');
}
