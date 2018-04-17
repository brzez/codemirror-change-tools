// @flow

import calculatePositionDiff from "../calculatePositionDiff";

describe('calculatePositionDiff', () => {
  test('inline - 0', () => {
    const result = calculatePositionDiff({
      line: 1,
      ch: 1
    }, {
      line: 1,
      ch: 1
    });

    expect(result.partials.length).toBe(0);
    expect(result.lines).toBe(null);
  });

  test('inline - some chars', () => {
    const result = calculatePositionDiff({
      line: 1,
      ch: 1
    }, {
      line: 1,
      ch: 5
    });

    expect(result.partials.length).toBe(1);
    expect(result.partials).toEqual(expect.arrayContaining([
      {
        line: 1,
        ch: 1,
        direction: 1,
        length: 4
      }
    ]));
    expect(result.lines).toBe(null);
  });

  test('multiline - two partials', () => {
    const result = calculatePositionDiff({
      line: 1,
      ch: 1
    }, {
      line: 2,
      ch: 5
    });

    expect(result.partials.length).toBe(2);
    expect(result.partials).toEqual(expect.arrayContaining([
      {
        line: 1,
        ch: 1,
        direction: 1,
      },
      {
        line: 2,
        ch: 5,
        direction: -1,
      }
    ]));
    expect(result.lines).toBe(null);
  });

  test('multiline - two partials - with lines inbetween', () => {
    const result = calculatePositionDiff({
      line: 1,
      ch: 1
    }, {
      line: 10,
      ch: 5
    });

    expect(result.partials.length).toBe(2);
    expect(result.partials).toEqual(expect.arrayContaining([
      {
        line: 1,
        ch: 1,
        direction: 1,
      },
      {
        line: 10,
        ch: 5,
        direction: -1,
      }
    ]));
    expect(result.lines).toEqual({start: 2, end: 9});
  });
});
