import ajax from '../utils/axiosUtil';


// 获取补充入职资料信息
export const fetchEntryDataInfo = () => {
  return ajax.request('/client/member/entryInfo',null,'GET',false);
 }

 // 提交补充入职资料信息
 export const submitEntryDataInfo = (data) => {
  return  ajax.request('/client/member/entryInfo',data,'POST');
 }
