// @flow

import mergeChanges from "../mergeChanges";

describe('mergeChanges', () => {
  test('merges multiple changes into one', () => {
    const a = {
      text: ['a'],
      from: {
        line: 1,
        ch: 1,
      },
      to: {
        line: 1,
        ch: 1,
      },
    };


    const b = {
      text: ['b'],
      from: {
        line: 1,
        ch: 2,
      }
    };



    const foo = {
      text: ['foo'],
      from: {
        line: 31,
        ch: 2,
      }
    };

    const c = {
      text: ['c'],
      from: {
        line: 2,
        ch: 1,
      }
    };

    const d = {
      text: ['d'],
      from: {
        line: 2,
        ch: 2,
      }
    };

    const result = mergeChanges([a, b, foo, c, d]);

    expect(result).toEqual([
      {
        text: ['ab'],
        from: {
          line: 1,
          ch: 1,
        }
      },{
        text: ['foo'],
        from: {
          line: 31,
          ch: 2,
        }
      },
      {
        text: ['cd'],
        from: {
          line: 2,
          ch: 1,
        }
      }
    ]);
  });

  test('regression #1', () => {
    const dataset = [
      {
        "text": [
          "1"
        ],
        "from": {
          "line": 0,
          "ch": 0
        },
        "to": {
          "line": 0,
          "ch": 0
        },
        "timestamp": 1524597115945
      },
      {
        "text": [
          "2"
        ],
        "from": {
          "line": 0,
          "ch": 1
        },
        "to": {
          "line": 0,
          "ch": 1
        },
        "timestamp": 1524597115981
      },
      {
        "text": [
          "3"
        ],
        "from": {
          "line": 0,
          "ch": 2
        },
        "to": {
          "line": 0,
          "ch": 2
        },
        "timestamp": 1524597116056
      },
      {
        "text": [
          "4"
        ],
        "from": {
          "line": 0,
          "ch": 3
        },
        "to": {
          "line": 0,
          "ch": 3
        },
        "timestamp": 1524597116116
      },
      {
        "text": [
          "5"
        ],
        "from": {
          "line": 0,
          "ch": 4
        },
        "to": {
          "line": 0,
          "ch": 4
        },
        "timestamp": 1524597116163
      },
      {
        "text": [
          "6"
        ],
        "from": {
          "line": 0,
          "ch": 5
        },
        "to": {
          "line": 0,
          "ch": 5
        },
        "timestamp": 1524597116198
      },
      {
        "text": [
          "7"
        ],
        "from": {
          "line": 0,
          "ch": 6
        },
        "to": {
          "line": 0,
          "ch": 6
        },
        "timestamp": 1524597116235
      },
      {
        "text": [
          "8"
        ],
        "from": {
          "line": 0,
          "ch": 7
        },
        "to": {
          "line": 0,
          "ch": 7
        },
        "timestamp": 1524597116274
      },
      {
        "text": [
          "9"
        ],
        "from": {
          "line": 0,
          "ch": 8
        },
        "to": {
          "line": 0,
          "ch": 8
        },
        "timestamp": 1524597116324
      },
      {
        "text": [
          "0"
        ],
        "from": {
          "line": 0,
          "ch": 9
        },
        "to": {
          "line": 0,
          "ch": 9
        },
        "timestamp": 1524597116384
      }
    ];

    const result = mergeChanges(dataset);

    expect(result).toEqual([{
      text: ['1234567890'],
      from: {
        line: 0,
        ch: 0
      },
      to: {
        line: 0,
        ch: 0
      }
    }]);
  })
});
