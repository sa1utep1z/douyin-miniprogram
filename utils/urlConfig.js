// 开发环境地址
const urlDev = { 
  authUrl: 'http://192.168.110.60:8317/labormgt-backend',
  baseUrl: 'http://192.168.110.60:8317/labormgt-backend', // 鉴权 192.168.110.79
  contractBaseUrl: 'http://192.168.110.60:8317/labormgt-contract',
  opshubBaseUrl: 'http://192.168.110.60:8317/labormgt-opshub',
};
// uat环境地址 体验版
const urlUat = {
  authUrl: 'http://192.168.110.79:8317/labormgt-backend',// https://laborgateway-external.uat.bt.com/labormgt-backend
  baseUrl: 'http://192.168.110.79:8317/labormgt-backend', // https://laborgateway-external.uat.bt.com/labormgt-backend
  contractBaseUrl: 'http://192.168.110.79:8317/labormgt-contract',
  opshubBaseUrl: 'http://192.168.110.79:8317/labormgt-opshub',
};
// 生产环境地址
const urlProd = {
  authUrl: 'https://gateway-external.qiyebaobao.com/labormgt-backend',
  baseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-backend', 
  contractBaseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-contract',
  opshubBaseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-opshub',
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
