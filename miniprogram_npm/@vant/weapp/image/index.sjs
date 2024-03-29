/* eslint-disable */
var style = require("../wxs/style.sjs");
var addUnit = require("../wxs/add-unit.sjs");
function rootStyle(data) {
  return style([{
    width: addUnit(data.width),
    height: addUnit(data.height),
    'border-radius': addUnit(data.radius)
  }, data.radius ? 'overflow: hidden' : null]);
}
var FIT_MODE_MAP = {
  none: 'center',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix'
};
function mode(fit) {
  return FIT_MODE_MAP[fit];
}
module.exports = {
  rootStyle: rootStyle,
  mode: mode
};