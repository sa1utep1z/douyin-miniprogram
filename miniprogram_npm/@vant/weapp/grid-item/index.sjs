/* eslint-disable */
var style = require("../wxs/style.sjs");
var addUnit = require("../wxs/add-unit.sjs");
function wrapperStyle(data) {
  var width = 100 / data.columnNum + '%';
  return style({
    width: width,
    'padding-top': data.square ? width : null,
    'padding-right': addUnit(data.gutter),
    'margin-top': data.index >= data.columnNum && !data.square ? addUnit(data.gutter) : null
  });
}
function contentStyle(data) {
  return data.square ? style({
    right: addUnit(data.gutter),
    bottom: addUnit(data.gutter),
    height: 'auto'
  }) : '';
}
module.exports = {
  wrapperStyle: wrapperStyle,
  contentStyle: contentStyle
};