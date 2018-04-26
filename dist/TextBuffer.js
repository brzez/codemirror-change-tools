"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cutText = require("./cutText");

var _cutText2 = _interopRequireDefault(_cutText);

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

      var output = (0, _cutText2.default)(content, ch, direction, length);

      this.lines[line] = output;

      return output.length;
    }
  }, {
    key: "_write",
    value: function _write(texts, start) {
      // todo: refactor
      texts = texts.slice();
      var line = start.line,
          ch = start.ch;


      var first = texts.shift();
      var last = texts.pop();

      var idx = Math.min(line, this.lines.length - 1);

      var current = this.lines[idx];
      var startPart = current ? current.slice(0, ch) : '';
      var endPart = current ? current.slice(ch) : '';

      // if last === undefined: output is startPart + content + endPart
      // else
      // output is [startPart + first, ...lines, last + endPart]

      if (last === undefined) {
        this.lines[idx] = startPart + first + endPart;
      } else {
        this.lines[idx] = startPart + first;
        texts.push(last + endPart);
      }

      this.lines = this.lines.slice(0, idx + 1).concat(texts, this.lines.slice(idx + 1));
    }
  }, {
    key: "_eq",
    value: function _eq(a, b) {
      return a.line === b.line && a.ch === b.ch;
    }
  }, {
    key: "change",
    value: function change(_change) {
      if (!this._eq(_change.from, _change.to)) {
        this._remove(_change);
      }

      this._write(_change.text, _change.from);
    }
  }, {
    key: "build",
    value: function build() {
      return this.lines.join('\n');
    }
  }, {
    key: "_removeLines",
    value: function _removeLines(_ref) {
      var start = _ref.start,
          end = _ref.end;

      this.lines = this.lines.slice(0, start).concat(this.lines.slice(end));
    }
  }, {
    key: "_remove",
    value: function _remove(change) {
      var from = change.from,
          to = change.to;
      // remove text
      // 1. from

      var fromText = this.lines[from.line];
      var inline = from.line === to.line;
      if (fromText) {
        var length = inline ? to.ch - from.ch : null;
        this.lines[from.line] = fromText = (0, _cutText2.default)(fromText, from.ch, 1, length);
      }
      // 2. to
      var toText = this.lines[to.line];

      if (toText && !inline) {
        this.lines[to.line] = toText = (0, _cutText2.default)(toText, to.ch, -1);
      }

      // 3. between
      if (!inline) {
        this._removeLines({
          start: from.line + (fromText && fromText.length ? 1 : 0),
          end: to.line + (toText && toText.length ? 0 : 1)
        });
      }
    }
  }]);

  return TextBuffer;
}();

exports.default = TextBuffer;