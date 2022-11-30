
import ajax from '../utils/axiosUtil';
// 获取主页数据
export const listDormLiveData = () => {
  return ajax.request('/client/dormLive/info/list', null, 'GET');
 }
 // 主页按钮是否可点击
export const fetchButtonCheck = () => {
  return ajax.request('/client/dormLive/button/check', null, 'GET');
 }
// 宿舍公约签字
export const signDorm = (data) => {
  return ajax.request('/client/dorm/sign', data, 'POST', false);
 }
// 获取男或女空闲常规宿舍
export const routineFreeRoomHierarchy = () => {
 return ajax.request('/client/dormLive/dorm/hierarchy', null, 'GET');
}
// 获取男或女空闲常规宿舍
export const fetchRandomDorm = () => {
  return ajax.request('/client/dormLive/dorm/random', null, 'GET');
 }
// 添加申请住宿信息回显
export const fetchDormLiveInfo = () => {
  return ajax.request('/client/dormLive/info', null, 'GET');
 }
 // 提交申请住宿
export const submitDormLive = (data) => {
  return ajax.request('/client/dormLive', data, 'POST');
 }
 // 提交申请外宿
export const submitRent = (data) => {
  return ajax.request('/client/dormLive/rent', data, 'POST');
 }
  // 提交申请维修
export const submitRepair= (data) => {
  return ajax.request('/client/repair', data, 'POST');
 }
 // 当前住宿信息回显
export const fetchCurrDormLiveInfo = () => {
  return ajax.request('/client/dormLive/currLive/info', null, 'GET');
 }
// 提交申请退宿
export const submitDormLiveOutApply = (dormLiveId, data) => {
  return ajax.request(`/client/dormLive/${dormLiveId}/outApply`, data, 'POST');
 }

// 扫描床位跳转
export const fetchScanBedInfo = (bedId) => {
  return ajax.request(`/client/scan/dormLive/bed/${bedId}`, null, 'GET');
 }
// 床位确认入住操作
export const submitConfirmBed = (dormLiveId) => {
  return ajax.request(`/client/dormLive/${dormLiveId}/scan`, null, 'GET');
 }
