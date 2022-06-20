
import ajax from '../utils/axiosUtil';
//搜索接口
export const fecthSerarchResult = (data) => {
 return  ajax.request('/client/noauth/positionOrders/search',data,'POST');
}
//首页列表接口
export const fecthIndexTabList = (data) => {
 return  ajax.request('/client/orders/inquiry',data,'POST',false);
}
//获取个人要素
export const fetchSignUpInfo = () => {
  return  ajax.request('/client/jobHunter/info',null,'GET');
 }
//报名前校验手机号
export const sendValidCode = (mobile) => {
  return  ajax.request(`/client/${mobile}/validCode`,'','GET');
 }

 //用户在报名列表确认报名
export const userConfirmSignUp = (id) => {
  return  ajax.request(`/client/signUp/${id}/confirmation`,'','PUT');
 }
  //用户在报名列表取消报名
export const userCancelSignUp = (id) => {
  return  ajax.request(`/client/${id}/none/desire`,'','PUT');
 }
 //获取用户报名列表
export const fetchUserSignUpList = (data) => {
  return  ajax.request('/client/signUp/info',data,'POST');
 }

 //用户报名
export const userSignUp = (id,data) => {
  return  ajax.request(`/client/signUp/${id}`,data,'POST');
 }

  //岗位详情
export const fetchJobDetail = (id,data) => {
  return  ajax.request(`/client/orders/${id}`,data,'GET');
 }