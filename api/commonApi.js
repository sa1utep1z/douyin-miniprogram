import ajax from '../utils/axiosUtil';


// 上传图片
export const uploadImage = (data) => {
  return ajax.uploadRequest('/client/member/feedback/image', data);
};

// 提交反馈意见
export const submitSuggestion = (data) => {
  return ajax.request('/client/member/feedback/submit', data, 'POST');
};

// 提交反馈意见
export const fetchFeedbackCategories = (data) => {
  return ajax.request('/client/member/feedback/categories/inquiry', null,'GET');
};

