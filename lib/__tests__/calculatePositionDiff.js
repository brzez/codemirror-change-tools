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
    expect(result.lines.length).toBe(0);
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
    expect(result.partials[0]).toEqual({
      line: 1,
      ch: 1,
      direction: 1,
      length: 4
    });
    expect(result.lines.length).toBe(0);
  });
});
