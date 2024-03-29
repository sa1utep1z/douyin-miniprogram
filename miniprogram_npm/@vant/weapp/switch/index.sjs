/* eslint-disable */
var style = require("../wxs/style.sjs");
var addUnit = require("../wxs/add-unit.sjs");
function rootStyle(data) {
  var currentColor = data.checked ? data.activeColor : data.inactiveColor;
  return style({
    'font-size': addUnit(data.size),
    'background-color': currentColor
  });
}
var BLUE = '#1989fa';
var GRAY_DARK = '#969799';
function loadingColor(data) {
  return data.checked ? data.activeColor || BLUE : data.inactiveColor || GRAY_DARK;
}
module.exports = {
  rootStyle: rootStyle,
  loadingColor: loadingColor
};