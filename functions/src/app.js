"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function App(props) {

   var facts = props.facts.map(function (fact, i) {
      var rateHr = fact.modified ? fact.modified.split("T")[1] : "";

      var updatedStr = "";

      if (fact.updated) {
         var updated = fact.updated.split("T");
         var updatedDate = updated[0].split("-");
         updatedStr = updatedDate[2] + "/" + updatedDate[1] + "/" + updatedDate[0] + " " + updated[1];
      }

      var iconStyle = fact.flag ? fact.flagUpdated ? ' green' : '' : ' red';
      var iconName = fact.flag ? fact.flagUpdated ? 'insert_chart' : 'folder' : 'play_arrow';

      return _react2.default.createElement(
         "li",
         { key: i, className: "collection-item avatar" },
         _react2.default.createElement(
            "i",
            { className: "material-icons circle" + iconStyle },
            iconName
         ),
         _react2.default.createElement(
            "span",
            { className: "title" },
            _react2.default.createElement(
               "strong",
               null,
               fact.warehouse
            )
         ),
         _react2.default.createElement("br", null),
         _react2.default.createElement(
            "p",
            null,
            "Fecha/Hora tasa: ",
            fact.date,
            " ",
            rateHr,
            _react2.default.createElement("br", null),
            "Actualizado: ",
            updatedStr
         ),
         _react2.default.createElement(
            "a",
            { href: "#!", className: "secondary-content" },
            _react2.default.createElement(
               "i",
               { className: "material-icons" },
               "grade"
            )
         )
      );
   });

   //genero una lista unica de fechas segun los datos que llegan del json.
   //para facilitar el filtrado.
   var dates = props.facts.map(function (d) {
      return d.date;
   });
   //const uniqDates = ["todas", ...new Set(dates)].map((v,i)=>(<option key={i} value={v}>{v}</option>));
   var uniqDates = [].concat(_toConsumableArray(new Set(dates))).map(function (v, i) {
      return _react2.default.createElement(
         "li",
         { key: v, id: "oneDate" },
         _react2.default.createElement(
            "a",
            { className: "oneDate", href: "#" },
            v
         )
      );
   });

   return _react2.default.createElement(
      "div",
      { className: "container" },
      _react2.default.createElement(
         "nav",
         null,
         _react2.default.createElement(
            "div",
            { className: "nav-wrapper" },
            _react2.default.createElement(
               "a",
               { href: "#", "data-target": "mobile-demo", className: "sidenav-trigger" },
               _react2.default.createElement(
                  "i",
                  { className: "material-icons" },
                  "menu"
               )
            ),
            _react2.default.createElement(
               "ul",
               { className: "right hide-on-med-and-down" },
               _react2.default.createElement(
                  "li",
                  { className: "active" },
                  _react2.default.createElement(
                     "a",
                     { id: "allDates", href: "#" },
                     "Todas"
                  )
               ),
               uniqDates
            )
         )
      ),
      _react2.default.createElement(
         "ul",
         { className: "sidenav", id: "mobile-demo" },
         _react2.default.createElement(
            "li",
            { className: "active" },
            _react2.default.createElement(
               "a",
               { id: "allDates", href: "#" },
               "Todas"
            )
         ),
         uniqDates
      ),
      _react2.default.createElement("br", { style: { paddingBottom: '5px' } }),
      _react2.default.createElement(
         "ul",
         { className: "collection with-header" },
         _react2.default.createElement(
            "li",
            { key: "0", className: "collection-header" },
            _react2.default.createElement(
               "h4",
               null,
               "Actualizaci\xF3n de Tasa de Cambio por Restaurante"
            )
         ),
         facts
      )
   );
}

exports.default = App;