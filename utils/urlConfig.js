// 开发环境地址
const urlDev = { 
  authUrl: 'http://192.168.110.79:8315',
  baseUrl: 'http://192.168.110.79:8315', // 鉴权 192.168.110.79
  traceUrl: '', // 埋点接口地址
};
// uat环境地址 体验版
const urlUat = {
  authUrl: 'http://192.168.110.79:8316',// https://laborgateway.uat.bt.com/labormgt-backend
  baseUrl: 'http://192.168.110.79:8316', // https://laborgateway.uat.bt.com/labormgt-backend
  traceUrl: '', 
};
// 生产环境地址
const urlProd = {
  authUrl: 'https://gateway-external.qiyebaobao.com/labormgt-backend',
  baseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-backend', 
  traceUrl: '',
};
let env = (wx.getAccountInfoSync()).miniProgram.envVersion || '';
if (wx.getAccountInfoSync) {
  env = (wx.getAccountInfoSync()).miniProgram.envVersion || '';
}
const urlConfig = () => {
  if (env === "develop") { 
      return urlDev;
  } else if (env === "trial") {
      return urlUat;
  } else if (env === "release" || !env) {
      return urlProd;
  }
};
export default urlConfig;
