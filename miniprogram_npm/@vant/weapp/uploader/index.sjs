/* eslint-disable */
var style = require("../wxs/style.sjs");
var addUnit = require("../wxs/add-unit.sjs");
function sizeStyle(data) {
  return style({
    width: addUnit(data.previewSize),
    height: addUnit(data.previewSize)
  });
}
module.exports = {
  sizeStyle: sizeStyle
};