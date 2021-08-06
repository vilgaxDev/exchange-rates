'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _facts = require('./facts');

var _facts2 = _interopRequireDefault(_facts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _facts2.default)().then(function (facts) {
    (0, _reactDom.render)(_react2.default.createElement(_app2.default, { facts: facts }), document.querySelector('#root'));
});