// @flow

import TextBuffer from "../TextBuffer";

describe('TextBuffer', () => {
  test('append text', () => {
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
});
