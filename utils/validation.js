import { checkValidation } from '../api/userApi';

async function fetchValidation() {
  return await checkValidation().then((res) => {
    if (!res.data) {
      tt.showModal({
        title: '温馨提示',
        content: '请先进行实名认证',
        confirmText: '去实名',
        success: (res) => {
          if (res.confirm) {
            //未实名 进入实名页面
            tt.navigateTo({
              url: '/pages/authCenterNew/authCenterNew'
            });
          }
        }
      });
      return false;
    }
    return true;
  }).catch((err) => {
    tt.showModal({
      title: '提示',
      showCancel: false,
      content: '请求失败'
    });
    return false;
  });
}

module.exports = {
  fetchValidation
};