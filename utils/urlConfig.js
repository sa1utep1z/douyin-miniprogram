// 开发环境地址
const urlDev = {
  authUrl: 'http://192.168.110.111:8317/labormgt-backend',
  baseUrl: 'http://192.168.110.111:8317/labormgt-backend', // 鉴权 192.168.110.79
  contractBaseUrl: 'http://192.168.110.111:8317/labormgt-contract',
  opshubBaseUrl: 'http://192.168.110.111:8317/labormgt-opshub'
};
// uat环境地址 体验版
const urlUat = {
  authUrl: 'http://192.168.110.79:8317/labormgt-backend', // https://laborgateway-external.uat.bt.com/labormgt-backend
  baseUrl: 'http://192.168.110.79:8317/labormgt-backend', // https://laborgateway-external.uat.bt.com/labormgt-backend
  contractBaseUrl: 'http://192.168.110.79:8317/labormgt-contract',
  opshubBaseUrl: 'http://192.168.110.79:8317/labormgt-opshub'
};
// 生产环境地址
const urlProd = {
  authUrl: 'https://gateway-external.qiyebaobao.com/labormgt-backend',
  baseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-backend',
  contractBaseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-contract',
  opshubBaseUrl: 'https://gateway-external.qiyebaobao.com/labormgt-opshub'
};
let env = tt.getEnvInfoSync().microapp.envType;
const urlConfig = () => {
  if (env === "preview") { //预览版
    return urlDev;
  } else if (env === "development") { //测试版
    return urlDev;
  } else if (env === "production" || !env) { //线上版
    return urlProd;
  }
};
export default urlConfig;