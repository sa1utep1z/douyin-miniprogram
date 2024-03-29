/* eslint-disable */
var style = require("../wxs/style.sjs");
var addUnit = require("../wxs/add-unit.sjs");
function wrapStyle(data) {
  return style({
    transform: data.transform ? 'translate3d(0, ' + data.transform + 'px, 0)' : '',
    top: data.fixed ? addUnit(data.offsetTop) : '',
    'z-index': data.zIndex
  });
}
function containerStyle(data) {
  return style({
    height: data.fixed ? addUnit(data.height) : '',
    'z-index': data.zIndex
  });
}
module.exports = {
  wrapStyle: wrapStyle,
  containerStyle: containerStyle
};