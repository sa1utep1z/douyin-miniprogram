import ajax from '../utils/axiosUtil';


//获取邀请分享奖励Url参数
export const fetchShareUrlParam = (data) => {
  return ajax.request('/client/member/share/url/param', data, 'POST');
};

//获取邀请列表信息 
export const fetchMemberList = () => {
  return ajax.request('/client/member/myReferrer', null, 'GET', false);
};

//获取钱包余额
export const fetchWalletBalance = () => {
  return ajax.request('/client/member/myBalance', null, 'GET', false);
};

//我的邀请记录（领钱页面的统计）
export const fetchShareRecord = () => {
  return ajax.request('/client/invite/myInviteRecord', null, 'GET', false);
};

//领钱推荐页展示的已推荐列表（领钱页面的统计）
export const fetchShareList = (data) => {
  return ajax.request('/client/invite/invitation/list', data, 'POST', false);
};
// 招聘员获取归属会员信息，需回访
export const fetchBelongPersonList = (data) => {
  return ajax.request('/client/invite/belong/list', data, 'POST', false);
};
// 更新回访验证
export const updateReturnVisit = (returnVisitId, data) => {
  return ajax.request(`/client/invite/returnVisit/${returnVisitId}`, data, 'PUT', false);
};
//存入分享记录
export const countInviteRecord = () => {
  return ajax.request('/client/member/{recommendId}/invite', null, 'GET');
};

//存入分享记录
export const fetchShareImgCode = (jobId) => {
  return ajax.request(`/invite/qrcode/${jobId}`, null, 'GET');
};

//获取个人海报
export const fetchSharePostPersoanl = () => {
  return ajax.request('/client/member/invite/qrcode', null, 'GET');
};

//获取海报参数
export const fetchPostArguments = (scene) => {
  return ajax.request(`/client/noauth/qrcode/param/${scene}`, null, 'GET');
};
//获取详细的海报参数
export const fetchDetailPostArguments = (scene) => {
  return ajax.request(`/client/noauth/qrcode/param/${scene}/detail`, null, 'GET');
};

//获取招聘员实名信息
export const fetchRecruiterAuthInfo = () => {
  return ajax.request('/client/recruiterAuth/info', null, 'GET');
};

//更新招聘员实名信息
export const updateRecruiterAuthInfo = (data) => {
  return ajax.request('/client/recruiterAuth/info', data, 'PUT');
};

// 用户二要素认证
export const twoFactorAuthentication = (payload) => {
  return ajax.request('/client/certification/verifyAuth', payload, 'POST');
};

// 更新实名认证信息中的手机号
export const updateMobile = (payload) => {
  return ajax.request('/client/certification/mobile', payload, 'PUT');
};

// 获取用户二要素认证信息
export const fetchCertificationInfo = (payload) => {
  return ajax.request('/client/certification/info', null, 'GET');
};

//获取实名信息
export const fetchAuthInfo = () => {
  return ajax.request('/client/recruiterAuth/info', null, 'GET');
};

//更新实名信息
export const updateAuthInfo = (data) => {
  return ajax.request('/client/recruiterAuth/info', data, 'PUT');
};

//实名获取验证码
export const sendCode = (mobile) => {
  return ajax.request(`/sms/sendSmsCode/auth/${mobile}`, null, 'GET');
};

//获取成员信息列表
export const fetchStaffList = (data) => {
  return ajax.request('/client/member/member/list', data, 'POST');
};

//判断用户是否授权过微信昵称
export const isFetchUserName = () => {
  return ajax.request('/client/member/isFetchUserName', null, 'GET', false);
};

//更新用户昵称
export const updateNickName = (data) => {
  return ajax.request('/client/member/updateMemberUsername', data, 'PUT', false);
};

export const fetchContactsInfo = () => {
  return ajax.request('/client/member/contacts', null, 'GET');
};

export const submitContactsInfo = (data) => {
  return ajax.request('/client/member/contacts', data, 'POST', false);
};

export const fetchBankCardInfo = () => {
  return ajax.request('/client/member/bankCard', null, 'GET');
};

export const submitBankCardInfo = (data) => {
  return ajax.request('/client/member/bankCard', data, 'POST', false);
};

export const fetchBankUserName = () => {
  return ajax.request('/client/member/bankUserName', null, 'GET');
};
// 会员是否实名
export const checkValidation = () => {
  return ajax.request('/client/member/validation', null, 'GET', true, false);
};