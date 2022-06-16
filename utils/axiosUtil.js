import urlConfig from './urlConfig';
import eventBus from './bus';
const authUrl = urlConfig().authUrl;
const baseUrl = urlConfig().baseUrl;
const traceUrl = urlConfig().traceUrl;

const initHeader = {
  'content-type': 'application/json',
  'Accept': 'application/json',
};

// 处理登录失效
const handleLoginInvalid = () => {
  // 清除登录信息
  wx.removeStorageSync('token');
  wx.removeStorageSync('mobile');
  wx.removeStorageSync('userId');
  wx.removeStorageSync('openId');
  wx.navigateTo({
    url: '/pages/login/login'
  });
}
function _showToast(title = '网络错误', duration = 2000) {
  wx.showToast({
    title,
    icon: 'none',
    duration,
  });
}
function _showLoading(title = '加载中') {
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
}

/**
 * 请求发送前拦截器
 * @param {*} needLoading 是否需要loading提示
 */
function ajaxInterceptorsRequest(needLoading = true, loadingTitle = '加载中') {
  if (needLoading) {
    _showLoading(loadingTitle);
  } 
  initHeader['X-User-Token'] = wx.getStorageSync('token') || '';
  initHeader['userId'] = wx.getStorageSync('userId') || '';
  initHeader['X-User-Platform'] = 'wechat';
}

function formatResponse(response) {
  if (typeof response.data === 'string' && response.data !== '') {
    return JSON.parse(response.data);
  }
  return response.data;
}

let isRefreshing = false; // 是否正在刷新token

class Ajax { // 创建一个类，相当于是创建一个构造函数
  request(url, data,method='GET',loading=true) { // 带Loading状态的请求
    ajaxInterceptorsRequest(loading);
    return new Promise((resolve, reject) => { // 返回一个Promise对象
      wx.request({ // 配合微信的wx.request方法
        url: baseUrl + url, // 默认拼接baseUrl
        data: data || {}, // 如果没有传data，默认为一个空对象
        header: initHeader,
        method: method,
        dataType: 'json',
        responseType: 'text',
        success: (response) => {
          wx.hideLoading(); // 隐藏loading
          const httpResult = formatResponse(response);
          if (httpResult && httpResult.code === 0) {
            resolve(httpResult);
          }
          if (httpResult && httpResult.code === 1) {
            _showToast(httpResult.msg);
            reject(httpResult);
          }
          if (response.statusCode === 401 || response.statusCode === 403 || response.statusCode === 409) {
            if (!isRefreshing) {
              isRefreshing = true;
              getApp().userLogin().then(async (res) => {
                const token = res.data.jwt;
                if (!token) {
                  handleLoginInvalid();
                } else {
                  const result = await this.request(url, data,method,loading);
                  resolve(result);
                  eventBus.publish('refreshToken'); // 发布
                }
              }).catch(err => {
                _showToast(err.msg);
              }).finally(() => {
                isRefreshing = false;
                eventBus.unSubscribe('refreshToken'); // 取消订阅
              });
            } else {
              eventBus.subscribe('refreshToken', () => {
                resolve(this.request(url,data,method,loading))
              });
            }
          }
        },
        fail: (res) => { // 请求失败，执行reject
          wx.hideLoading(); // 隐藏loading
          reject(res);
        },
      });
    })
  }
  uploadRequest(url,data,formData) {
    ajaxInterceptorsRequest(true, '上传中');
    return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: baseUrl + url,
        filePath: data,
        name: 'file',
        header: initHeader,
        formData:formData|| {},
        success: (response) => {
          wx.hideLoading(); // 隐藏loading
          const res = formatResponse(response);
          if (res && res.code === 0) {
            resolve(res);
          } else {
            _showToast(res.msg);
            reject(res.msg);
          }
        },
        fail: (res) => { // 请求失败，执行reject
          wx.hideLoading(); // 隐藏loading
          reject(res);
        },
      })
    })
  }
  authRequest(url, method = 'GET', data, loading = true){
    ajaxInterceptorsRequest(true, '加载中')
    return new Promise((resolve, reject) => { // 返回一个Promise对象
      wx.request({ // 配合微信的wx.request方法
        url: authUrl + url, // 默认拼接baseUrl
        data: data || {}, // 如果没有传data，默认为一个空对象
        header: {
          'content-type': 'application/json',
          'Accept': 'application/json',
        },
        method: method||'GET',
        dataType: 'json',
        responseType: 'text',
        success: (response) => {
          wx.hideLoading(); // 隐藏loading
          const res = formatResponse(response);
          if (res && res.code === 0) {
            resolve(res);
          } else {
            _showToast(res.msg);
            reject(res);
          }
        },
        fail: (res) => { // 请求失败，执行reject
          wx.hideLoading(); // 隐藏loading
          reject(res);
        },
      });
    })
  }
}

const ajax = new Ajax() // 创建一个Ajax的实例

export default ajax // 如果想在page中使用Ajax的实例，则写这一句，new Ajax()返回的是一个Ajax实例，是promise对象