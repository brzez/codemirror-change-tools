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
});