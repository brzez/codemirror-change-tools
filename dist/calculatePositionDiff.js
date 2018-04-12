"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculatePositionDiff;
function eq(a, b) {
  return a.line === b.line && a.ch === b.ch;
}

/*
  todo:
  support when to < from
  - check what codemirror does.
 */

function calculatePositionDiff(from, to) {
  var partials = [];
  var lines = null;

  if (eq(from, to)) {
    return { partials: partials, lines: lines };
  }

  if (from.line === to.line) {
    // same line - only one partial, lines.length === 0
    var _length = to.ch - from.ch;
    partials.push({
      line: from.line,
      ch: from.ch,
      length: _length,
      direction: 1
    });
  }

  if (from.line !== to.line) {
    partials.push({
      line: from.line,
      ch: from.ch,
      direction: 1
    });
    partials.push({
      line: to.line,
      ch: to.ch,
      direction: -1
    });
  }

  if (to.line - from.line > 1) {
    lines = { start: from.line + 1, end: to.line - 1 };
  }

  return { partials: partials, lines: lines };
}