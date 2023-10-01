var styles = "@-webkit-keyframes slideInLeft {\n  0% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    visibility: visible;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n@keyframes slideInLeft {\n  0% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    visibility: visible;\n  }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n.wrapper {\n  margin-top: 13px;\n  font-size: 18px;\n  line-height: 21px;\n  font-family: \"Big Shoulders Text\";\n  color: #676565;\n  display: flex;\n  align-self: flex-start;\n}\n.wrapper .spliter {\n  padding: 0px 12px;\n}\n@media (max-width: 641px) {\n  .wrapper .spliter {\n    padding: 0px 3px;\n  }\n}\n@media (max-width: 641px) {\n  .wrapper {\n    font-size: 16px;\n    width: 100%;\n    margin-top: 15px;\n    margin-bottom: 5px;\n  }\n  .wrapper a:first-child {\n    padding-left: 5px;\n  }\n}\n.wrapper .wrapperLink {\n  display: flex;\n}";

// import Link from 'next/link';
var SubLink = function SubLink(_ref) {
  var data = _ref.data,
    _ref$wrapperStyle = _ref.wrapperStyle,
    wrapperStyle = _ref$wrapperStyle === void 0 ? {} : _ref$wrapperStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.wrapperLink, " ").concat(className),
      key: i
    }, i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles.spliter
    }, '>'));
  }));
};

export { SubLink };
