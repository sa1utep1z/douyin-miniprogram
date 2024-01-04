import ajax from '../utils/opshubAxiosUtil';

// 获取抽奖活动列表
export const listLotteryActivity = (data) => {
  return ajax.request('/client/lotteryActivity', data, 'POST', false);
};
// 获取抽奖活动说明
export const fetchLotteryActivityExplain = (lotteryActivityId) => {
  return ajax.request(`/client/lotteryActivity/explain/${lotteryActivityId}`, null, 'GET');
};
// 获取抽奖活动转盘信息
export const fetchLotteryActivityTurntable = (lotteryActivityId) => {
  return ajax.request(`/client/lotteryActivity/${lotteryActivityId}/turntable`, null, 'GET');
};
// 抽奖前置校验
export const drawPreCheck = (lotteryActivityId) => {
  return ajax.request(`/client/lottery/draw/${lotteryActivityId}/pre/check`, null, 'GET');
};
// 获取抽奖剩余次数
export const fetchDrawResidueNums = (lotteryActivityId) => {
  return ajax.request(`/client/lottery/draw/residue/${lotteryActivityId}`, null, 'GET');
};
// 抽奖
export const fetchLotteryPrizeId = (lotteryActivityId) => {
  return ajax.request(`/client/lottery/draw/${lotteryActivityId}`, null, 'GET', false);
};
// 抽奖记录
export const listDrawRecord = (data) => {
  return ajax.request('/client/lotteryDraw', data, 'POST', false);
};
// 中奖记录
export const listWinningRecord = (data) => {
  return ajax.request('/client/lotteryDraw/winning', data, 'POST', false);
};


// 礼品领取
export const giftReceive = (giftActivityId) => {
  return ajax.request(`/client/gift/receive/${giftActivityId}`, null, 'GET', true, false);
};