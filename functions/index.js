'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssrapp = undefined;

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _app = require('./src/app');

var _app2 = _interopRequireDefault(_app);

var _facts = require('./src/facts');

var _facts2 = _interopRequireDefault(_facts);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var pageUrl = "";

if (__dirname.indexOf("/srv") != -1) {
  pageUrl = _path2.default.join(__dirname, 'index.html');
} else {
  pageUrl = _path2.default.join(__dirname.replace("functions", ""), 'public', 'index.html');
}

// console.log("pageUrl... " + pageUrl);
// console.log("dirname...");
// console.log(JSON.stringify(fs.readdirSync("/../" ))); 
// console.log("<< dirname.");

var index = _fs2.default.readFileSync(pageUrl, 'utf8');

var app = (0, _express2.default)();

app.get('**', function (req, res) {
  (0, _facts2.default)().then(function (facts) {
    var html = (0, _server.renderToString)(_react2.default.createElement(_app2.default, { facts: facts }));
    var finalHtml = index.replace('<!-- ::APP:: -->', html);
    //console.log("=== BEGIN: final HTML === ")
    //console.log(finalHtml);
    //console.log("=== END: final HTML === ")
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    res.send(finalHtml);
  });
});

var ssrapp = exports.ssrapp = functions.https.onRequest(app);