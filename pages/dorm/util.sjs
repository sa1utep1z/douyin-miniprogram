function parseLiveType(liveType) {
  if (liveType === 'DORM_MALE') {
    return '男生宿舍';
  } else if (liveType === 'DORM_FEMALE') {
    return '女生宿舍';
  }
  return '';
}
function parseSignUpType(signUpType) {
  if (signUpType === 'SELF') {
    return '自主报名';
  } else if (signUpType === 'RECRUITER') {
    return '门店录入';
  } else if (signUpType === 'SUPPLIER') {
    return '供应商';
  } else if (signUpType === 'MEMBER_RECOMMEND') {
    return '会员推荐';
  }
  return '';
}
module.exports = {
  parseLiveType: parseLiveType,
  parseSignUpType: parseSignUpType
};