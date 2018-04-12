'use strict';

var _cutText = require('../cutText');

var _cutText2 = _interopRequireDefault(_cutText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('cutText', function () {
  test('cut text - middle of string', function () {
    var result = (0, _cutText2.default)('0123456789', 3, 1, 2);
    expect(result).toBe('01256789');
  });
  test('cut text - end', function () {
    var result = (0, _cutText2.default)('0123456789', 3, 1);
    expect(result).toBe('012');
  });

  describe('reverse dir', function () {
    test('cut text - end', function () {
      var result = (0, _cutText2.default)('0123456789', 3, -1);
      expect(result).toBe('3456789');
    });
    test('cut text - end + len', function () {
      var result = (0, _cutText2.default)('0123456789', 3, -1, 1);
      expect(result).toBe('013456789');
    });
  });
});