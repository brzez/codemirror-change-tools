'use strict';

var _mergeChanges = require('../mergeChanges');

var _mergeChanges2 = _interopRequireDefault(_mergeChanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('mergeChanges', function () {
  test('merges multiple changes into one', function () {
    var a = {
      text: ['a'],
      from: {
        line: 1,
        ch: 1
      }
    };

    var b = {
      text: ['b'],
      from: {
        line: 1,
        ch: 2
      }
    };

    var foo = {
      text: ['foo'],
      from: {
        line: 31,
        ch: 2
      }
    };

    var c = {
      text: ['c'],
      from: {
        line: 2,
        ch: 1
      }
    };

    var d = {
      text: ['d'],
      from: {
        line: 2,
        ch: 2
      }
    };

    var result = (0, _mergeChanges2.default)([a, b, foo, c, d]);

    expect(result).toEqual([{
      text: ['ab'],
      from: {
        line: 1,
        ch: 1
      }
    }, {
      text: ['foo'],
      from: {
        line: 31,
        ch: 2
      }
    }, {
      text: ['cd'],
      from: {
        line: 2,
        ch: 1
      }
    }]);
  });
});