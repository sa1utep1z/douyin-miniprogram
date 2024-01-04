// 工种类型
const workerType = [
{ label: '派遣工-小时工', value: 'DISPATCH_HOURLY_WORKER' },
{ label: '派遣工-同工同酬', value: 'DISPATCH_EQUAL_PAY' },
{ label: '正式工', value: 'FORMAL_WORKER' }];


// 工作环境
const workEnv = [
// key需要和后端传来的属性对应
{
  key: 'shiftCategory',
  value: '班别',
  options: [
  { label: '长白班', value: 'SHIFT_CATEGORY_LONG' },
  { label: '两班倒', value: 'SHIFT_CATEGORY_TWO' },
  { label: '三班倒', value: 'SHIFT_CATEGORY_THREE' }]

},
{
  key: 'dress',
  value: '着装',
  options: [
  { label: '普通工衣', value: 'DRESS_ORDINARY' },
  { label: '无尘服', value: 'DRESS_DUST_FREE' },
  { label: '穿自己衣服', value: 'DRESS_OWN' }]

},
{
  key: 'sitStand',
  value: '站坐',
  options: [
  { label: '站班', value: 'STAND' },
  { label: '坐班', value: 'SIT_DOWN' },
  { label: '都有', value: 'ALL_HAVE' }]

}];


// 录用要求
const employRequired = [
// key需要和后端传来的属性对应
{
  key: 'idCard',
  value: '身份证',
  options: [
  { label: '必须有磁有效', value: 'ID_CARD_MAGNETIC' },
  { label: '临时身份证可去', value: 'ID_CARD_TEMP' },
  { label: '无身份证可去', value: 'ID_CARD_NOT' }]

},
{
  key: 'tattooSmoke',
  value: '纹身烟疤',
  options: [
  { label: '严查', value: 'TATTOO_SMOKE_CHECK' },
  { label: '不查', value: 'TATTOO_SMOKE_NOT_CHECK' },
  { label: '不可外露', value: 'TATTOO_SMOKE_NOT_EXPOSED' }]

},
{
  key: 'english',
  value: '英文字母',
  options: [
  { label: '不会可去', value: 'ENGLISH_NOT_MUST' },
  { label: '必须要会', value: 'ENGLISH_MUST' }]

}];


// 定义公用的解析方法
const parseConstants = (constantList, dataBean) => {
  constantList.map((constant) => {
    const result = { name: constant.value, value: '' };
    if (dataBean[constant.key]) {
      result.value = constant.options.find((val) => val.value === enumKey)?.label;
    }
    return result;
  });
};

// 定义解析工种
const parseWorkerType = (dataBean) => {
  if (dataBean.typeOfWork) {
    return workerType.find((val) => val.value === dataBean.typeOfWork)?.label;
  }
  return '不详';
};

// 定义解析bean的工作环境信息
const parseWorkEvnConstants = (dataBean) => {
  return workEnv.map((constant) => {
    const result = { name: constant.value, value: '' };
    if (dataBean[constant.key]) {
      result.value = constant.options.find((val) => val.value === dataBean[constant.key])?.label;
    }
    return result;
  });
};

// 定义解析bean的录用要求信息
const parseEmployRequiredConstants = (dataBean) => {
  return employRequired.map((constant) => {
    const result = { name: constant.value, value: '' };
    if (dataBean[constant.key]) {
      result.value = constant.options.find((val) => val.value === dataBean[constant.key])?.label;
    }
    return result;
  });
};


module.exports = {
  parseWorkerType,
  parseWorkEvnConstants,
  parseEmployRequiredConstants
};