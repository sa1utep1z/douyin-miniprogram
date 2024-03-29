/* eslint-disable */
var style = require("../wxs/style.sjs");
var addUnit = require("../wxs/add-unit.sjs");
function iconStyle(data) {
  var styles = {
    'font-size': addUnit(data.iconSize)
  };
  if (data.checkedColor && !(data.disabled || data.parentDisabled) && data.value === data.name) {
    styles['border-color'] = data.checkedColor;
    styles['background-color'] = data.checkedColor;
  }
  return style(styles);
}
function iconCustomStyle(data) {
  return style({
    'line-height': addUnit(data.iconSize),
    'font-size': '.8em',
    display: 'block'
  });
}
module.exports = {
  iconStyle: iconStyle,
  iconCustomStyle: iconCustomStyle
};