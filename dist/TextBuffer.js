"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cutText = require("./cutText");

var _cutText2 = _interopRequireDefault(_cutText);

var _calculatePositionDiff = require("./calculatePositionDiff");

var _calculatePositionDiff2 = _interopRequireDefault(_calculatePositionDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextBuffer = function () {
  function TextBuffer(content) {
    _classCallCheck(this, TextBuffer);

    this.lines = content.split('\n');
  }

  _createClass(TextBuffer, [{
    key: "_removeText",
    value: function _removeText(line, ch, direction, length) {
      var content = this.lines[line];
      if (!content) {
        return false;
      }

      this.lines[line] = (0, _cutText2.default)(content, ch, direction, length);
      return true;
    }
  }, {
    key: "_write",
    value: function _write(texts, start) {
      // todo: refactor
      texts = texts.slice();
      var line = start.line,
          ch = start.ch;

      var first = texts.shift();

      var idx = Math.min(line, this.lines.length - 1);

      var current = this.lines[idx];
      var startPart = current ? current.slice(0, ch) : '';
      var endPart = current ? current.slice(ch) : '';

      this.lines[idx] = startPart + first + endPart;

      this.lines = this.lines.slice(0, idx + 1).concat(texts, this.lines.slice(idx + 1));
    }
  }, {
    key: "change",
    value: function change(_change) {
      var _this = this;

      /*
        1. delete from <-> to
          - delete partial text
          - delete full lines inbetween (to prevent index shifting)
        2. add text at [from]
       */
      var diff = (0, _calculatePositionDiff2.default)(_change.from, _change.to);
      diff.partials.forEach(function (_ref) {
        var line = _ref.line,
            ch = _ref.ch,
            direction = _ref.direction,
            length = _ref.length;
        return _this._removeText(line, ch, direction, length);
      });
      this._write(_change.text, _change.from);
    }
  }, {
    key: "build",
    value: function build() {
      return this.lines.join('\n');
    }
  }]);

  return TextBuffer;
}();

exports.default = TextBuffer;