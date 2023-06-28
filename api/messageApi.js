import ajax from '../utils/axiosUtil';

//获取消息列表配置
export const fetchMessageType = (data) => {
 return  ajax.request('/client/member/message/type', data, 'GET',false);
}

//消息列表
export const fetchMessageList = (data) => {
  return ajax.request('/client/member/message/query', data, 'POST');
 }

//将消息置为已读
export const readMessage = (messageId) => {
  return  ajax.request(`/client/member/message/read/${messageId}`, null, 'PUT');
 }

 //将消息置为已读
export const readAllUnReadMessage = () => {
  return  ajax.request(`/client/member/message/read/all`, null, 'PUT');
 }

