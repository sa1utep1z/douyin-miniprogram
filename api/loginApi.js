import ajax from '../utils/axiosUtil';

// 微信一键登录
export const wxBindPhoneLogin = (data) => {
  return ajax.authRequest(`/client/noauth/login/wxBuildInPhone`, 'POST', data);
};
// 微信自动登录
export const wxCodeAutoLogin = (code) => {
  return ajax.authRequest(`/client/noauth/login/code/${code}`, 'POST');
};
// 微信手机号验证码登录
export const wxCustomPhoneLogin = (data) => {
  return ajax.authRequest(`/client/noauth/login/wxCustomizePhone`,'POST',data);
};

// 登录注册动码获取(需要传图形验证码)
export const getCodeByImage=(data)=>{
  return ajax.authRequest('/smsAuth/sms/send/validationCode','POST',data)
}
// 获取短信验证码
export const getSmsLoginCode = (phone) => {
  return ajax.authRequest(`/smsAuth/sms/send/${phone}`, 'POST')
}