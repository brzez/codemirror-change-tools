'use strict';

var _calculatePositionDiff = require('../calculatePositionDiff');

var _calculatePositionDiff2 = _interopRequireDefault(_calculatePositionDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('calculatePositionDiff', function () {
  test('inline - 0', function () {
    var result = (0, _calculatePositionDiff2.default)({
      line: 1,
      ch: 1
    }, {
      line: 1,
      ch: 1
    });

    expect(result.partials.length).toBe(0);
    expect(result.lines).toBe(null);
  });

  test('inline - some chars', function () {
    var result = (0, _calculatePositionDiff2.default)({
      line: 1,
      ch: 1
    }, {
      line: 1,
      ch: 5
    });

    expect(result.partials.length).toBe(1);
    expect(result.partials).toEqual(expect.arrayContaining([{
      line: 1,
      ch: 1,
      direction: 1,
      length: 4
    }]));
    expect(result.lines).toBe(null);
  });

  test('multiline - two partials', function () {
    var result = (0, _calculatePositionDiff2.default)({
      line: 1,
      ch: 1
    }, {
      line: 2,
      ch: 5
    });

    expect(result.partials.length).toBe(2);
    expect(result.partials).toEqual(expect.arrayContaining([{
      line: 1,
      ch: 1,
      direction: 1
    }, {
      line: 2,
      ch: 5,
      direction: -1
    }]));
    expect(result.lines).toBe(null);
  });

  test('multiline - two partials - with lines inbetween', function () {
    var result = (0, _calculatePositionDiff2.default)({
      line: 1,
      ch: 1
    }, {
      line: 10,
      ch: 5
    });

    expect(result.partials.length).toBe(2);
    expect(result.partials).toEqual(expect.arrayContaining([{
      line: 1,
      ch: 1,
      direction: 1
    }, {
      line: 10,
      ch: 5,
      direction: -1
    }]));
    expect(result.lines).toEqual({ start: 2, end: 9 });
  });
});