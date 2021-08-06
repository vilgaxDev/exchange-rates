'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});
exports.default = getFacts;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFacts() {
     return Promise.all(new Array((0, _isomorphicFetch2.default)('https://exchageratesmgr.firebaseio.com/currentrates.json'), (0, _isomorphicFetch2.default)('https://exchageratesmgr.firebaseio.com/warehouses.json'))).then(function (values) {
          return Promise.all(values.map(function (e) {
               return e.json();
          }));
     }).then(function (facts) {
          var ratesInfo = facts[0];
          var dtStr = Object.keys(ratesInfo).sort().pop();
          //TODO: implementar esto usando moment.js
          dtStr = dtStr.substr(6, 2) + '/' + dtStr.substr(4, 2) + "/" + dtStr.substr(0, 4);
          var whData = facts[1];
          var warehouses = Object.keys(whData).map(function (f) {
               return Object.assign({}, { warehouse: f }, whData[f], { flag: whData[f].status === "success" }, { flagUpdated: dtStr == whData[f].date });
          });
          return warehouses;
     });
}