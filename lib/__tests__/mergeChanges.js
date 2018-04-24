// @flow

import mergeChanges from "../mergeChanges";

describe('mergeChanges', () => {
  test('merges multiple changes into one', () => {
    const a = {
      text: ['a'],
      from: {
        line: 1,
        ch: 1,
      }
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
    ])

  });
});
