"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cutText;
function cutText(text, ch, direction, length) {
  var result = void 0;

  if (direction === 1) {
    result = text.substr(0, ch);
    if (length) {
      result += text.substr(ch + length);
    }
  }

  if (direction === -1) {
    result = text.substr(ch);
    if (length) {
      result = text.substr(0, ch - length) + result;
    }
  }

  return result;
}