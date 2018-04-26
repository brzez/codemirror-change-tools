'use strict';

var _TextBuffer = require('../TextBuffer');

var _TextBuffer2 = _interopRequireDefault(_TextBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextBuffer', function () {
  test('append text - inline', function () {
    var tb = new _TextBuffer2.default('abc');
    tb.change({
      text: ['d'],
      from: {
        line: 0,
        ch: 3
      },
      to: {
        line: 0,
        ch: 3
      }
    });

    expect(tb.build()).toBe('abcd');
  });

  test('append text - multiline', function () {
    var tb = new _TextBuffer2.default('abc');
    tb.change({
      text: ['d', 'e'],
      from: {
        line: 0,
        ch: 3
      },
      to: {
        line: 0,
        ch: 3
      }
    });

    expect(tb.build()).toBe('abcd\ne');
  });

  test('append text - advanced', function () {
    var tb = new _TextBuffer2.default('aaaaaaaaaaa\nbbbbbbbbbbb\nccccccccccc');
    tb.change({
      text: ["foo"],
      from: {
        line: 1,
        ch: 4
      },
      to: {
        line: 1,
        ch: 7
      }
    });

    expect(tb.build()).toBe('aaaaaaaaaaa\nbbbbfoobbbb\nccccccccccc');
  });

  test('working on empty text', function () {
    var tb = new _TextBuffer2.default('');
    tb.change({
      text: ["foo", "bar"],
      from: {
        line: 1,
        ch: 4
      },
      to: {
        line: 1,
        ch: 7
      }
    });

    expect(tb.build()).toBe('foo\nbar');
  });

  test('invalid from / to', function () {
    var tb = new _TextBuffer2.default('');
    tb.change({
      text: ["foo"],
      from: {
        line: 1123,
        ch: 4
      },
      to: {
        line: 1321,
        ch: 7
      }
    });

    expect(tb.build()).toBe('foo');
  });

  test('multiline remove lines', function () {
    var tb = new _TextBuffer2.default('0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n');

    tb.change({
      "text": [""],
      "from": {
        "line": 0, "ch": 0
      }, "to": { "line": 9, "ch": 0 }
    });

    expect(tb.build()).toBe('9\n');
  });

  test('multiline remove lines + partial', function () {
    var tb = new _TextBuffer2.default('1a\n2\n3\n4\n5\n6');

    tb.change({
      "text": [""],
      "from": {
        "line": 0,
        "ch": 1
      },
      "to": {
        "line": 4,
        "ch": 1
      }
    });

    expect(tb.build()).toBe('1\n6');
  });

  test('newline between chars', function () {
    var tb = new _TextBuffer2.default('12');

    tb.change({
      "text": ["", ""],
      "from": {
        "line": 0,
        "ch": 1
      },
      "to": {
        "line": 0,
        "ch": 1
      }
    });

    expect(tb.build()).toBe('1\n2');
  });
});