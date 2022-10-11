import ajax from '../utils/axiosUtil';


// 上传图片
export const uploadImage = (data) => {
  return ajax.uploadRequest('/client/member/feedback/image', data);
};

export const uploadCommonImage = (data) => {
  return ajax.uploadRequest('/admin/file/upload', data);
};

// 提交反馈意见
export const submitSuggestion = (data) => {
  return ajax.request('/client/member/feedback/submit', data, 'POST');
};

// 提交反馈意见
export const listFeedback = (data) => {
  return ajax.request('/client/member/feedback/list', data, 'POST');
};

// 提交反馈意见
export const fetchFeedbackCategories = (data) => {
  return ajax.request('/client/member/feedback/categories/inquiry', null,'GET');
};

// banner
export const listBanners = () => {
  return ajax.request('/client/noauth/banner/list', null, 'GET', false);
};

// 银行卡ocr识别
export const ocrBank = (data) => {
  return ajax.uploadRequest('/ocr/bank', data);
};

