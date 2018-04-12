// @flow

import TextBuffer from "../TextBuffer";

describe('TextBuffer', () => {
  test('append text - inline', () => {
    const tb = new TextBuffer(`abc`);
    tb.change({
      text: ['d'],
      from: {
        line: 0,
        ch: 3
      },
      to: {
        line: 0,
        ch: 3
      },
    });

    expect(tb.build()).toBe('abcd');
  });

  test('append text - multiline', () => {
    const tb = new TextBuffer(`abc`);
    tb.change({
      text: ['d', 'e'],
      from: {
        line: 0,
        ch: 3
      },
      to: {
        line: 0,
        ch: 3
      },
    });

    expect(tb.build()).toBe('abcd\ne');
  });
});
