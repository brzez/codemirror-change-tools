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

  test('append text - advanced', () => {
    const tb = new TextBuffer(`aaaaaaaaaaa\nbbbbbbbbbbb\nccccccccccc`);
    tb.change({
      text: [
        "foo"
      ],
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

  test('working on empty text', () => {
    const tb = new TextBuffer('');
    tb.change({
      text: [
        "foo",
        "bar"
      ],
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

  test('invalid from / to', () => {
    const tb = new TextBuffer('');
    tb.change({
      text: [
        "foo"
      ],
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
