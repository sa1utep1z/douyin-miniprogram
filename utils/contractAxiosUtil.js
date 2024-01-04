import urlConfig from './urlConfig';
import eventBus from './bus';
const baseUrl = urlConfig().contractBaseUrl;

const initHeader = {
  'content-type': 'application/json',
  'Accept': 'application/json'
};

// 处理登录失效
const handleLoginInvalid = () => {
  // 清除登录信息
  tt.removeStorageSync('token');
  tt.removeStorageSync('mobile');
  tt.removeStorageSync('userId');
  tt.removeStorageSync('openId');
  tt.navigateTo({
    url: '/pages/index/index'
  });
};
function _showToast(title = '网络错误', duration = 3000) {
  tt.showToast({
    title,
    icon: 'none',
    duration
  });
}
function _showLoading(title = '加载中') {
  tt.showLoading({
    title: '加载中',
    mask: true
  });
}

/**
 * 请求发送前拦截器
 * @param {*} needLoading 是否需要loading提示
 */
function ajaxInterceptorsRequest(needLoading = true, loadingTitle = '加载中') {
  if (needLoading) {
    _showLoading(loadingTitle);
  }
  initHeader['X-User-Token'] = tt.getStorageSync('token') || '';
  initHeader['userId'] = tt.getStorageSync('userId') || '';
  initHeader['X-User-Platform'] = 'wechat';
  initHeader['X-Device'] = 'mini_program';
}

function formatResponse(response) {
  if (typeof response.data === 'string' && response.data !== '') {
    return JSON.parse(response.data);
  }
  return response.data;
}

let isRefreshing = false; // 是否正在刷新token

class Ajax {// 创建一个类，相当于是创建一个构造函数
  request(url, data, method = 'GET', loading = true) {// 带Loading状态的请求
    ajaxInterceptorsRequest(loading);
    return new Promise((resolve, reject) => {// 返回一个Promise对象
      tt.request({ // 配合微信的wx.request方法
        url: baseUrl + url, // 默认拼接baseUrl
        data: data || {}, // 如果没有传data，默认为一个空对象
        header: initHeader,
        method: method,
        dataType: 'json',
        responseType: 'text',
        success: (response) => {
          tt.hideLoading(); // 隐藏loading
          const httpResult = formatResponse(response);
          if (httpResult && httpResult.code !== 1) {
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
                  const result = await this.request(url, data, method, loading);
                  resolve(result);
                  eventBus.publish('refreshToken'); // 发布
                }
              }).catch((err) => {
                _showToast(err.msg);
              }).finally(() => {
                isRefreshing = false;
                eventBus.unSubscribe('refreshToken'); // 取消订阅
              });
            } else {
              eventBus.subscribe('refreshToken', () => {
                resolve(this.request(url, data, method, loading));
              });
            }
          }
        },
        fail: (res) => {// 请求失败，执行reject
          tt.hideLoading(); // 隐藏loading
          reject(res);
        }
      });
    });
  }
  uploadRequest(url, data, formData) {
    ajaxInterceptorsRequest(true, '上传中');
    return new Promise((resolve, reject) => {
      tt.uploadFile({
        url: baseUrl + url,
        filePath: data,
        name: 'file',
        header: initHeader,
        formData: formData || {},
        success: (response) => {
          tt.hideLoading(); // 隐藏loading
          const res = formatResponse(response);
          if (res && res.code === 0) {
            resolve(res);
          } else {
            _showToast(res.msg);
            reject(res.msg);
          }
        },
        fail: (res) => {// 请求失败，执行reject
          tt.hideLoading(); // 隐藏loading
          reject(res);
        }
      });
    });
  }
}

const ajax = new Ajax(); // 创建一个Ajax的实例

export default ajax; // 如果想在page中使用Ajax的实例，则写这一句，new Ajax()返回的是一个Ajax实例，是promise对象