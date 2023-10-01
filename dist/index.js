import React from 'react';

var styles = {"wrapper":"Sublink-module_wrapper__v-n3q","spliter":"Sublink-module_spliter__j4x-a","wrapperLink":"Sublink-module_wrapperLink__Lozil","slideInLeft":"Sublink-module_slideInLeft__8OPJP"};

var SubLink = function SubLink(_ref) {
  var data = _ref.data,
    _ref$wrapperStyle = _ref.wrapperStyle,
    wrapperStyle = _ref$wrapperStyle === void 0 ? {} : _ref$wrapperStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$renderItem = _ref.renderItem,
    renderItem = _ref$renderItem === void 0 ? function () {} : _ref$renderItem;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.wrapperLink, " ").concat(className),
      key: i
    }, renderItem(item), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles.spliter
    }, '>'));
  }));
};

export { SubLink };
