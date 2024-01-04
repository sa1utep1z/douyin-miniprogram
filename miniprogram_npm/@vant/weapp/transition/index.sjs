/* eslint-disable */
var style = require("../wxs/style.sjs");
function rootStyle(data) {
  return style([{
    '-webkit-transition-duration': data.currentDuration + 'ms',
    'transition-duration': data.currentDuration + 'ms'
  }, data.display ? null : 'display: none', data.customStyle]);
}
module.exports = {
  rootStyle: rootStyle
};