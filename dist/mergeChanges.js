"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeChanges;


function inlineInsertOnly(change) {
  // not inline
  if (change.text.length !== 1) {
    return false;
  }

  if (!change.to) {
    return true;
  }

  // dunno
  if (change.to.line === change.from.line && change.to.ch === change.from.line) {
    return true;
  }

  return change.from.line === change.to.line && change.from.ch + change.text[0].length === change.to.ch;
}

function canMerge(a, b) {
  return inlineInsertOnly(a) && inlineInsertOnly(b) && a.from.line === b.from.line && b.from.ch === a.from.ch + a.text[0].length;
}

function merge(a, b) {
  var change = {
    text: [a.text[0] + b.text[0]],
    from: {
      line: a.from.line,
      ch: a.from.ch
    }
  };

  if (b.to) {
    change.to = b.to;
  }

  return change;
}

function mergeChanges(changes) {
  var merged = [];
  var accumulator = null;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = changes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var change = _step.value;

      if (!accumulator) {
        accumulator = change;
        continue;
      }

      if (!canMerge(accumulator, change)) {
        merged.push(accumulator);
        accumulator = change;
        continue;
      }

      accumulator = merge(accumulator, change);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (accumulator) {
    merged.push(accumulator);
  }

  return merged;
}