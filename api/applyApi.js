
import ajax from '../utils/axiosUtil';
// 离职申请数据
export const listResignApply = (data) => {
 return  ajax.request('/client/resignApply/list', data, 'POST');
}
